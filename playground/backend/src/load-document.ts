import type { onLoadDocumentPayload } from '@patrick-baber-test/server'
import { Server } from '@patrick-baber-test/server'
import { Logger } from '@patrick-baber-test/extension-logger'
import { TiptapTransformer } from '@patrick-baber-test/transformer'
import { SQLite } from '@patrick-baber-test/extension-sqlite'

const getProseMirrorJSON = (text: string) => {
  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text,
          },
        ],
      },
    ],
  }
}

const server = new Server({
  port: 1234,
  extensions: [
    new Logger(),
    new SQLite({
      database: 'db.sqlite',
    }),
  ],

  async onConnect(data) {
    await new Promise(resolve => setTimeout(() => {
      // @ts-ignore
      resolve()
    }, 1337))
  },

  async onLoadDocument(data: onLoadDocumentPayload) {
    if (data.document.isEmpty('default')) {
      const defaultField = TiptapTransformer.toYdoc(
        getProseMirrorJSON('What is love?'),
        'default',
      )

      data.document.merge(defaultField)
    }

    if (data.document.isEmpty('secondary')) {
      const secondaryField = TiptapTransformer.toYdoc(
        getProseMirrorJSON('Baby don\'t hurt me…'),
        'secondary',
      )

      data.document.merge(secondaryField)
    }

    return data.document
  },
})

server.listen()
