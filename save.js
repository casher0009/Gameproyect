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
  