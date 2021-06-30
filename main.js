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
   drawChoices(choice)
   if (choice == compChoice) {
      result = 'draw'
   } else {
      let winning = comparator[choice].wins.find(win => win == compChoice)
      if (winning) {
         result = 'win'
      } else {
         result = 'lose'
      }
   }
   drawResults(result)
   randomCompChoice()
}
//#endregion

//#region DRAW FUNCTIONS
/**
 * Draws "You [result]!" where [result] is defined by play()
 * @param {String} result 
 */
function drawResults(result) {
   let template = `<h1 class="col-6 text-center">You ${result}!</h1>`
   document.getElementById('message').innerHTML = template
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
//#endregion

//#region INITIAL FUNCTIONS
drawButtons()
randomCompChoice()
//#endregion