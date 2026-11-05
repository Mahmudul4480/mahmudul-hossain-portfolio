(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(/shot/.test(location.search)){const st=document.createElement("style");st.textContent=".reveal{transition:none!important}";document.head.appendChild(st)}
const hero=document.querySelector('.hero');if(!hero)return;
const cv=document.createElement('canvas');cv.id='skyCv';cv.setAttribute('aria-hidden','true');hero.prepend(cv);const g=cv.getContext('2d');
const W=[{bn:'ফজর',en:'Fajr',t:['#0C1220','#1F2F4F','#7a4f6a','#e8a86a'],star:.6,sun:.15,col:'#ffd9a0',moon:0},
{bn:'যোহর',en:'Zuhr',t:['#1F2F4F','#2f5a86','#5f8fbf','#a9c7e0'],star:0,sun:.85,col:'#fff3c4',moon:0},
{bn:'আসর',en:'Asr',t:['#1F2F4F','#3d5f86','#9a8f7a','#e2bf7a'],star:0,sun:.55,col:'#ffe0a0',moon:0},
{bn:'মাগরিব',en:'Maghrib',t:['#1F2F4F','#5a3a5e','#c0603e','#D9A441'],star:.15,sun:.08,col:'#ff9a50',moon:0},
{bn:'এশা',en:'Isha',t:['#05080f','#0C1220','#1F2F4F','#2a3b5e'],star:1,sun:-1,col:'#fff',moon:1}];
const pill=document.createElement('div');pill.className='waqt-pill';hero.appendChild(pill);
let cur=0,from=0,tp=1,auto=true,mx=0,my=0;
const lab=()=>{const en=document.documentElement.lang==='en';pill.innerHTML=W.map((w,i)=>`<button class="${i===cur?'on':''}" data-i="${i}">${en?w.en:w.bn}</button>`).join('')};
pill.onclick=e=>{const b=e.target.closest('button');if(b){go(+b.dataset.i);auto=false}};
new MutationObserver(lab).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
document.addEventListener('click',()=>setTimeout(lab,30));
function go(i){if(i===cur)return;from=cur;cur=i;tp=0;lab()}lab();
setInterval(()=>auto&&go((cur+1)%5),7000);
let w,h,dpr,stars=[],clouds=[];
function rs(){dpr=Math.min(devicePixelRatio||1,2);w=hero.clientWidth;h=hero.clientHeight;cv.width=w*dpr;cv.height=h*dpr;g.setTransform(dpr,0,0,dpr,0,0);
stars=Array.from({length:Math.min(160,w/8)},()=>({x:Math.random()*w,y:Math.random()*h*.7,r:Math.random()*1.4+.3,p:Math.random()*6}));
clouds=Array.from({length:5},(_,k)=>({x:Math.random()*w,y:40+Math.random()*h*.35,s:.6+Math.random(),v:.08+Math.random()*.15,d:k%3+1}))}
rs();addEventListener('resize',rs);
const hx=c=>[1,3,5].map(i=>parseInt(c.substr(i,2),16)),mix=(a,b,t)=>{a=hx(a);b=hx(b);return`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*t))})`},L=(a,b,t)=>a+(b-a)*t;
addEventListener('mousemove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener('deviceorientation',e=>{if(e.gamma!=null){mx=Math.max(-.5,Math.min(.5,e.gamma/60));my=Math.max(-.5,Math.min(.5,(e.beta-45)/90))}});
let sx=0,sy=0;
function mosque(ox){const b=h,y=b-70;g.fillStyle='#070b14';g.beginPath();g.moveTo(0,b);
const cx=w*.5+ox;g.save();const sc=Math.min(1,w/600);g.translate(cx,b);g.scale(sc,sc);g.translate(-cx,-b);g.lineTo(0,y+30);g.lineTo(cx-260,y+30);g.lineTo(cx-260,y-60);g.lineTo(cx-250,y-80);g.lineTo(cx-240,y-60);g.lineTo(cx-240,y);g.lineTo(cx-110,y);
g.arc(cx,y,110,Math.PI,0);g.lineTo(cx+240,y);g.lineTo(cx+240,y-60);g.lineTo(cx+250,y-80);g.lineTo(cx+260,y-60);g.lineTo(cx+260,y+30);g.lineTo(w,y+30);g.lineTo(w,b);g.fill();
g.fillRect(cx-2,y-130,4,22);g.fillStyle='rgba(217,164,65,.55)';for(let k=-2;k<=2;k++)g.fillRect(cx+k*36-6,y+5,12,18);g.restore()}
function frame(t){tp=Math.min(1,tp+(RM?1:.012));const A=W[from],B=W[cur],e=tp<.5?2*tp*tp:1-Math.pow(-2*tp+2,2)/2;
sx+=(mx-sx)*.06;sy+=(my-sy)*.06;
const gr=g.createLinearGradient(0,0,0,h);[0,.45,.8,1].forEach((s,i)=>gr.addColorStop(s,mix(A.t[i],B.t[i],e)));g.fillStyle=gr;g.fillRect(0,0,w,h);
const sa=L(A.star,B.star,e);if(sa>.01)for(const s of stars){g.globalAlpha=sa*(.5+.5*Math.sin(t/600+s.p));g.fillStyle='#fff';g.beginPath();g.arc(s.x-sx*10,s.y-sy*6,s.r,0,7);g.fill()}g.globalAlpha=1;
const sun=L(A.sun,B.sun,e);if(sun>-.2){const x=w*(.15+.7*(1-Math.min(1,Math.max(0,sun))))*.5+w*.25-sx*30,y=h*(.85-.65*sun)-sy*20,c=e<.5?A.col:B.col;
const rg=g.createRadialGradient(x,y,0,x,y,140);rg.addColorStop(0,c);rg.addColorStop(.2,c+'cc');rg.addColorStop(1,'rgba(255,200,120,0)');g.fillStyle=rg;g.beginPath();g.arc(x,y,140,0,7);g.fill()}
const mo=L(A.moon,B.moon,e);if(mo>.01){const x=w*.78-sx*40,y=h*.22-sy*25;g.globalAlpha=mo;g.fillStyle='#f3e6c0';g.shadowColor='#D9A441';g.shadowBlur=30;g.beginPath();g.arc(x,y,34,0,7);g.fill();g.shadowBlur=0;g.fillStyle=mix(A.t[1],B.t[1],e);g.beginPath();g.arc(x+14,y-8,30,0,7);g.fill();g.globalAlpha=1}
for(const c of clouds){if(!RM)c.x+=c.v*c.d;if(c.x>w+200)c.x=-200;const x=c.x-sx*15*c.d,y=c.y-sy*8*c.d;g.fillStyle=`rgba(255,255,255,${(.04+.025*c.d)*(1-sa*.5)})`;
for(let k=0;k<4;k++){g.beginPath();g.ellipse(x+k*30*c.s,y+(k%2)*8,40*c.s,16*c.s,0,0,7);g.fill()}}
mosque(-sx*50);if(!RM)requestAnimationFrame(frame)}
if(RM){frame(0);setInterval(()=>frame(0),800)}else requestAnimationFrame(frame);
// parallax on hero children
const kids=[...hero.querySelectorAll('.wrap>div')];kids.forEach(k=>k.classList.add('px'));
if(!RM)(function p(){kids.forEach((k,i)=>k.style.transform=`translate(${sx*(i?-18:10)}px,${sy*(i?-12:6)}px)`);requestAnimationFrame(p)})();
// reveal observer (complements existing)
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in');else io.observe(el)});
// button effects
document.addEventListener('click',e=>{const b=e.target.closest('.ov-btns button,.btn');if(!b||RM)return;
const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='mRipple';const d=Math.max(r.width,r.height);
Object.assign(s.style,{width:d+'px',height:d+'px',left:e.clientX-r.left-d/2+'px',top:e.clientY-r.top-d/2+'px'});b.appendChild(s);setTimeout(()=>s.remove(),700);
if(b.closest('.ov-btns')){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop');
for(let i=0;i<14;i++){const p=document.createElement('i');p.className='mSpark';const a=Math.PI*2*i/14,v=50+Math.random()*50;
p.style.left=e.clientX+'px';p.style.top=e.clientY+'px';p.style.setProperty('--dx',Math.cos(a)*v+'px');p.style.setProperty('--dy',Math.sin(a)*v+'px');document.body.appendChild(p);setTimeout(()=>p.remove(),900)}}},true);
// counters
const cio=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;cio.unobserve(x.target);
x.target.querySelectorAll('#donutPct,#l1,#l2,#l3').forEach(n=>{const m=n.textContent.match(/\d+/);if(!m||RM)return;const end=+m[0],pre=n.textContent;let st=null;
(function f(ts){st??=ts;const k=Math.min(1,(ts-st)/1400),v=Math.round(end*(1-Math.pow(1-k,3)));n.textContent=pre.replace(/\d+/,v);if(k<1)requestAnimationFrame(f)})(performance.now())});
x.target.querySelectorAll('#bars>*').forEach((b,i)=>b.style.setProperty('--i',i))}),{threshold:.3});
const rep=document.getElementById('report');rep&&cio.observe(rep);
})();
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;let x=0,y=0,tx=0,ty=0;const ph=[...document.querySelectorAll('.phone')];
addEventListener('mousemove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
addEventListener('deviceorientation',e=>{if(e.gamma!=null){tx=Math.max(-.5,Math.min(.5,e.gamma/60));ty=Math.max(-.5,Math.min(.5,(e.beta-45)/90))}});
(function f(){x+=(tx-x)*.05;y+=(ty-y)*.05;ph.forEach(p=>{p.style.setProperty('--ppx',(x*-14).toFixed(2)+'px');p.style.setProperty('--ppy',(y*-10).toFixed(2)+'px')});requestAnimationFrame(f)})()})();
