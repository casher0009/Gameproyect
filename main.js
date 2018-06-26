//canvas height="512" width="512"
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
var enemies = []
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
class Character{
  constructor(x=0,y=0,img){
this.x = x
this.y = y
this.width = 64;
this.height = 64
this.image = new Image();
this.image.src = img;
this.image.onload = function(){
  this.draw()
}.bind(this);
this.vX = 1
this. vY = 1
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class HERO extends Character{
  constructor(x,y,img){
    super(x,y,img)
    this.bullets = []
  }
}

    class Board{
      constructor(){
        this.image = new Image();
        this.image.src = images.bg
        this.image.onload = function(){
          this.draw();
        }.bind(this)
      }
        draw(){
          ctx.drawImage(this.image,0,0,canvas.width,canvas.height)
        }
      }
    
      class Bullet{
        constructor(character){
          this.width = 35
          this.height = 96
            this.x = character.x + character.width /2 - this.width/2;
            this.y= character.y - this.height
            this.vY = -3
            this.image = new Image();
            this.image.src = images.bullet;
            this.image.onload = function(){
              this.draw();
            }.bind(this)
          }//END OF CONSTRUCTOR
      draw(){
        this.y+=this.vY;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      }
      isTouching(item){
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
      }
    }
    
        

        class Enemy{
          constructor(){
              this.x = Math.floor((Math.random())*8)*64;
              this.y = Math.floor((Math.random())*3)*64;
              this.width = 64;
              this.height = 64;
          }
          draw(){
              ctx.fillStyle="#A01E8E";
              ctx.fillRect(this.x,this.y, this.width,this.height)
              // console.log(this.x, this.y) PRUEBA
          }
      }
      

//instances
var hero = new HERO(canvas.width/2, canvas.height -60, images.hero)
var board = new Board()
//PRUEBA var enemy = new Enemy()
//mainFunctions


function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
  // PRUEBA enemy.draw()
  hero.draw()
  drawBullets()
   generate()
   drawBasura()
}
function start(){
interval = setInterval(update,1000/60)
}




//aux functions
function generatebullet(){
  var bullet = new Bullet(hero);
  hero.bullets.push(bullet);
}

function drawBullets(){
  hero.bullets.forEach(function(bullet){
    bullet.draw()
  });
}

 function generate(){
   if(!(frames%50===0) ) return;

   var basura = new Enemy();
   if (enemies.length <= 76){
   enemies.push(basura),
  console.log(enemies.length)}
   return;
 }

 function drawBasura(){
   enemies.forEach(function(basura){
       basura.draw();
       // if(bullet.isTouching(basura)){
       //     finish();
       // }
   });  
 }




// function finish(){
//   clearInterval(interval);
//   interval = undefined;
//   board.gameOver();
// }
// function restart(){
//   if(interval) return;
//   obs = [];
//   frames = 0;
//   start();
// }




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


// Document.getElementById("one").addEventListener('Click',start())
start()