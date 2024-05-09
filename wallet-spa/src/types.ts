import { UUID } from "crypto"

export type UserType = {
  name: string,
  email: string
}

export type TransactionType = {
  idTransaction?: UUID,
  description: string,
  value: number,
  date: string,
  type: "input" | "output"
}