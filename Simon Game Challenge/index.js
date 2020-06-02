var userClickedPattern=[];
var gamePattern=[];
var buttonColor=["red","blue","green","yellow","orange","purple"];
var started=false;
var level=0;


$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
})

$(".btn").click(function(event){
  var userChoosenColor=event.target.id;
  userClickedPattern.push(userChoosenColor);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChoosenColor);
  animate(userChoosenColor);
})



function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*6);
  var randomChoosenColor=buttonColor[randomNumber];
  $("#"+randomChoosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
  gamePattern.push(randomChoosenColor);
}

function playSound(name){
  var playAudio=new Audio("sounds/"+name+".mp3");
  playAudio.play();
}

function animate(userChoosenColor){
  $("#"+userChoosenColor).addClass("pressed");
  setTimeout(function(){
    $("#"+userChoosenColor).removeClass("pressed");
  },100);
}

function checkAnswer(index){
  if (userClickedPattern[index]===gamePattern[index]) {
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern=[];
    }
  } else {
    gameOver();
  }
}

function gameOver(){
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  restart();
}

function restart(){
  userClickedPattern=[];
  gamePattern=[];
  started=false;
  level=0;
}
