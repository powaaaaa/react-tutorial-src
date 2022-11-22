import { useState, useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  
  //文字列を取得
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する
    const name = todoNameRef.current.value;
    //入力無し対処
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value=null;
  };

  const toggleTodo = (id) =>{
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todos) => !todos.completed);
    setTodos(newTodos);
  };

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={todoNameRef}/>
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクを削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todos.completed).length}</div>
    </div>
  );
}

export default App;