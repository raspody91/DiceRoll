const TotalScore = document.querySelectorAll('.score')
const player = document.querySelectorAll('.player')
const playerName = document.querySelectorAll('.name')
const dicePic = document.querySelector('.dice')

const newGame = document.querySelector('.btn--new')
const roll = document.querySelector('.btn--roll')
const hold = document.querySelector('.btn--hold')

let CurrentScore = document.querySelectorAll('.current-score')
let scoreCurrent = 0
let scoreTotal = [0, 0]
let activePlayer = 0
let random

function saveGame() {
    localStorage.setItem("scoreTotal",  JSON.stringify(scoreTotal));
    localStorage.setItem("scoreCurrent", scoreCurrent);
    localStorage.setItem("activePlayer", activePlayer);
}

window.onload = () => {
    let totalSave = JSON.parse(localStorage.getItem('scoreTotal'))
    let CurrentSave = Number(localStorage.getItem('scoreCurrent'))
    let activeSave = Number(localStorage.getItem('activePlayer'))
    TotalScore[0].textContent = totalSave[0]
    TotalScore[1].textContent = totalSave[1]
    CurrentScore[activeSave].textContent = CurrentSave
    player[activePlayer].classList.remove('player--active')
    activePlayer = 1 - activePlayer
    player[activePlayer].classList.add('player--active')
}



roll.addEventListener('click', () => {
    let random = Math.floor(Math.random() * 6) + 1;
    if (random === 1) {
        scoreCurrent = 0
        player[activePlayer].classList.remove('player--active')
        activePlayer = 1 - activePlayer
        player[activePlayer].classList.add('player--active')
    }
    dicePic.src = `images/dice-${random}.png`
    scoreCurrent += random
    CurrentScore[activePlayer].textContent = scoreCurrent
    saveGame()
})


hold.addEventListener('click', () => {
    scoreTotal[activePlayer] += scoreCurrent
    TotalScore[activePlayer].textContent = scoreTotal[activePlayer]
    scoreCurrent = 0
    CurrentScore[activePlayer].textContent = `${scoreCurrent}`
    console.log(CurrentScore)
    player[activePlayer].classList.remove('player--active')
    activePlayer = 1 - activePlayer
    player[activePlayer].classList.add('player--active')
    if (scoreTotal[1 - activePlayer] >= 30 || CurrentScore[1 - activePlayer] >= 30) {
                roll.setAttribute('disabled', '')
                hold.setAttribute('disabled', '')
                newGame.removeAttribute('disabled')
                playerName[1 - activePlayer].textContent = 'winner!'
                playerName[activePlayer].textContent = 'loser!'
            }
    saveGame()
})

newGame.addEventListener('click', ()=> {
    scoreCurrent = 0
    scoreTotal = [0, 0]
    TotalScore[0].textContent = 0
    TotalScore[1].textContent = 0
    CurrentScore[0].textContent = 0
    CurrentScore[1].textContent = 0
    roll.removeAttribute('disabled', '')
    hold.removeAttribute('disabled', '')
    newGame.setAttribute('disabled', '')
    saveGame()
})