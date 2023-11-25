import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { gitHubUrl } from '@/config/const'

export function MarketingLayout () {
  return (
    <div className="h-full w-full bg-slate-50 dark:bg-background">
      <div className="flex min-h-screen flex-col ">

        <header className="border-b bg-background dark:bg-background flex items-center justify-between py-2 px-2 md:px-16">
            <div className='flex-grow' />
            <nav className="flex items-center gap-2">
              <a
                href={gitHubUrl}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'px-4'
                )}
                target='_blank'
                rel="noreferrer"
                  >
                <GitHubLogoIcon className='h-4 w-4 mr-2' /> GitHub
              </a>
            </nav>
        </header>

        <main className="flex-1 border-b">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
