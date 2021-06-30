const comparator = {
   rock: {
      wins: ['lizard', 'scissors']
   },
   paper: {
      wins: ['rock', 'spock']
   },
   scissors: {
      wins: ['paper', 'lizard']
   },
   lizard: {
      wins: ['paper', 'spock']
   },
   spock: {
      wins: ['rock', 'scissors']
   }
}

var compChoice = 'rock'

function randomCompChoice() {
   let compArr = Object.keys(comparator)
   let randIndex = Math.floor(Math.random() * (compArr.length))
   compChoice = compArr[randIndex]
   console.log(compChoice)
}

function play(choice) {
   let result = ''
   console.log('pre-logic choices', choice, compChoice)
   if (choice == compChoice) {
      result = 'draw'
   } else {
      winning = comparator[choice].wins.find(win => win == compChoice)
      if (winning) {
         result = 'win'
      } else {
         result = 'lose'
      }
   }
   console.log('results', choice, compChoice, result)
   drawResult(result)
   randomCompChoice()
   console.log('new comp choice', compChoice)
}

function drawResult(result) {
   let template = `<h1 class="col-6 text-center">You ${result}!</h1>`
   document.getElementById('message').innerHTML = template
}

function drawButtons() {
   let compArr = Object.keys(comparator)
   let template = ''
   for (i = 0; i < compArr.length; i++) {
      let compBtn = compArr[i].toUpperCase()
      template += `<button class="col-2 btn btn-primary m-2" onclick="play('${compArr[i]}')">${compBtn}</button>`
   }
   document.getElementById('buttons').innerHTML = template
}


drawButtons()
randomCompChoice()