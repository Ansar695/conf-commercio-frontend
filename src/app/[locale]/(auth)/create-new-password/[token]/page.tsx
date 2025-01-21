'use client';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  CreateNewPasswordSchema,
  createNewPasswordSchema,
} from "@/validations/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useLocale, useTranslations } from "next-intl";
import { ApiResCode } from "@/typing/api";
import Image from "next/image";
import { useRouter } from "@/navigation";

export default function CreateNewPasswordPage({ params }: { params: { token?: string } }) {
  const form = useForm<CreateNewPasswordSchema>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: "all",
  });
  const { formState } = form;
  const router = useRouter()
  const trans = useTranslations();
  const locale = useLocale();


  const sessionId = params.token

  const handleFormSubmit = async (data: CreateNewPasswordSchema) => {
    if (!sessionId) {
      return form.setError("other", {
        message: "session_expired",
        type: "validate",
      });
    }
    const res = await api.createNewPassword(sessionId, data);
    if (res.succeed) {
      return router.replace("/login?password-reset=true", {locale});
    }
    if (res.code === ApiResCode.SESSION_EXPIRED) {
      form.setError("other", {
        message: "session_expired",
        type: "validate",
      });
    }
    if (res.code === ApiResCode.UNKNOWN_ERROR) {
      form.setError("other", {
        message: "issue_processing_request",
        type: "validate",
      });
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen py-10 px-5">
        {/* content */}
        <div className="max-w-xl w-full px-4 md:px-10 bg-secondary lg:bg-white rounded-xl mt-[100px] py-10">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/logo.png"
              width={200}
              height={100}
              unoptimized
              alt=""
              className="w-[200px] h-auto"
            />
            <h3 className="mt-8 text-primary font-bold text-2xl text-center">
              {trans("update_password")}
            </h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <div
                className={cn(
                  "w-full space-y-3 mt-8",
                  formState.isSubmitting && "opacity-70 pointer-events-none"
                )}
              >
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{trans("password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="password"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error?.message && <FormMessage />}
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>{trans("confirm_password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="password"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error?.message && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-7">
                <FormField
                  name="other"
                  control={form.control}
                  render={({ fieldState }) => (
                    <FormItem>
                      {fieldState.error?.message && (
                        <FormMessage>
                          {trans(fieldState.error.message as any)}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between mt-6">
                <div className=""></div>
                <div>
                  <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    variant="default"
                  >
                    {formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <span>{trans("continue")}</span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
