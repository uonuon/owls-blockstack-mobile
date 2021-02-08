import crypto from 'crypto';
import BN from 'bn.js';
import {
  ECPair,
} from 'bitcoinjs-lib';
import {
  ec as EllipticCurve,
} from 'elliptic';
import {
  ATTACHMENT_TYPE,
  IAttachmentType,
  IImageType,
  IMessage,
  IVoiceType,
  TEXT_TYPE,
  VOICE_TYPE,
} from 'shared';
import {
  CipherObject,
} from './types';
import { defaultConfig } from 'hooks';

const ecurve = new EllipticCurve('secp256k1');

const valueToString = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value;
};

function aes256CbcDecrypt(iv: Buffer, key: Buffer, ciphertext: Buffer) {
  const cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([cipher.update(ciphertext), cipher.final()]);
}

function hmacSha256(key: Buffer, content: Buffer) {
  return crypto
    .createHmac('sha256', key)
    .update(content)
    .digest();
}

function aes256CbcEncrypt(iv: Buffer, key: Buffer, plaintext: Buffer) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return Buffer.concat([cipher.update(plaintext), cipher.final()]);
}

function sharedSecretToKeys(sharedSecret: Buffer) {
  // generate mac and encryption key from shared secret
  const hashedSecret = crypto
    .createHash('sha512')
    .update(sharedSecret)
    .digest();
  return {
    encryptionKey: hashedSecret.slice(0, 32),
    hmacKey: hashedSecret.slice(32),
  };
}

function equalConstTime(b1: Buffer, b2: Buffer) {
  if (b1.length !== b2.length) {
    return false;
  }
  let res = 0;
  for (let i = 0; i < b1.length; i += 1) {
    res |= b1[i] ^ b2[i];
  }
  return res === 0;
}

export function getHexFromBN(bnInput: BN) {
  const hexOut = bnInput.toString('hex');

  if (hexOut.length === 64) {
    return hexOut;
  } if (hexOut.length < 64) {
    // pad with leading zeros
    // the padStart function would require node 9
    const padding = '0'.repeat(64 - hexOut.length);
    return `${padding}${hexOut}`;
  }
  throw new Error('Generated a > 32-byte BN for encryption. Failing.');
}

export function encryptECIES(
  publicKey: string,
  content: string | Buffer,
): CipherObject {
  const isString = typeof content === 'string';
  // always copy to buffer
  const plainText = content instanceof Buffer ? Buffer.from(content) : Buffer.from(content);

  const ecPK = ecurve.keyFromPublic(publicKey, 'hex').getPublic() as any;
  const ephemeralSK = ecurve.genKeyPair();
  const ephemeralPK = ephemeralSK.getPublic();
  const sharedSecret = ephemeralSK.derive(ecPK) as BN;

  const sharedSecretHex = getHexFromBN(sharedSecret);

  const sharedKeys = sharedSecretToKeys(Buffer.from(sharedSecretHex, 'hex'));

  const initializationVector = crypto.randomBytes(16);

  const cipherText = aes256CbcEncrypt(
    initializationVector,
    sharedKeys.encryptionKey,
    plainText,
  );

  const macData = Buffer.concat([
    initializationVector,
    Buffer.from(ephemeralPK.encodeCompressed()),
    cipherText,
  ]);
  const mac = hmacSha256(sharedKeys.hmacKey, macData);

  return {
    iv: initializationVector.toString('hex'),
    ephemeralPK: ephemeralPK.encodeCompressed('hex'),
    cipherText: cipherText.toString('hex'),
    mac: mac.toString('hex'),
    wasString: isString,
  };
}

export const encryptObject = async (obj: any, publicKey: string) => {
  const encrypted = {
    ...obj,
  };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'undefined') {
      return;
    }
    const stringValue = valueToString(value);
    encrypted[key] = encryptECIES(publicKey, stringValue);
  });
  return encrypted;
};
const stringToValue = (value: string, clazz: any) => {
  if (clazz === Boolean) {
    return value === 'true';
  }
  if (clazz === Number) {
    return parseFloat(value);
  }
  if (clazz === Array || clazz === Object) {
    return JSON.parse(value);
  }
  return value;
};

export const arrayToObj = (arr: any) => arr.reduce((acc: any, value: any) => ({
  ...acc, [value._id]: value,
}), {});

export function getPublicKeyFromPrivate(privateKey: string) {
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  return keyPair.publicKey.toString('hex');
}

