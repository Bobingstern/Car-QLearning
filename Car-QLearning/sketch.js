//this is a template to add a NEAT ai to any game
//note //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
//this means that there is some information specific to the game to input here


var nextConnectionNo = 1000;
var population;
var speed = 60;


var showBest = false; //true if only show the best of the previous generation
var runBest = false; //true if replaying the best ever game
var humanPlaying = false; //true if the user is playing

var humanPlayer;


var showBrain = false;
var showBestEachGen = false;
var upToGen = 0;
var genPlayerTemp; //player

var showNothing = false;
var started = true
let editor

let Map = []
let Default = [[384, 586, 362, 577],
[360, 576, 328, 548],
[326, 546, 304, 486],
[303, 485, 195, 290],
[196, 290, 250, 156],
[250, 156, 336, 84],
[336, 84, 540, 54],
[540, 54, 804, 80],
[804, 80, 1016, 31],
[1017, 34, 1208, 136],
[1208, 136, 1149, 297],
[1146, 299, 970, 333],
[970, 333, 813, 472],
[800, 484, 692, 599],
[690, 598, 386, 586],
[800, 482, 811, 476],
[386, 520, 408, 536],
[414, 537, 668, 546],
[668, 546, 890, 319],
[890, 319, 1016, 263],
[1016, 263, 1111, 249],
[1108, 252, 1136, 156],
[1131, 156, 1018, 88],
[1018, 88, 850, 130],
[848, 130, 578, 117],
[578, 117, 391, 131],
[391, 131, 324, 191],
[324, 191, 288, 290],
[288, 290, 382, 518]
]

let YummyGates = [
[743, 450, 797, 529],
[716, 479, 765, 557],
[686, 509, 727, 586],
[667, 529, 695, 617],
[648, 533, 633, 620],
[612, 529, 597, 607],
[571, 527, 558, 603],
[543, 524, 518, 608],
[504, 524, 477, 605],
[465, 529, 428, 596],
[442, 514, 372, 600],
[407, 517, 328, 570],
[383, 490, 308, 546],
[369, 465, 277, 513],
[356, 436, 253, 477],
[350, 405, 248, 434],
[346, 392, 238, 394],
[319, 356, 220, 356],
[315, 321, 190, 313],
[315, 288, 198, 258],
[319, 258, 230, 206],
[323, 221, 248, 150],
[339, 184, 297, 103],
[362, 166, 345, 70],
[389, 138, 395, 56],
[410, 138, 438, 53],
[439, 133, 486, 46],
[478, 126, 515, 41],
[530, 122, 530, 37],
[566, 120, 568, 33],
[595, 123, 604, 38],
[634, 128, 642, 52],
[665, 122, 678, 56],
[697, 124, 717, 65],
[739, 127, 769, 64],
[781, 134, 807, 57],
[828, 133, 834, 66],
[871, 129, 860, 66],
[910, 122, 883, 52],
[947, 109, 928, 51],
[995.4285736083984, 104, 961.4285736083984, 29],
[1016.4285736083984, 104, 1024.4285736083984, 17],
[1033.4285736083984, 105, 1090.4285736083984, 47],
[1065.4285736083984, 126, 1128.4285736083984, 77],
[1096.4285736083984, 168, 1180.4285736083984, 109],
[1107.4285736083984, 184, 1206.4285736083984, 177],
[1103.4285736083984, 218, 1188.4285736083984, 236],
[1068.4285736083984, 233, 1148.4285736083984, 319],
[1041.4285736083984, 237, 1072.4285736083984, 335],
[999.4285736083984, 250, 1027.4285736083984, 343],
[964.4285736083984, 265, 993.4285736083984, 348],
[927.4285736083984, 285, 963.4285736083984, 380],
[892.4285736083984, 303, 932.4285736083984, 397],
[857.4285736083984, 328, 911.4285736083984, 422],
[831.4285736083984, 360, 888.4285736083984, 455],
[813.4285736083984, 381, 859.4285736083984, 470],
[795.4285736083984, 398, 838.4285736083984, 496],
[773.4285736083984, 425, 820.4285736083984, 504]
]


let batches = 4

let bestGen = null


//--------------------------------------------------------------------------------------------------------------------------------------------------

function getBest(){
  var best = 0
  var best_player = 0
  for (var i=0;i<population.players.length;i++){
    if (population.players[i].fitness > best && (population.players.length/population.batches)*population.batchNo && i > (population.players.length/population.batches)*(population.batchNo-1)){
      best = population.players[i].fitness
      best_player = i
    }
  }
  return best_player
}


function StartEvo(){
  population = new Population(300);
}

