import React from 'react'

type TodoProps = {
    key: number;
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export default function Todoitem( {userId, id, title, completed, key}: TodoProps ) {
  return (
    <div className='flex w-full flex-col' key={key}>
        <p>User Id : {userId} </p>
        <p>Id : {id} </p>
        <p>Title : {title} </p>
        <p>Completed : {completed} </p>
    </div>
  )
}
