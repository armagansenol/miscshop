import { IProduct } from "models/Product"
import { atom } from "recoil"

export const cartState = atom<IProduct[]>({
  key: "cart",
  default: [],
})
