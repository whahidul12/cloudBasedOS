"use strict";

// ?ALL SELECTOR =======================================
const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoList = document.querySelector(".todoList");
const filterOptions = document.querySelector("#filterTodo");
// ?ALL SELECTOR =======================================

// ?ALL EVENT LISTINER =================================
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOptions.addEventListener("click", filterTodo);
// ?ALL EVENT LISTINER =================================

// ?ALL FUNCTIONS ======================================
function addTodo() {
  // TODO: CREATE A TODO DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // TODO: CREATE A LIST (li)

  const newList = document.createElement("li");
  newList.innerText = todoInput.value;
  newList.classList.add("todoItem");
  todoDiv.appendChild(newList);

  // TODO: CREATE A COMPLETE BUTTON

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
  completeButton.classList.add("completeButton");
  todoDiv.appendChild(completeButton);

  // TODO: CREATE A TRASH BUTTON

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trashButton");
  todoDiv.appendChild(trashButton);

  // TODO: APPEND TO MIAN TODO-LIST

  todoList.appendChild(todoDiv);

  // TODO: TO CLEAR THE INPUT EREA

  todoInput.value = "";
}

function deleteCheck(e) {
  console.log(e.target);
  const item = e.target;

  if (item.classList[0] === "trashButton") {
    const action = item.parentElement;
    action.classList.add("fallAnimetion");
    action.addEventListener("transitionend", function () {
      action.remove();
    });
  }
  if (item.classList[0] === "completeButton") {
    const action = item.parentElement;
    action.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    const todoList = document.querySelectorAll(".todo");
    switch (e.target.value) {
      case "all":
        console.log("hi");
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
// ?ALL FUNCTIONS ======================================
