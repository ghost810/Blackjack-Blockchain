import React from 'react'

type Props = TodoProps & {
    updateTodo: (balance: IBalance) => void
    deleteTodo: (_id: string) => void
}

const Balance: React.FC<Props> = ({ balance, updateTodo, deleteTodo }) => {
  const checkTodo: string = balance.status ? `line-through` : ''
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{balance.address}</h1>
        <span className={checkTodo}>{balance.amount}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(balance)}
          className={balance.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(balance._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Balance