export function decryptECIES(
  privateKey: string,
  cipherObject: CipherObject,
): Buffer | string {
  const ecSK = ecurve.keyFromPrivate(privateKey, 'hex');
  const ephemeralPK = ecurve
    .keyFromPublic(cipherObject.ephemeralPK, 'hex')
    .getPublic();
  const sharedSecret = ecSK.derive(ephemeralPK);
  const sharedSecretBuffer = Buffer.from(getHexFromBN(sharedSecret), 'hex');

  const sharedKeys = sharedSecretToKeys(sharedSecretBuffer);

  const ivBuffer = Buffer.from(cipherObject.iv, 'hex');
  const cipherTextBuffer = Buffer.from(cipherObject.cipherText, 'hex');

  const macData = Buffer.concat([
    ivBuffer,
    Buffer.from(ephemeralPK.encodeCompressed()),
    cipherTextBuffer,
  ]);
  const actualMac = hmacSha256(sharedKeys.hmacKey, macData);
  const expectedMac = Buffer.from(cipherObject.mac, 'hex');
  if (!equalConstTime(expectedMac, actualMac)) {
    throw new Error('Decryption failed: failure in MAC check');
  }
  const plainText = aes256CbcDecrypt(
    ivBuffer,
    sharedKeys.encryptionKey,
    cipherTextBuffer,
  );
  if (cipherObject.wasString) {
    return plainText.toString();
  }
  return plainText;
}

/**
 * Sign content using ECDSA
 *
 * @param {String} privateKey - secp256k1 private key hex string
 * @param {Object} content - content to sign
 * @return {Object} contains:
 * signature - Hex encoded DER signature
 * public key - Hex encoded private string taken from privateKey
 * @private
 * @ignore
 */
export function signECDSA(
  privateKey: string,
  content: string | Buffer,
): {
    publicKey: string;
    signature: string;
  } {
  const contentBuffer = content instanceof Buffer ? content : Buffer.from(content);
  const ecPrivate = ecurve.keyFromPrivate(privateKey, 'hex');
  const publicKey = getPublicKeyFromPrivate(privateKey);
  const contentHash = crypto
    .createHash('sha256')
    .update(contentBuffer)
    .digest();
  const signature = ecPrivate.sign(contentHash);
  const signatureString = signature.toDER('hex');

  return {
    signature: signatureString,
    publicKey,
  };
}
export const decryptObject = (
  obj: any,
  types: any,
  privateKey: string,
) => {
  const decrypted = {
    ...obj,
  };
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const type = types[key];
    try {
      const decryptedValue = decryptECIES(
        privateKey,
        JSON.parse(value),
      ) as string;
      decrypted[key] = stringToValue(decryptedValue, type);
    } catch (error) {
      // console.debug(`Decryption error for key: '${key}': ${error.message}`); // eslint-disable-line
      decrypted[key] = value;
    }
  });
  return decrypted;
};

export const generateGUID: () => string = () => {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

export function getEntropy(arg: Buffer | number): Buffer {
  if (!arg) {
    arg = 32
  }
  if (typeof arg === 'number') {
    return crypto.randomBytes(arg);
  }
  return crypto.randomFillSync(arg);
}

/**
* @ignore
*/
export function makeECPrivateKey() {
  const keyPair = ECPair.makeRandom({ rng: getEntropy });
  return (keyPair.privateKey as Buffer).toString('hex');
}

export const decryptMessageData = async (
  message: IMessage,
  privateKey: string,
) => {
  try {
    const gaiaURL = JSON.parse(message['message/user']['_user/profile'] as any)
      .apps[defaultConfig.appDomain];
    if (message['message/type'] === TEXT_TYPE) {
      const decryptedData = (await decryptECIES(
        privateKey,
        JSON.parse(message['message/content'][0] as any).data as any,
      )) as string;
      return {
        ...message,
        'message/content': [{
          data: JSON.parse(decryptedData),
        }],
      };
    } if (message['message/type'] === VOICE_TYPE) {
      const voiceMsg = JSON.parse(
        (message['message/content'] as IVoiceType[])[0] as any,
      );
      const decryptedData = (await decryptECIES(
        privateKey,
        voiceMsg.data as any,
      )) as string;

      return {
        ...message,
        'message/content': [{
          ...voiceMsg, data: gaiaURL + decryptedData,
        }],
      };
    } if (message['message/type'] === ATTACHMENT_TYPE) {
      const decryptedAttachments = await Promise.all(
        (message['message/content'] as IAttachmentType[]).map(async (m) => {
          const parsedData = JSON.parse(m as any);
          const decryptedURL = (await decryptObject(
            {
              data: JSON.stringify(parsedData.data),
              name: JSON.stringify(parsedData.name),
            },
            {
              data: String, name: String,
            },
            privateKey,
          )) as any;

          return {
            ...parsedData,
            ...decryptedURL,
            data: gaiaURL + decryptedURL.data,
          };
        }),
      );
      return {
        ...message, 'message/content': decryptedAttachments,
      };
    }
    const decryptedImages = await Promise.all(
      (message['message/content'] as IImageType[]).map(async (m) => {
        const parsedData = JSON.parse(m as any);
        const decryptedURL = (await decryptObject(
          {
            data: JSON.stringify(parsedData.data),
            fullImage: JSON.stringify(parsedData.fullImage),
            name: JSON.stringify(parsedData.name),
          },
          {
            data: String, fullImage: String, name: String,
          },
          privateKey,
        )) as any;
        return {
          ...parsedData,
          ...decryptedURL,
          data: gaiaURL + decryptedURL.data,
          fullImage: gaiaURL + decryptedURL.fullImage,
        };
      }),
    );
    return {
      ...message, 'message/content': decryptedImages,
    };
  } catch (e) {
    return message;
  }
};
