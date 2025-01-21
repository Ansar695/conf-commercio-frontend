'use client';
import { ReactNode, useEffect } from "react";
import api from "@/lib/api";
import useAuthUser from "@/zustand/auth-store";


export default function AuthProvider({ children }: { children?: ReactNode }) {
    const { authUser, setAuthUser } = useAuthUser()


    useEffect(() => {
        api.getProfile().then((profile) => {
            if (profile) setAuthUser(profile)
        })
    }, [setAuthUser])

    return (
        <>
            {authUser && children}
        </>
    )
}
