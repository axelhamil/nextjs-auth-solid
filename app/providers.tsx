"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { AuthProvider } from "./_contexts/AuthContext"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </SessionProvider>
    )
}
