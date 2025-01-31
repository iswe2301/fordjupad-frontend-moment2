import "./TodoForm.css"; // Importerar css-filen för TodoForm
import { useState } from "react"; // Importerar useState från react
import * as Yup from "yup"; // r Yup från biblioteket yup
import { createTodo } from "../services/todoServices"; // Importerar funktionen för att skapa en ny todo
import { TodoFormProps, FormData, ErrorsData } from "../types/interfaces"; // Importerar interface för props, formulärdata och felmeddelanden

// Komponent för att skapa en ny todo, tar emot addTodo som prop (av typen TodoFormProps)
const TodoForm = ({ addTodo }: TodoFormProps) => {

    // Valideringsschema med Yup
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Titeln måste vara minst 3 tecken lång")
            .required("Du måste ange en titel"),
        description: Yup.string()
            .max(200, "Beskrivningen får max vara 200 tecken"),
        status: Yup.string()
            .oneOf(["Ej påbörjad", "Pågående", "Avklarad"], "Ogiltig status") // Tillåtna värden för status
    });

    // State för formulärdata
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        status: "Ej påbörjad",
    });

    // State för felmeddelanden
    const [errors, setErrors] = useState<ErrorsData>({});

    // Funktion som anropas när formuläret skickas
    const submitForm = async (event: any) => {
        event.preventDefault(); // Förhindra att sidan laddas om
        try {
            await validationSchema.validate(formData, { abortEarly: false }); // Validera hela formuläret
            const newTodo = await createTodo(formData); // Skapa en ny todo med datan från formuläret
            addTodo(newTodo); // Lägg till den nya todon i listan med todos (state)
            setFormData({ title: "", description: "", status: "Ej påbörjad" }); // Nollställ formuläret (uppdatera state)
            setErrors({}); // Rensa felmeddelanden
        } catch (error) {
            // Skapa ett tomt objekt för felmeddelanden av typen ErrorsData
            const validationErrors: ErrorsData = {};
            // Kontrollera om errors är av typen Yup.ValidationError
            if (error instanceof Yup.ValidationError) {
                // Loopa igenom alla valideringsfel och skapa felmeddelanden
                error.inner.forEach((err) => {
                    const prop = err.path as keyof ErrorsData; // Konvertera error.path till en nyckel av typen ErrorsData
                    validationErrors[prop] = err.message; // Sätt felmeddelandet för fältet
                });
                // Uppdatera state med felmeddelanden
                setErrors(validationErrors);
            } else {
                console.error("Fel vid skapande av todo:", error); // Logga eventuella fel
                setErrors({ title: "Något gick fel vid skapandet av todo" }); // Uppdatera state med felmeddelande
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Skapa ny uppgift</h2>
            {/* Formulär för att skapa en ny todo, anropa submitForm vid submit */}
            <form className="todo-form" onSubmit={submitForm}>
                <div>
                    <label htmlFor="title">Titel</label>
                    {/* Input-fält för titel, uppdaterar state vid ändring */}
                    <input type="text" id="title" placeholder="Ange en titel"value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                    {/* Visa felmeddelande för titel om det finns något */}
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div>
                    <label htmlFor="description">Beskrivning</label>
                    {/* Textarea för beskrivning, uppdaterar state vid ändring */}
                    <textarea id="description" placeholder="Beskriv din uppgift..."rows={5} value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} />
                    {/* Visa felmeddelande för beskrivning om det finns något */}
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div>
                    <label htmlFor="status">Status</label>
                    {/* Select för status, uppdaterar state vid ändring med vald status */}
                    <select id="status" value={formData.status} onChange={(event) => setFormData({ ...formData, status: event.target.value as "Ej påbörjad" | "Pågående" | "Avklarad" })}>
                        <option value="Ej påbörjad">⭕ Ej påbörjad</option>
                        <option value="Pågående">⏳ Pågående</option>
                        <option value="Avklarad">✅ Avklarad</option>
                    </select>
                    {/* Visa felmeddelande för status om det finns något */}
                    {errors.status && <span className="error-message">{errors.status}</span>}
                </div>
                {/* Knapp för att skicka formuläret */}
                <button type="submit">📌 Spara uppgift</button>
            </form>
        </div>
    );
};

export default TodoForm;
