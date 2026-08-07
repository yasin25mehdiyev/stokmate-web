import { Outlet } from "@tanstack/react-router";

import { AuthHero } from "./ui/auth-hero";

const AuthLayout = () => {
  return (
    <div className="relative h-svh w-full overflow-y-auto bg-white xl:bg-hero-bg">
      <AuthHero />
      <div className="relative z-10 flex min-h-full items-center justify-center px-5 py-[clamp(16px,4vh,32px)] md:items-stretch md:px-6 xl:justify-end xl:px-[21px]">
        <div className="flex w-full max-w-[720px] flex-col md:justify-center md:rounded-[32px] md:bg-white md:px-21 md:py-[clamp(24px,6vh,64px)] md:shadow-[0_8px_40px_0_rgba(34,93,240,0.1)] xl:shadow-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { AuthLayout };
