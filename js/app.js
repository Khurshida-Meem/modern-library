document.getElementById('spinner').style.display = 'none'
const inputField = document.getElementById('input-field');
const resultCount = document.getElementById('result-count');
const cardContainer = document.getElementById('card-container');
const errorField = document.getElementById('error-field');
const showSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const loadData = async () => {
    const textInput = inputField.value;
    showSpinner('block')
    const url = `https://openlibrary.org/search.json?q=${textInput}`;
    const res = await fetch(url);
    const data = await res.json();
    showData(data.docs);
    inputField.value = '';

}


const showData = books => {
    cardContainer.textContent = '';
    const searchReasultAmount = books.length;
    if (searchReasultAmount === 0) {
        errorField.innerText = "No result found, please try another book"
    }
    else {
        errorField.innerText = ""
    }
    resultCount.innerText = `${searchReasultAmount} results found...`

    books?.forEach(book => {
        const imgSource = `https://covers.openlibrary.org/b/id/${book.cover_i != undefined ? book.cover_i : 10909258}-M.jpg`;

        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 ">
            <img src="${imgSource}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold text-success">${book.title}</h5>
                <p class="card-text text-danger">${book.author_name != undefined ? 'Author: ' + book.author_name : ''}</p>
                <p class="card-text text-secondary">${book.publisher != undefined ? 'publisher: ' + book.publisher : ''}</p>
                <p class="card-text text-secondary">${book.first_publish_year != undefined ? 'First Published Year : ' + book.first_publish_year : ''}</p>
            </div>
            
        </div>
        
        `
        cardContainer.appendChild(div);
        showSpinner('none');
    });

}