class Book {
  constructor(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
  }

  details() {
    return `Title: ${this.title}<br />Author: ${this.author}<br />Pages: ${this.pageCount}<br />Status: ${this.status}<br />`;
  }

  toggleStatus() {
    this.status = this.status === "read" ? "not read" : "read";
  }
}

class Library {
  constructor() {
    this.books = [theHobbit];
  }

  addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pageCount").value;

    const statusCheckbox = document.getElementById("status");
    const status = statusCheckbox.checked ? "read" : "not read";

    const newBook = new Book(title, author, pages, status);

    this.books.push(newBook);

    // should be a private method?
    this.listBooks();
  }

  // should be a private method?
  listBooks() {
    const parent = document.querySelector(".book-container");

    // clear book container
    parent.innerHTML = "";

    // set a book Id index to associate with each book
    for (let bookId = 0; bookId < this.books.length; bookId++) {
      const newCard = document.createElement("div");
      newCard.setAttribute("class", "book");
      newCard.setAttribute("id", `book${bookId}`);

      const currentBook = this.books[bookId];

      newCard.innerHTML = currentBook.details();

      // handles deleting added books
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.addEventListener("click", function () {
        // const bookId = myLibrary.books.indexOf(currentBook);
        myLibrary.books.splice(bookId, 1);

        // remove DOM element
        newCard.remove();

        // refresh book list display
        myLibrary.listBooks();
      });

      // handles toggling read status
      const toggleStatusBtn = document.createElement("button");
      toggleStatusBtn.setAttribute("type", "button");
      toggleStatusBtn.innerHTML = "Toggle Status";
      toggleStatusBtn.addEventListener("click", function () {
        currentBook.toggleStatus();
        newCard.innerHTML = console.log(currentBook.status);
        myLibrary.listBooks();
      });

      parent.appendChild(newCard);
      newCard.appendChild(deleteBtn);
      newCard.appendChild(toggleStatusBtn);
    }
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 310, "read");
const myLibrary = new Library();
const showButton = document.getElementById("showDialog");
const newBookDialog = document.getElementById("newBookDialog");
const outputBox = document.querySelector(".book-container");
const confirmBtn = newBookDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

newBookDialog.addEventListener("close", (e) => {
  outputBox.value =
    newBookDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${newBookDialog.returnValue}.`;

  // clear modal fields
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pageCount").value = "";
  document.getElementById("status").checked = false;
});

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    myLibrary.addBook();

    newBookDialog.close();
  });

myLibrary.listBooks();
