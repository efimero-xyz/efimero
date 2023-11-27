import { io } from 'socket.io-client'
import { createContext, useContext, useEffect, useState } from 'react'

interface WssProviderProps {
  children: React.ReactNode
}
type SocketInstance = ReturnType<typeof io>

interface WssProviderState {
  isConnected: boolean
  socket?: SocketInstance | undefined
  initialize: (server: string) => void
  connect: () => void
  disconnect: () => void
}

const initialState: WssProviderState = {
  isConnected: false,
  initialize: () => {},
  connect: () => {},
  disconnect: () => {}
}

const WssProviderContext = createContext<WssProviderState>(initialState)

export function WssProvider ({
  children,
  ...props
}: WssProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<SocketInstance | undefined>(undefined)

  const initialize = (server: string) => {
    const instance = io(server, {
      transports: ['websocket'],
      auth: {
        serverOffset: 0
      }
    })

    setSocket(instance)
  }

  function connect () {
    if (socket !== undefined) {
      socket.connect()
    }
  }

  function disconnect () {
    if (socket !== undefined) {
      socket.disconnect()
    }
  }

  useEffect(() => {
    if (socket === undefined) return

    function onConnect () {
      setIsConnected(true)
    }

    function onDisconnect () {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [socket])

  const value = {
    isConnected,
    initialize,
    connect,
    disconnect,
    socket
  }

  return (
    <WssProviderContext.Provider {...props} value={value}>
      {children}
    </WssProviderContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(WssProviderContext)

  if (context === undefined) {
    throw new Error('useSocket must be used within a WssProvider')
  }

  return context
}
