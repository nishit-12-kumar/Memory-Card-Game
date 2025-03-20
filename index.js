const gameBoard = document.querySelector(".game-board");
const movesCounter = document.getElementById("moves");


const emojis = ["🍎", "🍌", "🍉", "🍓", "🍒", "🥝", "🍍", "🍇"];
let cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let moves = 0;



// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

// Create card elements
cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.textContent = "❓";  // Hidden state
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});



// Flip card function
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesCounter.textContent = `Moves: ${moves}`;
            checkMatch();
        }
    }
}


function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        setTimeout(() => {
            card1.classList.add("hidden");
            card2.classList.add("hidden");
            flippedCards = [];

            // Check if all cards are hidden (Game Over)
            if (document.querySelectorAll(".card:not(.hidden)").length === 0) {
                setTimeout(() => {
                    document.getElementById("win-text").textContent = `🎉 You won in ${moves} moves! 🎉`;
                    document.getElementById("win-message").style.display = "block";
                }, 500);
            }
        }, 800);
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card1.textContent = "❓";
            card2.classList.remove("flipped");
            card2.textContent = "❓";
            flippedCards = [];
        }, 1000);
    }
}



// Restart Game Function
function restartGame() {
    location.reload();
}
