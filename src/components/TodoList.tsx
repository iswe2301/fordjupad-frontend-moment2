import "./TodoList.css"; // Importerar css-fil för styling
import { TodoListProps } from "../types/interfaces"; // Importerar interface för props

// Funktion som skapar en lista med todos, tar emot props av typen TodoListProps
const TodoList = ({ todos, loading, error, updateTodoStatus, deleteOneTodo }: TodoListProps) => {

    // Visar laddningsmeddelande om staten är true
    if (loading) return <div className="loading-container"><div className="loading"></div><p>Laddar...</p></div>;
    // Visar felmeddelande om error inte är null
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <div className="todo-container">
            <h2>Mina uppgifter</h2>
            {/* Kontrollerar om det finns todos att visa och skriver annars ut meddelande */}
            {todos.length === 0 ? (
                <p>Inga uppgifter att göra.</p>
            ) : (
                <ul className="todo-list">
                    {/* Loopar igenom todos och skriver ut de i en lista */}
                    {todos.map((todo) => (
                        <li key={todo._id} className="todo-item">
                            <div className="item-container">
                                <h3>{todo.title}</h3>
                                {/* Skriver ut beskrivning om det finns någon */}
                                <p>{todo.description || ""}</p>
                            </div>
                            <div className="item-container change-content">
                                {/* Select-element för att ändra status på todo, anropar updateTodoStatus med id och ny status vid ändring */}
                                <select value={todo.status} onChange={(event) => updateTodoStatus(todo._id, event.target.value as "Ej påbörjad" | "Pågående" | "Avklarad")}>
                                    <option value="Ej påbörjad">⭕ Ej påbörjad</option>
                                    <option value="Pågående">⏳ Pågående</option>
                                    <option value="Avklarad">✅ Avklarad</option>
                                </select>
                                {/* Knapp för att ta bort en todo */}
                                <button className="delete-btn" onClick={() => deleteOneTodo(todo._id)}> <span style={{ fontSize: "1.4rem", marginRight: "0.5rem" }}>🗑</span> Ta bort</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
