import { Todo, NewTodo } from "../types/interfaces"; // Importerar interface för todo och ny todo

// Variabel för att lagra API:ets URL
const url = "https://fordjupad-frontend-moment2-api.onrender.com";

// Funktion för att hämta alla todos
export const getTodos = async () => {
    try {
        const response = await fetch(`${url}/todos`); // Hämtar alla todos från API:et
        if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av todos"); // Kastar ett fel om det inte går att hämta todos
        }
        return response.json(); // Returnerar alla todos som JSON
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        throw error; // Kastar ett fel
    }
};

// Funktion för att skapa en ny todo, tar emot en todo som parameter (av typen NewTodo-interface)
export const createTodo = async (todo: NewTodo) => {
    try {
        const response = await fetch(`${url}/todo`, {
            method: "POST", // Använder POST-metoden för att skapa en ny todo
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo), // Konverterar todo-objektet till JSON
        });
        if (!response.ok) {
            throw new Error("Något gick fel vid skapandet av todo"); // Kastar ett fel om det inte går att skapa en todo
        }
        const data = await response.json(); // Konverterar svaret från API:et till JSON
        return data.todo; // Returnerar den nya todon
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        throw error; // Kastar ett fel
    }
};

// Funktion för att uppdatera en todo
export const updateTodo = async (todo: Todo) => {
    try {
        const response = await fetch(`${url}/todo/${todo._id}`, {
            method: "PUT", // Använder PUT-metoden för att uppdatera en todo
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo), // Konverterar todo-objektet till JSON
        });
        if (!response.ok) {
            throw new Error("Något gick fel vid uppdatering av todo"); // Kastar ett fel om det inte går att uppdatera en todo
        }
        const data = await response.json(); // Konverterar svaret från API:et till JSON
        return data.todo; // Returnerar den uppdaterade todon
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        throw error; // Kastar ett fel
    }
};

// Funktion för att ta bort en todo
export const deleteTodo = async (_id: string) => {
    try {
        const response = await fetch(`${url}/todo/${_id}`, {
            method: "DELETE", // Använder DELETE-metoden för att ta bort en todo
        });
        if (!response.ok) {
            throw new Error("Något gick fel vid radering av todo"); // Kastar ett fel om det inte går att ta bort en todo
        }
    } catch (error) {
        console.error(error); // Loggar eventuella fel
        throw error; // Kastar ett fel
    }
};