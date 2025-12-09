import {
  HocuspocusProvider,
  type HocuspocusProviderConfiguration,
  type HocuspocusProviderWebsocket,
  type HocuspocusProviderWebsocketConfiguration,
} from '@patrick-baber-test/provider'
import type { Hocuspocus } from '@patrick-baber-test/server'
import { newHocuspocusProviderWebsocket } from './newHocuspocusProviderWebsocket.ts'

export const newHocuspocusProvider = (
  server: Hocuspocus,
  options: Partial<HocuspocusProviderConfiguration> = {},
  websocketOptions: Partial<HocuspocusProviderWebsocketConfiguration> = {},
  websocketProvider?: HocuspocusProviderWebsocket,
): HocuspocusProvider => {
  const provider = new HocuspocusProvider({
    websocketProvider: websocketProvider ?? newHocuspocusProviderWebsocket(server, websocketOptions),
    // Just use a generic document name for all tests.
    name: 'hocuspocus-test',
    // Add or overwrite settings, depending on the test case.
    ...options,
  })
  provider.attach()

  return provider
}
