// all error handling function
const errorHandle = (name, task) => {
  name.style.display = task;
};
// error
const noValue = document.getElementById('error');
errorHandle(noValue, 'none');
const noResult = document.getElementById('no-result');
errorHandle(noResult, 'none');
// books number
const booksFound = document.getElementById('books-found');
// books container
const booksContainer = document.getElementById('book-display');

document.getElementById('button-addon2').addEventListener('click', async () => {
  const searchField = document.getElementById('search-field');
  const searchValue = searchField.value;
  // clear search field and result div
  searchField.value = '';
  errorHandle(booksContainer, 'none');
  errorHandle(booksFound, 'none');
  errorHandle(noResult, 'none');

  if (searchValue === '') {
    errorHandle(noValue, 'block');
    errorHandle(booksFound, 'none');
  } else {
    noValue.style.display = 'none';
    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    //number of books found
    errorHandle(booksFound, 'block');
    booksFound.innerText = `Books Found: ${data.numFound}`;
    displayBooks(data.docs);
  }
});

// =============display book function
const displayBooks = (books) => {
  booksContainer.textContent = '';
  if (books.length === 0) {
    errorHandle(noResult, 'block');
    errorHandle(booksFound, 'none');
  } else {
    const booksLimit = books.slice(0, 25);
    booksLimit.forEach((book) => {
      errorHandle(noResult, 'none');
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('col');
      bookDiv.innerHTML = `
     <div class="card h-100">
      <img height="500" src="https://covers.openlibrary.org/b/id/${
        book.cover_i
      }-M.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Book Name: ${book.title}</h5>
        <h6 class="card-title">Author Name: ${
          book.author_name ? book.author_name : 'No info'
        }</h6>
        <h6 class="card-text text-info">Publisher: ${
          book.publisher ? book.publisher[0] : 'No info'
        }</h6>
        <h6 class="card-text">1st publish year: ${
          book.first_publish_year ? book.first_publish_year : 'No info'
        }</h6>
      </div>
    </div>
    `;
      booksContainer.appendChild(bookDiv);
      errorHandle(booksContainer, 'flex');
    });
  }
};
