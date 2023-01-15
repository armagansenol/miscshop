import { atom } from "recoil"

export const columnState = atom<number>({
  key: "columns",
  default: 3,
})
