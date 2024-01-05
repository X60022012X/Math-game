let brukerSvar = 0;
let faktiskSvar = 0;
let number1 = 0;
let number2 = 0;
let score = 0;
let symbol = '*';
let svarSjekket = false;

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
  number1 = Math.ceil(Math.random()*10);
  number2 = Math.ceil(Math.random()*10);
  faktiskSvar = Number((eval(number1 + symbol + number2)).toFixed(1));
  console.log(faktiskSvar)
  document.querySelector('.regnestykke').innerHTML = `${number1} ${symbol} ${number2} = ?`
  document.querySelector('body').style.background = 'white'
  document.querySelector('.title-box').style.background = 'rgb(100, 100, 120)'
  document.querySelector('input').value = ''
  document.querySelector('.refresh').style.display = 'none'
  document.querySelector('.sjekk-svar').style.display = 'block'
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
  var inputElement = document.querySelector('.input');
  inputElement.focus();
}


function sjekkSvar(){
  brukerSvar = Number(document.querySelector('.input').value);
  if(faktiskSvar === brukerSvar){
    document.querySelector('body').style.background = 'green'
    document.querySelector('.title-box').style.background = 'darkgreen'
    document.querySelector('.refresh').style.display = 'block'
    document.querySelector('.sjekk-svar').style.display = 'none'
    svarSjekket = true;
    score++;
    updateScore();
  } else {
    document.querySelector('body').style.background = 'red'
    document.querySelector('.title-box').style.background = 'rgb(200, 0, 0)'
    document.querySelector('.refresh').style.display = 'block'
    document.querySelector('.sjekk-svar').style.display = 'none'
    svarSjekket = true;
    updateHighscore();
    score = 0;
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
}