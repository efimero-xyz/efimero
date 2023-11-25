import { describe, test, expect, vi } from 'vitest'
import { createHashKey, createIV, encryptData, decryptData } from './utils'

// Mock cryptoKey, encrypted data, and IV for testing
const mockCryptoKey = 'mockCryptoKey'
const mockEncryptedData = new Uint8Array([1, 2, 3])
const mockIV = new Uint8Array([4, 5, 6])

// Mock the crypto.randomUUID function
const crypto = {
  getRandomValues: vi.fn(() => mockIV),
  subtle: {
    generateKey: vi.fn(),
    encrypt: vi.fn(),
    decrypt: vi.fn(),
    exportKey: vi.fn(async () => { return await Promise.resolve({ k: mockCryptoKey }) }),
    importKey: vi.fn()
  }
}

vi.stubGlobal('crypto', crypto)

describe('Encryption and Decryption Functions', () => {
  // Mock createHashKey function
  test('createHashKey function', async () => {
    // Mocking crypto.subtle.generateKey to resolve with mockCryptoKey
    crypto.subtle.generateKey.mockResolvedValue(mockCryptoKey)

    const result = await createHashKey()
    expect(result).toEqual(mockCryptoKey)
  })

  // Mock createIV function
  test('createIV function', () => {
    const result = createIV()
    expect(result).toEqual(mockIV)
  })

  // Mock encryptData function
  test('encryptData function', async () => {
    // Mocking crypto.subtle.encrypt to resolve with mockEncryptedData
    crypto.subtle.encrypt.mockResolvedValue(mockEncryptedData)

    // @ts-expect-error ignore-mock
    const result = await encryptData(mockCryptoKey, 'testData')
    expect(result).toEqual({ data: mockEncryptedData, iv: expect.any(Uint8Array) })
  })

  // Mock decryptData function
  test('decryptData function', async () => {
    const mockDecodedString = 'DecodedString'

    // Mocking crypto.subtle.decrypt to resolve with mockDecodedString
    crypto.subtle.decrypt.mockResolvedValue(new TextEncoder().encode(mockDecodedString))

    // @ts-expect-error ignore-mock
    const result = await decryptData(mockCryptoKey, mockEncryptedData, mockIV)
    expect(result).toEqual(mockDecodedString)
  })
})
