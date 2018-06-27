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
var bullets = []
var basuras = []
 var images = {
  hero: 'https://t1.rbxcdn.com/cbc4940cc40fc00da68ffaab0ed89ae1',
  bg:'./images/canvas bg.jpg',
  bullet: './images/bullet.png',
 }

var imgBasura = {
  bolsa:'./images/bolsa.png',
  botella: './images/botella.png',
  cigarro: './images/cigarro.png',
  duff: './images/duff.png',
  popote: './images/duff.png'
}


//class

class Hero{
  constructor(x=0,y=0,img){
this.x = canvas.width/2
this.y = canvas.height -64
this.width = 64;
this.height = 64
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
}
}

class Bullet{
constructor(character){
this.width = 35
this.height = 96
this.x = character.x + character.width /2 - this.width/2;
this.y= character.y - this.height
this.vY = -3;
this.isTouching= function(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y  - 20 + this.height > item.y);
                  }      
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
this.contador = Math.floor(Math.random()*6);
this.isTouching= function(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y  - 20 + this.height > item.y);
                  }      
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

}


//instances
var hero = new Hero()
var board = new Board()


//mainFunctions
function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  hero.draw()
  drawBasura()
  drawBullets()
  checkCollition();

  if (frames % Math.floor(Math.random()*1000)===0){generateBasura()}
}


function start(){
  interval = setInterval(function(){
    update();
  },1000/60)
  }


  //aux functions

  //BASURA
  function generateBasura(){
    var basura = new Basura();
    basuras.push(basura)
  }

  function drawBasura(){
    basuras.forEach(function(basura){
      basura.draw();
  })}

  function generatebullet(){
    var bullet = new Bullet(hero);
    bullets.push(bullet);
  }
  
  function drawBullets(){
    bullets.forEach(function(bullet){
      bullet.draw()
    })}


    
  function checkCollition(){
    bullets.forEach(function(bullet){
    if(bullet.isTouching(basuras)){
    console.log("bullet");
}
})
  
    basuras.forEach(function(basura){
    if(basura.isTouching(bullets)){
    console.log("Zombie");    
}
})
}  
  

//listeners

addEventListener('keydown', function(e){
  console.log(e.keyCode)
  switch(e.keyCode){
    case 37:
    if(hero.x === 0)return;
    hero.x-=64;
    break;
    case 39:
    if(hero.x === canvas.width - hero.width)return;
    hero.x+=64;
    break;
    case 32:
      generatebullet()
      break
  }
})


document.getElementById("one").addEventListener('click',function(){
  if (frames <= 1) start()
})
