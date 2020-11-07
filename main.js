(function(){
    /**
     * 1) Generate card object.
     * 2) Generate a deck of cards.
     */

    const maxCards = 52;
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    const players = [];
    var playerCount = 2;

    /**
     * Populates Deck with cards.
     * 
     * @return object
     */
    const generateDeck = () => {
        const deck = {};
        for (let valueIndex in cardValues) {
            let value = cardValues[valueIndex];
            let cardSet = [];

            for (let suitIndex in suits) {
                let suit = suits[suitIndex];
                cardSet.push(suit);
            }

            deck[value] = cardSet;
        }

        return deck;
    }

    /**
     * Deals cards between the total number of players.
     * @param {object} deck 
     */
    const dealCards = (deck) => {
        const cardsToDeal = 2;

        for (let count = 0; count < playerCount; count++) {
            const player = {
                id: count
            };
            const cards = [];

            for (let cardNumber = 0; cardNumber < cardsToDeal; cardNumber++) {
                const card = pickCard(deck);
                cards.push(card);
            }
            player['cards'] = cards;
            players.push(player);
        }
    }

    /**
     * Chooses a random item from a set.
     * @param {array} set
     */
    const chooseRandom = (set) => {
        const randomIndex = Math.floor(Math.random() * set.length);
        return set[randomIndex];
    }

    /**
     * Selectes a random card from the deck.
     * @param {object} deck 
     */
    const pickCard = (deck) => {
        const value = chooseRandom(Object.keys(deck));
        const suit = chooseRandom(deck[value]);
        removeCardFromDeck(deck, value, suit);
        return {suit: suit, value: value};
    }

    /**
     * Splices the selected card's value from the suit set.
     * @param {object} deck
     * @param {string} suit
     * @param {string} value
     */
    const removeCardFromDeck = (deck, value, suit) => {
        const cardSuitIndex = deck[value].indexOf(suit);

        if (cardSuitIndex === -1) {
            console.error("Card does not exist in deck: ", value, suit);
            return false;
        }

        deck[value].splice(cardSuitIndex, 1);
    }

    const deck = generateDeck();
    dealCards(deck);
    console.log(players)
}())