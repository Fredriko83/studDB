import * as debug from 'debug'
import * as http from 'http'

import App from './App'

debug('ts-express:server')

const PORT = normalizePort(process.env.PORT || 3000)
App.set('port', PORT)

const server = http.createServer(App)
server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: number|string): number|string|boolean {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val

  if (isNaN(port)) {
    return val
  } else if (port >= 0) {
    return port
  } else {
    return false
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = (typeof PORT === 'string') ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`)
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`)
      process.exit(1)
      break;
    default:
      throw error
  }
}

function onListening(): void {
  const addr = server.address()
  const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`)
  debug(`Listening on ${bind}.`)
}
