const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const searchInput = document.querySelector("#search-input");
const clearAllButton = document.querySelector("#clear-all");

const notes = [];
let nextNoteId = 1;

function saveNotes() {
    localStorage.setItem("quick-notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem("quick-notes");

    if (!savedNotes) {
        return;
    }

    const parsedNotes = JSON.parse(savedNotes);
    notes.push(...parsedNotes);

    if (notes.length > 0) {
        nextNoteId =
            Math.max(...notes.map((note) => note.id)) + 1;
    }
}

function renderNotes() {
    notesList.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchText)
    );

    filteredNotes.forEach((note) => {
        const noteCard = document.createElement("li");

        // Add the category class for CSS styling
        noteCard.classList.add(note.category.toLowerCase());

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
                saveNotes();
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

    if (searchText && filteredNotes.length === 0) {
        const noMatches = document.createElement("li");
        noMatches.textContent = "No notes match your search.";
        notesList.append(noMatches);
    }

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

    // Empty note validation
    if (!text) {
        errorMessage.textContent = "Please type a note first.";
        noteInput.focus();
        return;
    }

    // 200 character validation
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
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

    saveNotes();
    renderNotes();
});

searchInput.addEventListener("input", renderNotes);

clearAllButton.addEventListener("click", () => {
    if (confirm("Delete all notes?")) {
        notes.length = 0;
        saveNotes();
        renderNotes();
    }
});

loadNotes();
renderNotes();