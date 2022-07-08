kaboom({
    global: true,
    fullscreen: true,
    //rgb: 0-255, kabook: 0-1 alha = 0-1
    clearColor: [0.23, 0.4, 0.8, 1],
    debug: true,
    scale: 1,
  });
  
  loadRoot("./sprites/");
  //loadSprice(NameOfSubject, 'FILE')
  loadSprite("Mario", "mario.png");
  loadSprite("block", "ground.png");
  loadSprite("coin", "coin.png");
  loadSprite("surprise", "surprise.png");
  loadSprite("mush", "evil_mushroom.png");
  loadSprite("unboxed", "unboxed.png");
  loadSprite("pipe", "pipe2.png");
  loadSound("jumpSound","jumpSound.mp3");
  loadSound("gameSound","gameSound.mp3");
  loadSprite("castle", "castle.png")
  function makeid(length) {
    var result           = ' ';
    var characters       = ' # ! $  M^';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function makePipeAndGournd(length) {
  var result           = ' ';
  var characters       = '= P = = = P ';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
  scene("begin", ()=>{
    add([
      text("Welcome to the best Mario game in the whole world \n Press ENTER to start playing",25),
      origin("center"),
      pos(width()/2, height()/2)
    ])
    keyRelease("enter",() =>{
      go("game")
    }  );
  })
  scene("vacation", (score) =>{
      add([
      text("You've just lost, press ENTER to play another crazy level\n  \n Your score was:"+ score, 15),
    origin("center"),
    pos(width()/2, height()/2)
      ])
      keyRelease("enter", () => {
        go("game")
      })
  })
  
  scene("winning",() => {
    
    let isJumping = false;
    let jump = 500;
    let score = 0;
    play("gameSound")
    const symbolMap2 = {
      width: 20,
      height: 20,
      "=": [sprite("block"), solid(), scale(1.35)],
      "C": [sprite("castle")]
    };
    
    const map2 = [
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                              ",
      "                                                          C     ",
      "                                                               ",
      "                                                               ",
      "                                                              ",
      "=================================================================================",
    ];
    const gameLevel2 = addLevel(map2, symbolMap2);
    const player = add([
      sprite("Mario"),
       solid (),
      body(),
      pos(120,0),
       origin("bot"),
      ])
      let v = 120
  
      keyDown('right', () =>{ 
        player.move(v , 0);
         } );
  
    keyDown('left', () => {
      if(player.pos.x>40)
      player.move(-v,0)
    
    })
  
  
    keyDown('up', () => { 
      if(player.grounded()){
        play("jumpSound")
      isJumping = true;
        player.jump(jump)
      }
      else{
        isJumping=false;
      }
    
      
    })
     player.action(()=>{
      if(player.pos.x>=1178.1877999999983){
        add([
          text("\n \n \n You've just won, Good Job ! \n press ENTER to play another CRAZY level!", 30),
          origin("center"),
          pos(width()/2, height()/2)
        ])
        keyRelease("enter", ()=> {
          go("game")
        })
       }     })
     
    
  })

  scene("game", () => {
    layers(["bg", "obj", "ui"], "obj");
    play("gameSound")
    const symbolMap = {
      width: 20,
      height: 20,
      "=": [sprite("block"), solid(), scale(1.35)],
      "#": [sprite("surprise"), solid(),'coinSurprise'],
      "!": [sprite("surprise"), solid(),'mushroomSurprise'],
      "$": [sprite("coin"), 'coin'],
      "x":[sprite("unboxed"),solid()],
      "M":[sprite("mush"), body(), 'mush'],
      "^":[sprite("mush"),body(),solid(),"gege"],
      "P":[sprite("pipe"), solid(), scale(2)]
    };
    
    const map = [
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      "                                                               ",
      makeid(63),
      "                                                               ",
      "                                                               ",
      makePipeAndGournd(50),
      "                                                                ",
      "                    ^ ^              ^                         ",
      "===============================================================",
    ];
    const gameLevel = addLevel(map, symbolMap);
    let isJumping = false;
    let jump = 500;
    let score = 0;
    const scoreLabel = add([
      text("Score:"+ score, 20),
      pos(50,10),
      layer("ui"),
      {
        value:score,
      },
    ])
    const player = add([
      sprite("Mario"),
       solid (),
      body(),
      pos(40,0),
       origin("bot"),
       big(jump)
      ])
      let v = 120
  
      keyDown('right', () =>{ 
        player.move(v , 0);
         } );
  
    keyDown('left', () => {
      if(player.pos.x>40)
      player.move(-v,0)
    
    })
  
  
    keyDown('up', () => { 
      if(player.grounded()){
        play("jumpSound")
      player.jump(jump) 
      isJumping = true;

      }
      else{
        isJumping=false;
      }
    })
  
    player.on("headbump",(obj) =>{
      if(obj.is("coinSurprise"))
      {
        gameLevel.spawn("$",obj.gridPos.sub(0,1))
        destroy(obj)
        gameLevel.spawn("$",obj.gridPos.sub(0,1))
        destroy(obj)
  
      } //function "headbump" ended
  
    })
    player.on("headbump", (obj) => {
        if(obj.is("mushroomSurprise"))
        {
            gameLevel.spawn("M", obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn("M",obj.gridPos.sub(0,1))
        }
    })  //function"headbump" ended
      player.collides('coin', (x) => {  
        destroy(x)
        scoreLabel.value+=1;
        scoreLabel.text = "Score: " + scoreLabel.value
        });
        //collecting coins
      player.collides('mush', (x) => { 
        destroy(x)
        scoreLabel.value+=10;
        scoreLabel.text = "Score: " + scoreLabel.value
        player.biggify(5);
        });
    //collecting mushrooms
     action("mush", (mush)=> {
        mush.move(90,0)
     })
     action("gege", (gege)=>{
        gege.move(-60,0)
     })
     player.collides("gege",(x)=>{
        if(isJumping){
            destroy(x)
        }
        else{
          if(player.isBig()){
            scoreLabel.value+=100;
        scoreLabel.text = "Score: " + scoreLabel.value
            destroy(x)
            player.smallify()
          }
        
          else{
            go("vacation", scoreLabel.value)
            destroy(player)
            
        }
      }
     })
     player.action(()=>{
        camPos(player.pos)
        scoreLabel.pos.x = player.pos.x-600;
        scoreLabel.pos.y = player.pos.y - 310;
        if(isJumping){

        }
        else{
        }
        if(player.grounded()){
            isJumping=false;
        }
        else{
            isJumping=true;
        }
        if(player.pos.y >=height() ){
          go("winning")
        }
     })
  
  });
  start("begin");