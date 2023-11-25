import { useState, useEffect } from 'react'
import { socket } from './socket'
// import { ConnectionState } from './components/ConnectionState'
// import { ConnectionManager } from './components/ConnectionManager'
import { AppRoom } from './room'
import { useNavigate, useParams } from 'react-router-dom'
import { Ee2eProvider, useEe2e } from '@/ee2e/provider'
import { type MessageSchemaType, deserializeMessage } from './message.schema'
import { SidePanel } from './sidepanel'

export default function App () {
  const { number } = useParams()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [chatMessages, setChatMessages] = useState<MessageSchemaType[]>([])
  const [users, setUsers] = useState<string[]>([])
  const { decryptData } = useEe2e()

  useEffect(() => {
    function onConnect () {
      setIsConnected(true)
    }

    function onDisconnect () {
      setIsConnected(false)
    }

    async function onChatMessage (value: ArrayBuffer, iv: Uint8Array) {
      if (value instanceof ArrayBuffer && iv instanceof Uint8Array) {
        try {
          const decoded = await decryptData(value, iv)
          const parseData = deserializeMessage(decoded)

          setChatMessages(previous => [...previous, parseData])
        } catch (e) {
          console.error(e)
        }
      }
    }
    const onInitRoom = () => {
      socket.off('init-room', onInitRoom)
      socket.emit('join-room', number)
    }
    const onUpdateUsers = (users: string[]) => {
      setUsers(users)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('client-broadcast', onChatMessage)
    socket.on('init-room', onInitRoom)
    socket.on('room-user-change', onUpdateUsers)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('client-broadcast', onChatMessage)
    }
  }, [])

  return (
    <div className='h-screen w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[300px_1fr]'>
      <SidePanel isConnected={ isConnected } />
      <AppRoom isConnected={ isConnected } messages={ chatMessages } users={users} />
    </div>
  )
}

export function SecureMainContainer () {
  const navigate = useNavigate()
  const { key: hashKey } = useParams()

  if (hashKey == null) {
    navigate('/')
    return null
  }

  return (
    <Ee2eProvider hashKey={hashKey}>
      <App />
    </Ee2eProvider>
  )
}
