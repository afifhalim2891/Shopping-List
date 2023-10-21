const form = document.getElementById("item-form");
const formBtn = form.querySelector("button");
const listItem = document.getElementById("item-list");
const input = document.getElementById("item-input");
const clearBtn = document.getElementById("clear");
const filterInput = document.getElementById("filter");

let isEditing = false;

//CHECK UI
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

//CREATE BUTTON ELEMENT
const createBtn = (classes) => {
  const button = document.createElement("button");
  button.className = classes;

  return button;
};

//CREATE ICON ELEMENT
const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;

  return icon;
};

//CREATE LI BASED ON DATA & ADD TO UL
const createDOMItem = (item) => {
  const li = document.createElement("li");
  const text = document.createTextNode(item);
  li.appendChild(text);

  const deleteBtn = createBtn("remove-item btn-link text-red");
  const deleteIcon = createIcon("fa-solid fa-xmark");
  deleteBtn.appendChild(deleteIcon);

  li.appendChild(deleteBtn);

  listItem.appendChild(li);
};

//GET ITEM FROM LOCAL STORAGE
const getItemsFromLocalStorage = () => {
  let itemStorage;

  if (localStorage.getItem("items") === null) {
    itemStorage = [];
  } else {
    itemStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemStorage;
};

//SAVE ITEMS TO LOCAL STORAGE
const saveToLocalStorage = (item) => {
  localStorage.setItem("items", JSON.stringify(item));
};

//DELETE FROM LOCAL STORAGE
const deleteItemFromLocalStorage = (deletedItem) => {
  const items = getItemsFromLocalStorage();

  if (items.length === 0) return;

  const filteredItem = items.filter((item) => item !== deletedItem);

  saveToLocalStorage(filteredItem);
};

//GET ITEMS WHEN PAGE LOAD
const loadItemsHandler = () => {
  const items = getItemsFromLocalStorage();

  items.forEach((item) => {
    createDOMItem(item);
  });

  checkUI();
};

//ADD ITEMS
const addItem = (event) => {
  event.preventDefault();

  if (input.value === "") {
    alert("Please enter an item!");
    return;
  }

  const newItem = input.value;

  if (isEditing) {
    const editedItem = listItem.querySelector(".edit-mode");
    deleteItemFromLocalStorage(editedItem.firstChild.textContent);
    editedItem.remove();
  }

  const itemStorage = getItemsFromLocalStorage();

  //CHECK IF ITEM IS ALREADY EXIST

  console.log(itemStorage.indexOf(newItem));
  if (itemStorage.indexOf(newItem) > -1) {
    alert(`${newItem} is already exist!`);
    return;
  }

  itemStorage.push(newItem);
  saveToLocalStorage(itemStorage);

  createDOMItem(newItem);
  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.backgroundColor = "#000";

  input.value = "";

  checkUI();
};

//DELETE ITEM
const deleteItem = (item) => {
  item.remove();
};

//EDIT ITEM
const editItem = (item) => {
  isEditing = true;

  const items = item.parentElement.querySelectorAll("li");
  items.forEach((item) => {
    item.classList.remove("edit-mode");
  });

  item.classList.add("edit-mode");

  input.value = item.textContent;

  formBtn.innerHTML = `<i class="fa-solid fa-pencil"></i> Edit Item`;
  formBtn.style.backgroundColor = "#2ecc71";
};

//ONCLICK ITEM
const onClickItem = (event) => {
  const items = getItemsFromLocalStorage();

  if (event.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      //DELETEM ITEM
      deleteItem(event.target.parentElement.parentElement);
      const deletedItem =
        event.target.parentElement.parentElement.firstChild.textContent;
      deleteItemFromLocalStorage(deletedItem);
    }
  } else {
    //EDIT ITEM
    if (event.target.tagName === "LI") {
      editItem(event.target);
    }
  }

  checkUI();
};

//CLEAR ITEM
const clearItems = () => {
  if (confirm("Are you sure want to delete all the items?")) {
    while (listItem.firstChild) {
      listItem.firstChild.remove();
    }

    localStorage.clear();

    checkUI();
  }
};

//FILTER ITEM
const filterItem = (event) => {
  const text = event.target.value.toLowerCase();

  const listOfItems = listItem.querySelectorAll("li");

  listOfItems.forEach((li) => {
    const item = li.firstChild.textContent.toLowerCase();

    if (item.indexOf(text) !== -1) {
      //IF ITEM EXIST
      li.style.display = "flex";
    } else {
      //IF ITEM DONT EXIST
      li.style.display = "none";
    }
  });
};

//INITIALIZE
const init = () => {
  form.addEventListener("submit", addItem);
  listItem.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  filterInput.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", loadItemsHandler);
};

init();
