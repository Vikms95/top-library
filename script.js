const cardsContainerReference = document.querySelector(".cards-container");
const newBookButtonReference = document.querySelector(".new-book");

//List of pre-included books to show the UI
const theHobbit = new Book("Hobbit","Tolkien","310",false);
const harryPotter = new Book("Harry Potter","Rowling","223",true);
const donQuijote = new Book("Don Quijote","Cervantes","594",true);
const annaKarenina = new Book("Anna Karenina","Tolstoi","656", false);
const toKillAMockingbirg = new Book("To Kill a Mockingbirg","Lee","281", false);
const theGreatGatsby = new Book ("The Great Gatsby","Fitzgerald","218", false);
const oneHundredYears = new Book ("One Hundred Years of Solitude","Garcia Marquez","471", true);
const tirantLoBlanc = new Book("Tirant Lo Blanc","Martorell","249",true);
const murderInTheOrientExpress = new Book("Murder in The Orient Express","Christie","252",true);
const romeoAndJuliet = new Book("Romeo and Juliet","Shakespeare","153",true);
const laVidaEsSueno = new Book("La Vida es Sueño","Calderón de la Barca","163",true);
const aroundTheWorldIn80Days = new Book("Around the World in 80 Days","Verne","342",true);
const aConfederacyOfDunces = new Book("A Confederacy of Dunces","Kennedy Toole","362",false)
const hamlet = new Book("Hamlet","Shakespeare","104",true);
const priceAndPrejudice = new Book("Pride and Prejudice","Austen","432",false);

let myLibrary = [
	theHobbit,
	harryPotter,
	aroundTheWorldIn80Days,
	tirantLoBlanc,
	donQuijote,
	annaKarenina,
	romeoAndJuliet,
	hamlet,
	priceAndPrejudice,
	murderInTheOrientExpress,
	toKillAMockingbirg,
	laVidaEsSueno,
	theGreatGatsby,
	aConfederacyOfDunces,
	oneHundredYears,
	hamlet
];

updateExistingLibrary(myLibrary);
addEventListenerNewButton();
addEventListenerAddBook();

function Book(title, author, pages, readState){   
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState
    this.displayBookInfo = function(){
        return this.title 
                + " by " + this.author 
                + ", has " + this.pages + " pages, " 
                + " and right now it's state is: "

    }; 
};

function updateExistingLibrary(myLibrary){
    let div;

    if(Array.isArray(myLibrary)){
        myLibrary.forEach(book => {
            div = addBookToDiv(book);
            addReadButton(div,book);
            addRemoveButton(div);
        })
    }
    else
    {
        div = addBookToDiv(myLibrary);
        addReadButton(div,myLibrary);
        addRemoveButton(div);
    }
};

function addEventListenerNewButton(){
    newBookButtonReference.addEventListener("click", () => {
        const formDiv = document.querySelector('form')
        formDiv.classList.toggle('active')
    });
};

function addEventListenerAddBook(){
  const submitButton = document.querySelector('.form-button')
  const formDiv = document.querySelector('form')
  submitButton.addEventListener('click',()=>{
    const bookTitle = document.getElementById('title').value
    const bookAuthor = document.getElementById('author').value
    const bookPages = document.getElementById('pages').value
    const bookReadState = document.getElementById('read-state').checked
    const bookToAdd = addBookToLibraryList(bookTitle,bookAuthor,bookPages,bookReadState)
    updateExistingLibrary(bookToAdd)
    formDiv.classList.toggle('active')
  })  
}

function addBookToLibraryList(bookTitle,bookAuthor,bookPages,bookReadState){
  const book = new Book(bookTitle,bookAuthor,bookPages,bookReadState);
  myLibrary.push(book);
  return book;
};

function addBookToDiv(book){
    const div = cardsContainerReference.appendChild(document.createElement("div"));
    div.classList.add("book");
    div.textContent = book.displayBookInfo();
    return div;
};

function addReadButton(div,book){
    const readButton = div.appendChild(document.createElement("button"));
    readButton.classList.add("read-button");
    readButton.textContent = book.readState === true ? 'Read' : 'Unread' 
	if(book.readState === false){
		// readButton.textContent = "Unread";
		readButton.style.color = "red";
	}else{
		// readButton.textContent = "Read";
		readButton.style.color = "green";
	}
    readButton.addEventListener("click", () => {
    if(book.readState === false){
      book.readState = true;
      readButton.textContent = "Read"
      readButton.style.color = "green";
		  return;
    }else if(book.readState === true){
      book.readState = false;
      readButton.textContent = "Unread"
      readButton.style.color = "red";
		  return;
    }else{
		  return;
	}
    })
};


function addRemoveButton(div){
    const removeButton = div.appendChild(document.createElement("button"));
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove book";
    removeButton.addEventListener("click", () => {
        removeButton.parentElement.remove();
    })  
};
