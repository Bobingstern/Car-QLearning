class Player {

  constructor() {

    this.fitness = 0;
    this.vision = []; //the input array fed into the neuralNet
    this.decision = []; //the out put of the NN
    this.unadjustedFitness;
    this.lifespan = 0; //how long the player lived for this.fitness
    this.bestScore = 0; //stores the this.score achieved used for replay
    this.dead = false;
    this.score = 0;
    this.gen = 0;

    this.pos = createVector(800, 450)
    this.vel = createVector()
    this.drag = 0.85
    this.angle = -0.75
    this.angularVelocity = 0
    this.angularDrag = 0.9
    this.power = 0.32
    this.turnSpeed = 0.008
    this.visionLines = []



    this.genomeInputs = 7;
    this.genomeOutputs = 4;
    this.brain = new Genome(this.genomeInputs, this.genomeOutputs);
    this.vel.limit(2)

    this.edgeLines = []
    this.w = 7
    this.h = 15
    this.Color = color(255, 0, 0)
    this.on = 0
    this.oofMeter = 0
    this.old = this.pos.copy()
    this.time = 0
    this.showField = true


  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  show() {
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      push()
      translate(this.pos.x, this.pos.y)
      rectMode(CENTER)
      rotate((-this.angle))
      fill(this.Color)
      rect(0, 0, this.w, this.h)


      pop()


      for (var i=0;i<this.edgeLines.length;i++){
        strokeWeight(2)
        //line(this.edgeLines[i][0], this.edgeLines[i][1], this.edgeLines[i][2],this.edgeLines[i][3])
      }


      if (this.showField){
        for (var i=0;i<this.visionLines.length;i++){
          strokeWeight(2)
          line(this.visionLines[i][0], this.visionLines[i][1], this.visionLines[i][2],this.visionLines[i][3])
        }
      }
      //---





    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
  move() {
      if (this.decision[3] > 0.5){
        this.accelerate()
      }

      if (this.decision[2] > 0.5){
        this.decelerate()
      }

      if (this.decision[1] > 0.5){
        this.angularVelocity += this.turnSpeed
      }

      if (this.decision[0] > 0.5){
        this.angularVelocity -= this.turnSpeed
      }

    }

  accelerate(){
    this.vel.add(new p5.Vector(sin(this.angle)*this.power, cos(this.angle)*this.power))
  }

  decelerate(){
    this.vel.sub(new p5.Vector(sin(this.angle)*this.power, cos(this.angle)*this.power))
  }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
  update() {
      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
      this.pos.add(this.vel)
      this.vel.mult(this.drag)
      this.vel.limit(7)
      this.angle += this.angularVelocity
      this.angularVelocity *= this.angularDrag



      //-----------------edgeLines--------------------------------------------
      let X = this.pos.x-this.w/2
      let Y = this.pos.y-this.h/2

      let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-this.w/2
      Y = this.pos.y+this.h/2

      let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[0] = [New_X, New_Y, New_X2, New_Y2]


      //--
      X = this.pos.x+this.w/2
      Y = this.pos.y-this.h/2

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x+this.w/2
      Y = this.pos.y+this.h/2

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[1] = [New_X, New_Y, New_X2, New_Y2]


      //--
      X = this.pos.x+this.w/2
      Y = this.pos.y+this.h/2

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-this.w/2
      Y = this.pos.y+this.h/2

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[2] = [New_X, New_Y, New_X2, New_Y2]

      //--
      X = this.pos.x+this.w/2
      Y = this.pos.y-this.h/2

      New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      X = this.pos.x-this.w/2
      Y = this.pos.y-this.h/2

      New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
      New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

      this.edgeLines[3] = [New_X, New_Y, New_X2, New_Y2]

      //------------------------------------------------------Collision
      this.fitness = 0

      var colled = false
      for (var i=0;i<Default.length;i++){
        for (var j=0;j<this.edgeLines.length;j++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], this.edgeLines[j][0], this.edgeLines[j][1], this.edgeLines[j][2], this.edgeLines[j][3])
          if (hit){
            var hitPoint = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], this.edgeLines[j][0], this.edgeLines[j][1], this.edgeLines[j][2], this.edgeLines[j][3], true)
            colled = true

          }
        }
      }
      this.fitness-=0.5
      if (colled){
        //ded
        this.fitness -= 50
        this.dead = true
      }



      colled = false
      var check = YummyGates[this.on]
      for (var j=0;j<this.edgeLines.length;j++){
        var hit = collideLineLine(check[0], check[1], check[2], check[3], this.edgeLines[j][0], this.edgeLines[j][1], this.edgeLines[j][2], this.edgeLines[j][3])
        if (hit){
          colled = true

          this.fitness += 10
          this.score++
          this.lifespan+=10
          if (this.on > YummyGates.length-1){
            this.on=0
            console.log('new lap')
          }

        }
      }

      if (colled){
        this.on++
      }

      this.score = this.fitness
      //line(YummyGates[this.on][0], YummyGates[this.on][1], YummyGates[this.on][2], YummyGates[this.on][3])
     

      this.time++
      
      return this.dead
      //--------------------
      

      







    }
    //----------------------------------------------------------------------------------------------------------------------------------------------------------

  look() {
    let leng = 2


      for (var x=0;x<300;x++){
        let X = this.pos.x
        let Y = this.pos.y

        let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

        X = this.pos.x
        Y = this.pos.y+this.h*2+x

        let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)


        var collided = false
        for (var i=0;i<Default.length;i++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], New_X, New_Y, New_X2, New_Y2)
          if (hit){
            collided = true
          }
        }
        if (collided){
          this.visionLines[0] = [New_X, New_Y, New_X2, New_Y2]
          break
        }



      }

      for (var x=0;x<300;x++){
        let X = this.pos.x
        let Y = this.pos.y

        let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

        X = this.pos.x+this.w*2+x
        Y = this.pos.y+this.h*2+x

        let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)


        var collided = false
        for (var i=0;i<Default.length;i++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], New_X, New_Y, New_X2, New_Y2)
          if (hit){
            collided = true
          }
        }
        if (collided){
          this.visionLines[1] = [New_X, New_Y, New_X2, New_Y2]
          break
        }

      }


      for (var x=0;x<300;x++){
        let X = this.pos.x
        let Y = this.pos.y

        let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

        X = this.pos.x-this.w*2-x
        Y = this.pos.y+this.h*2+x

        let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)


        var collided = false
        for (var i=0;i<Default.length;i++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], New_X, New_Y, New_X2, New_Y2)
          if (hit){
            collided = true
          }
        }
        if (collided){
          this.visionLines[2] = [New_X, New_Y, New_X2, New_Y2]
          break
        }



      }

      for (var x=0;x<300;x++){
        let X = this.pos.x
        let Y = this.pos.y

        let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

        X = this.pos.x-this.w*2-x
        Y = this.pos.y

        let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)


        var collided = false
        for (var i=0;i<Default.length;i++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], New_X, New_Y, New_X2, New_Y2)
          if (hit){
            collided = true
          }
        }
        if (collided){
          this.visionLines[3] = [New_X, New_Y, New_X2, New_Y2]
          break
        }



      }




      for (var x=0;x<300;x++){
        let X = this.pos.x
        let Y = this.pos.y

        let New_X = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)

        X = this.pos.x+this.w*2+x
        Y = this.pos.y

        let New_X2 = this.pos.x + (X - this.pos.x) * cos(-this.angle) - (Y - this.pos.y) * sin(-this.angle)
        let New_Y2 = this.pos.y + (X - this.pos.x) * sin(-this.angle) + (Y - this.pos.y) * cos(-this.angle)


        var collided = false
        for (var i=0;i<Default.length;i++){
          var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], New_X, New_Y, New_X2, New_Y2)
          if (hit){
            collided = true
          }
        }
        if (collided){
          this.visionLines[4] = [New_X, New_Y, New_X2, New_Y2]
          break
        }



      }








  this.vision = []

   var colled = false
   for (var i=0;i<Default.length;i++){
     for (var j=0;j<this.visionLines.length;j++){
       var hit = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], this.visionLines[j][0], this.visionLines[j][1], this.visionLines[j][2], this.visionLines[j][3])
       if (hit){

         var hitPoint = collideLineLine(Default[i][0], Default[i][1], Default[i][2], Default[i][3], this.visionLines[j][0], this.visionLines[j][1], this.visionLines[j][2], this.visionLines[j][3], true)
         colled = true
         if (this.showField){
           ellipse(hitPoint.x, hitPoint.y, 5, 5)
          }

         this.vision.push(dist(hitPoint.x, hitPoint.y, this.pos.x, this.pos.y))

       }
     }
   }

   var sum = 0
   for (var i=0;i<this.vision.length;i++){
    sum+=this.vision[i]
   }

   for (var i=0;i<this.vision.length;i++){
    
    this.vision[i] = this.vision[i]/sum
   }



   this.vision.push(this.vel.mag())
   this.vision.push(-this.angle)




  }


  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //gets the output of the this.brain then converts them to actions
  think() {

      var max = 0;
      var maxIndex = 0;
      //get the output of the neural network
      this.decision = this.brain.feedForward(this.vision);

      for (var i = 0; i < this.decision.length; i++) {
        if (this.decision[i] > max) {
          max = this.decision[i];
          maxIndex = i;
        }
      }
      this.move()

      //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    //returns a clone of this player with the same brian
  clone() {
    var clone = new Player();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //since there is some randomness in games sometimes when we want to replay the game we need to remove that randomness
  //this fuction does that

  cloneForReplay() {
    var clone = new Player();
    clone.brain = this.brain.clone();
    clone.fitness = this.fitness;
    clone.brain.generateNetwork();
    clone.gen = this.gen;
    clone.bestScore = this.score;

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
    return clone;
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  //fot Genetic algorithm
  calculateFitness() {

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<replace
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------
  crossover(parent2) {

    var child = new Player();
    child.brain = this.brain.crossover(parent2.brain);
    child.brain.generateNetwork();
    return child;
  }
}
