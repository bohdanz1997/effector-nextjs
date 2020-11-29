export type Card = {
  id: number
  title: string
  listId: number
}

export type CardCreateParams = {
  title: string
  listId: number
}

export type CardUpdateParams = CardCreateParams & { id: number }
