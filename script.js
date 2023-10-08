const form = document.getElementById("item-form");
const listItem = document.getElementById("item-list");
const input = document.getElementById("item-input");
const clearBtn = document.getElementById("clear");

const createBtn = (classes) => {
  const button = document.createElement("button");
  button.className = classes;

  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
};

const addItem = (event) => {
  event.preventDefault();

  if (input.value === "") {
    alert("Please enter an item!");
    return;
  }

  const newItem = input.value;

  const li = document.createElement("li");
  const text = document.createTextNode(newItem);
  li.appendChild(text);

  const deleteBtn = createBtn("remove-item btn-link text-red");
  const deleteIcon = createIcon("fa-solid fa-xmark");

  deleteBtn.appendChild(deleteIcon);
  li.appendChild(deleteBtn);

  listItem.appendChild(li);

  input.value = "";
};

const deleteItem = (event) => {
  if (event.target.parentElement.classList.contains("remove-item")) {
    event.target.parentElement.parentElement.remove();
  }
};

const clearItems = () => {
  while (listItem.firstChild) {
    listItem.firstChild.remove();
  }
};

form.addEventListener("submit", addItem);
listItem.addEventListener("click", deleteItem);
clearBtn.addEventListener("click", clearItems);
