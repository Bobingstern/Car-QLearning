class Editor{
  constructor(){
    this.drawing = false
    this.temp = []
    this.running = true
  }

  show(){
    for (var i=0;i<Default.length;i++){
      line(Default[i][0], Default[i][1], Default[i][2], Default[i][3])
    }
    for (var i=0;i<Map.length;i++){
      //line(Map[i][0], Map[i][1], Map[i][2], Map[i][3])
    }

    if (this.drawing){
      //strokeWeight(5)
      line(this.temp[0][0], this.temp[0][1], mouseX, mouseY)
    }
  }

  update(){

  }
}



function mouseClicked(){
  var flag = false
  if (editor.running){
    if (editor.drawing) {
      Map.push([editor.temp[0][0], editor.temp[0][1], mouseX, mouseY])
      editor.temp = []
      flag = true
      editor.drawing = false
    }

    if (!editor.drawing && !flag){
      editor.temp.push([mouseX, mouseY])
      editor.drawing = true
    }
  }
}



function keyPressed(){
  if (keyCode === ENTER){
    //Map.push([map[0][0], map[0][1], map[map.length-1][2], map[map.length-1][3]])
    editor.drawing = false
    console.log("N")
    editor.running = false
  }



  switch (key) {
    case ' ':
      //toggle showBest
      showBest = !showBest;
      break;
      // case '+': //speed up frame rate
      //   speed += 10;
      //   frameRate(speed);
      //   prvarln(speed);
      //   break;
      // case '-': //slow down frame rate
      //   if(speed > 10) {
      //     speed -= 10;
      //     frameRate(speed);
      //     prvarln(speed);
      //   }
      //   break;
    case 'B': //run the best
      runBest = !runBest;
      break;
    case 'G': //show generations
      showBestEachGen = !showBestEachGen;
      upToGen = 0;
      genPlayerTemp = population.genPlayers[upToGen].clone();
      break;
    case 'N': //show absolutely nothing in order to speed up computation
      showNothing = !showNothing;
      break;

  }
  //any of the arrow keys
  switch (keyCode) {
    case UP_ARROW: //the only time up/ down / left is used is to control the player
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case DOWN_ARROW:
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case LEFT_ARROW:
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      break;
    case RIGHT_ARROW: //right is used to move through the generations

      if (showBestEachGen) { //if showing the best player each generation then move on to the next generation
        upToGen++;
        if (upToGen >= population.genPlayers.length) { //if reached the current generation then exit out of the showing generations mode
          showBestEachGen = false;
        } else {
          genPlayerTemp = population.genPlayers[upToGen].cloneForReplay();
        }
      } else if (humanPlaying) { //if the user is playing then move player right

        //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      }
      break;
  }
}
