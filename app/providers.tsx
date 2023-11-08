'use client';
import React, { ReactNode } from "react";
import { LoadingProvider } from "./context/LoaderContext";


type Props = {
    children: ReactNode;
};

export function Providers({ children }: Props) {
    return (
        <LoadingProvider>
            {children}
        </LoadingProvider>
    )
}