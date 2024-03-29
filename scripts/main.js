let brukerSvar = 0;
let faktiskSvar = 0;
let number1 = 0;
let number2 = 0;
let number3 = 0;
let number4 = 0;
let score = 0;
let symbol = '+';
let svarSjekket = false;
let level = 1;
let numberSize = 10;
let numberAmount = 2;
let difficulity = 'Practice';
let calculation = "";

let highscore = 0
if (!localStorage.highscore){
  localStorage.highscore = 0
}else {
  highscore = Number(localStorage.highscore)
}

refresh();
updateHighscore();

function activateByEnter(event) {
  if (event.key === 'Enter' && svarSjekket === false) {
    sjekkSvar();
  } else if (event.key === 'Enter' && svarSjekket === true) {
    refresh();
  }
}

function refresh(){
  removeAddedScore();
  checkLevel();
  number1 = Math.ceil(Math.random()*numberSize);
  number2 = Math.ceil(Math.random()*numberSize);
  number3 = Math.ceil(Math.random()*numberSize);
  number4 = Math.ceil(Math.random()*numberSize);
  if(numberAmount == 2){
    faktiskSvar = Number((eval(number1 + symbol + number2)).toFixed(1));
    document.querySelector('.regnestykke').innerHTML = `${number1} ${symbol} ${number2} = ?`
  } else if(numberAmount == 3){
    faktiskSvar = Number((eval(number1 + symbol + number2 + symbol + number3)).toFixed(1));
    document.querySelector('.regnestykke').innerHTML = `${number1} ${symbol} ${number2} ${symbol} ${number3} = ?`
  } else if(numberAmount == 4){
    faktiskSvar = Number((eval(number1 + symbol + number2 + symbol + number3 + symbol + number4)).toFixed(1));
    document.querySelector('.regnestykke').innerHTML = `${number1} ${symbol} ${number2} ${symbol} ${number3} ${symbol} ${number4} = ?`
  }
  document.querySelector('input').value = ''
  document.querySelector('.refresh').style.display = 'none'
  document.querySelector('.sjekk-svar').style.display = 'block'
  document.querySelector('section').style.backgroundColor = 'rgba(197, 195, 195, 0.6)'
  console.log(faktiskSvar)
  svarSjekket = false;
  resetFocus();
  if(symbol === '+'){
    document.querySelector('.regneart').innerHTML = 'Addition'
  } else if(symbol === '-'){
    document.querySelector('.regneart').innerHTML = 'Subtraction'
  } else if(symbol === '*'){
    document.querySelector('.regneart').innerHTML = 'Multiplication'
  } else {
    document.querySelector('.regneart').innerHTML = 'Division'
  }
}

function resetFocus(){
  const inputElement = document.querySelector('.input');
  inputElement.focus();
}


function sjekkSvar(){
  brukerSvar = Number(document.querySelector('.input').value);
  if(faktiskSvar === brukerSvar){
    document.querySelector('.refresh').style.display = 'block'
    document.querySelector('.sjekk-svar').style.display = 'none'
    document.querySelector('section').style.backgroundColor = 'rgba(24, 222, 24, 0.6)'
    svarSjekket = true;
    score += level;
    addedScore();
    updateScore();
  } else {
    document.querySelector('.refresh').style.display = 'block'
    document.querySelector('.sjekk-svar').style.display = 'none'
    document.querySelector('section').style.backgroundColor = 'rgba(222, 24, 24, 0.6)'
    svarSjekket = true;
    updateHighscore();
    score = 0;
    noAddedScore();
    updateScore();
  }
}

function updateScore(){
  document.querySelector('.score').innerHTML = `Current Score: ${score}`
}

function updateHighscore(){
  if(score > highscore){
    localStorage.highscore = score;
    highscore = Number(localStorage.highscore)
    document.querySelector('.highscore').innerHTML = `Highscore: ${highscore}`
  } else{
    document.querySelector('.highscore').innerHTML = `Highscore: ${highscore}`
  }
}

function resetHighscore(){
  localStorage.highscore = 0;
  highscore = Number(localStorage.highscore)
  document.querySelector('.highscore').innerHTML = `Highscore: ${highscore}`
  resetFocus();
}

function changeLevel(){
  document.querySelector('.level').innerHTML = `Level: ${level}`
  refresh();
}

function checkLevel(){
  if(level === 1){
    numberSize = 10; 
    numberAmount = 2;
    difficulity = 'Practice';
  }else if(level === 2){
    numberSize = 100;
    numberAmount = 2;
    difficulity = 'Easy'
  }else if(level === 3){
    numberSize = 10;
    numberAmount = 3;
    difficulity = 'Normal'
  }else if(level === 4){
    numberSize = 100;
    numberAmount = 3;
    difficulity = 'Hard'
  }else if(level === 5){
    numberSize = 10;
    numberAmount = 4;
    difficulity = 'Insane'
  }else if(level === 6){
    numberSize = 100;
    numberAmount = 4;
    difficulity = 'Extreme'
  }
  document.querySelector('.difficulity').innerHTML = `Difficulity: ${difficulity}`
}

function levelDown() {
  if(level > 1 ){
    level--;
    changeLevel();
  }else{
    resetFocus();
  }
}

function levelUp() {
  if(level < 6 ){
    level++;
    changeLevel();
  } else{
    resetFocus();
  }
}

function resetDifficulity(){
  if(level != 1){
    level = 1;
    changeLevel()
  } else{
    resetFocus();
  }
}

function addedScore(){
  document.querySelector('.added-score').innerHTML = `+${level} score`;
  document.querySelector('.score-title').style.marginTop = '24.5px'
  document.querySelector('.divider').style.marginTop = '34.5px'
  document.querySelector('.level-title').style.marginTop = '24.5px'
}

function noAddedScore(){
  document.querySelector('.added-score').innerHTML = 'Score reset';
  document.querySelector('.score-title').style.marginTop = '24.5px'
  document.querySelector('.divider').style.marginTop = '34.5px'
  document.querySelector('.level-title').style.marginTop = '24.5px'
}

function removeAddedScore(){
  document.querySelector('.added-score').innerHTML = ``
  document.querySelector('.score-title').style.marginTop = '50px'
  document.querySelector('.divider').style.marginTop = '60px'
  document.querySelector('.level-title').style.marginTop = '50px'
}