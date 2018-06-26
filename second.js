//canvas height="512" width="512"
var canvas2 = document.getElementById("second");
var ctx2 = canvas2.getContext('2d');

// // //PRUEBAS Y DIMENSIONES DEL CANVAS
// ctx2.fillRect(0,0,50,50)
// ctx2.fillRect(second.width-50,0,50,50)
// ctx2.fillRect(second.width-50,second.height-50,50,50)
// ctx2.fillRect(0,second.height-50,50,50)


//constants
var interval2;
var frames2 = 0;
var enemies2 = []
 var images2 = {
  hero2: 'https://t1.rbxcdn.com/cbc4940cc40fc00da68ffaab0ed89ae1',
  enemy2: 'https://banner2.kisspng.com/20180525/gsh/kisspng-super-mario-bros-goomba-rosalina-8-bit-5b080340880705.2764707415272517765572.jpg',
  bg2:'./images/canvas bg.jpg',
  bullet2: './images/ScorpionSpear_3Danim.gif'
 }


//class
class Character2{
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
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class HERO2 extends Character2{
  constructor(x,y,img){
    super(x,y,img)
    this.bullets2 = []
  }
}

    class Board2{
      constructor(){
        this.image = new Image();
        this.image.src = images2.bg2
        this.image.onload = function(){
          this.draw();
        }.bind(this)
      }
        draw(){
          ctx2.drawImage(this.image,0,0,canvas.width,canvas.height)
        }
      }
    
      class Bullet2{
        constructor(character2){
          this.width = 20
          this.height = 20
            this.x = character2.x + character2.width /2 - this.width/2;
            this.y= character2.y - this.height
            this.vY = -1
            this.image = new Image();
            this.image.src = images2.bullet2;
            this.image.onload = function(){
              this.draw();
            }.bind(this)
          }//END OF CONSTRUCTOR
      draw(){
        this.y+=this.vY;
        ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
      }
        }

//instances
var hero2 = new HERO2(canvas.width/2, canvas.height -60, images.hero)
var board2 = new Board2()


//mainFunctions

function update2(){
  ctx2.clearRect(0,0,canvas.width,canvas.height)
  board2.draw()
  hero2.draw()
  drawBullets2()
}
function start2(){
interval2 = setInterval(update2,1000/60)
}




//aux functions
function generatebullet2(){
  var bullet2 = new Bullet2(hero2);
  hero2.bullets2.push(bullet2);
}

function drawBullets2(){
  hero2.bullets2.forEach(function(bullet2){
    bullet2.draw()
  });
}



//listeners

addEventListener('keydown', function(e){
  console.log(e.keyCode)
  switch(e.keyCode){
    case 37:
    if(hero2.x === 0)return;
    hero2.x-=64;
    break;
    case 39:
    if(hero2.x === canvas2.width - hero2.width)return;
    hero2.x+=64;
    break;
    case 32:
      generatebullet2()
      break
  }
})




start2();