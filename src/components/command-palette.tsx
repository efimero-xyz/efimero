import * as React from 'react'
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon
} from '@radix-ui/react-icons'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { useNavigate } from 'react-router-dom'

export function CommandPalette () {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const onSelect = (elem: string) => {
    setOpen((open) => !open)
    navigate(elem)
  }
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => { document.removeEventListener('keydown', down) }
  }, [])

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a comCommandPalettemand or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => { onSelect('/') }}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Landing</span>
            </CommandItem>
            <CommandItem onSelect={() => { onSelect('/docs') }}>
              <FaceIcon className="mr-2 h-4 w-4" />
              <span>Docs</span>
            </CommandItem>
            <CommandItem onSelect={() => { onSelect('/app') }}>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>App</span>
            </CommandItem>
            <CommandItem onSelect={() => { onSelect('/music') }}>
              <RocketIcon className="mr-2 h-4 w-4" />
              <span>Music</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => { onSelect('/auth/login') }}>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Login</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              <span>Mail</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <GearIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
