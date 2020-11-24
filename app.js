
document.addEventListener('DOMContentLoaded',  ()  => {
const grid =  document.querySelector('.grid') //assigns any html tag with class of grid to the variable grid
let squares= Array.from(document.querySelectorAll('.grid div')) // selects all the divs inside of the div with class grid, collects it into an array using the Array.from method  and assign it to  the variable squares.
const scoreDisplay = document.querySelector('#score')
const startBtn = document.querySelector('#start-button')
const width = 10
let nextRandom= 0
let timerId
let score = 0


// The shapes of the Tetrominoes
const lTetromino =[
                    [1, width+1, width*2+1, 2],
                    [width,width+1,width+2,width*2+2],
                    [1,width+1,width*2+1,width*2],
                    [width,width*2,width*2+1,width*2+2]
                  ]                    
                

const zTetromino = [
                      [0,width,width+1,width*2+1],   
                      [width+1,width+2,width*2,width*2+1] ,                
                      [0,width,width+1,width*2+1],
                      [width+1,width+2,width*2,width*2+1]
                    ]

const tTetromino = [
                      [1,width,width+1,width+2],
                      [1,width+1,width+2,width*2+1],
                      [width,width+1,width+2,width*2+1],
                      [1,width,width+1,width*2+1]
                    ]

const oTetromino =[
                    [0,1,width,width+1],
                    [0,1,width,width+1],
                    [0,1,width,width+1],
                    [0,1,width,width+1]
                  ]  
                  

const iTetromino =[
                    [1,width+1,width*2+1,width*3+1],
                    [width,width+1,width+2,width+3],
                    [1,width+1,width*2+1,width*3+1],
                    [width,width+1,width+2,width+3]
                  ]

                  
const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]// arranges the tetromino shapes into an array



let currentPosition = 4;
let currentRotation = 0;

// lets draw the first rotation of the first tetromino
let random= Math.floor(Math.random()*theTetrominoes.length);    // randomly select a tetramino
let current = theTetrominoes[random][currentRotation];          // draws the first shape of the randomly selected tetromino

function draw(){
  
      current.forEach(index =>{
        squares[currentPosition + index].classList.add('tetromino') // classList.add assigns the css class tetromino to our shapes. that means you can assign any css class name with the method classList.add('class name')
                              })  
      
                              }

                            
   function undraw()        //undraw the tetramino
                      {
                        current.forEach(index => {squares[currentPosition +index].classList.remove('tetromino')})


                      } 

                      
  
   // make the tetrominoes move downward every second                   
    

    //lets assign keycodes to functions


                      function control(e) {
                        if(e.keyCode === 37)

                        {
                          moveLeft()
                        }
                        else if(e.keyCode===38){
                          rotate()
                          //tetromino to  rotate
                        }
                        else if(e.keyCode===39){
                          //tetmromino to move right
                          moveRight()
                        }
                        else if(e.keyCode===40){
                          //tetromino to go down
                          moveDown()
                        }



                      }
                      document.addEventListener('keyup', control)
  
                      function moveDown()
                      {
                            undraw()
                            currentPosition+=width
                            draw()
                            freeze()
                            

                      }
  
 // freeze function. 
 function freeze(){
                    if(current.some(index => squares[currentPosition+index+width].classList.contains("taken")))
                    {
                      current.forEach(index => squares[currentPosition+index].classList.add("taken"))
                  
                    //lets create a new random falling 
                    
                    random = Math.floor(Math.random()*theTetrominoes.length)    // randomly select a tetramino
                    current = theTetrominoes[random][currentRotation]   
                    currentPosition = 4
                    
                    draw()  
                    displayShape()
                    addScore()
                    gameOver()
                  }
                }



function moveLeft() {
         undraw()
         const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
         if(!isAtLeftEdge) currentPosition -=1
         if (current.some(index => squares[currentPosition+index].classList.contains("taken"))){
           currentPosition+=1
         }
         draw()


}

function moveRight(){
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width ===width-1)
  if(!isAtRightEdge) {currentPosition +=1}
  if(current.some(index => squares[currentPosition + index].classList.contains("taken")))
  {currentPosition-=1}
  draw()

}



function rotate(){
  undraw()
  currentRotation++  
  if(currentRotation === current.length){
    currentRotation=0
  }
  current=theTetrominoes[random][currentRotation]
  draw()

}
// displaying our tetrominoes on the mini grid
const displaySquares = document.querySelectorAll('.mini-grid div') 
const  displayWidth = 4
let displayIndex = 0

        //  the tetrominoes without rotation         

    const upNextTetromino = 
    [
      [1, displayWidth+1, displayWidth*2+1, 2],[0,displayWidth,displayWidth+1,displayWidth*2+1],  
      [1,displayWidth,displayWidth+1,displayWidth+2],[0,1,displayWidth,displayWidth+1],
      [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]


    ]

    // display the shape of the mini tetromino
  
    function displayShape(){
      displaySquares.forEach(square => {square.classList.remove('tetromino')} )
      
      upNextTetromino[random].forEach(index => { displaySquares[displayIndex + index].classList.add('tetromino')})



    }
    
startBtn.addEventListener('click', ()=>{
 if(timerId){
   clearInterval(timerId)
   timerId= null
 }

 else {

  draw()
  timerId =setInterval(moveDown,500)
  let random= Math.floor(Math.random()*theTetrominoes.length);
  displayShape()
 }


}  )


function addScore(){

for(let i = 0; i < 199; i+=width){
  const row = [i, i+1, i+2 , i+3, i+4, i+5, i+6, i+7, i+8, i+9]

  if(row.every(index=> squares[index].classList.contains('taken'))){
    score+=10
    scoreDisplay.innerHTML = score
    row.forEach(index => {
      squares[index].classList.remove('taken')
      squares[index].classList.remove('tetromino')
    })
    const squaresRemoved = squares.splice(i, width)
    squares = squaresRemoved.concat(squares)
    squares.forEach(cell => grid.appendChild(cell))
  }
}


}

function gameOver(){
    if(current.some(index => squares[currentPosition + index]. classList.contains('taken')))
        {scoreDisplay.innerHTML='GAME OVER'
          clearInterval(timerId)  
             
      }

}




})
