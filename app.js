/*let title = document.querySelector('h1');
title.innerHTML = 'Secret number Game';

let paragraph = document.querySelector('p');
paragraph.innerHTML = 'Choose a number between 1 and 10';*/
let listRandomNumber = [];
let numberMax = 50;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextOnScreen(tag,texto){
    let field = document.querySelector(tag);
    field.innerHTML = texto;
    responsiveVoice.speak(texto, 'UK English Female', {rate:1.0});
}

function showStartMessage() {
    showTextOnScreen('h1','Secret number Game');
    showTextOnScreen('p','Choose a number between 1 and 50');
}

showStartMessage();


function checkGuess (){
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber){
        showTextOnScreen('h1','Got it!!');
        let attemptsWord = attempts > 1 ? 'tries' : 'try';
        let attemptsMessage = `You have discovered the secret number with ${attempts} ${attemptsWord}!`;
        showTextOnScreen('p', attemptsMessage);
        document.getElementById('reset').removeAttribute('disabled');
    } else {
        if (guess > secretNumber){
            showTextOnScreen('p','The secret number is lower! Try again.');
        } else {
            showTextOnScreen('p','The secret number is higher! Try again.');
        }
        attempts++;
        clearField();
    }
    
}

function generateRandomNumber() {
    let chooseNumber = parseInt(Math.random() * numberMax + 1);
    let quantityElementList = listRandomNumber.length;
    
    if (quantityElementList == numberMax){
        listRandomNumber = [];
    }

    if (listRandomNumber.includes(chooseNumber)){
        return generateRandomNumber();
    } else {
        listRandomNumber.push(chooseNumber);
        return chooseNumber;
    }
}

function clearField () {
    guess = document.querySelector('input');
    guess.value = '';
}

function resetGame() {
    secretNumber = generateRandomNumber();
    clearField();
    attempts = 1;
    showStartMessage();
    document.getElementById('reset').setAttribute('disabled',true);
}