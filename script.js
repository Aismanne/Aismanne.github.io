window.onload = function () {

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');
    let guessCount = 0;
    let resetButton;
    guessField.focus();

    guessSubmit.addEventListener('click', checkGuess, guessesLeft);

    function checkGuess() {
        const userGuess = Number(guessField.value);
        if (guessCount === 0) {
            guesses.textContent = 'Aikaisemmat vastaukset: ';
        }
        
        guesses.textContent += userGuess + ' ';

        if (userGuess === randomNumber) {
            lastResult.textContent = 'Onnittelut, arvasit oikein!';
            lastResult.style.backgroundColor = 'green';
            setGameOver();
        } else if (guessCount === 9) {
            lastResult.textContent = 'Liian monta väärä vastausta';
            setGameOver();
        } else {
            lastResult.textContent = 'väärä vastaus';
            lastResult.style.backgroundColor = 'red';

            if (userGuess < randomNumber) {
                lowOrHi.textContent = 'Viimeisin arvauksesi oli pienempi kuin arvattava luku';
            } else if (userGuess > randomNumber) {
                lowOrHi.textContent = 'Viimeisin arvauksesi oli suurempi kuin arvattava luku';
            }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
        document.getElementById('guessesLeft').textContent = 'Arvauksia annettu ' + guessCount;
    }

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Aloita uusi peli';
        document.body.append(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        guessCount = 0;

        const resetParas = document.querySelectorAll('.resultParas p');
        for (const resetPara of resetParas) {
            resetPara.textContent = '';
        }

        resetButton.parentElement.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'cadetblue';

        randomNumber = Math.floor(Math.random() * 100) + 1;

    }
}
