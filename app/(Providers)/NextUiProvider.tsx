"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";

interface ProviderPros {
    children: React.ReactNode;
}

export default function NextUiProvider({ children }: ProviderPros) {
    return <NextUIProvider>{children}</NextUIProvider>;
}
