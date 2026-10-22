"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const SPLAT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTarget;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
uniform float uAspect;
void main() {
  vec4 base = texture(uTarget, vUv);
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  float g = exp(-dot(p, p) / max(uRadius, 0.00001));
  outColor = vec4(base.rgb + uColor * g, 1.0);
}`;

const ADVECT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uDt;
uniform float uDissipation;
uniform float uClamp;
void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 coord = clamp(vUv - uDt * vel * uTexel, vec2(0.0), vec2(1.0));
  vec4 value = texture(uSource, coord);
  value.rgb *= uDissipation;
  if (uClamp > 0.0) {
    value.xy = clamp(value.xy, -uClamp, uClamp);
  }
  outColor = vec4(value.rgb, 1.0);
}`;

const DIVERGENCE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
  float L = texture(uVelocity, vUv - vec2(uTexel.x, 0.0)).x;
  float R = texture(uVelocity, vUv + vec2(uTexel.x, 0.0)).x;
  float B = texture(uVelocity, vUv - vec2(0.0, uTexel.y)).y;
  float T = texture(uVelocity, vUv + vec2(0.0, uTexel.y)).y;
  float div = 0.5 * (R - L + T - B);
  outColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const PRESSURE = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexel;
void main() {
  float L = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
  float div = texture(uDivergence, vUv).x;
  float p = (L + R + B + T - div) * 0.25;
  outColor = vec4(p, 0.0, 0.0, 1.0);
}`;

const GRADIENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexel;
void main() {
  float L = texture(uPressure, vUv - vec2(uTexel.x, 0.0)).x;
  float R = texture(uPressure, vUv + vec2(uTexel.x, 0.0)).x;
  float B = texture(uPressure, vUv - vec2(0.0, uTexel.y)).x;
  float T = texture(uPressure, vUv + vec2(0.0, uTexel.y)).x;
  vec2 vel = texture(uVelocity, vUv).xy;
  vel -= vec2(R - L, T - B) * 0.5;
  outColor = vec4(vel, 0.0, 1.0);
}`;

