const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

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
            const noteIndex = notes.findIndex((item) => item.id === note.id);

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

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();

    if (!text) {
        errorMessage.textContent = "Please type a note first.";
        noteInput.focus();
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        noteInput.focus();
        return;
    }

    notes.push({
        id: nextNoteId++,
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    });

    errorMessage.textContent = "";
    noteInput.value = "";

    renderNotes();
});

renderNotes();