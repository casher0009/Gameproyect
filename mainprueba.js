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
 var images = {
  hero: 'https://t1.rbxcdn.com/cbc4940cc40fc00da68ffaab0ed89ae1',
  hero2: 'https://t1.rbxcdn.com/cbc4940cc40fc00da68ffaab0ed89ae1',
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


//class

class Hero{
  constructor(x=0,y=0,img){
this.x = canvas.width/2
this.y = canvas.height -64
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
this.width = 35
this.height = 96
this.x = character.x + character.width /2 - this.width/2;
this.y= character.y - this.height
this.vY = -3;
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
  checkCollition()
  checkClean()
}


function start(){
  interval = setInterval(function(){
    update();
  },1000/60)
  }


  //aux functions

  //BASURA
  function generateBasura(){
    if(!(frames%30===0) ) return;
    var basura = new Basura();
    basuras.push(basura)
  }

  function drawBasura(){
    basuras.forEach(function(basura){
      basura.draw();
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


    
  function checkCollition(){
    for(var i = 0; i<basuras.length; i++)
    for(var j = 0; j<hero.bullets.length; j++)
    if(basuras[i].isTouching(hero.bullets[j]))
    basuras[i].live--;
  }

  function checkClean(){
    for(var i = 0; i<basuras.length; i++)
      for(var j = 0; j<hero.bullets.length; j++)
        if(basuras[i].live === 0){
        basuras.splice(i,1);
        hero.bullets.splice(j,1);
        score++;
    }
  }

  

//listeners

addEventListener('keydown', function(e){
  console.log(e.keyCode)
  switch(e.keyCode){
    case 90:
    if(hero.x === 0)return;
    hero.x-=64;
    break;
    case 88:
    if(hero.x === canvas.width - hero.width)return;
    hero.x+=64;
    break;
    case 32:
      generatebullet()
      break
  }
})


