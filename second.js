//canvas2 height="576" width="512"
var canvas2 = document.getElementById("second");
var ctx2 = canvas2.getContext('2d');

// // //PRUEBAS Y DIMENSIONES DEL CANVAS2
// ctx2.fillRect(0,0,50,50)
// ctx2.fillRect(canvas2.width-50,0,50,50)
// ctx2.fillRect(canvas2.width-50,canvas2.height-50,50,50)
// ctx2.fillRect(0,canvas2.height-50,50,50)


//constants
var interval2;
var frames2 = 0;
var score2 = 0;
var basuras2 = []
//  var images = {
//   hero: 'https://t1.rbxcdn.com/cbc4940cc40fc00da68ffaab0ed89ae1',
//   bg:'./images/canvas2 bg.jpg',
//   bullet2: './images/bullet2.png',
//  }

// var imgBasura2 = {
//   bolsa:'./images/bolsa.png',
//   botella: './images/botella.png',
//   cigarro: './images/cigarro.png',
//   duff: './images/duff.png',
//   popote: './images/popote.png'
// }

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

ctx2.fillText("You Score: "+ score2 ,100,40)
ctx2.fillStyle = "white";
ctx2.font = '55px Avenir';


}
}

class Bullet2{
constructor(character2){
this.width = 35
this.height = 96
this.x = character2.x + character2.width /2 - this.width/2;
this.y= character2.y - this.height
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
  checkCollition2()
  checkClean2()
}


function start2(){
  interval2 = setInterval(function(){
    update2();
  },1000/60)
  }


  //aux functions

  //BASURA2
  function generateBasura2(){
    if(!(frames2%30===0) ) return;
    var basura2 = new Basura2();
    basuras2.push(basura2)
  }

  function drawBasura2(){
    basuras2.forEach(function(basura2){
      basura2.draw();
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


    
  function checkCollition2(){
    for(var i = 0; i<basuras2.length; i++)
    for(var j = 0; j<hero2.bullets2.length; j++)
    if(basuras2[i].isTouching(hero2.bullets2[j]))
    basuras2[i].live--;
  }

  function checkClean2(){
    for(var i = 0; i<basuras2.length; i++)
      for(var j = 0; j<hero2.bullets2.length; j++)
        if(basuras2[i].live === 0){
        basuras2.splice(i,1);
        hero2.bullets2.splice(j,1);
        score2++;
    }
  }





  function OnePlayer(){
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
