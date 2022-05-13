//query selectors and event listeners
  allBoxes = document.querySelectorAll('.box')
  document.getElementById('1').addEventListener('click', (e)=>{activePlayer.chooseBox('1')})
  document.getElementById('2').addEventListener('click', (e)=>{activePlayer.chooseBox('2')})
  document.getElementById('3').addEventListener('click', (e)=>{activePlayer.chooseBox('3')})
  document.getElementById('4').addEventListener('click', (e)=>{activePlayer.chooseBox('4')})
  document.getElementById('5').addEventListener('click', (e)=>{activePlayer.chooseBox('5')})
  document.getElementById('6').addEventListener('click', (e)=>{activePlayer.chooseBox('6')})
  document.getElementById('7').addEventListener('click', (e)=>{activePlayer.chooseBox('7')})
  document.getElementById('8').addEventListener('click', (e)=>{activePlayer.chooseBox('8')})
  document.getElementById('9').addEventListener('click', (e)=>{activePlayer.chooseBox('9')})
  document.getElementById('newgame').addEventListener('click', (e)=>{newGame()})
//starts the game and sets player names and symbols
  document.getElementById('playerinfosubmit').addEventListener('click', (e)=>{
    playerOne.startGame()
    playerTwo.startGame()
  })

//player constructor, this contains 
class Player{
    constructor(name, symbol, player){
      this._name = name
      this.symbol = symbol
      this._choices = []
      this._player = player
      this.wins = 0
    }
    get name(){return this._name}    
    //checkWin will follow if branches to see if a player has won, this is wet and ugly and needs to be changed.
    checkWin(){
      let c = this._choices
      console.log('checking for win...')
      //check wins starting from 1
    if(c.includes(1)){
        if(c.includes(4) && c.includes(7)){
          activePlayer.win()
          notActivePlayer.lose()
        }
        else if(c.includes(5) && c.includes(9)){
          activePlayer.win()
          notActivePlayer.lose()
        }
        else if(c.includes(2) && c.includes(3)){
          activePlayer.win()
          notActivePlayer.lose()
        }
      }

      //check win from 2
    if(c.includes(2) && c.includes(5) && c.includes(8)){
        activePlayer.win()
        notActivePlayer.lose()
      }

      //check wins from 3
    if(c.includes(3)){
        if(c.includes(5) && c.includes(7)){
          activePlayer.win()
          notActivePlayer.lose()
        }else if(c.includes(6) && c.includes(9)){
          activePlayer.win()
          notActivePlayer.lose()
        }
      }
      // check win from 4
    if(c.includes(4)){
          if(c.includes(5) && c.includes(6)){
            activePlayer.win()
            notActivePlayer.lose()
          }
        }

      //check win from 7
    if(c.includes(7)){
          if(c.includes(8) && c.includes(9)){
            activePlayer.win()
            notActivePlayer.lose()
          }
        }

      
    }
    //changes the active player
    playerChange(){
      if(activePlayer === playerOne){
        activePlayer = playerTwo
        notActivePlayer = playerOne
      }else{
        activePlayer = playerOne
        notActivePlayer = playerTwo
      }
    }
    //selects a box, inserts the players selected symbol to the box and changes the box's style, adds the box id to the objects choices property, checks for a win, then changes player
    chooseBox(id){
      if(!document.getElementById(id).innerHTML){
      document.getElementById(id).innerHTML = this.symbol
      document.getElementById(id).classList.add("taken")
      this._choices.push(parseInt(id))
      
      this.checkWin() 
      
      this.playerChange()

      document.getElementById('playerturn').innerText = `its ${activePlayer._name}'s turn!`
    }}
    //sets player name and symbol using HTML inputs, hides setup and reveals board.
    startGame(){
    let inputName = document.getElementById(`${this._player}name`).value
    let inputSymbol = document.getElementById(`${this._player}symbol`).value

    if(this._name !== inputName){
      this._name = inputName
      this.symbol = inputSymbol
      this.wins = 0
    }
    document.getElementById('setup').classList.add('hidden')
    document.getElementById('gamespace').classList.remove('hidden')
    }
    //announces winner and statistics!
    win(){
      this.wins++

      document.getElementById('winnerannouncement').innerText = `🎉Congradulations ${this._name} you won!🎉`

      if(this.wins > 2){
      document.getElementById('streak').innerText = `🔥Wow ${this._name}, you've won ${this.wins} times, great job!🔥`
      }

      document.getElementById('gamespace').classList.add('hidden')
      document.getElementById('gameover').classList.remove('hidden')

      this._choices.splice(0, this._choices.length)
    }

    lose(){
      document.getElementById('loserconsolation').innerText = `💩Better luck next time ${this._name}!`
      this._choices.splice(0, this._choices.length)
    }
}
let playerOne = new Player('Foo','🍎', 'player1')
let playerTwo = new Player('Bar','🍌', 'player2')
activePlayer = playerOne
notActivePlayer = playerTwo

//new game button function

function newGame(){
  console.log('newgamebuttonclicked')
  document.querySelectorAll('.box').forEach(e => e.innerHTML = '')
  document.querySelectorAll('.box').forEach(e => e.classList.remove('taken'))
  document.getElementById('setup').classList.remove('hidden')
  document.getElementById('gameover').classList.add('hidden')
}







//Array.from(cell).forEach(element => element.addEventListener('click', chooseCell))