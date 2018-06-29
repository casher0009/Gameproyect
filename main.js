//canvas height="576" width="512"
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// // //PRUEBAS Y DIMENSIONES DEL CANVAS
// ctx.fillRect(0,0,50,50)
// ctx.fillRect(canvas.width-50,0,50,50)
// ctx.fillRect(canvas.width-50,canvas.height-50,50,50)
// ctx.fillRect(0,canvas.height-50,50,50)


//constants
var interval;
var frames = 0;
var score = 0;
var basuras = []
var fishesLeft = []
var fishesRigth = []
var bonusesLeft = []
var bonusesRigth = []
var images = {
  hero: './images/player1.png',
  hero2: './images/player2.png',
  bg:'./images/canvas bg.jpg',
  bg2: './images/bg2',
  bullet: './images/bullet.png',
 }

var imgBasura = {
  bolsa:'./images/bolsa.png',
  botella: './images/botella.png',
  cigarro: './images/cigarro.png',
  duff: './images/duff.png',
  popote: './images/popote.png'
}

var imgFishesLeft = {
  seadra: './images/seahorse left.png',
  kyroge: './images/kyroge left.png',
  ballena: './images/ballena.png',
  delfin: './images/delfin left.png',
}
var imgFishRigth = {
  kyroge:'./images/kyroge rigth1.png',
  seadra:'./images/seahorse rigth.png',
}

//class

class Hero{
  constructor(){
    this.x = canvas.width/2
    this.y = canvas.height -66
    this.width = 64;
    this.height = 64
    this.bullets = []
    this.image = new Image();
    this.image.src = images.hero;
     this.image.onload = function(){
       this.draw()
       }.bind(this);
  }
    draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Board{
  constructor(){
    this.image = new Image();
    this.image.src = images.bg
    this.music = new Audio()
    this.music.src = "./music/music.mp3"
}
  draw(){
  ctx.drawImage(this.image,0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.font = '40px Avenir';
  ctx.fillText("You Score: "+ score ,230,40)
  ctx.fillText("TIME: "+ (60 - Math.floor(frames/60)),20,40)
  this.music.play()

  }
  gameOver(){
    if(score <= 0){
      ctx.font = "80px Garbage";
      ctx.fillText("LA REGASTE", 10,200);
      ctx.font = "15px garbage";
      ctx.fillStyle = 'red    ';
    }
    else if (score <= 100){
      ctx.font = "75px garbage";
      ctx.fillText("NO FUE", 100,200);
      ctx.fillText("SUFICIENTE!", 5,300);
      ctx.font = "15px garbage";
      ctx.fillStyle = 'red    ';
    }
    else if(score >= 100 && score <= 199){
      ctx.font = "70px garbage";
      ctx.fillText("GANASTE!!!!", 20,200);
      ctx.fillText("GRACIAS", 20,300);
      ctx.fillText("POR LIMPIAR", 20,400);

      ctx.font = "15px garbage";
      ctx.fillStyle = 'red    ';
    }
    else if(score >= 200){
     ctx.font = "70px garbage";
     ctx.fillStyle = 'green';
     ctx.fillText("UNETE A", 20,200);
     ctx.fillText("GREANPEACE!", 10,300);
     ctx.font = "15px garbage";
     ctx.fillStyle = 'red   ';
    } 
    ctx.font = "40px garbage";
   ctx.fillText("Press 'ESC ' to reset", 20,450);
}
}

class Bullet{
constructor(character){
this.width = 25
this.height = 80
this.x = character.x + character.width /2 - this.width/2;
this.y= character.y - this.height
this.vY = -4;
// this.isTouching= function(item){
//   return  (this.x < item.x + item.width) &&
//           (this.x + this.width > item.x) &&
//           (this.y < item.y + item.height) &&
//           (this.y  - 20 + this.height > item.y);
//                   }      
this.image = new Image();
this.image.src = images.bullet;
this.image.onload = function(){
this.draw();
}.bind(this)
}
  draw(){
  this.y+=this.vY;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
}


class Basura{
  constructor(x=Math.floor((Math.random())*8)*64,y=(Math.floor((Math.random())*3)*64)+64 ){
this.x = x;
this.y = y;
this.width = 64;
this.height = 64;
this.live = 1
this.contador = Math.floor(Math.random()*6);
// this.isTouching= function(item){
//   console.log(item)
//   if((this.x < item.x + item.width) &&
//           (this.x + this.width > item.x) &&
//           (this.y < item.y + item.height) &&
//           (this.y  - 20 + this.height > item.y)){
//             return true
//           };
//   }      
this.image = new Image();
this.image.src = (this.contador === 1 ) ? imgBasura.bolsa: 
                 (this.contador === 2 ) ? imgBasura.botella:
                 (this.contador === 3 ) ? imgBasura.cigarro:
                 (this.contador === 4 ) ? imgBasura.duff:
                 imgBasura.popote;  

                
}
  draw(){
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y + this.height > item.y);

}
}

class FishLeft{
  constructor(){
  this.x = -64;
  this.y = (Math.floor(Math.random() * 2)*64) + 256 ;
  this.width = 64
  this.height = 64
  this.live = 1
  this.vX = Math.floor(Math.random()*3)
  this.contador = Math.floor(Math.random()*5);
  this.image = new Image();
  this.image.src = (this.contador === 1 ) ? imgFishesLeft.ballena: 
                   (this.contador === 2 ) ? imgFishesLeft.delfin:
                   (this.contador === 3 ) ? imgFishesLeft.kyroge:
                   imgFishesLeft.seadra;
}
draw(){
  this.x+=this.vX;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y -20 + this.height > item.y);

}
}
class FishRigth{
  constructor(){
  this.x = canvas.width +64;
  this.y = (Math.floor(Math.random() * 2)*64) + 256 ;
  this.width = 64
  this.height = 64
  this.live = 1
  this.vX = Math.floor(Math.random()*-3)
  this.contador = Math.floor(Math.random()*2);
  this.image = new Image();
  this.image.src = (this.contador === 1 ) ? imgFishRigth.kyroge: 
                   imgFishRigth.seadra;
}
draw(){
  this.x+=this.vX;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y -20 + this.height > item.y);

}
}

