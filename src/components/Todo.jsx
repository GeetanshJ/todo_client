import React from 'react'
export const Todo = ({todo_task, setTodoTask}) => {
    return (
        <div>
            <input type="text" value={todo_task} placeholder="Todo" onChange={(e) => setTodoTask(e.target.value)} />
        </div>
    )
}


