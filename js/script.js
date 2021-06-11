const UNCOMPLETED_BOOKS_LIST = "books";
const COMPLETED_BOOKS_LIST = "completed-books";
const BOOK_ITEMID = "itemId";

document.addEventListener("DOMContentLoaded", function() {
    const submitForm = document.getElementById("form");
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBookToShelf();
        submitForm.reset();
    });
    if (checkStorageExistence()) {
        loadDataFromStorage();
    }
});


document.addEventListener("ondataloaded", () => {
    refreshBookData();
});

const createBookDOM = (data, author, year, isCompleted) => {

    const titleText = document.createElement("h3");
    titleText.innerText = data;

    const authorText = document.createElement("h5");
    authorText.innerText = author;

    const yearText = document.createElement("p");
    yearText.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(titleText, authorText, yearText);

    const container = document.createElement("div");
    container.classList.add("item")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

const createTrashButton = () => {
    return createButton("trash-button", function(event) {
        removeBookFromReadShelf(event.target.parentElement);
    });
}

const createCheckButton = () => {
    return createButton("check-button", function(event) {
        moveBookToReadShelf(event.target.parentElement);
    });
}

const createUndoButton = () => {
    return createButton("undo-button", function(event) {
        moveBookToUnreadShelf(event.target.parentElement);
    });
}

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}


const addBookToShelf = () => {
    const checkbox = document.getElementById("inputBookIsComplete");
    if (checkbox.checked == true) {
        const completedBOOKList = document.getElementById(COMPLETED_BOOKS_LIST);
        const textBook = document.getElementById("title").value;
        const authorText = document.getElementById("author").value;
        const year = document.getElementById("year").value;
        const book = createBookDOM(textBook, authorText, year, true);
        const bookObject = createBookObject(textBook, authorText, year, true);
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        completedBOOKList.append(book);
        updateStorageData();
    } else {
        const uncompletedBOOKList = document.getElementById(UNCOMPLETED_BOOKS_LIST);
        const textBook = document.getElementById("title").value;
        const authorText = document.getElementById("author").value;
        const year = document.getElementById("year").value;
        const book = createBookDOM(textBook, authorText, year, false);
        const bookObject = createBookObject(textBook, authorText, year, false);
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        uncompletedBOOKList.append(book);
        updateStorageData();
    }
}

const moveBookToReadShelf = (bookElement) => {
    const readList = document.getElementById(COMPLETED_BOOKS_LIST);
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h5").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBook = createBookDOM(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    readList.append(newBook);
    bookElement.remove();

    updateStorageData();
}

const removeBookFromReadShelf = (bookElement) => {
    const bookIndex = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookIndex, 1);
    bookElement.remove();
    updateStorageData();
}

const moveBookToUnreadShelf = (bookElement) => {
    const checkbox = document.getElementById("inputBookIsComplete").checked = false;
    const unreadList = document.getElementById(UNCOMPLETED_BOOKS_LIST);
    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h5").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBook = createBookDOM(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    unreadList.append(newBook);
    bookElement.remove();
    updateStorageData();
}