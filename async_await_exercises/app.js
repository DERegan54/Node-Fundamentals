// Asychronous Code in JavaScript Exercise - Solved using Async/Await


/////////////////////////////////////////////////////////////////
// Part 1: Number Facts
/////////////////////////////////////////////////////////////////

// 1.
async function favNumFact() {
    let baseURL = 'http://numbersapi.com'
    let favNum = 6;
    let fact = await axios.get(`${baseURL}/${favNum}?json`);
    console.log(fact.data)
};
favNumFact()


// 2. 
async function favNumsFacts() {
    let baseURL = 'http://numbersapi.com'
    let favNums = [4,5,9];
    let factsArr = [];
    let res = await axios.get(`${baseURL}/${favNums}?json`);
    console.log(typeof res)
    let facts = res.data;
    for (i in facts) {
        factsArr.push(facts[i])
        console.log(factsArr)    
    }
    $('body').append(`<p>${factsArr}</p>`)
};
favNumsFacts()



// 3. 
async function fourFavNumFacts() {
    let baseURL = 'http://numbersapi.com'
    let favNum = 6;
    let factArr = [];
    let fact1Promise = axios.get(`${baseURL}/${favNum}?json`);
    let fact2Promise = axios.get(`${baseURL}/${favNum}?json`);
    let fact3Promise = axios.get(`${baseURL}/${favNum}?json`);
    let fact4Promise = axios.get(`${baseURL}/${favNum}?json`);
    let fact1 = await fact1Promise;
    let fact2 = await fact2Promise;
    let fact3 = await fact3Promise;
    let fact4 = await fact4Promise;
    factArr.push(`${fact1.data.text}`);
    factArr.push(`${fact2.data.text}`);
    factArr.push(`${fact3.data.text}`);
    factArr.push(`${fact4.data.text}`);
    $('body').append(`<p>${factArr}</p>`);

};
fourFavNumFacts()


///////////////////////////////////////////////////////////////////
// Part 2: Deck of Cards
///////////////////////////////////////////////////////////////////

// Part 2: Deck of Cards
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.





// 1.
async function getACard() {
    const baseURL = 'https://deckofcardsapi.com/api/deck'
    let card = await axios.get(`${baseURL}/new/draw/?count=1`);
    console.log(card.data)
    console.log(`${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`)
}
getACard()

// 2.

async function getTwoCardsSameDeck() {
    const baseURL = 'https://deckofcardsapi.com/api/deck'
    let draw = await axios.get(`${baseURL}/new/draw/`);
    let card1 = draw.data.cards[0];
    let deck_id = draw.data.deck_id;
    let draw2 = await axios.get(`${baseURL}/${deck_id}/draw/`);
    let card2 = draw2.data.cards[0];
    console.log(card1)
    console.log(card2)
    console.log(`${card1.value.toLowerCase()} of ${card1.suit.toLowerCase()}`)
    console.log(`${card2.value.toLowerCase()} of ${card2.suit.toLowerCase()}`)
}
getTwoCardsSameDeck()

// 3.
async function getCardOneAtATime() {
    const baseURL = 'https://deckofcardsapi.com/api/deck'
    let deckId = null;
    let $deal = $('#deal');
    let deck = await axios.get(`${baseURL}/new/shuffle/`);
    console.log(deck)
    deckId = deck.data.deck_id;
    $deal.show();
    
    $deal.on('click', async function() {
        let card = await axios.get(`${baseURL}/${deckId}/draw/`)
            let $table = $('#container');
            let cardImg = card.data.cards[0].image;
            $table.append(
                $('<img>', {
                    src: cardImg
                })
            );
            if(data.remaining === 0) $deal.remove();
        });
}
getCardOneAtATime();