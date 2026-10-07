const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const clearAllButton = document.querySelector("#clear-all");

const notes = [];
let nextNoteId = 1;

function renderNotes() {
    notesList.replaceChildren();

    notes.forEach((note) => {
        const noteCard = document.createElement("li");

        const noteText = document.createElement("p");
        noteText.textContent = note.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = note.category;

        const createdAt = document.createElement("p");
        createdAt.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            const noteIndex = notes.findIndex(
                (item) => item.id === note.id
            );

            if (noteIndex !== -1) {
                notes.splice(noteIndex, 1);
                renderNotes();
            }
        });

        noteCard.append(
            noteText,
            categoryLabel,
            createdAt,
            deleteButton
        );

        notesList.append(noteCard);
    });
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = {
        id: nextNoteId++,
        text: noteInput.value,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    noteInput.value = "";

    renderNotes();
});

clearAllButton.addEventListener("click", () => {
    if (confirm("Delete all notes?")) {
        notes.length = 0;
        renderNotes();
    }
});