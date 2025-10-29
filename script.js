const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoForm = document.querySelector("#todoForm");
const itemsLeft = document.querySelector(".itemsLeft");

const toDos = [
  { text: "Learn JS", complete: false },
  { text: "Build Projects", complete: false },
  { text: "Post on LinkedIn", complete: false },
];

function renderTodos() {
  todoList.innerHTML = "";

  toDos.forEach((todo, idx) => {
    // li
    const li = document.createElement("li");

    // div
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.gap = "10px";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.complete;
    checkbox.setAttribute("data-index", idx);

    // span
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (checkbox.checked) {
      span.classList.add("completed");
    }

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.setAttribute("data-index", idx);

    div.append(checkbox, span);
    li.append(div, deleteBtn);
    todoList.append(li);
  });

  // remaining
  const remaining = toDos.filter((todo) => !todo.complete).length;
  itemsLeft.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;
}
renderTodos();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = todoInput.value.trim();
  if (newTodo === "") return;

  toDos.push({ text: newTodo, complete: false });
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
});

todoList.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  // delete button
  if (e.target.tagName === "BUTTON") {
    toDos.splice(index, 1);
  }

  // checkbox
  if (e.target.type === "checkbox") {
    toDos[index].complete = e.target.checked;
  }

  renderTodos();
});
