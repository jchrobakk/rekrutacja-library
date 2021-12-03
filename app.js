const form = document.querySelector(".form");

const title = form.querySelector('[name="title"]');
const author = form.querySelector('[name="author"]');
const priority = form.querySelector('[name="priority"]');
const category = form.querySelector('[name="category"] select');

const errorsListEl = document.querySelector(".errors");

console.log(form);
console.log(title, author, priority, category);

form.addEventListener("submit", validate);

if (localStorage.getItem("books") !== null) {
  renderBooks(JSON.parse(localStorage.getItem("books")));
} else {
  localStorage.setItem("books", JSON.stringify([]));
}

function validate(e) {
  e.preventDefault();
  const errors = [];

  errorsListEl.innerHTML = "";

  validateTitle(errors);
  validateAuthor(errors);
  validatePriority(errors);
  validateCategory(errors);

  if (errors.length > 0) {
    renderErrors(errors);
  } else {
    const book = {
      title: title.value,
      author: author.value,
      priority: priority.value,
      category: category.value,
    };

    pushBookToStorage(book);
  }
}

function validateTitle(errors) {
  if (title.value.length < 1) {
    errors.push("Title is too short");
  }
}

function validateAuthor(errors) {
  if (author.value.length < 3) {
    errors.push("Author is too short");
  }
}

function validatePriority(errors) {
  if (priority.value < 1 || priority.value > 5) {
    errors.push("Priority must be between 1 and 5");
  }
}

function validateCategory(errors) {
  if (category.value === "") {
    errors.push("Category is required");
  }
}

function renderErrors(errors) {
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error;
    li.classList.add("errors__item");
    errorsListEl.appendChild(li);
  });
}

function pushBookToStorage(book) {
  const books = JSON.parse(localStorage.getItem("books"));
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  form.reset();
  renderBooks(books);
}

function renderBooks(books) {
  const booksListEl = document.querySelector(".books");
  clearList(booksListEl);

  const prototype = document.querySelector(".book--prototype");
  console.log(prototype);
  books.forEach((book) => {
    const li = prototype.cloneNode(true);

    li.classList.remove("book--prototype");
    li.querySelector(".book__title").textContent = book.title;
    li.querySelector(".book__author").textContent = book.author;
    li.querySelector(".book__priority").textContent = book.priority;
    li.querySelector(".book__category").textContent = book.category;

    booksListEl.appendChild(li);
  });
}

function clearList(list) {
  while (list.children.length > 1) {
    list.removeChild(list.lastChild);
  }
}
