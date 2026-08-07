import { Toaster as SonnerToaster } from "sonner";

const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      expand={false}
      duration={4000}
    />
  );
};

export { Toaster };
