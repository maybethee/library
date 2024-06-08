
document.addEventListener('DOMContentLoaded', function() {

  console.log("Hello World")


  const myLibrary = [];
  
  function Book(title, author, pageCount, status) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.status = status;
  };
      
  const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkein', 310, 'read');
  
  myLibrary.push(theHobbit);
      
  function addBookToLibrary() {
    // do stuff here
      let title = prompt("enter a new book title")
      let author = prompt("who wrote that book?")
      let pages = prompt("how long is the book (in pages)")
      let status = prompt("have you finished the book? (read/not read yet)")
    
    // console.log(title)
  
    newBook = new Book(title, author, pages, status)
  
    myLibrary.push(newBook)
  };
  
  addBookToLibrary()
  
  for (let book in myLibrary) {
  
    const newCard = document.createElement("div");
    const parent = document.querySelector("#book-container");
    
    let currentBook = myLibrary[book];

    newCard.innerHTML = currentBook.title + " by " + currentBook.author + ", " + currentBook.pageCount + " pages, " + currentBook.status;

    parent.appendChild(newCard);
  
    // console.log(myLibrary[book])
  };
  
  

})

