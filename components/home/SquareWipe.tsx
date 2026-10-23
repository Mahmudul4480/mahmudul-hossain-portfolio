interface SquareWipeProps {
  kicker: string;
}

export default function SquareWipe({ kicker }: SquareWipeProps) {
  return (
    <section className="h-wipe" data-wipe aria-hidden="true">
      <p className="h-wipe-label" data-wipe-label>
        <span className="h-script">{kicker}</span>
        <svg
          viewBox="0 0 64 48"
          className="h-wipe-arrow"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M32 4c2 10 1 18-2 28" />
          <path d="M22 24c4 4 8 8 10 12 2-6 6-10 12-14" />
        </svg>
      </p>
      <div className="h-wipe-square" data-wipe-square />
    </section>
  );
}
