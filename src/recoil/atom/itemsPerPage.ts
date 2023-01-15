import { atom } from "recoil"

export const itemsPerPageState = atom<number>({
  key: "items",
  default: 6,
})
