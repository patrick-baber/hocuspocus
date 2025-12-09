import type { HocuspocusProviderWebsocketConfiguration} from '@patrick-baber-test/provider'
import {
  HocuspocusProviderWebsocket,
} from '@patrick-baber-test/provider'
import type { Hocuspocus } from '@patrick-baber-test/server'
import WebSocket from 'ws'

export const newHocuspocusProviderWebsocket = (
  hocuspocus: Hocuspocus,
  options: Partial<Omit<HocuspocusProviderWebsocketConfiguration, 'url'>> = {},
) => {
  return new HocuspocusProviderWebsocket({
    // We don’t need which port the server is running on, but
    // we can get the URL from the passed server instance.
    url: hocuspocus.server!.webSocketURL,
    // Pass a polyfill to use WebSockets in a Node.js environment.
    WebSocketPolyfill: WebSocket,
    ...options,
  })
}
