const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Get Quote from API
function newQuote() {
    showLoadingSpinner();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if author is blank add unknown
    if (!quote.author) {
        authorText.innerText = 'Unknown'
    } else {
        authorText.innerText = quote.author;
    }
    // reduce fontsize for long quote
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner()
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response =  await fetch(apiUrl);
        apiQuotes = await response.json();   
        newQuote();
    } catch (error) {
        console.log('whoops, no quotes', error);
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes()