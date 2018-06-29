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

class Hero2{
  constructor(){
    this.x = canvas2.width/2
    this.y = canvas2.height -66
    this.width = 64;
    this.height = 64
    this.bullets2 = []
    this.image = new Image();
    this.image.src = images.hero2;
     this.image.onload = function(){
       this.draw()
       }.bind(this);
  }
    draw(){
    ctx2.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Board2{
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
    else if (score2 <= 100){
      ctx2.font = "75px garbage";
      ctx2.fillText("NO FUE", 100,200);
      ctx2.fillText("SUFICIENTE!", 5,300);
      ctx2.font = "15px garbage";
      ctx2.fillStyle = 'red    ';
    }
    else if(score2 >= 100 && score2 <= 199){
      ctx2.font = "70px garbage";
      ctx2.fillText("GANASTE!!!!", 20,200);
      ctx2.fillText("GRACIAS", 20,300);
      ctx2.fillText("POR LIMPIAR", 20,400);

      ctx2.font = "15px garbage";
      ctx2.fillStyle = 'red    ';
    }
    else if(score2 >= 200){
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

class Bullet2{
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


class Basura2{
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

class FishLeft2{
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
  ctx2.drawImage(this.image, this.x, this.y, this.width, this.height)
}
isTouching(item){
  return  (this.x < item.x + item.width) &&
          (this.x + this.width > item.x) &&
          (this.y < item.y + item.height) &&
          (this.y -20 + this.height > item.y);

}
}
class FishRigth2{
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
class BonusLeft2{
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
class BonusRigth2{
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
var hero2 = new Hero2()
var board2 = new Board2()


//mainFunctions
function update2(){
  frames2++;
  ctx2.clearRect(0,0,canvas2.width,canvas2.height)
  board2.draw()
  hero2.draw()
  generateBasura2()
  drawBasura2()
  drawBullets2()
  generateFishLeft2()
  drawFishLeft2()
  generateFishRigth2()
  drawFisRigth2()
  checkCollitionBasura2()
  checkCollitionPecesRigth2()
  checkCollitionPecesLeft2()
  generateBonusLeft2()
  generateBonusRigth2()
  drawBonusLeft2()
  drawBonusRigth2()
  checkCollitionBonusesLeft2()
  checkCollitionBonusesRigth2()
  if (60 - Math.floor(frames2/60) === 0 ){
    finishHim2()}
  }


function start2(){
  interval2 = setInterval(function(){
    update2();
  },1000/60)
  }


  //aux functions

  function finishHim2(){
    clearInterval(interval2);
    interval2 = undefined;
    board2.gameOver();
    // sound.pause();
    // sound.currentTime = 0;
  }

  function restart2(){
    if(interval2) return;
    basuras2 = [];
    fishesLeft2 = [];
    fishesRigth2 = [];
    bonusesLeft2 = [];
    bonusesRigth2 = [];
    score2 = 0
    frames2 = 0;
    start2();

}

  //GENERADORES Y DIBUJANTES
  function generateBasura2(){
    if(!(frames2%40===0) ) return;
    var basura2 = new Basura2();
    basuras2.push(basura2)
  }
  function drawBasura2(){
    basuras2.forEach(function(basura2){
      basura2.draw();
  })}


  function generateFishLeft2(){
    if(!(frames2%200===0) ) return;
    var fishLeft2 = new FishLeft2();
    fishesLeft2.push(fishLeft2)
  }

  function drawFishLeft2(){
    fishesLeft2.forEach(function(fishLeft2){
      fishLeft2.draw();
  })}
  
  function generateFishRigth2(){
    if(!(frames2%200===0) ) return;
    var fishRigth2 = new FishRigth2();
    fishesRigth2.push(fishRigth2)
  }

  function drawFisRigth2(){
    fishesRigth2.forEach(function(fishRigth2){
      fishRigth2.draw();
  })}

  function generatebullet2(){
  // if(!(frames2%2===0) ) return;
    var bullet2 = new Bullet2(hero2);
    hero2.bullets2.push(bullet2);
  }
  
  function drawBullets2(){
    hero2.bullets2.forEach(function(bullet2){
      bullet2.draw()
    })}


    function generateBonusLeft2(){
      if(!(frames2%1000===0) ) return;
      var bonusLeft2 = new BonusLeft2();
      bonusesLeft2.push(bonusLeft2)
    }
  
    function drawBonusLeft2(){
      bonusesLeft2.forEach(function(bonusLeft2){
        bonusLeft2.draw();
    })}
    
    function generateBonusRigth2(){
      if(!(frames2%500===0) ) return;
      var bonusRigth2 = new BonusRigth2();
      bonusesRigth2.push(bonusRigth2)
    }
  
    function drawBonusRigth2(){
      bonusesRigth2.forEach(function(bonusRigth2){
        bonusRigth2.draw();
    })}




  //COLISIONES Y CONSECUENCIAS

  function checkCollitionBasura2(){
    hero2.bullets2.forEach((bullet2)=>{
      basuras2.forEach((basura2)=>{
        if(basura2.isTouching(bullet2)){
          basuras2.splice(basuras2.indexOf(basura2),1);
          hero2.bullets2.splice(hero2.bullets2.indexOf(bullet2),1);
          score2+= 5;
        }
      })
    })
  }

  function checkCollitionPecesLeft2(){
    hero2.bullets2.forEach((bullet2)=>{
      fishesLeft2.forEach((fish)=>{
        if(fish.isTouching(bullet2)){
          //el pez se va
          fishesLeft2.splice(fishesLeft2.indexOf(fish),1);
          //la bala tambien
          hero2.bullets2.splice(hero2.bullets2.indexOf(bullet2),1);
          // y los puntos alv
          score2--;
        }
      })
    })
  }

  function checkCollitionPecesRigth2(){
    hero2.bullets2.forEach((bullet2)=>{
      fishesRigth2.forEach((fish)=>{
        if(fish.isTouching(bullet2)){
          fishesRigth2.splice(fishesRigth2.indexOf(fish),1);
          hero2.bullets2.splice(hero2.bullets2.indexOf(bullet2),1);
          score2--;
        }
      })
    })
  }

//BONUS - BONUS - BONUS - BONUS
  function checkCollitionBonusesLeft2(){
    hero2.bullets2.forEach((bullet2)=>{
      bonusesLeft2.forEach((bonusLeft2)=>{
        if(bonusLeft2.isTouching(bullet2)){
          bonusesLeft2.splice(bonusesLeft2.indexOf(bonusLeft2),1);
          hero2.bullets2.splice(hero2.bullets2.indexOf(bullet2),1);
          score2+=100;
        }
      })
    })
  }

  function checkCollitionBonusesRigth2(){
  hero2.bullets2.forEach((bullet2)=>{
    bonusesRigth2.forEach((bonusRigth2)=>{
      if(bonusRigth2.isTouching(bullet2)){
        bonusesRigth2.splice(bonusesRigth2.indexOf(bonusRigth2),1);
        hero2.bullets2.splice(hero2.bullets2.indexOf(bullet2),1);
        score2-=100;
      }
    })
  })
}

//BONUS - BONUS - BONUS - BONUS




  function OnePlayer(){
    if (frames2 <=1){
    document.getElementById('second').style.visibility = "hidden"
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
    case 38:
      generatebullet2()
      break
      case 40:
      generatebullet2()
      break
      case 27:
      restart()
      restart2()
      break
  }
})

document.getElementById("one").addEventListener('click',function(){
  if (frames <= 1) start(); OnePlayer()
})

document.getElementById("two").addEventListener('click',function(){
  if (frames <= 1) start()
  ;if (frames2 <= 1) start2()
})

