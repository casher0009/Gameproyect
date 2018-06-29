//canvas height="576" width="512"
var canvas2 = document.getElementById("second");
var ctx2 = canvas2.getContext('2d');

// // //PRUEBAS Y DIMENSIONES DEL canvas2
// ctx2.fillRect(0,0,50,50)
// ctx2.fillRect(canvas2.width-50,0,50,50)
// ctx2.fillRect(canvas2.width-50,canvas2.height-50,50,50)
// ctx2.fillRect(0,canvas2.height-50,50,50)


//constants
var interval2;
var frames2 = 0;
var score2 = 0;
var basuras2 = []
var fishesLeft2 = []
var fishesRigth2 = []
var bonusesLeft2 = []
var bonusesRigth2 = []

//class

class Hero{
  constructor(){
    this.x = canvas2.width/2
    this.y = canvas2.height -66
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
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Board{
  constructor(){
    this.image = new Image();
    this.image.src = images.bg
}
  draw(){
  ctx2.drawImage(this.image,0,0,canvas2.width,canvas2.height);
  ctx2.fillStyle = "white";
  ctx2.font = '40px Avenir';
  ctx2.fillText("You Score: "+ score2 ,230,40)
  ctx2.fillText("TIME: "+ (60 - Math.floor(frames2/60)),20,40)
  }
  gameOver(){
    if(score2 <= 0){
      ctx2.font = "80px Garbage";
      ctx2.fillText("LA REGASTE", 10,200);
      ctx2.font = "15px garbage";
      ctx2.fillStyle = 'red    ';
    }
    else if (score2 <= 200){
      ctx2.font = "75px garbage";
      ctx2.fillText("NO FUE", 100,200);
      ctx2.fillText("SUFICIENTE!", 5,300);
      ctx2.font = "15px garbage";
      ctx2.fillStyle = 'red    ';
    }
    else if(score2 >= 200 && score2 <= 999){
      ctx2.font = "70px garbage";
      ctx2.fillText("GANASTE!!!!", 20,200);
      ctx2.fillText("GRACIAS", 20,300);
      ctx2.fillText("POR LIMPIAR", 20,400);

      ctx2.font = "15px garbage";
      ctx2.fillStyle = 'red    ';
    }
    else if(score2 >= 1000){
     ctx2.font = "70px garbage";
     ctx2.fillStyle = 'green';
     ctx2.fillText("UNETE A", 20,200);
     ctx2.fillText("GREANPEACE!", 10,300);
     ctx2.font = "15px garbage";
     ctx2.fillStyle = 'red   ';
    } 
    ctx2.font = "40px garbage";
   ctx2.fillText("Press 'ESC ' to reset", 20,450);
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  this.image.src = (this.contador === 1 ) ? imgFishesLeft2.ballena: 
                   (this.contador === 2 ) ? imgFishesLeft2.delfin:
                   (this.contador === 3 ) ? imgFishesLeft2.kyroge:
                   imgFishesLeft2.seadra;
}
draw(){
  this.x+=this.vX;
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  this.x = canvas2.width +64;
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  this.x = canvas2.width +64;
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
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
  frames2++;
  ctx2.clearRect(0,0,canvas2.width,canvas2.height)
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
  checkCollitionBonusesRigth2()
  if (60 - Math.floor(frames2/60) === 58 ){
    finishHim()}
  }


function start(){
  interval2 = setInterval(function(){
    update();
  },1000/60)
  }


  //aux functions

  function finishHim(){
    clearInterval(interval2);
    interval2 = undefined;
    board.gameOver();
    // sound.pause();
    // sound.currentTime = 0;
  }

  function restart(){
    if(interval2) return;
    basuras2 = [];
    fishesLeft2 = [];
    fishesRigth2 = [];
    bonusesLeft2 = [];
    bonusesRigth2 = [];
    score2 = 0
    frames2 = 0;
    start();
}

  //GENERADORES Y DIBUJANTES
  function generateBasura(){
    if(!(frames2%40===0) ) return;
    var basura = new Basura();
    basuras2.push(basura)
  }
  function drawBasura(){
    basuras2.forEach(function(basura){
      basura.draw();
  })}


  function generateFishLeft(){
    if(!(frames2%200===0) ) return;
    var fishLeft = new FishLeft();
    fishesLeft2.push(fishLeft)
  }

  function drawFishLeft(){
    fishesLeft2.forEach(function(fishLeft){
      fishLeft.draw();
  })}
  
  function generateFishRigth(){
    if(!(frames2%200===0) ) return;
    var fishRigth = new FishRigth();
    fishesRigth2.push(fishRigth)
  }

  function drawFisRigth(){
    fishesRigth2.forEach(function(fishRigth){
      fishRigth.draw();
  })}

  function generatebullet(){
  // if(!(frames2%2===0) ) return;
    var bullet = new Bullet(hero);
    hero.bullets.push(bullet);
  }
  
  function drawBullets(){
    hero.bullets.forEach(function(bullet){
      bullet.draw()
    })}


    function generateBonusLeft(){
      if(!(frames2%2000===0) ) return;
      var bonusLeft = new BonusLeft();
      bonusesLeft2.push(bonusLeft)
    }
  
    function drawBonusLeft(){
      bonusesLeft2.forEach(function(bonusLeft){
        bonusLeft.draw();
    })}
    
    function generateBonusRigth(){
      if(!(frames2%1000===0) ) return;
      var bonusRigth = new BonusRigth();
      bonusesRigth2.push(bonusRigth)
    }
  
    function drawBonusRigth(){
      bonusesRigth2.forEach(function(bonusRigth){
        bonusRigth.draw();
    })}




  //COLISIONES Y CONSECUENCIAS

  function checkCollitionBasura(){
    hero.bullets.forEach((bullet)=>{
      basuras2.forEach((basura)=>{
        if(basura.isTouching(bullet)){
          basuras2.splice(basuras2.indexOf(basura),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score2++;
        }
      })
    })
  }

  function checkCollitionPecesLeft(){
    hero.bullets.forEach((bullet)=>{
      fishesLeft2.forEach((fish)=>{
        if(fish.isTouching(bullet)){
          //el pez se va
          fishesLeft2.splice(fishesLeft2.indexOf(fish),1);
          //la bala tambien
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          // y los puntos alv
          score2--;
        }
      })
    })
  }

  function checkCollitionPecesRigth(){
    hero.bullets.forEach((bullet)=>{
      fishesRigth2.forEach((fish)=>{
        if(fish.isTouching(bullet)){
          fishesRigth2.splice(fishesRigth2.indexOf(fish),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score2--;
        }
      })
    })
  }

//BONUS - BONUS - BONUS - BONUS
  function checkCollitionBonusesLeft(){
    hero.bullets.forEach((bullet)=>{
      bonusesLeft2.forEach((bonusLeft)=>{
        if(bonusLeft.isTouching(bullet)){
          bonusesLeft2.splice(bonusesLeft2.indexOf(bonusLeft),1);
          hero.bullets.splice(hero.bullets.indexOf(bullet),1);
          score2+=100;
        }
      })
    })
  }

  function checkCollitionBonusesRigth2(){
  hero.bullets.forEach((bullet)=>{
    bonusesRigth2.forEach((bonusRigth)=>{
      if(bonusRigth.isTouching(bullet)){
        bonusesRigth2.splice(bonusesRigth2.indexOf(bonusRigth),1);
        hero.bullets.splice(hero.bullets.indexOf(bullet),1);
        score2-=100;
      }
    })
  })
}

//BONUS - BONUS - BONUS - BONUS




  function OnePlayer(){
    document.getElementById('second').style.visibility = "hidden"
  }
  

//listeners

