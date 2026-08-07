import { ArrowRight, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/core/button";
import { Form, FormInput } from "@/shared/ui/custom/form";
import { AuthFooter } from "../ui/auth-footer";
import { AuthHeader } from "../ui/auth-header";
import { createSigninSchema, type SigninFormValues } from "./lib/schema";
import { useSignin } from "./lib/use-signin";

const SigninForm = () => {
  const { t } = useTranslation("auth");

  const { handleSignin, isPending: isLoading } = useSignin();
  const signinSchema = createSigninSchema(t);

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: SigninFormValues) => handleSignin({ data: values });

  return (
    <div className="flex w-full max-w-[553px] flex-col">
      <AuthHeader title={t("signin.title")} subtitle={t("signin.subtitle")} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-[clamp(16px,4vh,42px)] flex flex-col"
        >
          <div className="flex flex-col gap-5">
            <FormInput
              name="email"
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              startIcon={<Mail />}
            />
            <FormInput
              name="password"
              label={t("password")}
              type="password"
              placeholder="••••••••"
              startIcon={<Lock />}
            />
          </div>

          <Button
            type="submit"
            endIcon={<ArrowRight />}
            className="mt-[clamp(16px,4vh,42px)]"
            loading={isLoading}
            disabled={isLoading}
          >
            {t("signin.submit")}
          </Button>
        </form>
      </Form>

      <AuthFooter />
    </div>
  );
};

export { SigninForm };
