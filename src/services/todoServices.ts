// Variabel för att lagra API:ets URL
const url = "https://fordjupad-frontend-moment2-api.onrender.com";

// Skapa ett interface för en todo
export interface Todo {
    id: number;
    title: string;
    description?: string; // Frivillig sträng
    status: "Ej påbörjad" | "Pågående" | "Avklarad"; // Giltiga statusar
}

// Funktion för att hämta alla todos
export const getTodos = async () => {
    try {
        const response = await fetch(`${url}/todos`); // Hämtar alla todos från API:et
        if (!response.ok) {
            throw new Error("Något gick fel"); // Kastar ett fel om det inte går att hämta todos
        }
        return response.json(); // Returnerar alla todos som JSON
    } catch (error) {
        console.error(error); // Loggar eventuella fel
    }
};