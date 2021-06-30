const comparator = { rock: 'scissors', paper: 'rock', scissors: 'paper' }

let compChoice = 'rock'

function randomCompChoice() {
   let compArr = Object.keys(comparator)
   let randIndex = Math.floor(Math.random() * (compArr.length))
   compChoice = compArr[randIndex]
}

function play(choice) {
   let win = comparator[choice]
   let result = ''
   if (choice == compChoice) {
      result = 'draw'
   } else if (win == compChoice) {
      result = 'win'
   } else {
      result = 'lose'
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

randomCompChoice()