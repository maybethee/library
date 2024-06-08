
document.addEventListener('DOMContentLoaded', function() {

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

    addBookToLibrary()
  
    newBookDialog.close();
  });

  function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
    };  
        
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

    listBooks()
  };

  function listBooks() {

    const parent = document.querySelector(".book-container");
    
    parent.innerHTML = '';   
    
    for (let book in myLibrary) {
      const newCard = document.createElement("div");

      newCard.setAttribute("class", "book");
      
      let currentBook = myLibrary[book];
      
      newCard.innerHTML = `Title: ${currentBook.title}<br />Author: ${currentBook.author}<br />Pages: ${currentBook.pageCount}<br />Status: ${currentBook.status}`

      parent.appendChild(newCard);
    };
  };

  listBooks()
});

