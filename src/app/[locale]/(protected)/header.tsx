"use client";
// import { cn } from "@/lib/utils";
// import useAuthUserStore from "@/components/hooks/zustand/auth-store";
// import { useLocale } from "next-intl";
// import { UserNavMenu } from "@/components/UserNavMenu";
// import Image from "next/image";
// import { usePathname, useRouter } from "@/navigation";

// export default function Header() {
//   const { authUser, logout } = useAuthUserStore();
//   const router = useRouter();
//   const pathname = usePathname();
//   const locale = useLocale();

//   const setLanguage = (lang: "en" | "it") => {
//     router.replace(pathname, { locale: lang });
//   };

//   return (
//     <div
//       className={cn(
//         "w-full min-w-full flex justify-between items-center fixed h-20 shadow-sm top-0 py-5 md:py-[22px] z-50 max-w-screen-2xl mx-auto px-4 md:px-10",
//         "bg-secondary"
//       )}
//     >
//       <a href="/">
//         <Image
//           src="/logo.png"
//           height={48}
//           width={260}
//           unoptimized
//           className="object-contain object-center h-7 md:h-12 w-auto"
//           alt="Site Logo"
//         />
//       </a>
//       <div className="flex items-center">
//         <div
//           className={cn(
//             authUser ? "hidden items-center md:flex" : "flex items-center"
//           )}
//         >
//           <button
//             type="button"
//             className={
//               "py-1.5 md:py-2 px-4 text-sm sm:text-base md:text-base font-medium rounded " +
//               (locale === "en"
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black")
//             }
//             onClick={() => setLanguage("en")}
//           >
//             English
//           </button>
//           <button
//             type="button"
//             className={
//               "py-1.5 md:py-2 px-4 text-sm sm:text-base md:text-base font-medium rounded " +
//               (locale === "it"
//                 ? "bg-primary text-white"
//                 : "bg-transparent text-black")
//             }
//             onClick={() => setLanguage("it")}
//           >
//             Italiano
//           </button>
//         </div>
//         {authUser && (
//           <div className="ml-4">
//             <UserNavMenu user={authUser} logout={logout} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { UserNavMenu } from "@/components/UserNavMenu";
import useAuthUser from "@/zustand/auth-store";



const NavBar = () => {
  const { authUser, logout } = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="w-full h-[80px] border-b border-[var(--heading)] border-opacity-5">
      <div className="w-full mx-auto max-w-[1216px] px-[36px] h-[100%] flex items-center justify-between">
        <Link href='/login'>
          <Image
            alt="logo"
            src="/images/firenze-logo.png"
            width={372}
            height={47}
            className="aspect-[7.91] w-[234px] md:w-[372px] h-[30px] md:h-[47px] cursor-pointer"
          />
        </Link>
        <div className="flex gap-[49px] items-center">
          <Image
            alt="logo"
            src="/images/mirroor-logo.svg"
            width={193}
            height={33}
            className="aspect-[5.84] hidden md:block"
          />
          {/* <Image
            alt="logo"
            src="/icons/profile-icon.png"
            width={37}
            height={37}
            className="w-[27px] md:w-[37px] h-[27px] md:h-[37px]"
          /> */}
          {authUser && (
            <div className="ml-4">
              <UserNavMenu user={authUser} logout={logout} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