//BONUS - BONUS - BONUS - BONUS
class BonusLeft{
  constructor(){
  this.x = -64;
  this.y = (Math.floor(Math.random() * 2)*64) + 256 ;
  this.width = 64
  this.height = 64
  this.live = 1
  this.vX = Math.floor(Math.random()*3)+2
  this.image = new Image();
  this.image.src = './images/bonusLeft.png'
}
draw(){
  this.x+=this.vX;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y -20 + this.height > item.y);

}
}
class BonusRigth{
  constructor(){
  this.x = canvas.width +64;
  this.y = (Math.floor(Math.random() * 2)*64) + 256 ;
  this.width = 64
  this.height = 64
  this.live = 1
  this.vX = Math.floor(Math.random()*-3)-2
  this.image = new Image();
  this.image.src = './images/BonusRigth.png'
}
draw(){
  this.x+=this.vX;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y -20 + this.height > item.y);

}
}
//BONUS - BONUS - BONUS - BONUS


//instances
var hero = new Hero()
var board = new Board()


//mainFunctions
function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  hero.draw()
  generateBasura()
  drawBasura()
  drawBullets()
  generateFishLeft()
  drawFishLeft()
  generateFishRigth()
  drawFisRigth()
  checkCollitionBasura()
  checkCollitionPecesRigth()
  checkCollitionPecesLeft()
  generateBonusLeft()
  generateBonusRigth()
  drawBonusLeft()
  drawBonusRigth()
  checkCollitionBonusesLeft()
  checkCollitionBonusesRigth()
  if (60 - Math.floor(frames/60) === 0 ){
    finishHim()}
  }


