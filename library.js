
document.addEventListener('DOMContentLoaded', function() {
  
  function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
  };  

  Book.prototype.details = function() {
    return `Title: ${this.title}<br />Author: ${this.author}<br />Pages: ${this.pageCount}<br />Status: ${this.status}<br />`;
  };

  Book.prototype.toggleStatus = function() {
    this.status = this.status === 'read' ? 'not read' : 'read';
  };

  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 310, 'read');
  const myLibrary = [theHobbit];  

  const showButton = document.getElementById("showDialog");
  const newBookDialog = document.getElementById("newBookDialog");
  const outputBox = document.querySelector(".book-container");
  const confirmBtn = newBookDialog.querySelector("#confirmBtn")

  showButton.addEventListener("click", () => {
    newBookDialog.showModal();
  });

  newBookDialog.addEventListener("close", (e) => {
    outputBox.value = 
      newBookDialog.returnValue === "default"
        ? "No return value."
        : `ReturnValue: ${newBookDialog.returnValue}.`;
  });

  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();

    addBookToLibrary();
  
    newBookDialog.close();
  });

        
  function addBookToLibrary() {
    // do stuff here
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pageCount").value;

    let statusCheckbox = document.getElementById("status");
    let status = statusCheckbox.checked ? 'read' : 'not read';

    let newBook = new Book(title, author, pages, status)

    console.log(newBook);

    myLibrary.push(newBook);

    listBooks();
  };

  function listBooks() {
    const parent = document.querySelector(".book-container");
    
    // clear book container
    parent.innerHTML = '';

    // set a book Id index to associate with each book
    for (let bookId = 0; bookId < myLibrary.length; bookId++) {

      const newCard = document.createElement("div");
      newCard.setAttribute("class", "book");
      newCard.setAttribute("id", `book${bookId}`);
      
      let currentBook = myLibrary[bookId];

      newCard.innerHTML = currentBook.details()

      // handles deleting added books
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.innerHTML = "Delete";
      deleteBtn.addEventListener("click", function() {
        myLibrary.splice(bookId, 1);

        // remove DOM element
        newCard.remove();

        // refresh book list display
        listBooks();
      });

      // handles toggling read status
      const toggleStatusBtn = document.createElement("button");
      toggleStatusBtn.setAttribute("type", "button");
      toggleStatusBtn.innerHTML = 'Toggle Status';
      toggleStatusBtn.addEventListener("click", function() {
        currentBook.toggleStatus();
        newCard.innerHTML = 
        console.log(currentBook.status);
        listBooks();
      })

      parent.appendChild(newCard);
      newCard.appendChild(deleteBtn);
      newCard.appendChild(toggleStatusBtn);
    };
  };
  listBooks();
});

