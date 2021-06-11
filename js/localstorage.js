let books = [];
const STORAGE_KEY = "BOOKSHELF_APPS";

const checkStorageExistence = () => {
    if (typeof(Storage) !== undefined) {
        return true
    }
    alert("Browser Anda tidak mendukung local storage");
    return false;
}

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil tersimpan di local storage.");
});

const addDataToStorage = () =>  {
    const parsedData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsedData);
    document.dispatchEvent(new Event("ondatasaved"));
}

const updateStorageData = () =>  {
    if (checkStorageExistence())
        addDataToStorage();
}

const findBook = (bookId) =>  {
    for (book of books) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

const findBookIndex = (bookId) => {
    let index = 0
    for (book of books) {
        if (book.id === bookId)
            return index;
        index++;
    }
    return -1;
}

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null) {
        books = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

const createBookObject = (title, author, year, isCompleted) => {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted
    };
}

const refreshBookData = () =>{
    const unreadList = document.getElementById(UNCOMPLETED_BOOKS_LIST);
    let readList = document.getElementById(COMPLETED_BOOKS_LIST);

    for (book of books) {
        const newBook = createBookDOM(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if (book.isCompleted == true) {
            readList.append(newBook);
        } else {
            unreadList.append(newBook);
        }
    }
}

