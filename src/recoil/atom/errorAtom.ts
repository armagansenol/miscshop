import { atom } from "recoil"

export const errorState = atom<{ status: boolean; text: string }>({
  key: "error",
  default: {
    status: false,
    text: "",
  },
})
