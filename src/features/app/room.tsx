import { useParams } from 'react-router-dom'
import * as React from 'react'
import { DotFilledIcon, PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { useEe2e } from '@/ee2e/provider'
import { type MessageSchemaType, createMessage, serializeMessage } from './message.schema'
import { ModeToggle } from '@/components/mode-toggle'
import { type FormEvent, useRef } from 'react'
import { useSocket } from '@/ee2e/socket'

function MessageElement ({ message }: { message: MessageSchemaType }): React.ReactNode { 
  const getTime = (timestamp: number) => {
    const datetime = new Date(timestamp)
    const hours = datetime.getHours()
    const minutes = '0' + datetime.getMinutes()

    return hours + ':' + minutes.substr(-2)
  }

  return (
    <div className='flex flex-row border-b'>
      <div className="flex items-center space-x-4 pb-4">
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="Image" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{message.username} #{getTime(message.timestamp)}</p>
          {message.message}
        </div>
      </div>
    </div>
  )
}

const roomData = {
  title: 'Room',
  description: 'Security & Privacy'
}

interface AppRoomProps {
  username: string
  messages: MessageSchemaType[]
  isConnected: boolean
  users: string[]
}
export function AppRoom ({ messages, users, username }: AppRoomProps) {
  const { socket, isConnected } = useSocket()
  const { number } = useParams()
  const refMessages = useRef<HTMLDivElement>(null)
  const { encryptData } = useEe2e()

  const [input, setInput] = React.useState('')
  const inputLength = input.trim().length

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputLength === 0) return

    const message = createMessage(username, input)
    const message2string = serializeMessage(message)
    const encrypted = await encryptData(message2string)

    if (socket !== undefined && isConnected) {
      socket.timeout(1000).emit('server-broadcast', number, encrypted.data, encrypted.iv, () => {
        //setIsLoading(false)
      })
      setInput('')
    }
  }

  React.useEffect(() => {
    if (refMessages.current != null) {
      refMessages.current.scrollTop = refMessages.current?.scrollHeight
    }
  }, [messages])

  return (
      <>
        <div className='h-screen w-full overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_300px]'>
          <div className='h-screen overflow-none flex flex-col w-full border-r'>
            <div className='flex flex-col h-screen'>
              <div className='flex flex-row  p-4 border-b'>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{roomData.title} #{number}</p>
                    {isConnected
                      ? (<div className="flex items-center text-sm text-muted-foreground">
                          <DotFilledIcon className='text-green-600'/> Connected
                        </div>)
                      : (<div className="flex items-center text-sm text-muted-foreground">
                          <DotFilledIcon className='text-red-600'/> Disconnected
                        </div>)
                    }
                  </div>
                </div>
              </div>
              <div ref={refMessages} className="space-y-4 flex-grow w-full overflow-y-scroll px-4 pt-2 bg-card">
                {messages.map((message, index) => (
                  <MessageElement message={message} key={index} />
                ))}
              </div>
            <form
                onSubmit={onSubmit}
                className="flex w-full items-center space-x-2  p-3 pb-4 border-t"
                >
                <Input
                  id="message"
                  placeholder="Type your message..."
                  className="flex-1"
                  autoComplete="off"
                  value={input}
                  onChange={(event) => { setInput(event.target.value) }}
                  />
                <Button type="submit" size="icon" disabled={inputLength === 0 || !isConnected}>
                  <PaperPlaneIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>

          </div>
          <div className='hidden lg:flex flex-col'>
            <div className='flex flex-rows border-b w-full p-4'>
              <PersonIcon className='h-4 w-4 mr-2'/><p className="text-md font-medium leading-none "> Users</p>
            </div>
            {users.map((user, index) => (
              <div className='flex flex-col w-full p-4 gap-4' key={index}>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{user}</p>
                    <p className="text-sm text-muted-foreground"></p>
                  </div>
                </div>
              </div>
            ))}

              <div className='flex flex-rows border-b w-full p-4'>
                <PersonIcon className='h-4 w-4 mr-2'/><p className="text-md font-medium leading-none "> Disconected</p>
              </div>
              <div className='flex w-full p-4'></div>

              <div className='flex flex-grow'>
              </div>
              <div className='grid content-end p-4 justify-items-end'>
                <ModeToggle />
              </div>
          </div>
        </div>
      </>
  )
}
