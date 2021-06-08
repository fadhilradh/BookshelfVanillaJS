const readShelf = [];

const unreadShelf = [];

const addToShelf = () => {
   const bookTitle = document.getElementById("inputBookTitle").value;
   const bookAuthor = document.getElementById("inputBookAuthor").value;
   const bookYear = document.getElementById("inputBookYear").value;
   const isComplete = document.querySelector("#inputBookIsComplete").checked;
   const bookId = Math.floor(Math.random() * 100000);

   const bookDetails = {
      id: bookId,
      title: bookTitle,
      author: bookAuthor,
      year: bookYear,
      isComplete: isComplete,
   };

   bookDetails.isComplete
      ? readShelf.push(bookDetails)
      : unreadShelf.push(bookDetails);

   updateReadShelf();
   updateUnreadShelf();
   document.getElementById("inputBook").reset();
};

const readShelfDisplay = document.getElementById("completeBookshelfList");

const updateReadShelf = () => {
   if (readShelf.length > 0) {
      readShelfDisplay.innerHTML = readShelf.map((book) => {
         return `    <article class="book_item">
                        <h3>${book.title}</h3>
                        <p>Penulis: ${book.author}</p>
                        <p>Tahun: ${book.year}</p>
                        <button class="green" onclick="moveToUnreadShelf()">Belum Selesai dibaca</button>
                        <button class="red">Hapus buku</button>
                     </article>`;
      });
   }
   return;
};

const unReadShelfDisplay = document.getElementById("incompleteBookshelfList");

const updateUnreadShelf = () => {
   if (unreadShelf.length > 0) {
      unReadShelfDisplay.innerHTML = unreadShelf.map((book) => {
         return `     <article class="book_item">
                        <h3>${book.title}</h3>
                        <p>Penulis: ${book.author}</p>
                        <p>Tahun: ${book.year}</p>
                        <button class="green" onclick="moveToUnreadShelf()>Selesai dibaca</button>
                        <button class="red">Hapus buku</button>
                      </article>`;
      });
   }
   return;
};

const moveToUnreadShelf = () => {
   const book = document.getElementsByClassName('book_list');
   function index(el) {
      return [...el.parentElement.children].indexOf(el);
    }
    let index = index(element);

};
