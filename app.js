const form = document.querySelector(".form");

const title = form.querySelector('[name="title"]');
const author = form.querySelector('[name="author"]');
const priority = form.querySelector('[name="priority"]');
const category = form.querySelector('[name="category"]');

const errorsListEl = document.querySelector(".errors");

console.log(form);
console.log(title, author, priority, category);

form.addEventListener("submit", validate);

function validate(e) {
  e.preventDefault();
  const errors = [];

  errorsListEl.innerHTML = "";

  validateTitle(errors);
  validateAuthor(errors);
  validatePriority(errors);
  validateCategory(errors);

  console.log(errors);

  if (errors.length > 0) {
    renderErrors(errors);
  } else {
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
