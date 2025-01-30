// Interface för en befintlig todo
export interface Todo {
    _id: string;
    title: string;
    description?: string; // Frivillig sträng
    status: "Ej påbörjad" | "Pågående" | "Avklarad"; // Giltiga statusar
}

// Interface för en ny todo (utan id)
export interface NewTodo {
    title: string;
    description?: string; // Frivillig sträng
    status: "Ej påbörjad" | "Pågående" | "Avklarad"; // Giltiga statusar
}

// Interface för en todo
export interface TodoFormProps {
    addTodo: (newTodo: Todo) => void; // Funktion för att lägga till en ny todo
}

// Interface för formulärdata
export interface FormData {
    title: string;
    description: string;
    status: "Ej påbörjad" | "Pågående" | "Avklarad"; // Giltiga statusar
}

// Tnterface för felmeddelanden
export interface ErrorsData {
    title?: string;
    description?: string;
    status?: string;
}

// Interface för props
export interface TodoListProps {
    todos: Todo[]; // Array med todos
    loading: boolean; // Boolean för laddning
    error: string | null; // Sträng eller null för felmeddelanden
    updateTodoStatus: (_id: string, newStatus: "Ej påbörjad" | "Pågående" | "Avklarad") => void; // Funktion för att uppdatera en todos status
    deleteOneTodo: (_id: string) => void; // Funktion för att ta bort en todo
}