import { useState, useEffect } from 'react'
// import { ConnectionState } from './components/ConnectionState'
// import { ConnectionManager } from './components/ConnectionManager'
import { AppRoom } from './room'
import { useNavigate, useParams } from 'react-router-dom'
import { Ee2eProvider, useEe2e } from '@/ee2e/provider'
import { type MessageSchemaType, deserializeMessage } from './message.schema'
import { SidePanel } from './sidepanel'
import { WssProvider, useSocket } from '@/ee2e/socket'
import { wssUrl } from '@/config/const'
import { useSession } from '@/ee2e/session'

export default function App () {
  const { username } = useSession()
  const { number } = useParams()
  const { socket, initialize, isConnected } = useSocket()
  const [chatMessages, setChatMessages] = useState<MessageSchemaType[]>([])
  const [users, setUsers] = useState<string[]>([])
  const { decryptData } = useEe2e()

  useEffect(() => {
    initialize(wssUrl)
  }, [])

  useEffect(() => {
    if (socket === undefined) return

    async function onChatMessage (value: ArrayBuffer, ivB: ArrayBuffer) {
      const iv = new Uint8Array(ivB)
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

    socket.on('client-broadcast', onChatMessage)
    socket.on('init-room', onInitRoom)
    socket.on('room-user-change', onUpdateUsers)

    return () => {
      socket.off('init-room', onInitRoom)
      socket.off('room-user-change', onUpdateUsers)
      socket.off('client-broadcast', onChatMessage)
    }
  }, [socket, isConnected])

  return (
    <div className='h-screen w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[300px_1fr]'>
      <SidePanel isConnected={ isConnected } username={username} />
      <AppRoom isConnected={ isConnected } messages={ chatMessages } users={users} username={username}/>
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
    <WssProvider>
      <Ee2eProvider hashKey={hashKey}>
        <App />
      </Ee2eProvider>
    </WssProvider>
  )
}