function start(){
  interval = setInterval(function(){
    update();
  },1000/60)
  }


  //aux functions

  function finishHim(){
    clearInterval(interval);
    interval = undefined;
    board.gameOver();
    board.music.pause()
    board.music.currentTime = 0;
  }

  function restart(){
    if(interval) return;
    basuras = [];
    fishesLeft = [];
    fishesRigth = [];
    bonusesLeft = [];
    bonusesRigth = [];
    score = 0
    frames = 0;
    start();
}

  //GENERADORES Y DIBUJANTES
  function generateBasura(){
    if(!(frames%40===0) ) return;
    var basura = new Basura();
    basuras.push(basura)
  }
  function drawBasura(){
    basuras.forEach(function(basura){
      basura.draw();
  })}


  function generateFishLeft(){
    if(!(frames%200===0) ) return;
    var fishLeft = new FishLeft();
    fishesLeft.push(fishLeft)
  }

  function drawFishLeft(){
    fishesLeft.forEach(function(fishLeft){
      fishLeft.draw();
  })}
  
  function generateFishRigth(){
    if(!(frames%200===0) ) return;
    var fishRigth = new FishRigth();
    fishesRigth.push(fishRigth)
  }

  function drawFisRigth(){
    fishesRigth.forEach(function(fishRigth){
      fishRigth.draw();
  })}

  function generatebullet(){
  // if(!(frames%2===0) ) return;
    var bullet = new Bullet(hero);
    hero.bullets.push(bullet);
  }
  
  function drawBullets(){
    hero.bullets.forEach(function(bullet){
      bullet.draw()
    })}


    function generateBonusLeft(){
      if(!(frames%1000===0) ) return;
      var bonusLeft = new BonusLeft();
      bonusesLeft.push(bonusLeft)
    }
  
    function drawBonusLeft(){
      bonusesLeft.forEach(function(bonusLeft){
        bonusLeft.draw();
    })}
    
    function generateBonusRigth(){
      if(!(frames%500===0) ) return;
      var bonusRigth = new BonusRigth();
      bonusesRigth.push(bonusRigth)
    }
  
    function drawBonusRigth(){
      bonusesRigth.forEach(function(bonusRigth){
        bonusRigth.draw();
    })}




  //COLISIONES Y CONSECUENCIAS

  function checkCollitionBasura(){
    hero.bullets.forEach((bullet)=>{
      basuras.forEach((basura)=>{
        if(basura.isTouching(bullet)){
          basuras.splice(basuras.indexOf(basura),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score+= 5 ;
        }
      })
    })
  }

  function checkCollitionPecesLeft(){
    hero.bullets.forEach((bullet)=>{
      fishesLeft.forEach((fish)=>{
        if(fish.isTouching(bullet)){
          //el pez se va
          fishesLeft.splice(fishesLeft.indexOf(fish),1);
          //la bala tambien
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          // y los puntos alv
          score--;
        }
      })
    })
  }

  function checkCollitionPecesRigth(){
    hero.bullets.forEach((bullet)=>{
      fishesRigth.forEach((fish)=>{
        if(fish.isTouching(bullet)){
          fishesRigth.splice(fishesRigth.indexOf(fish),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score--;
        }
      })
    })
  }

//BONUS - BONUS - BONUS - BONUS
  function checkCollitionBonusesLeft(){
    hero.bullets.forEach((bullet)=>{
      bonusesLeft.forEach((bonusLeft)=>{
        if(bonusLeft.isTouching(bullet)){
          bonusesLeft.splice(bonusesLeft.indexOf(bonusLeft),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score+=100;
        }
      })
    })
  }

  function checkCollitionBonusesRigth(){
  hero.bullets.forEach((bullet)=>{
    bonusesRigth.forEach((bonusRigth)=>{
      if(bonusRigth.isTouching(bullet)){
        bonusesRigth.splice(bonusesRigth.indexOf(bonusRigth),1);
        hero.bullets.splice(hero.bullets.indexOf(bullet),1);
        score-=100;
      }
    })
  })
}

//BONUS - BONUS - BONUS - BONUS

  

//listeners

addEventListener('keydown', function(e){
  console.log(e.keyCode)
  switch(e.keyCode){
    case 65:
    if(hero.x === 0)return;
    hero.x-=64;
    break;
    case 68:
    if(hero.x === canvas.width - hero.width)return;
    hero.x+=64;
    break;
    case 83:
      generatebullet()
      break
      case 87:
      generatebullet()
      break

  }
})


