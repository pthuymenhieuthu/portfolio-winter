// src/declarations.d.ts
declare module '@csstools/convert-colors' {
  export function hex2rgb(hex: string): number[]
  export function hex2contrast(hex1: string, hex2: string): number
}