const addNoteButton = document.getElementById("addNoteButton");
const noteModal = document.getElementById("noteModal");
const saveNoteButton = document.getElementById("saveNoteButton");
const closeModalButton = document.getElementById("closeModalButton");
const notesContainer = document.getElementById("notesContainer");
const noteInput = document.getElementById("noteInput");

let notes = [];

// Open the modal to add a new note
addNoteButton.addEventListener("click", () => {
  noteInput.value = "";
  noteModal.style.display = "flex";
});

// Save note and add it to the list
saveNoteButton.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText) {
    notes.push(noteText);
    updateNotes();
    closeModal();
  }
});

// Close the modal
closeModalButton.addEventListener("click", closeModal);

function closeModal() {
  noteModal.style.display = "none";
}

// Update notes display
function updateNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";

    const noteText = document.createElement("p");
    noteText.textContent = note;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑";
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      deleteNote(index, noteElement);
    };

    noteElement.appendChild(noteText);
    noteElement.appendChild(deleteButton);
    notesContainer.appendChild(noteElement);
  });
}

// Delete a note with animation
function deleteNote(index, noteElement) {
  noteElement.classList.add("fade-out"); // Start fade-out animation
  setTimeout(() => {
    notes.splice(index, 1);
    updateNotes();
  }, 300); // Delay to let the animation complete
}
