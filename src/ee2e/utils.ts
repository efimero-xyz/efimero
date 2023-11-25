// Perform key generation using AES-GCM algorithm
export const ALGORITHM: AesKeyGenParams = {
  name: 'AES-GCM',
  length: 128 // 256
}

// Length of the Initialization Vector (IV) in bytes
export const IV_LENGTH_BYTES = 12 // 16

/**
 * Asynchronously generates an AES-GCM key and exports it.
 * @returns {CryptoKey} The exported key generated using AES-GCM.
 */
export async function createHashKey () {
  try {
    // Perform key generation using AES-GCM algorithm
    const roomKey = await crypto.subtle.generateKey(
      ALGORITHM,
      true, // extractable
      ['encrypt', 'decrypt']
    )

    // Export the generated key
    const hashKey = (await crypto.subtle.exportKey('jwk', roomKey)).k

    return hashKey
  } catch (error) {
    console.error('Error generating or exporting key:', error)
    throw error // Propagate the error
  }
}

/**
 * Generates a random Uint8Array to be used as an Initialization Vector (IV).
 * @returns {Uint8Array} A Uint8Array containing random values for IV.
 */
export const createIV = () => {
  try {
    // Generate a random Uint8Array for IV using crypto.getRandomValues
    const arr = new Uint8Array(IV_LENGTH_BYTES)

    return crypto.getRandomValues(arr)
  } catch (error) {
    console.error('Error generating IV:', error)
    throw error // Propagate the error
  }
}

/**
 * Decrypts the provided ArrayBuffer value using the given cryptoKey and IV, returning the decoded string.
 * @param {CryptoKey} cryptoKey The CryptoKey used for decryption.
 * @param {ArrayBuffer} value The ArrayBuffer value to be decrypted.
 * @param {Uint8Array} iv The Initialization Vector (IV) used in decryption.
 * @returns {string} The decrypted value as a string.
 */
export async function decryptData (cryptoKey: CryptoKey, value: ArrayBuffer, iv: Uint8Array) {
  try {
    const algorithm = { name: 'AES-GCM', iv }

    // Decrypt the provided ArrayBuffer value using the cryptoKey and IV
    const decrypted = await crypto.subtle.decrypt(
      algorithm,
      cryptoKey,
      value
    )
    // Convert the decrypted value (ArrayBuffer) to a string
    return new TextDecoder().decode(new Uint8Array(decrypted))
  } catch (error) {
    console.error('Error decrypting data:', error)
    throw error // Propagate the error
  }
}

/**
 * Encrypts the provided string data using the given cryptoKey and returns the encrypted value as a Uint8Array along with the IV.
 * @param {CryptoKey} cryptoKey The CryptoKey used for encryption.
 * @param {string} data The string data to be encrypted.
 * @returns {Object} An object containing the encrypted value as a Uint8Array and the IV used for encryption.
 */
export async function encryptData (cryptoKey: CryptoKey, data: string) {
  try {
    const iv = createIV()

    const algorithm = { name: 'AES-GCM', iv }

    // Convert the string data to ArrayBuffer
    const encodedData = new TextEncoder().encode(data)

    // Encrypt the provided string data using the cryptoKey and random IV
    const encrypted = await crypto.subtle.encrypt(
      algorithm,
      cryptoKey,
      encodedData
    )

    return { data: encrypted, iv }
  } catch (error) {
    console.error('Error encrypting data:', error)
    throw error // Propagate the error
  }
}
