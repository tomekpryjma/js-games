(function(){
    const maxCards = 52;
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
    const players = [];
    var playerCount = 2;
    var gameOver = false;

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
     * Generates player objects and appends them to the players array.
     * 
     * @return void
     */
    const generatePlayers = () => {
        for (let count = 0; count < playerCount; count++) {
            const player = {
                id: count,
                cpu: count !== 0 ? cpu : null
            };

            players.push(player)
        }
    }

    /**
     * Retrieves the specified player object.
     * @param {int} playerId 
     */
    const getPlayer = (playerId) => {
        return players[playerId];
    }

    /**
     * Checks whether specified player is human.
     * @param {object} player 
     */
    const playerIsHuman = (player) => {
        return player.cpu == null;
    }

    /**
     * Deals cards between the total number of players.
     * @param {object} deck 
     * @return void
     */
    const dealCards = (deck) => {
        const cardsToDeal = 2;

        for (let count = 0; count < playerCount; count++) {
            const cards = [];
            const player = getPlayer(count);

            for (let cardNumber = 0; cardNumber < cardsToDeal; cardNumber++) {
                const card = pickCard(deck);
                cards.push(card);
            }
            player['cards'] = cards;
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

    const addCardToPlayer = (playerId, deck) => {
        const player = players[playerId];
        const card = pickCard(deck);
        player.cards.push(card);
    }

    const getCardValue = (value, totalScore) => {
        totalScore = totalScore || false;
        if (isNaN(value)) {
            switch (value) {
                case 'J':    
                case 'Q':
                case 'K':
                    return 10;
            default:
                if (totalScore && totalScore == 20) {
                    return 1;
                }
                return 10;
            }
        }
        return +value;
    }

    const getTotalValue = (playerId) => {
        const cards = players[playerId].cards;
        let totalScore = 0;

        for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
            const value = cards[cardIndex].value;
            const cardScore = getCardValue(value, totalScore);
            totalScore += +cardScore;
        }
        return totalScore;
    }

    const cpu = {
        greeting: () => {
            console.log("Hello!")
        }
    }

    const deck = generateDeck();
    generatePlayers();
    dealCards(deck);
    addCardToPlayer(1, deck);
    console.log(players)
}())