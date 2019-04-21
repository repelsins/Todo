const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "linethrough";

// Array for storing data

let LIST, id;

// get item from localstorage

let data = localStorage.getItem("TODO");

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

// load items

function loadList(array) {
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash, item.date);
  });
}

// clear local storage

clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

// Show date

const date = moment();
const fullDate = moment(date).format("dddd, Do MMMM");

dateElement.innerHTML = fullDate;

// Add to Do function

function addToDo(toDo, id, done, trash, date) {
  if (trash) {
    return;
  }
  var timeAgo = moment(date).fromNow();
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
    <i class="co far ${DONE}" job="complete" id="${id}"></i>
    <p class="text ${LINE}"> ${toDo}</p> <span class="time">${timeAgo}</span>
    <i class="de fa fa-trash" job="delete" id="${id}"></i>
    </li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    var date = moment();

    if (toDo) {
      addToDo(toDo, id, false, false, date);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
        date: date
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

document.getElementById("add").addEventListener("click", function(event) {
  const toDo = input.value;
  var date = moment();

  if (toDo) {
    addToDo(toDo, id, false, false, date);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false,
      date: date
    });

    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
  }
  input.value = "";
});

// Checked complete

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Unchecked

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  // LIST[element.id].trash = true;
  LIST.splice(element.id);
}

// targed the items created dinamicaly

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value; // delete or complete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  localStorage.setItem("TODO", JSON.stringify(LIST));
});
