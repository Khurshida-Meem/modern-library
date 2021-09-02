document.getElementById('spinner').style.display = 'none'
const inputField = document.getElementById('input-field');
const resultCount = document.getElementById('result-count');
const cardContainer = document.getElementById('card-container');
const errorField = document.getElementById('error-field');

// spinner display function
const showSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// clear all fields
const clearFields = () => {
    resultCount.innerText = ''
    cardContainer.textContent = '';
    errorField.textContent = '';
}
// data load
const loadData = async () => {
    clearFields(); //clear all reasult right after search
    const textInput = inputField.value;
    // null input
    if (textInput === '') {
        errorField.innerText = "Book name can't be empty, please put a valid book name";
        return;
    }

    showSpinner('block')
    const url = `https://openlibrary.org/search.json?q=${textInput}`;
    const res = await fetch(url);
    const data = await res.json();
    showData(data.docs, data.numFound);
    inputField.value = '';

}


const showData = (books,resultQuantity) => {
    const searchReasultAmount = books.length;
    // for not find any reult
    if (searchReasultAmount === 0) {
        showSpinner('none');
        errorField.innerText = "No result found, please try another book"
    }
    else {
        errorField.innerText = ""
    }
    // how many earch result we got
    resultCount.innerText = `Showing ${searchReasultAmount} results out of ${resultQuantity}`;

    // show results
    books?.forEach(book => {
        const imgSource = `https://covers.openlibrary.org/b/id/${book.cover_i != undefined ? book.cover_i : 10909258}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 ">
            <img src="${imgSource}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold text-success">${book.title}</h5>
                <p class="card-text text-danger">${book.author_name != undefined ? '<span class="fw-bold">Author: </span>' + book.author_name : ''}</p>
                <p class="card-text text-secondary">${book.publisher != undefined ? '<span class="fw-bold">publisher: </span>' + book.publisher[0].split(/,/)[0] : ''}</p>
                <p class="card-text text-secondary">${book.first_publish_year != undefined ? '<span class="fw-bold">First Published Year : </span>' + book.first_publish_year : ''}</p>
            </div>
            
        </div>
        
        `
        cardContainer.appendChild(div);
        showSpinner('none');
    });

}