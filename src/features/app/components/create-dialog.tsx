import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/config/const'
import { useSession } from '@/ee2e/session'
import { createHashKey } from '@/ee2e/utils'
import { cn } from '@/lib/utils'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ROOM_ID_BYTES = 10


export const bytesToHexString = (bytes: Uint8Array) => {
  return Array.from(bytes)
    .map((byte) => `0${byte.toString(16)}`.slice(-2))
    .join('')
}

const generateRoomId = async () => {
  const buffer = new Uint8Array(ROOM_ID_BYTES)
  window.crypto.getRandomValues(buffer)
  return bytesToHexString(buffer)
}

export const CreateDialog = () => {
  const { username, setUsername } = useSession()
  const [path, setPath] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const onCopyClipboard = () => {
    navigator.clipboard.writeText(`${baseUrl}#${path}`).then().catch(_e => {})
  }

  useEffect(() => {
    Promise.all([createHashKey(), generateRoomId()]).then(values => {
      const hashKey = values[0]
      const roomId = values[1]
      setPath(`/room/${roomId}/${hashKey}`)
      setLoading(false)
    }).catch(e => { console.error(e) })
  }, [])

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ size: 'lg' }))}>
        <ChatBubbleIcon className='h-4 w-4 mr-2'/> Create a room
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new room</DialogTitle>
          <DialogDescription>
            Settings
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" placeholder="First Last" defaultValue={username} onBlur={(e => { setUsername(e.target.value) })}/>
        </div>
        <div className="flex space-x-2">
          <Input value={`${baseUrl}#${path}`} readOnly />
          <Button variant="secondary" className="shrink-0" onClick={onCopyClipboard}>
            Copy Link
          </Button>
        </div>

        <Button onClick={() => { navigate(path) }} disabled={loading}>Create</Button>
      </DialogContent>
    </Dialog>
  )
}
