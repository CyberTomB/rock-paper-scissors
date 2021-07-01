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
const scores = { yourScore: 0, myScore: 0, roundCount: 0, yourWinP: 0, myWinP: 0 }
//#endregion

//#region GAME LOGIC
/**
 * Retruns a random choice from the array and assigns it to compChoice
 */
function randomCompChoice() {
   let compArr = Object.keys(comparator)
   let randIndex = Math.floor(Math.random() * (compArr.length))
   compChoice = compArr[randIndex]
   compEmoji = comparator[compChoice].emoji
}

/**
 * Takes a score then calculates and updates the win percentage in the scores object
 * @param {Number} score 
 * @returns a number to be written as a percentage
 */
function calcWinP(score) {
   let winP = 0
   let combinedScore = scores.yourScore + scores.myScore
   if (combinedScore != 0) {
      winP = score / combinedScore
      winP = Math.round(winP.toFixed(2) * 100)
   }
   return winP
}

/**
 * Invokes drawChoices, then
 * Compares player's choice to computer's, then 
 * Updates win percentage using calcWinP, then
 * Invokes drawResults and randomCompChoice and saveScores.
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
   scores.yourWinP = calcWinP(scores.yourScore)
   scores.myWinP = calcWinP(scores.myScore)
   drawResults(result)
   randomCompChoice()
   saveScores()
}

/**
 * Saves scores data to localstorage.
 */
function saveScores() {
   let scoresStr = JSON.stringify(scores)
   window.localStorage.setItem('scores', scoresStr)
   document.getElementById('clear-scores').classList.remove('hidden')
}

/**
 * Loads scores data from localstorage if any.
 */
function loadScores() {
   let scoresData = JSON.parse(localStorage.getItem('scores'))
   if (scoresData) {
      scores = scoresData
      document.getElementById('clear-scores').classList.remove('hidden')
   }
   drawScores()
}

/**
 * Sets all values in scores to 0 and deletes localstorage scores data,
 * then hides the button from the page.
 */
function clearScores() {
   window.localStorage.removeItem('scores')
   for (let key in scores) {
      scores[key] = 0
   }
   document.getElementById('clear-scores').classList.add('hidden')
   document.getElementById('message').innerText = "Let's Play!"
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
   for (let key in comparator) {
      let btnText = key.toUpperCase()
      template += `<button class="col-8 col-md-3 btn btn-primary m-2 p-3 p-md-2" onclick="play('${key}')">${btnText}</button>`
   }
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

/**
 * Draws scores, win percentages, and roundcount to the page.
 */
function drawScores() {
   document.getElementById('your-score').innerText =
      `Your Score: ${scores.yourScore}
      Win Rate: ${scores.yourWinP}%`
   document.getElementById('my-score').innerText =
      `My Score: ${scores.myScore}
      Win Rate: ${scores.myWinP}%`
   document.getElementById('round-count').innerText = `Round Count: ${scores.roundCount}`
}
//#endregion

//#region INITIAL FUNCTIONS
loadScores()
drawButtons()
randomCompChoice()
//#endregion