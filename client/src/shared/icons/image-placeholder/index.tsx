import { cn } from "@/shared/lib";

const ImagePlaceholder = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="image-placeholder-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#EAF0FE" />
          <stop offset="100%" stopColor="#225DF0" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#image-placeholder-gradient)" />
      <g transform="translate(400, 200)">
        <rect
          x="-60"
          y="-50"
          width="120"
          height="96"
          rx="12"
          fill="rgba(255,255,255,0.25)"
        />
        <circle cx="0" cy="-16" r="20" fill="rgba(255,255,255,0.45)" />
        <polyline
          points="-56,40 -24,4 0,28 28,-4 56,40"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="28" cy="-20" r="8" fill="rgba(255,255,255,0.45)" />
      </g>
    </svg>
  );
};

export { ImagePlaceholder };
