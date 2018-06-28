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
}
  draw(){
  ctx.drawImage(this.image,0,0,canvas.width,canvas.height);
  ctx.fillText("You Score: "+ score ,100,40)
  ctx.fillStyle = "white";
  ctx.font = '55px Avenir';
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
  
  //GENERA
  generateBasura()
  generateFishLeft()
  generateFishRigth()
  generateBonusLeft()
  generateBonusRigth()

  //DIBUJA
  drawBasura()
  drawBullets()
  drawFishLeft()
  drawFisRigth()
  drawBonusLeft()
  drawBonusRigth()

  //COLISIONES
  checkCollitionBasura()
  checkCollitionPecesRigth()
  checkCollitionPecesLeft()

//CONSECUENCIAS DE COLISION
  checkCleanBasura()
  checkCleanPecesLeft()
  checkCleanPecesRigth()
}


function start(){
  interval = setInterval(function(){
    update();
  },1000/60)
  }


  //aux functions

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
    for(var i = 0; i<basuras.length; i++)
    for(var j = 0; j<hero.bullets.length; j++)
    if(basuras[i].isTouching(hero.bullets[j]))
    basuras[i].live--;
  }

  function checkCleanBasura(){
    for(var i = 0; i<basuras.length; i++)
      for(var j = 0; j<hero.bullets.length; j++)
        if(basuras[i].live === 0){
        basuras.splice(i,1);
        hero.bullets.splice(j,1);
        score++;
    }
  }

  function checkCollitionPecesLeft(){
    for(var i = 0; i<fishesLeft.length; i++)
    for(var j = 0; j<hero.bullets.length; j++)
    if(fishesLeft[i].isTouching(hero.bullets[j]))
    fishesLeft[i].live--;
  }

  function checkCleanPecesLeft(){
    for(var i = 0; i<fishesLeft.length; i++)
      for(var j = 0; j<hero.bullets.length; j++)
        if(fishesLeft[i].live === 0){
        fishesLeft.splice(i,1);
        hero.bullets.splice(j,1);
        score--;
    }
  }

  function checkCollitionPecesRigth(){
    for(var i = 0; i<fishesLeft.length; i++)
    for(var j = 0; j<hero.bullets.length; j++)
    if(fishesRigth[i].isTouching(hero.bullets[j]))
    fishesRigth[i].live--;
  }

  function checkCleanPecesRigth(){
    for(var i = 0; i<fishesRigth.length; i++)
      for(var j = 0; j<hero.bullets.length; j++)
        if(fishesRigth[i].live === 0){
        fishesRigth.splice(i,1);
        hero.bullets.splice(j,1);
        score--;
    }
  }
//BONUS - BONUS - BONUS - BONUS
  // function checkCollitionPecesLeft(){
  //   for(var i = 0; i<fishesLeft.length; i++)
  //   for(var j = 0; j<hero.bullets.length; j++)
  //   if(fishesLeft[i].isTouching(hero.bullets[j]))
  //   fishesLeft[i].live--;
  // }

  // function checkCleanPecesLeft(){
  //   for(var i = 0; i<fishesLeft.length; i++)
  //     for(var j = 0; j<hero.bullets.length; j++)
  //       if(fishesLeft[i].live === 0){
  //       fishesLeft.splice(i,1);
  //       hero.bullets.splice(j,1);
  //       score--;
  //   }
  // }

  // function checkCollitionPecesRigth(){
  //   for(var i = 0; i<fishesLeft.length; i++)
  //   for(var j = 0; j<hero.bullets.length; j++)
  //   if(fishesRigth[i].isTouching(hero.bullets[j]))
  //   fishesRigth[i].live--;
  // }

  // function checkCleanPecesRigth(){
  //   for(var i = 0; i<fishesRigth.length; i++)
  //     for(var j = 0; j<hero.bullets.length; j++)
  //       if(fishesRigth[i].live === 0){
  //       fishesRigth.splice(i,1);
  //       hero.bullets.splice(j,1);
  //       score--;
  //   }
  // }
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


