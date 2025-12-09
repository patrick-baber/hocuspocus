"use client";

import type { HocuspocusProviderWebsocket } from "@patrick-baber-test/provider";
import { createContext } from "react";

export const SocketContext2 = createContext<HocuspocusProviderWebsocket | null>(
	null,
);
