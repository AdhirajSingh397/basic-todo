import { useState } from "react";

export default function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            const response = await fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({ title, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                // Handle any server errors
                const errorText = await response.text();
                throw new Error(`Server Error: ${errorText}`);
            }

            const json = await response.json();
            alert("Todo added successfully!");

            // Clear input fields after successful submission
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo. Please try again.");
        }
    };

    return (
        <div>
            <input
                id="title"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            /> <br />
            <input
                id="description"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            /> <br />
 
            <button onClick={handleAddTodo}>Add a todo</button>
        </div>
    );
}
