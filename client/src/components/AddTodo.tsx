import React, { useState } from 'react'

type Props = { 
  saveTodo: (e: React.FormEvent, formData: IBalance | any) => void 
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<IBalance | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='address'>Name</label>
          <input onChange={handleForm} type='text' id='address' />
        </div>
        <div>
          <label htmlFor='amount'>Description</label>
          <input onChange={handleForm} type='text' id='amount' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Balance</button>
    </form>
  )
}

export default AddTodo
