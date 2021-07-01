//#region GLOBAL VAR
const comparator = {
   rock: {
      wins: ['lizard', 'scissors'],
      emoji: '✊'
   },
   paper: {
      wins: ['rock', 'spock'],
      emoji: '🧻'
   },
   scissors: {
      wins: ['paper', 'lizard'],
      emoji: '✂'
   },
   lizard: {
      wins: ['paper', 'spock'],
      emoji: '🦎'
   },
   spock: {
      wins: ['rock', 'scissors'],
      emoji: '🖖'
   }
}

var compChoice = 'rock'
var compEmoji = comparator.rock.emoji
var compArr = Object.keys(comparator)
var scores = { yourScore: 0, myScore: 0, roundCount: 0 }
//#endregion

//#region GAME LOGIC
/**
 * Retruns a random choice from the array and assigns it to compChoice
 */
function randomCompChoice() {
   let randIndex = Math.floor(Math.random() * (compArr.length))
   compChoice = compArr[randIndex]
   compEmoji = comparator[compChoice].emoji
}

/**
 * Invokes drawChoices, then
 * Compares player's choice to computer's, then 
 * Invokes drawResults and randomCompChoice
 * @param {String} choice 
 */
function play(choice) {
   let result = ''
   scores.roundCount += 1
   drawChoices(choice)
   if (choice == compChoice) {
      result = 'draw'
   } else {
      let winning = comparator[choice].wins.find(win => win == compChoice)
      if (winning) {
         result = 'win'
         scores.yourScore += 1
      } else {
         result = 'lose'
         scores.myScore += 1
      }
   }
   drawResults(result)
   randomCompChoice()
   saveScores()
}

function saveScores() {
   let scoresStr = JSON.stringify(scores)
   window.localStorage.setItem('scores', scoresStr)
   document.getElementById('clear-scores').classList.remove('hidden')
}

function loadScores() {
   let scoresData = JSON.parse(localStorage.getItem('scores'))
   if (scoresData) {
      scores = scoresData
      document.getElementById('clear-scores').classList.remove('hidden')
   }
   drawScores()
}

function clearScores() {
   window.localStorage.removeItem('scores')
   scores.myScore = 0
   scores.yourScore = 0
   scores.roundCount = 0
   document.getElementById('clear-scores').classList.add('hidden')
   drawScores()
}
//#endregion

//#region DRAW FUNCTIONS
/**
 * Draws "You [result]!" where [result] is defined by play()
 * @param {String} result 
 */
function drawResults(result) {
   let template = `You ${result}!`
   document.getElementById('message').innerText = template
   drawScores()
}

/**
 * Draws buttons to the center row iteratively based on comparator object.
 */
function drawButtons() {
   let template = ''
   compArr.forEach(weapon => {
      let compBtn = weapon.toUpperCase()
      template += `<button class="col-2 btn btn-primary m-2" onclick="play('${weapon}')">${compBtn}</button>`
   })
   document.getElementById('buttons').innerHTML = template
}

/**
 * Draws emojis to top row based on variable passed in play().
 * @param {String} choice 
 */
function drawChoices(choice) {
   document.getElementById('my-choice').innerText = comparator[choice].emoji
   document.getElementById('comp-choice').innerText = compEmoji
}

function drawScores() {
   document.getElementById('your-score').innerText =
      `Your Score: ${scores.yourScore}`
   document.getElementById('my-score').innerText = `My Score: ${scores.myScore}`
   document.getElementById('round-count').innerText = `Round Count: ${scores.roundCount}`
}
//#endregion

//#region INITIAL FUNCTIONS
loadScores()
drawButtons()
randomCompChoice()
//#endregion