'use client';
import { Link } from "@/navigation";
import { CheckCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmailVerifiedPage() {
  const trans = useTranslations();
  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-5">
      <div className="max-w-xl p-4 md:p-10 bg-white rounded-xl mt-[100px]">
        <div className="flex flex-col items-center gap-10 justify-center">
          <CheckCircleIcon
            strokeWidth={3}
            className="w-14 h-14 text-green-500"
          />
          {/* </span> */}
          <p className="text-primary text-xl text-center">
            {trans("email_verified")}
            <br /> <br />
            <Link
              href="/login"
              className="text-blue-500 cursor-pointer underline mx-2"
              role="button"
            >
              {trans("login_here")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
