import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GitHubLogoIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { CreateDialog } from '../app/components/create-dialog'
import { DesignIcon, EE2EIcon, KeyIcon, ProfileIcon, TimerIcon, TeamIcon } from './icons'
import { gitHubUrl } from '@/config/const'

const featuresList = [
  {
    title: 'End-to-End Encryption',
    description: 'Messages are securely encrypted for maximum privacy and confidentiality.',
    description_alt: 'Messages are securely encrypted for maximum privacy.',
    summary: 'End-to-End Encryption ensures that messages sent between users are encrypted at the sender\'s end and decrypted only by the intended recipient, ensuring the utmost privacy and security by preventing unauthorized access or interception of messages.',
    icon: <EE2EIcon />
  },
  {
    title: 'Real-Time Communication',
    description: 'Instant communication between connected users, allowing seamless interaction and swift message delivery.',
    description_alt: 'Instant communication between connected users.',
    summary: 'Real-Time Communication facilitates instantaneous message delivery and interaction among connected users without delays, providing a seamless chat experience where users can engage in live conversations effortlessly.',
    icon: <TeamIcon />
  },
  {
    title: 'Self-Destructing Messages',
    description: 'Messages automatically disappear after a set time, enhancing privacy and ensuring that conversations remain ephemeral.',
    description_alt: 'Messages automatically disappear after a set time.',
    summary: 'Self-Destructing Messages feature allows users to set a predetermined lifespan for messages within chat rooms, ensuring that messages automatically disappear after a specified period, thereby enhancing privacy and confidentiality of conversations.',
    icon: <TimerIcon />
  },
  {
    title: 'User-Controlled Encryption Keys',
    description: 'Empower users to actively manage and personalize their encryption keys, adding an additional layer of control over message privacy.',
    description_alt: 'Empower users to manage their encryption keys.',
    summary: 'User-Controlled Encryption Keys provide users the ability to generate, manage, and personalize their encryption keys, adding an extra layer of security and control over message privacy within chat rooms by allowing users to actively manage their encryption keys.',
    icon: <KeyIcon />
  },
  {
    title: 'Theme Customization',
    description: 'Customize the appearance of the chat interface by selecting themes or adjusting colors, fonts, and styles to suit personal preferences.',
    description_alt: 'Customize the appearance of the chat interface.',
    summary: 'Theme Customization feature allows users to personalize the look and feel of the chat interface by choosing from various themes or customizing colors, fonts, and styles, providing a tailored and visually appealing user experience.',
    icon: <DesignIcon />
  },
  /* {
    title: 'Secure File Sharing',
    description: 'Safely transmit various file types within the chat environment using end-to-end encryption, ensuring data integrity and confidentiality of shared files.',
    description_alt: 'Safely share files within the chat environment.',
    summary: 'Secure File Sharing enables users to securely transmit various file types within the chat environment, utilizing end-to-end encryption to ensure data integrity and confidentiality, allowing seamless file sharing while maintaining privacy.',
    icon: <FilesIcon />
  }, */
  {
    title: 'Moderation Controls',
    description: 'Manage user permissions, enforce chat rules, and moderate conversations to maintain a safe and respectful environment for all participants.',
    description_alt: 'Manage and moderate chat room activities.',
    summary: 'Moderation Controls empower room creators or designated moderators to manage user permissions, enforce chat rules, and moderate conversations, ensuring a safe and respectful chat environment for all participants by providing tools to oversee chat activities.',
    icon: <ProfileIcon />
  }
]

export function LandingHomePage () {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <svg className="absolute top-0 left-0 z-0 fill-current stroke-current" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1">
          <defs>
            <pattern id='a' patternUnits='userSpaceOnUse' width='87' height='50.232' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 0%, 1)'/><path d='M0 54.424l14.5-8.373c4.813 2.767 9.705 5.573 14.5 8.37l14.5-8.373V29.303M0 4.193v16.744l-14.5 8.373L0 37.68l14.5-8.374V12.562l29-16.746m43.5 58.6l-14.5-8.37v-33.49c-4.795-2.797-9.687-5.603-14.5-8.37m43.5 25.111L87 37.67c-4.795-2.797-24.187-13.973-29-16.74l-14.5 8.373-14.5-8.37v-33.489m72.5 8.365L87 4.183l-14.5-8.37M87 4.183v16.745L58 37.673v16.744m0-66.976V4.185L43.5 12.56c-4.795-2.797-24.187-13.973-29-16.74L0 4.192l-14.5-8.37m29 33.484c4.813 2.767 9.705 5.573 14.5 8.37V54.42' strokeLinecap='square' strokeWidth='1' stroke='hsla(0, 0%, 100%, 1)' fill='none'/></pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#a)" opacity="0.1" />
        </svg>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative">
          <div
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium flex items-center gap-2 bg-primary text-primary-foreground"
          >
            <LockClosedIcon /> End-to-End Encryption
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Encrypted Real-Time Chat
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Instant communication between connected users, allowing seamless interaction and swift message delivery.
          </p>
          <div className="space-x-4 flex items-center">
            <CreateDialog />
            <a
              href={gitHubUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
            >
              <GitHubLogoIcon className='h-4 w-4 mr-2' /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="containr space-y-6 bg-slate-50 py-8 dark:bg-background md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            End-to-End Encryption
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            All messages are securely encrypted from sender to recipient, ensuring privacy.
          </p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 ">
          {featuresList.map((feature, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg border hover:border-primary items-center">
              <div className="flex flex-row justify-between rounded-md p-4">
                <div className='flex items-center justify-bewteen p-4 border-r mr-2'>
                  {feature.icon}
                </div>
                <div className="space-y-2 items-center">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
