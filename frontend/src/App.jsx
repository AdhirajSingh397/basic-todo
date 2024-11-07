
import { useState, useEffect } from "react"
import CreateTodo  from "./components/CreateTodo"
import Todos  from "./components/Todos"

function App() {


  const [todos, setTodos] = useState([])

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos"); // Fetch from your backend
            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            const data = await response.json(); // Parse the response as JSON
            setTodos(data.todos); // Set the fetched todos into state
        } catch (error) {
            console.error("Error fetching todos:", error); // Log any errors
        }
    };

    fetchTodos(); // Call the fetch function
}, []); // Empty dependency array ensures it runs only once on mount



  return (
      <div>
        <CreateTodo></CreateTodo>
        <Todos todos={todos}></Todos>
      </div>
      
  )
}

export default App
