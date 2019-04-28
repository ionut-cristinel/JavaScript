
var scores,
    htmlFirstDice,
    htmlLastDice,
    activePlayer,
    roundScore,
    gamePlaying,
    htmlCurrentScore,
    htmlScores;

htmlFirstDice = document.querySelector('#dice-1');
htmlLastDice = document.querySelector('#dice-2');
htmlCurrentScore = [
    document.querySelector('#current-0'),
    document.querySelector('#current-1')
];
htmlScores = [
    document.querySelector('#score-0'),
    document.querySelector('#score-1')
];

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', () => {

    if(!gamePlaying) return;

    // 1.
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. 
    htmlFirstDice.src = 'dice-' + dice1 + '.png';
    htmlLastDice.src = 'dice-' + dice2 + '.png';
    htmlFirstDice.style.display = 'block';
    htmlLastDice.style.display = 'block';

    // 3. 
    if(dice1 == 1 || dice2 == 1){
        nextPlayer();
        return;
    }

    // 4.
    if(dice1 == 6 && dice2 == 6){
        scores[activePlayer] = 0;
        htmlScores[activePlayer].textContent = 0;
        nextPlayer();
        return;
    }

    // 5. 
    roundScore += dice1 + dice2;

    // 6. 
    htmlCurrentScore[activePlayer].textContent = roundScore;
});

document.querySelector('.btn-hold').addEventListener('click', () => {

    if(!gamePlaying) return;
    const input = document.querySelector('.final-score').value;
    let winningScore;

    // 1. 
    scores[activePlayer] += roundScore;
    htmlScores[activePlayer].textContent = scores[activePlayer];
    htmlFirstDice.style.display = 'none';
    htmlLastDice.style.display = 'none';

    // 2. 
    winningScore = input ? input : 100;

    if(scores[activePlayer] >= winningScore){
        htmlCurrentScore[activePlayer].textContent = 0;
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else{
        nextPlayer();
    }
});

function init(){
    htmlScores[0].textContent = 0;
    htmlScores[1].textContent = 0;
    htmlCurrentScore[0].textContent = 0;
    htmlCurrentScore[1].textContent = 0;
    htmlFirstDice.style.display = 'none';
    htmlLastDice.style.display = 'none';
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    scores = [0, 0];
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}

function nextPlayer(){
    roundScore = 0;
    htmlCurrentScore[activePlayer].textContent = roundScore;
    activePlayer = (activePlayer != 0) ? 0 : 1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}