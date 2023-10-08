const form = document.getElementById("item-form");
const listItem = document.getElementById("item-list");
const input = document.getElementById("item-input");
const clearBtn = document.getElementById("clear");
const filterInput = document.getElementById("filter");

const checkUI = () => {
  const listOfItems = listItem.querySelectorAll("li");

  if (listOfItems.length === 0) {
    filterInput.style.display = "none";
    clearBtn.style.display = "none";
  } else {
    filterInput.style.display = "block";
    clearBtn.style.display = "block";
  }
};

checkUI();

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

  checkUI();
};

const deleteItem = (event) => {
  if (event.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();
    }
  }

  checkUI();
};

const clearItems = () => {
  if (confirm("Are you sure want to delete all the items?")) {
    while (listItem.firstChild) {
      listItem.firstChild.remove();
    }

    checkUI();
  }
};

form.addEventListener("submit", addItem);
listItem.addEventListener("click", deleteItem);
clearBtn.addEventListener("click", clearItems);
