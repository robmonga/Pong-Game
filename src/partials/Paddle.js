import {SVG_NS} from '../settings';

export default class Paddle {
  constructor(name, boardHeight, width, height, x, y, upKey, downKey) {
    this.name = name;
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 50;
    this.score = 0;
    this.limit = 10; 


    // document.addEventListener("keydown", event => {
    //   switch(event.key) {
    //     case upKey:
    //     this.up();
    //     break;
    //     case downKey:
    //     this.down();
    //     break;
    //   }
    // });
 
    
    document.addEventListener("mousemove", event=>{
      this.y = event.clientY;
      //  const scale = event.clientY / event.target.getBoundingClientRect().height;
    // this.y = this.height * scale;
    });  

  }
  
  
  up() {
    this.y = Math.max(0, this.y - this.speed);
    
  }
  
  down() {
    this.y = Math.min(this.y + this.speed, this.boardHeight - this.height);
  
  }
  
  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return {leftX, rightX, topY, bottomY};
  }
  
  render (svg) {
    let rect = document.createElementNS(SVG_NS, 'rect');
    
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "x", this.x)
    rect.setAttributeNS(null, "y", this.y)
    rect.setAttributeNS(null, "fill", "#6600CC" );
    
    svg.appendChild(rect);
    
    
  }
}

