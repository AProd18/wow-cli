// src/wow-api-sdk.d.ts
declare module 'wow-api-sdk' {
  export function getCharacterProfile(
    region: string,
    realm: string,
    name: string
  ): Promise<any>;
}
