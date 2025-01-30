import './App.css'
import { useState, useEffect } from 'react' // Importerar useState och useEffect från react
import TodoList from './components/TodoList' // Importerar TodoList-komponenten
import TodoForm from './components/TodoForm' // Importerar TodoForm-komponenten
import { Todo, getTodos, updateTodo } from './services/todoServices' // Importerar Todo och getTodos från todoServices

function App() {

  // States för todos, laddning och felhantering
  const [todos, setTodos] = useState<Todo[]>([]); // State för todos av typen Todo-array, tom array som standard
  const [loading, setLoading] = useState(true); // State för laddning, true som standard (boolean)
  const [error, setError] = useState<string | null>(null); // State för felhantering, string eller null, null som standard

  // Använder useEffect för att hämta todos från API:et när komponenten renderas
  useEffect(() => {
    fetchTodos(); // Anropar funktionen för att hämta todos
  }, []);

  // Funktion för att hämta todos
  const fetchTodos = async () => {
    try {
      setLoading(true); // Uppdaterar state för laddning till true
      const todos = await getTodos(); // Anropar funktion för att hämta todos via API:et
      setTodos(todos || []); // Uppdaterar state för todos med hämtade todos eller en tom array om det inte finns några
    } catch (err) {
      console.error("Fel vid hämtning av todos:", err); // Loggar eventuella fel
      setError("Kunde inte hämta todos. Försök igen senare."); // Uppdaterar state för felhantering med felmeddelande
    } finally {
      setLoading(false); // Uppdaterar state för laddning till false
    }
  };

  // Funktion för att lägga till en ny todo i listan
  const addTodo = (newTodo: Todo) => {
    setTodos((existingTodos) => [...existingTodos, newTodo]); // Lägger till den nya todon i listan med todos
  };

  // Funktion för att uppdatera en todos status, tar emot id och ny status som parametrar
  const updateTodoStatus = async (_id: number, newStatus: "Ej påbörjad" | "Pågående" | "Avklarad") => {
    try {
      const existingTodo = todos.find((todo) => todo._id === _id); // Hämtar den todo som ska uppdateras från listan med todos
      if (!existingTodo) throw new Error("Todo hittades inte"); // Kastar ett fel om todon inte finns
      const updatedTodo = await updateTodo({ ...existingTodo, status: newStatus }); // Anropar funktion för att uppdatera en todo via API:et
      setTodos((existingTodos) => existingTodos.map((todo) => (todo._id === _id ? updatedTodo : todo))); // Uppdaterar listan med todos med den uppdaterade todon
    } catch (err) {
      console.error("Fel vid uppdatering av todo-status:", err); // Loggar eventuella fel
      setError("Kunde inte uppdatera todo-status. Försök igen senare."); // Uppdaterar state för felhantering med felmeddelande
    }
  }

  return (
    <>
      <h1>Uppgifter</h1>
      {/* Renderar TodoForm-komponenten och skickar med addTodo-funktionen som prop */}
      <TodoForm addTodo={addTodo} />
      {/* Renderar TodoList-komponenten och skickar med props */}
      <TodoList todos={todos} loading={loading} error={error} updateTodoStatus={updateTodoStatus}/>
    </>
  )
}

export default App
