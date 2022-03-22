//gloabl variables
var trex,trexRunning,trexCollided
var ground,groundImage;
var array=[1009,35,856,566,38,453,348];
var o1,o2,o3,o4,o5,o6;
var o=[];
var score=0;

//preload - here I load all the images, amination and sound, font 
function preload(){
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud1.png");
  cloudImage2=loadImage("cloud2.png");
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200);

  //trex sprite
  trex = createSprite(250,height-30,30,30);
  trex.addAnimation("running",trexRunning);
  trex.scale = 0.7;
  trex.x=100;
  console.log('This is setup.');

  //ground sprite
  ground=createSprite(width/2,height-20,width,20);
  ground.addImage(groundImage);
  edges=createEdgeSprites();
  iGround=createSprite(100,height-12,200,10)
  iGround.visible=false

  for(var i=0;i<array.length;i++){
    if(array[i]>400){
      console.log(array[i]);
    }
  }
  o=[o1,o2,o3,o4,o5,o6];

}

function draw(){
  //console.time()// o find out how long it takes for the function ,to start keeping a track of time
  background('#ffffff');
  text("score="+score,500,50);
  score+=Math.round(frameCount/60 )
  if(keyDown('space') && trex.y>height-50){
    trex.velocityY=-10;
  }
  //adding gravity to trex
  trex.velocityY+=0.5;
  trex.collide(iGround);
  
  ground.velocityX=-1;
  if(ground.x<100){
    ground.x=ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  drawSprites();
  //console.timeEnd()//to stop and print the time on the console.
  for (var i=0; i<5;i++){
    //console.log("running the loop");// used to print a simple message
  }
  /*console.warn("this is a warning")
  console.error("this is an error")
  console.info("this is information")*/
  //console.log(getFrameRate());
  

}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud=createSprite(width,100,20,20);
    cloud.velocityX=-4;
    cloud.lifetime=width/4+10;
    var randoms=Math.round(random(1,2));
    switch(randoms){
      case 1:cloud.addImage(cloudImage);
      break;
      case 2:cloud.addImage(cloudImage2);
      break;
      default:
        break;
    }
    
    cloud.scale=random(0.1,0.3);
    cloud.y=random(50,120);
    
    console.log(cloud.scale);
    trex.depth=cloud.depth+1;
  }
}

function spawnObstacles(){
  if(frameCount%120===0){
    var obstacle=createSprite(width,height-40,10,10);
    obstacle.velocityX=-4;
    
    var r=Math.round(random(0,5));
    obstacle.addImage(o[r]);
    obstacle.lifetime=width/4;
    obstacle.scale=0.5;
    
  }
}