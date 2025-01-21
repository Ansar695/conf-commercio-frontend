'use client';
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react";


export default function I18nProvider({ locale, children, messages }: { locale: string; children?: ReactNode; messages: AbstractIntlMessages }) {
    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            now={new Date()}
            timeZone="UTC"
            defaultTranslationValues={{
                strong: (text) => <strong>{text}</strong>,
                br: () => <br />
            }}
        >
            {children}
        </NextIntlClientProvider>

    )
}