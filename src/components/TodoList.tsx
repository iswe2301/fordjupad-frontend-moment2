import { useEffect, useState } from "react"; // Importerar useEffect och useState från react
import { getTodos, Todo } from "../services/todoServices"; // Importerar getTodos och Todo från todoServices

// Funktion som skapar en lista med todos
const TodoList = () => {

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
            setError("Kunde inte hämta todos"); // Uppdaterar state för felhantering med felmeddelande
        } finally {
            setLoading(false); // Uppdaterar state för laddning till false
        }
    };

    if (loading) return <p>Laddar...</p>; // Visar laddningsmeddelande om staten är true
    if (error) return <p>{error}</p>; // Visar felmeddelande om error inte är null

    return (
        <div>
            <h2>Min lista</h2>
            {/* Kontrollerar om det finns todos att visa och skriver annars ut meddelande */}
            {todos.length === 0 ? (
                <p>Inga todos att visa.</p>
            ) : (
                <ul>
                    {/* Loopar igenom todos och skriver ut de i en lista */}
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description || ""}</p> {/* Skriver ut beskrivning om det finns någon */}
                            <p>Status: {todo.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
