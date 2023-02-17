// Asychronous Code in JavaScript Exercise - Solved using Promises

let baseURL1 = 'http://numbersapi.com'


/////////////////////////////////////////////////////////////////
// Part 1: Number Facts
/////////////////////////////////////////////////////////////////

// 1.
function favNumFacts() {
    let favNum = 6;
    $.getJSON(`${baseURL1}/${favNum}?json`).then(data => {
        console.log(data);
    });
}
favNumFacts();


// 2.   
let favNums = [4,5,9]
$.getJSON(`${baseURL1}/${favNums}?json`).then(data => {
    console.log(data)
    let dataArr = [];
    for(i in data) {
        dataArr.push(data[i])
        console.log(dataArr)
    }
    $("#part1-2").append(`<p>${dataArr}</p>`);         


// 3. 
let favoriteNum = 7
Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${baseURL1}/${favoriteNum}?json`);
    })).then(data => {
    console.log(data);
    data.forEach(data => $("#part1-3").append(data.text));  
})


///////////////////////////////////////////////////////////////////
// Part 2: Deck of Cards
///////////////////////////////////////////////////////////////////

const baseURL2 = 'https://deckofcardsapi.com/api/deck'

// 1.
$.getJSON(`${baseURL2}/new/draw/?count=1`).then(data => {
    console.log(data)
    console.log(`${data.cards[0].value.toLowerCase()} of ${data.cards[0].suit.toLowerCase()}`)
})

// 2.
let card1 = null 
$.getJSON(`${baseURL2}/new/draw/`)
    .then(data => {
    card1 = data.cards[0];
    let deck_id = data.deck_id;
    return $.getJSON(`${baseURL2}/${deck_id}/draw/`);
})
    .then(data => {
    let card2 = data.cards[0]; 
    [card1, card2].forEach(function(card) {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
})

// 3.
let deckId = null;
let $deal = $('#deal');
let $table = $('#container');

$.getJSON(`${baseURL2}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $deal.show();
});

$deal.on('click', function() {
    $.getJSON(`${baseURL2}/${deckId}/draw/`).then(data => {
        let cardImg = data.cards[0].image;
        $table.append(
            $('<img>', {
                src: cardImg
            })
        );
        if(data.remaining === 0) $deal.remove();
        });
    });
})