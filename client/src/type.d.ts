interface IBalance {
    _id: string
    address: string
    amount: number
    status: boolean
    createdAt?: string
    updatedAt?: string
}

type TodoProps = {
    balance: IBalance
}

type ApiDataType = {
    message: string
    status: string
    balance?: IBalance
  }
  