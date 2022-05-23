
const $ranFacts = $("#ran-facts");
const $favForm = $("#fav-form");
const $favFacts = $("#fav-facts");
const $cardDiv = $("#cardDiv");
const $card = $("#card");
let deck

axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
.then(res => {deck = res.data.deck_id;});

for(let i = 0; i < 4; i++){
    let random = Math.floor(Math.random() * 10);

    getFacts("p", random, $ranFacts);
}

$("#fav-form").on("submit", function(e){
    e.preventDefault();
    $favFacts.html("");

    for(let i = 0; i < 4; i++){
        let num = $("#fav-num").val();

        getFacts("li", num, $favFacts);
    }

    $("#fav-num").val("");
});

$("#cardDiv").on("submit", function(e){
    e.preventDefault();
    
    axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then(card => {
        $card.attr("src", card.data.cards[0].image);
    })
    .catch(err => console.log("Error", err));
});

function getFacts(node, num, div){
    let $node = document.createElement(`${node}`);
    
    const response = axios.get(`http://numbersapi.com/${num}?json`);
    response.then(res => $node.innerText = res.data.text);
    response.catch(err => console.log("Error", err));

    div.append($node);
}
