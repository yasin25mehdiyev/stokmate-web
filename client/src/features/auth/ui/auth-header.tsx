import { Logo } from "@/shared/icons/logo";
import { Typography } from "@/shared/ui/core/typography";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <div className="flex flex-col">
      <Logo className="mb-[clamp(16px,3vh,40px)]" />
      <div className="flex flex-col gap-4">
        <Typography as="h1" variant="h3" color="secondary-brand">
          {title}
        </Typography>
        <Typography as="p" variant="p" color="secondary">
          {subtitle}
        </Typography>
      </div>
    </div>
  );
};

export { AuthHeader };
