import { createContext, useContext, useEffect, useState } from 'react'
import { createIV, decryptData, encryptData } from './utils'

interface Ee2eProviderProps {
  children: React.ReactNode
  hashKey: string
}

interface Ee2eProviderState {
  loading: boolean
  encryptData: (data: string) => Promise<{ data: ArrayBuffer, iv: Uint8Array }>
  decryptData: (data: ArrayBuffer, iv: Uint8Array) => Promise<string>
}

const initialState: Ee2eProviderState = {
  loading: true,
  encryptData: async () => { return { data: new ArrayBuffer(1), iv: createIV() } },
  decryptData: async () => ''
}

const Ee2eProviderContext = createContext<Ee2eProviderState>(initialState)

export function Ee2eProvider ({
  children,
  hashKey,
  ...props
}: Ee2eProviderProps) {
  const [loading, setLoading] = useState(true)
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | undefined>(undefined)
  useEffect(() => {
    window.crypto.subtle.importKey(
      'jwk',
      {
        k: hashKey,
        alg: 'A128GCM',
        ext: true,
        key_ops: ['encrypt', 'decrypt'],
        kty: 'oct'
      },
      { name: 'AES-GCM', length: 128 },
      false, // extractable
      ['encrypt', 'decrypt']
    ).then(key => {
      setCryptoKey(key)
      setLoading(false)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  const safeDecryptData = async (data: ArrayBuffer, iv: Uint8Array) => {
    if (cryptoKey !== undefined) {
      return await decryptData(cryptoKey, data, iv)
    }

    throw new Error('No cryptokey available!')
  }
  const safeEncryptData = async (data: string) => {
    if (cryptoKey !== undefined) {
      return await encryptData(cryptoKey, data)
    }

    throw new Error('No cryptokey available!')
  }
  const value = {
    loading,
    decryptData: safeDecryptData,
    encryptData: safeEncryptData
  }

  return (
    <Ee2eProviderContext.Provider {...props} value={value}>
      {!loading && children}
    </Ee2eProviderContext.Provider>
  )
}

export const useEe2e = () => {
  const context = useContext(Ee2eProviderContext)

  if (context === undefined) {
    throw new Error('useEe2e must be used within a Ee2eProviderContext')
  }

  return context
}
