import { useEffect, useState } from 'react'
import './App.css'
import Form from './form'
import Edit_list from './edit_list'

function App() {

  const [todos, setTodos] = useState([])
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem("todo"))
    if (array) {
      setTodos(array)
    }
  }, [])
  

  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, {text: value, done: false}])
    } else {
      alert("Введите текст")
    }

    localStorage.setItem('todo', JSON.stringify([...todos, { text: value, done: false, edit: false}]))
  }

  const setTodo = () => {
    const array = localStorage.getItem("todo")
    setTodos(array)
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        done: !todo.done
      }
    }))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))

  }


  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <>
    <div className="wrapper">
      <div className="container">
        <h1 className="title">Add task</h1>
        <Form 
          putTodo={putTodo}
        />
        <h1 className="title">My tasks</h1>
        <ul className="todos">
          {
            todos.map(e, index => {
              return (
                <li key={index}>
                  <input className={"task " + (e.complite ? "line" : "text")} value={e.task} onChange={(a) => updateList(index, a.target.value)} />
                  <button className={todo.done ? "task_done" : "task_udone"}  id='complete_task' onClick={() => done(index)}>{todo.done ? "undone" : "done"}</button>
                  <button className='delete'  id='delete_task' onClick={() => deleteTask(index)}>delete</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
      
    </>
  )
}

export default App