const DISPLAY = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uDye;
uniform vec2 uBands[8];
uniform int uBandCount;
void main() {
  vec3 dye = texture(uDye, vUv).rgb;
  float mag = length(dye);
  float screenY = 1.0 - vUv.y;
  float light = 0.0;
  for (int i = 0; i < 8; i++) {
    if (i >= uBandCount) break;
    if (screenY >= uBands[i].x && screenY <= uBands[i].y) light = 1.0;
  }
  vec3 mapped = 1.0 - exp(-dye * 1.35);
  if (light > 0.5) {
    float teal = clamp(dye.g / max(mag, 0.0001), 0.0, 1.0);
    vec3 ink = mix(vec3(0.55, 0.28, 0.06), vec3(0.03, 0.32, 0.30), teal);
    float a = clamp(mag * 0.62, 0.0, 0.78);
    outColor = vec4(ink, a);
  } else {
    float a = clamp(mag * 0.85, 0.0, 0.82);
    outColor = vec4(mapped, a);
  }
}`;

type FBO = { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number };
type Pair = { read: FBO; write: FBO; w: number; h: number };

const ORANGE: [number, number, number] = [0.95, 0.66, 0.23];
const TEAL: [number, number, number] = [0.37, 0.92, 0.83];

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) || "Shader compile failed";
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
}

function program(gl: WebGL2RenderingContext, fragment: string) {
  const prog = gl.createProgram();
  if (!prog) throw new Error("Unable to create program");
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "aPos");
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog) || "Program link failed";
    gl.deleteProgram(prog);
    throw new Error(log);
  }
  return prog;
}

function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internal: number,
  type: number,
  filter: number,
): FBO {
  const tex = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!tex || !fbo) throw new Error("Unable to create framebuffer");
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, gl.RGBA, type, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteTexture(tex);
    gl.deleteFramebuffer(fbo);
    throw new Error("Framebuffer incomplete");
  }
  return { tex, fbo, w, h };
}

function destroyFBO(gl: WebGL2RenderingContext, target: FBO) {
  gl.deleteTexture(target.tex);
  gl.deleteFramebuffer(target.fbo);
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

    let raf = 0;
    let stopped = false;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const linearExt = gl.getExtension("OES_texture_float_linear");
    const useFloat = true;
    const filter = linearExt ? gl.LINEAR : gl.NEAREST;

    let velocity: Pair | null = null;
    let dye: Pair | null = null;
    let divergence: FBO | null = null;
    let pressure: Pair | null = null;

    const progs = {
      splat: program(gl, SPLAT),
      advect: program(gl, ADVECT),
      divergence: program(gl, DIVERGENCE),
      pressure: program(gl, PRESSURE),
      gradient: program(gl, GRADIENT),
      display: program(gl, DISPLAY),
    };

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);

    const uniforms = new Map<WebGLProgram, Map<string, WebGLUniformLocation | null>>();
    function loc(prog: WebGLProgram, name: string) {
      let table = uniforms.get(prog);
      if (!table) {
        table = new Map();
        uniforms.set(prog, table);
      }
      if (!table.has(name)) table.set(name, gl!.getUniformLocation(prog, name));
      return table.get(name) ?? null;
    }

    function bindTarget(target: FBO | null) {
      if (!gl) return;
      if (!target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas!.width, canvas!.height);
        return;
      }
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.w, target.h);
    }

    function blit(prog: WebGLProgram, target: FBO | null) {
      if (!gl) return;
      gl.useProgram(prog);
      bindTarget(target);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function makePair(w: number, h: number, internal: number, type: number): Pair {
      return {
        read: createFBO(gl!, w, h, internal, type, filter),
        write: createFBO(gl!, w, h, internal, type, filter),
        w,
        h,
      };
    }

    function resize() {
      if (!gl || !canvas) return;
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const simW = mobile ? 48 : 112;
      const simH = Math.max(
        28,
        Math.round(simW * (window.innerHeight / Math.max(window.innerWidth, 1))),
      );
      if (velocity && velocity.w === simW && velocity.h === simH) return;

      if (velocity) {
        destroyFBO(gl, velocity.read);
        destroyFBO(gl, velocity.write);
      }
      if (dye) {
        destroyFBO(gl, dye.read);
        destroyFBO(gl, dye.write);
      }
      if (divergence) destroyFBO(gl, divergence);
      if (pressure) {
        destroyFBO(gl, pressure.read);
        destroyFBO(gl, pressure.write);
      }

      const internal = useFloat ? gl.RGBA16F : gl.RGBA8;
      const type = useFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE;
      try {
        velocity = makePair(simW, simH, internal, type);
        dye = makePair(simW, simH, internal, type);
        divergence = createFBO(gl, simW, simH, internal, type, filter);
        pressure = makePair(simW, simH, internal, type);
        [
          velocity.read,
          velocity.write,
          dye.read,
          dye.write,
          divergence,
          pressure.read,
          pressure.write,
        ].forEach((target) => {
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
          gl.viewport(0, 0, target.w, target.h);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        });
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } catch {
        stopped = true;
      }
    }

    function splat(
      pair: Pair,
      x: number,
      y: number,
      color: [number, number, number],
      radius: number,
    ) {
      if (!gl) return;
      gl.useProgram(progs.splat);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pair.read.tex);
      gl.uniform1i(loc(progs.splat, "uTarget"), 0);
      gl.uniform2f(loc(progs.splat, "uPoint"), x, y);
      gl.uniform3f(loc(progs.splat, "uColor"), color[0], color[1], color[2]);
      gl.uniform1f(loc(progs.splat, "uRadius"), radius);
      gl.uniform1f(loc(progs.splat, "uAspect"), pair.w / pair.h);
      bindTarget(pair.write);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      const swap = pair.read;
      pair.read = pair.write;
      pair.write = swap;
    }

    const pointer = { x: 0.5, y: 0.5, px: 0.5, py: 0.5, down: false, moved: false };
    const onPointer = (event: PointerEvent) => {
      const x = event.clientX / Math.max(window.innerWidth, 1);
      const y = 1 - event.clientY / Math.max(window.innerHeight, 1);
      if (!pointer.moved) {
        pointer.px = x;
        pointer.py = y;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
      pointer.down = event.buttons > 0 || event.pointerType === "touch";
    };

    const bands = new Float32Array(16);
    function updateBands() {
      const nodes = document.querySelectorAll<HTMLElement>("[data-tone='light']");
      let count = 0;
      const height = Math.max(window.innerHeight, 1);
      nodes.forEach((node) => {
        if (count >= 8) return;
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > height) return;
        bands[count * 2] = rect.top / height;
        bands[count * 2 + 1] = rect.bottom / height;
        count += 1;
      });
      return count;
    }

    let ambient = { x: 0.35, y: 0.6 };
    let last = performance.now();

    function step(now: number) {
      if (!gl || !velocity || !dye || !divergence || !pressure || stopped) return;
      const dt = Math.min(0.033, (now - last) / 1000 || 0.016);
      last = now;
      const texel: [number, number] = [1 / velocity.w, 1 / velocity.h];
      const time = now * 0.001;
      const mix = 0.5 + 0.5 * Math.sin(time * 0.65 + pointer.x * 4.0);
      const color: [number, number, number] = [
        ORANGE[0] * (1 - mix) + TEAL[0] * mix,
        ORANGE[1] * (1 - mix) + TEAL[1] * mix,
        ORANGE[2] * (1 - mix) + TEAL[2] * mix,
      ];

      const ax = 0.5 + Math.cos(time * 0.31) * 0.22;
      const ay = 0.48 + Math.sin(time * 0.43) * 0.18;
      const adx = (ax - ambient.x) * velocity.w * (mobile ? 0.35 : 0.55);
      const ady = (ay - ambient.y) * velocity.h * (mobile ? 0.35 : 0.55);
      ambient = { x: ax, y: ay };
      splat(velocity, ax, ay, [adx, ady, 0], mobile ? 0.0022 : 0.0016);
      splat(
        dye,
        ax,
        ay,
        [color[0] * 0.35, color[1] * 0.35, color[2] * 0.35],
        mobile ? 0.0018 : 0.0013,
      );

      if (pointer.moved) {
        const dx = (pointer.x - pointer.px) * velocity.w * (mobile ? 3.2 : 5.4);
        const dy = (pointer.y - pointer.py) * velocity.h * (mobile ? 3.2 : 5.4);
        const force = pointer.down ? 1.35 : 1;
        splat(velocity, pointer.x, pointer.y, [dx * force, dy * force, 0], mobile ? 0.003 : 0.0022);
        splat(
          dye,
          pointer.x,
          pointer.y,
          [color[0] * 0.85 * force, color[1] * 0.85 * force, color[2] * 0.85 * force],
          mobile ? 0.0024 : 0.0018,
        );
        pointer.px = pointer.x;
        pointer.py = pointer.y;
      }

      const decayVel = Math.exp(-dt * (mobile ? 0.55 : 0.35));
      const decayDye = Math.exp(-dt * (mobile ? 1.15 : 0.72));

      gl.useProgram(progs.advect);
      gl.uniform2f(loc(progs.advect, "uTexel"), texel[0], texel[1]);
      gl.uniform1f(loc(progs.advect, "uDt"), dt);
      gl.uniform1f(loc(progs.advect, "uDissipation"), decayVel);
      gl.uniform1f(loc(progs.advect, "uClamp"), useFloat ? 1200 : 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1i(loc(progs.advect, "uVelocity"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1i(loc(progs.advect, "uSource"), 1);
      blit(progs.advect, velocity.write);
      {
        const swap = velocity.read;
        velocity.read = velocity.write;
        velocity.write = swap;
      }

      gl.useProgram(progs.divergence);
      gl.uniform2f(loc(progs.divergence, "uTexel"), texel[0], texel[1]);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1i(loc(progs.divergence, "uVelocity"), 0);
      blit(progs.divergence, divergence);

      gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.read.fbo);
      gl.viewport(0, 0, pressure.w, pressure.h);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const iterations = mobile ? 6 : useFloat ? 14 : 8;
      for (let i = 0; i < iterations; i += 1) {
        gl.useProgram(progs.pressure);
        gl.uniform2f(loc(progs.pressure, "uTexel"), texel[0], texel[1]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
        gl.uniform1i(loc(progs.pressure, "uPressure"), 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, divergence.tex);
        gl.uniform1i(loc(progs.pressure, "uDivergence"), 1);
        blit(progs.pressure, pressure.write);
        const swap = pressure.read;
        pressure.read = pressure.write;
        pressure.write = swap;
      }

      gl.useProgram(progs.gradient);
      gl.uniform2f(loc(progs.gradient, "uTexel"), texel[0], texel[1]);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
      gl.uniform1i(loc(progs.gradient, "uPressure"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1i(loc(progs.gradient, "uVelocity"), 1);
      blit(progs.gradient, velocity.write);
      {
        const swap = velocity.read;
        velocity.read = velocity.write;
        velocity.write = swap;
      }

      gl.useProgram(progs.advect);
      gl.uniform2f(loc(progs.advect, "uTexel"), texel[0], texel[1]);
      gl.uniform1f(loc(progs.advect, "uDt"), dt);
      gl.uniform1f(loc(progs.advect, "uDissipation"), decayDye);
      gl.uniform1f(loc(progs.advect, "uClamp"), 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.tex);
      gl.uniform1i(loc(progs.advect, "uVelocity"), 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1i(loc(progs.advect, "uSource"), 1);
      blit(progs.advect, dye.write);
      {
        const swap = dye.read;
        dye.read = dye.write;
        dye.write = swap;
      }

      const bandCount = updateBands();
      gl.useProgram(progs.display);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1i(loc(progs.display, "uDye"), 0);
      gl.uniform2fv(loc(progs.display, "uBands"), bands);
      gl.uniform1i(loc(progs.display, "uBandCount"), bandCount);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    let lastFrame = 0;
    const minDelta = mobile ? 32 : 16;
    function loop(now: number) {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (now - lastFrame < minDelta) return;
      lastFrame = now;
      step(now);
    }

    try {
      resize();
      if (!stopped && velocity && dye) {
        root.classList.add("is-live");
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("resize", resize);
        raf = requestAnimationFrame(loop);
      }
    } catch {
      stopped = true;
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      if (velocity) {
        destroyFBO(gl, velocity.read);
        destroyFBO(gl, velocity.write);
      }
      if (dye) {
        destroyFBO(gl, dye.read);
        destroyFBO(gl, dye.write);
      }
      if (divergence) destroyFBO(gl, divergence);
      if (pressure) {
        destroyFBO(gl, pressure.read);
        destroyFBO(gl, pressure.write);
      }
      Object.values(progs).forEach((prog) => gl.deleteProgram(prog));
      if (buffer) gl.deleteBuffer(buffer);
      root.classList.remove("is-live");
    };
  }, []);

  return (
    <div className="h-fluid" ref={rootRef} aria-hidden="true">
      <div className="h-fluid-fallback" />
      <canvas ref={canvasRef} className="h-fluid-canvas" />
    </div>
  );
}
