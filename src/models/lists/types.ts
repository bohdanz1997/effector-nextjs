export type List = {
  id: number
  title: string
}

export type ListCreateParams = {
  title: string
}

export type ListUpdateParams = ListCreateParams & { id: number }
