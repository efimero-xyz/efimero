import { z } from 'zod'
const VERSION = 1

export const MessageSchema = z.object({
  username: z.string(),
  message: z.string(),
  timestamp: z.number(),
  version: z.number()
})

export type MessageSchemaType = z.infer<typeof MessageSchema>

export function createMessage (username: string, message: string): MessageSchemaType {
  const currentDate = new Date()

  return {
    version: VERSION,
    username,
    message,
    timestamp: currentDate.getTime()
  }
}

export function serializeMessage (msg: MessageSchemaType): string {
  return JSON.stringify(msg)
}

export function deserializeMessage (msg: string): MessageSchemaType {
  const data = JSON.parse(msg)

  return MessageSchema.parse(data)
}
