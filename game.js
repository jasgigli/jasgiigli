document.addEventListener('DOMContentLoaded', function() {
    const symbols = ['🍎', '🍌', '🍉', '🍇', '🍊', '🍋', '🍓', '🍒']; // Array of symbols
    const numPairs = 8; // Number of symbol pairs
    const gameBoard = document.getElementById('game-board');
    let selectedCards = [];
    let matchedPairs = 0;

    // Create a new shuffled array of symbols
    const shuffledSymbols = shuffle([...symbols, ...symbols]);

    // Dynamically generate and add cards to the game board
    for (let i = 0; i < shuffledSymbols.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<div class="face front"></div><div class="face back">${shuffledSymbols[i]}</div>`;
        card.addEventListener('click', () => selectCard(card));
        gameBoard.appendChild(card);
    }

    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to handle card selection
    function selectCard(card) {
        // Prevent selecting already matched or selected cards
        if (card.classList.contains('matched') || card.classList.contains('selected')) return;

        card.classList.add('selected');
        card.classList.add('flipped');
        selectedCards.push(card);

        // Check if two cards are selected
        if (selectedCards.length === 2) {
            const [card1, card2] = selectedCards;

            // If the symbols match, mark them as matched
            if (card1.querySelector('.back').textContent === card2.querySelector('.back').textContent) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;

                // Check if all pairs are matched
                if (matchedPairs === numPairs) {
                    setTimeout(() => alert('Congratulations! You won the game!'), 500);
                }
            } else {
                // If symbols don't match, flip the cards back
                setTimeout(() => {
                    card1.classList.remove('selected');
                    card2.classList.remove('selected');
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }, 1000);
            }

            // Clear selected cards array
            selectedCards = [];
        }
    }
});
