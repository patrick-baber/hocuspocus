"use client";

import type { HocuspocusProviderWebsocket } from "@patrick-baber-test/provider";
import { createContext } from "react";

export const SocketContext1 = createContext<HocuspocusProviderWebsocket | null>(
	null,
);
