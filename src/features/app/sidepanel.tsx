import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { ArrowLeftIcon, CheckIcon, Link2Icon, LinkBreak2Icon, PlusIcon } from '@radix-ui/react-icons'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useSocket } from '@/ee2e/socket'
import { useSession } from '@/ee2e/session'

const users = [
  {
    name: 'Olivia Martin',
    email: 'm@example.com',
    avatar: '/avatars/01.png'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    avatar: '/avatars/03.png'
  },
  {
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: '/avatars/05.png'
  },
  {
    name: 'Jackson Lee',
    email: 'lee@example.com',
    avatar: '/avatars/02.png'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    avatar: '/avatars/04.png'
  }
] as const

  type User = (typeof users)[number]

const roomData = {
  title: 'Room',
  description: 'Security & Privacy'
}

interface SidePanelProps {
  isConnected: boolean
}

export function SidePanel (props: SidePanelProps) {
  const { username } = useSession()
  const { connect, disconnect } = useSocket()
  const { isConnected } = props
  const [open, setOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  return (
    <div className='hidden lg:flex flex-col border-r '>
      <div className='flex flex-row p-4 border-b'>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-sm text-muted-foreground">{roomData.description}</p>
          </div>
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="ml-auto rounded-full"
                onClick={() => { setOpen(true) }}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">New message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>New message</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex flex-grow'>

      </div>
      <div className='flex space-x-2 justify-between border-t p-4'>
        <Link to='/' className={buttonVariants({variant: 'outline', size: 'sm' })}>
          <ArrowLeftIcon className='mr-1'/>
          Go home
        </Link>
        {!isConnected && (<Button variant='default' size='sm' onClick={connect}><Link2Icon className='mr-1'/> Connect</Button>)}
        {isConnected && (<Button variant='destructive' size='sm' onClick={disconnect}><LinkBreak2Icon className='mr-1'/> Disconnect</Button>)}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        ); return
                      }

                      setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      )
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user)
                      ? (
                      <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                        )
                      : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0
              ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
                )
              : (
              <p className="text-sm text-muted-foreground">
                Select users to add to this thread.
              </p>
                )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
