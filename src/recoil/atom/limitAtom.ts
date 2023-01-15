import { atom } from "recoil"

export const limitState = atom<number>({
  key: "limit",
  default: 6,
})
