import { Server } from '@patrick-baber-test/server'
import { Logger } from '@patrick-baber-test/extension-logger'
import { Redis } from '@patrick-baber-test/extension-redis'
import { SQLite } from '@patrick-baber-test/extension-sqlite'

const server = new Server({
  port: 1234,
  name: 'redis-1',
  extensions: [
    new Logger(),
    new Redis({
      host: '127.0.0.1',
      port: 6379,
    }),
    new SQLite(),
  ],
})

server.listen()

const anotherServer = new Server({
  port: 1235,
  name: 'redis-2',
  extensions: [
    new Logger(),
    new Redis({
      host: '127.0.0.1',
      port: 6379,
    }),
    new SQLite(),
  ],

  // onAwarenessUpdate: async ({ documentName, states }) => {
  //   console.log('onAwarenessUpdate', documentName, states)
  // },
})

anotherServer.listen()
