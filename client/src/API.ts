import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:4000'

export const getAmount = async (addr : string): Promise<AxiosResponse<ApiDataType>> => {
  try{
    const bal: AxiosResponse<ApiDataType> = await axios.get(`${baseUrl}/get-amount/${addr}`);
    return bal;
  } catch (error) {
    throw new Error(error)
  }
}
export const updateAmount = async(addr: string, amount: number): Promise<AxiosResponse<ApiDataType>> => {
  try{
    const bal: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/put-amount/${addr}`, {'amount': amount});
    return bal;
  } catch (error) {
    throw new Error(error)
  }
}
export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + '/todos'
    )
    return todos
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: IBalance
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const balance: Omit<IBalance, '_id'> = {
      address: formData.address,
      amount: formData.amount,
      status: false,
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-balance',
      balance
    )
    return saveTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  balance: IBalance
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<IBalance, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-balance/${balance._id}`,
      todoUpdate
    )
    return updatedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-balance/${_id}`
    )
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}
