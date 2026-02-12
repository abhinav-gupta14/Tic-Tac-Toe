class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.xWins = localStorage.getItem('xWins') ? parseInt(localStorage.getItem('xWins')) : 0;
        this.oWins = localStorage.getItem('oWins') ? parseInt(localStorage.getItem('oWins')) : 0;
        this.draws = localStorage.getItem('draws') ? parseInt(localStorage.getItem('draws')) : 0;
        
        this.cells = document.querySelectorAll('.cell');
        this.playerDisplay = document.getElementById('playerDisplay');
        this.gameStatus = document.getElementById('gameStatus');
        this.resetBtn = document.getElementById('resetBtn');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.xScoreDisplay = document.getElementById('xScore');
        this.oScoreDisplay = document.getElementById('oScore');
        this.drawScoreDisplay = document.getElementById('drawScore');
        
        this.initEventListeners();
        this.updateScore();
    }

    initEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetBoard());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (this.board[index] || this.gameOver) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.endGame(`${this.currentPlayer} WINS! 🎉`);
            if (this.currentPlayer === 'X') {
                this.xWins++;
            } else {
                this.oWins++;
            }
            this.updateScore();
        } else if (this.isBoardFull()) {
            this.endGame("IT'S A DRAW!");
            this.draws++;
            this.updateScore();
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updatePlayerDisplay();
        }
    }

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    isBoardFull() {
        return this.board.every(cell => cell !== null);
    }

    endGame(message) {
        this.gameOver = true;
        this.gameStatus.textContent = message;
        this.gameStatus.classList.add('winner');
        this.cells.forEach(cell => cell.disabled = true);
    }

    updatePlayerDisplay() {
        const playerText = this.currentPlayer === 'X' ? "Player X's Turn" : "Player O's Turn";
        this.playerDisplay.textContent = playerText;
    }

    resetBoard() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.gameStatus.textContent = '';
        this.gameStatus.classList.remove('winner');
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.disabled = false;
        });
        
        this.updatePlayerDisplay();
    }

    restartGame() {
        this.xWins = 0;
        this.oWins = 0;
        this.draws = 0;
        localStorage.setItem('xWins', this.xWins);
        localStorage.setItem('oWins', this.oWins);
        localStorage.setItem('draws', this.draws);
        this.updateScore();
        this.resetBoard();
    }

    updateScore() {
        this.xScoreDisplay.textContent = this.xWins;
        this.oScoreDisplay.textContent = this.oWins;
        this.drawScoreDisplay.textContent = this.draws;
        localStorage.setItem('xWins', this.xWins);
        localStorage.setItem('oWins', this.oWins);
        localStorage.setItem('draws', this.draws);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