var player
var env = {};

var spec = { alpha: 0.01 }
var agent
function setup() {
  window.canvas = createCanvas(1280, 720);
  editor = new Editor()
  player = new Player()
  player.look()
  var nums = player.vision.length
  env.getNumStates = function() { return ; nums}
  env.getMaxNumActions = function() { return 4; }
  agent = new RL.DQNAgent(env, spec); 
  StartEvo()

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace


}
var ep = 0
var score = 0
//--------------------------------------------------------------------------------------------------------------------------------------------------------
function draw() {
  background(56)
  for (var i=0;i<Default.length;i++){
    strokeWeight(3)
    line(Default[i][0], Default[i][1], Default[i][2], Default[i][3])
  }

  for (var i=0;i<YummyGates.length;i++){
    push()
    strokeWeight(0.1)
    stroke(255, 255, 0)
    line(YummyGates[i][0], YummyGates[i][1], YummyGates[i][2], YummyGates[i][3])
    pop()
  }
  if (started){
    textSize(50)
    text("Episode: "+ep, 50, 100)
    text("Score: "+score, 50, 150)
    player.look()
    player.show()
    var ob = player.vision
    var action = agent.act(ob)
    if (action == 0){
      player.accelerate()
    }
    if (action == 1){
      player.decelerate()
    }
    if (action == 2){
      player.angularVelocity += player.turnSpeed
    }
    if (action == 3){
      player.angularVelocity -= player.turnSpeed
    }
    var done = player.update()
    var re = player.fitness
    score += re
    if (done){
      player = new Player()
      score = 0
      ep++
    }
    agent.learn(re)

  }
}
//-----------------------------------------------------------------------------------
function showBestPlayersForEachGeneration() {
  if (!genPlayerTemp.dead) { //if current gen player is not dead then update it

    genPlayerTemp.look();
    genPlayerTemp.think();
    genPlayerTemp.update();
    genPlayerTemp.show();
  } else { //if dead move on to the next generation
    upToGen++;
    if (upToGen >= population.genPlayers.length) { //if at the end then return to the start and stop doing it
      upToGen = 0;
      showBestEachGen = false;
    } else { //if not at the end then get the next generation
      genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
    }
  }
}
//-----------------------------------------------------------------------------------
function showHumanPlaying() {
  if (!humanPlayer.dead) { //if the player isnt dead then move and show the player based on input
    humanPlayer.look();
    humanPlayer.update();
    humanPlayer.show();
  } else { //once done return to ai
    humanPlaying = false;
  }
}
//-----------------------------------------------------------------------------------
function showBestEverPlayer() {
  if (!population.bestPlayer.dead) { //if best player is not dead
    population.bestPlayer.look();
    population.bestPlayer.think();
    population.bestPlayer.update();
    population.bestPlayer.show();
  } else { //once dead
    runBest = false; //stop replaying it
    population.bestPlayer = population.bestPlayer.cloneForReplay(); //reset the best player so it can play again
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//draws the display screen
function drawToScreen() {
  if (!showNothing) {
    //pretty stuff
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    drawBrain();
    writeInfo();
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function drawBrain() { //show the brain of whatever genome is currently showing
  var startX = 0; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  var startY = 0;
  var w = 200;
  var h = 300;

  if (runBest) {
    let boi = getBest()
    population.players[boi].brain.drawGenome(startX, startY, w, h);
  } else
  if (humanPlaying) {
    showBrain = false;
  } else if (showBestEachGen) {
    let boi = getBest()
    population.players[boi].brain.drawGenome(startX, startY, w, h);
  } else {
    if (bestGen == null){
      let boi = getBest()
      population.players[boi].brain.drawGenome(startX, startY, w, h);
    }
    else{
      bestGen.brain.drawGenome(startX, startY, w, h);
    }
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//writes info about the current player
function writeInfo() {
  fill(200);
  textAlign(LEFT);
  textSize(30);
  if (showBestEachGen) {
    text("Score: " + genPlayerTemp.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    text("Gen: " + (genPlayerTemp.gen + 1), 1150, 50);
  } else
  if (humanPlaying) {
    text("Score: " + humanPlayer.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  } else
  if (runBest) {
    text("Score: " + population.bestPlayer.score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    text("Gen: " + population.gen, 1150, 50);
  } else {
    if (showBest) {
      // text("Score: " + population.players[0].score, 650, 50); //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      // text("Gen: " + population.gen, 1150, 50);
      // text("Species: " + population.species.length, 50, canvas.height / 2 + 300);
      // text("Global Best Score: " + population.bestScore, 50, canvas.height / 2 + 200);
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
