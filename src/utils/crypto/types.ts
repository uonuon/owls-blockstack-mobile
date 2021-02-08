export type CipherObject = {
  iv: string;
  ephemeralPK: string;
  cipherText: string;
  mac: string;
  wasString: boolean;
};
