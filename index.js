const myLibrary = [];
const Library = document.querySelector(".library");
const AddBook = document.querySelector(".add");
const showform = document.querySelector(".form");
const form = document.querySelector("form");
const btnreadornot = document.querySelector("input[name='read']");

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype = {
  info() {
    return `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  },
  toggleread() {
    if (this.read === "not read") this.read = "read";
    else this.read = "not read";
    return this.read;
  },
};

function addBookToLibrary(bookToAdd) {
  // do stuff here
  myLibrary.push(bookToAdd);
}

function Display() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const div = document.createElement("div");
    div.classList = "book";
    div.innerHTML = `<h2>${myLibrary[i].title}</h2><h3>by ${myLibrary[i].author}</h3><p>${myLibrary[i].pages} pages</p><button onclick="readnotread(this)" data-=${i} class="read btn">${myLibrary[i].read}</button><button class="remove" onclick="removebook(this)" data-=${i}>remove</button>`;
    Library.appendChild(div);
  }
}

function readornot() {
  btnreadornot.addEventListener("click", (e) => {
    if (e.target.value === "read") e.target.value = "not read";
    else e.target.value = "read";
  });
}

function addBook() {
  AddBook.addEventListener("click", () => {
    showform.style.scale = 1;
  });
}

function submit() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newBook = new Book(
      e.srcElement[0].value,
      e.srcElement[1].value,
      e.srcElement[2].value,
      e.srcElement[3].value
    );
    addBookToLibrary(newBook);
    showform.style.scale = 0;
    e.srcElement[0].value = "";
    e.srcElement[1].value = "";
    e.srcElement[2].value = "";
    e.srcElement[3].value = "read";
    while (Library.lastChild !== null) Library.removeChild(Library.lastChild);
    Display();
  });
}

// eslint-disable-next-line no-unused-vars
function removebook(e) {
  myLibrary.splice(e.getAttribute("data-"), 1);
  while (Library.lastChild !== null) Library.removeChild(Library.lastChild);
  Display();
}

// eslint-disable-next-line no-unused-vars
function readnotread(e) {
  const status = myLibrary[e.getAttribute("data-")].toggleread();
  if (status === "not read") {
    e.classList.remove("read");
    e.textContent='not read';
  }else{
    e.classList.add("read");
    e.textContent = "read";
  }
}

addBook();
readornot();
submit();
