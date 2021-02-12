var balloon , ballonImg , ballonImg1 , ballonImg2;
var backg ;
var database;
var position , length;
var data;


function preload(){
 backg=loadImage('images/Hot Air Ballon-01.png');
 ballonImg=loadImage('images/Hot Air Ballon-02.png');
 ballonImg1=loadImage('images/Hot Air Ballon-03.png');
 ballonImg2=loadImage('images/Hot Air Ballon-04.png');

}



function setup() {
  createCanvas(1500,500);
 balloon= createSprite(300 , 250, 50, 50);
 balloon.addAnimation('images' , ballonImg);
 balloon.scale=0.7;

  database=firebase.database();
  
  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on('value' , readPosition , showError);

 var balloonLength=database.ref('balloon/length');
 balloonLength.on('value' , readLength  , showError);
}

function draw() {
  background(backg);  

  if (keyDown(LEFT_ARROW)){
    balloon.x-=10;
  }else if (keyDown(RIGHT_ARROW)){
    balloon.x+=10;
  }else if (keyDown(UP_ARROW)){
   updateLength(10 , 10);
   balloon.addImage('bal' , ballonImg1);
   balloon.scale+=0.1;
  }else if (keyDown(DOWN_ARROW)){
   updateLength(-10 , -10);
   balloon.addImage('ball' , ballonImg2)
   balloon.scale-=0.1;
  }

 
  textSize(14);
  stroke('white');
  strokeWeight(5);
  fill('purple');
  text('USE ARROW KEYS TO MOVE THE BALLOON UP AND DOWN' , 50, 50);
  drawSprites();
}

function updateLength(width , height){
  database.ref('balloon/length').set({
    'width':balloon.width+width,
    'height':balloon.height+height
  })
}

function readLength(data){
  length=data.val();
  balloon.width=length.width;
  balloon.height=length.height;
}


function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log('Error in writing the DATABASE');
}

