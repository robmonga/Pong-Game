import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 3;
    this.ping = new Audio("/public/sounds/pong-01.wav");
    
    
    // set X and Y coordinates at the center
    this.reset();
  }
  
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    
    // generating a random number between - 5 and 5
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    // setting a number between -5 and 5, based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  
  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    
    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }
  
  paddleCollision(leftPaddle, rightPaddle) {
    if (this.vx > 0) {
      // detect player 2 collision
      let paddle = rightPaddle.coordinates(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
      let { leftX, topY, bottomY } = paddle;
      
      if (
        //is the right edge of the ball >= left edge of the paddle
        // AND is the ball Y >= top of the paddle and <= the bottom of the paddle?
        this.x + this.radius >= leftX
        && 
        this.y >= topY
        && 
        this.y <= bottomY
        ) {
          this.vx = -this.vx
          this.ping.play();
        }
        
      } else {
        // detec player 1 collision
        let paddle = leftPaddle.coordinates(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
        let { rightX, topY, bottomY } = paddle;
        
        if (
          //left edge of the ball <= right edge of the paddle
          //ball Y >= paddle top AND <= paddle bottom
          this.x - this.radius <= rightX
          && this.y >= topY
          && this.y <= bottomY
          ) {
            //flip the vx
            this.vx = -this.vx
            this.ping.play();
          }
        }
        
      }
      
      goal(player) {
        if(player.score===player.limit) {alert(this.player + ", wins!")}
        else {player.score++}
        this.reset();
      }

      render(svg, leftPaddle, rightPaddle) {
        //nudge
        this.x += this.vx;
        this.y += this.vy;
        
        this.wallCollision();
        this.paddleCollision(leftPaddle, rightPaddle);
        let circle = document.createElementNS(SVG_NS, 'circle');
        
        circle.setAttributeNS(null, "r", this.radius);
        circle.setAttributeNS(null, "cx", this.x); //x of the centre point
        circle.setAttributeNS(null, "cy", this.y); //y of the centre point
        circle.setAttributeNS(null, "fill", "#fff");
        
        svg.appendChild(circle);
        
        // detect a goal
        
        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <=0;
        
        if (rightGoal) {
          this.goal(leftPaddle)
          this.direction = 3;
        } else if (leftGoal) {
          this.goal(rightPaddle)
          this.direction = -3;
        } 
      }
    }