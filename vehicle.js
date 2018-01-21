class Vehicle{

  constructor(x, y){
    this.position = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.acceleration = createVector();
    this.velocity = p5.Vector.random2D();
    this.size = 8;
    this.maxSpeed = 10;
    this.maxForce = 1;
  }

  behaviors(){
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);

  }

  applyForce(f){
    this.acceleration.add(f);
  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show(){
    stroke(0);
    strokeWeight(this.size);
    point(this.position.x, this.position.y);
  }

  arrive(target){
    let desired = p5.Vector.sub(target, this.position);
    let distance = desired.mag();
    let speed = this.maxSpeed;
    if(distance < 100){
      speed = map(distance, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target){
    let desired = p5.Vector.sub(target, this.position);
    let d = desired.mag();
    if(d < 50){
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }else{
      return createVector(0, 0);
    }
  }
}
