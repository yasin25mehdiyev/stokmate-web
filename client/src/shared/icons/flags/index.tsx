import { cn } from "@/shared/lib";

interface FlagProps {
  className?: string;
}

const FlagTr = ({ className }: FlagProps) => {
  return (
    <svg
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#E30A17" />
      <circle cx="9.3" cy="8" r="4.1" fill="#fff" />
      <circle cx="10.5" cy="8" r="3.35" fill="#E30A17" />
      <path
        fill="#fff"
        d="M14.3 6.05 14.76 7.37 16.15 7.4 15.04 8.24 15.45 9.58 14.3 8.78 13.15 9.58 13.56 8.24 12.44 7.4 13.84 7.37Z"
      />
    </svg>
  );
};

const FlagGb = ({ className }: FlagProps) => {
  return (
    <svg
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#012169" />
      <path stroke="#fff" strokeWidth="3.6" d="M0 0 24 16M24 0 0 16" />
      <path stroke="#C8102E" strokeWidth="1.3" d="M0 0 24 16M24 0 0 16" />
      <path stroke="#fff" strokeWidth="5.2" d="M12 0v16M0 8h24" />
      <path stroke="#C8102E" strokeWidth="3" d="M12 0v16M0 8h24" />
    </svg>
  );
};

const FlagRu = ({ className }: FlagProps) => {
  return (
    <svg
      viewBox="0 0 24 16"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#fff" />
      <rect width="24" height="10.67" y="5.33" fill="#0039A6" />
      <rect width="24" height="5.33" y="10.67" fill="#D52B1E" />
    </svg>
  );
};

export { FlagTr, FlagGb, FlagRu };
