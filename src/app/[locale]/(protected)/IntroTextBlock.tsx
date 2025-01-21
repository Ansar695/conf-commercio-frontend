'use client';

import { useTranslations } from "next-intl";

export default function IntroTextBlock() {
    const trans = useTranslations();
    return (
        <h4 className="text-[18px] md:text-[38px] leading-[128%]">
            {trans.rich("intro")}
        </h4>
    )
}