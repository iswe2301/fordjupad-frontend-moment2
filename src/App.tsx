import './App.css'
import { useState, useEffect } from 'react' // Importerar useState och useEffect från react
import TodoList from './components/TodoList' // Importerar TodoList-komponenten
import TodoForm from './components/TodoForm' // Importerar TodoForm-komponenten
import { getTodos, updateTodo, deleteTodo } from './services/todoServices' // Importerar Todo och getTodos från todoServices
import { Todo } from './types/interfaces' // Importerar Todo-interface

function App() {

  // States för todos, laddning och felhantering
  const [todos, setTodos] = useState<Todo[]>([]); // State för todos av typen Todo-array, tom array som standard
  const [loading, setLoading] = useState(true); // State för laddning, true som standard (boolean)
  const [error, setError] = useState<string | null>(null); // State för felhantering, string eller null, null som standard
  const [confirmation, setConfirmation] = useState<string | null>(null); // State för bekräftelse, string eller null, null som standard

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

  // Funktion för att visa en bekräftelserruta
  const showConfirmation = (message: string) => {
    setConfirmation(message); // Uppdaterar state för bekräftelse med meddelandet
    setTimeout(() => {
      setConfirmation(null);
    }, 5000); // Döljer bekräftelsen efter 5 sekunder
  }

  // Funktion för att lägga till en ny todo i listan
  const addTodo = (newTodo: Todo) => {
    setTodos((existingTodos) => [...existingTodos, newTodo]); // Lägger till den nya todon i listan med todos
    showConfirmation(`Ny uppgift "${newTodo.title}" skapad!`); // Visar en bekräftelseruta med meddelande om att todon har skapats
  };

  // Funktion för att uppdatera en todos status, tar emot id och ny status som parametrar
  const updateTodoStatus = async (_id: string, newStatus: "Ej påbörjad" | "Pågående" | "Avklarad") => {
    try {
      const existingTodo = todos.find((todo) => todo._id === _id); // Hämtar den todo som ska uppdateras från listan med todos
      if (!existingTodo) throw new Error("Todo hittades inte"); // Kastar ett fel om todon inte finns
      const updatedTodo = await updateTodo({ ...existingTodo, status: newStatus }); // Anropar funktion för att uppdatera en todo via API:et
      setTodos((existingTodos) => existingTodos.map((todo) => (todo._id === _id ? updatedTodo : todo))); // Uppdaterar listan med todos med den uppdaterade todon
      showConfirmation(`Uppgift "${updatedTodo.title}" uppdaterad! Ny status: ${updatedTodo.status}`); // Visar en bekräftelseruta med meddelande om att todon har uppdaterats
    } catch (err) {
      console.error("Fel vid uppdatering av todo-status:", err); // Loggar eventuella fel
      setError("Kunde inte uppdatera todo-status. Försök igen senare."); // Uppdaterar state för felhantering med felmeddelande
    }
  }

  // Funktion för att ta bort en todo från listan
  const deleteOneTodo = async (_id: string) => {
    try {
      // Hämtar den todo som ska tas bort från listan med todos
      const todoToDelete = todos.find((todo) => todo._id === _id);
      // Kastar ett fel om todon inte finns
      if (!todoToDelete) throw new Error("Todo hittades inte");
      // Visar en bekräftelseruta för att bekräfta att användaren vill ta bort todon
      const confirmDelete = window.confirm(`Är du säker på att du vill ta bort uppgiften "${todoToDelete.title}"?\nUppgiftens status: ${todoToDelete.status}`);
      // Avbryter om användaren inte vill ta bort todon
      if (!confirmDelete) return;
      await deleteTodo(_id); // Anropar funktion för att ta bort en todo via API:et
      setTodos((existingTodos) => existingTodos.filter((todo) => todo._id !== _id)); // Uppdaterar listan med todos genom att filtrera bort den todo som ska tas bort
      showConfirmation(`Uppgift "${todoToDelete.title}" borttagen!`); // Visar en bekräftelseruta med meddelande om att todon har tagits bort
    } catch (err) {
      console.error("Fel vid borttagning av todo:", err); // Loggar eventuella fel
      setError("Kunde inte ta bort todo. Försök igen senare."); // Uppdaterar state för felhantering med felmeddelande
    }
  }

  return (
    <div className="container">
      <h1>Uppgifter</h1>
      <hr></hr>
      {/* Renderar TodoForm-komponenten och skickar med addTodo-funktionen som prop */}
      <TodoForm addTodo={addTodo} />
      <hr></hr>
      {/* Renderar TodoList-komponenten och skickar med props */}
      <TodoList todos={todos} loading={loading} error={error} updateTodoStatus={updateTodoStatus} deleteOneTodo={deleteOneTodo} />
      {/* Visar en bekräftelseruta om det finns ett meddelande */}
      {confirmation && <div className="confirmation-popup">{confirmation}</div>}
    </div>
  )
}

export default App
