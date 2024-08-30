import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitems from './Todoitems'



const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")): [])

    const inputRef = useRef()
    
    const addItem = () => {
        const inputText = inputRef.current.value.trim()
        if (inputText === "") {
            return null
        }

        const newItemTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false
        }
        setTodoList((prev) => [...prev, newItemTodo])
        inputRef.current.value = ""
        console.log(newItemTodo)
    }

    const deleteItemTodo = (id) => {
        setTodoList((prvTodos)=>{
           return prvTodos.filter((todo)=> todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prevTodos)=> {
            return prevTodos.map((todo)=>{
               if(todo.id === id){
                return {...todo, isComplete: !todo.isComplete}
               } 
               return todo
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

  return (
    <div className='bg-slate-300 place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded'>
      
    {/* ---titulo--- */}
     <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold '>Todo List</h1>
     </div>

    {/* ---input box--- */}
    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Agregar tarea'/>
        <button onClick={addItem} className='border-none rounded-3xl bg-orange-600 text-white w-32 h-14 cursor-pointer text-lg font-medium' >ADD +</button>
    </div>

    {/* ---todo list--- */}
    <div>
        {todoList.map((item, index) => {
            return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteItemTodo={deleteItemTodo} toggle={toggle}/>           
        })}
    </div>
      
    </div>
  )
}

export default Todo
