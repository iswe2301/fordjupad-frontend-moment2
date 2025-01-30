import { Todo } from "../services/todoServices"; // Importerar getTodos och Todo från todoServices

// Interface för props
interface TodoListProps {
    todos: Todo[]; // Array med todos
    loading: boolean; // Boolean för laddning
    error: string | null; // Sträng eller null för felmeddelanden
    updateTodoStatus: (id: number, newStatus: "Ej påbörjad" | "Pågående" | "Avklarad") => void; // Funktion för att uppdatera en todos status
    deleteOneTodo: (id: number) => void; // Funktion för att ta bort en todo
}

// Funktion som skapar en lista med todos, tar emot props av typen TodoListProps
const TodoList = ({ todos, loading, error, updateTodoStatus, deleteOneTodo }: TodoListProps) => {

    if (loading) return <p>Laddar...</p>; // Visar laddningsmeddelande om staten är true
    if (error) return <p>{error}</p>; // Visar felmeddelande om error inte är null

    return (
        <div>
            <h2>Mina uppgifter</h2>
            {/* Kontrollerar om det finns todos att visa och skriver annars ut meddelande */}
            {todos.length === 0 ? (
                <p>Inga uppgifter att göra.</p>
            ) : (
                <ul>
                    {/* Loopar igenom todos och skriver ut de i en lista */}
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            <h3>{todo.title}</h3>
                            {/* Skriver ut beskrivning om det finns någon */}
                            <p>{todo.description || ""}</p>
                            {/* Select-element för att ändra status på todo, anropar updateTodoStatus med id och ny status vid ändring */}
                            <select value={todo.status} onChange={(event) => updateTodoStatus(todo._id, event.target.value as "Ej påbörjad" | "Pågående" | "Avklarad")}>
                                <option value="Ej påbörjad">Ej påbörjad</option>
                                <option value="Pågående">Pågående</option>
                                <option value="Avklarad">Avklarad</option>
                            </select>
                            {/* Knapp för att ta bort en todo */}
                            <button onClick={() => deleteOneTodo(todo._id)}>Ta bort</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
