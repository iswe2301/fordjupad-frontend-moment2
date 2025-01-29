import { Todo } from "../services/todoServices"; // Importerar getTodos och Todo från todoServices

// Interface för props
interface TodoListProps {
    todos: Todo[]; // Array med todos
    loading: boolean; // Boolean för laddning
    error: string | null; // Sträng eller null för felmeddelanden
}

// Funktion som skapar en lista med todos, tar emot todos som prop
const TodoList = ({ todos, loading, error }: TodoListProps) => {

    if (loading) return <p>Laddar...</p>; // Visar laddningsmeddelande om staten är true
    if (error) return <p>{error}</p>; // Visar felmeddelande om error inte är null

    return (
        <div>
            <h2>Mina uppgifter</h2>
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
