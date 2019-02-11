//IMPORTS FROM PARTIALS
import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

//CONSTRUCTOR
export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;
    //
    this.gameElement = document.getElementById(element);
    
    this.board = new Board(this.width, this.height);
    
    this.paddleWidth = 8;
    this.paddleHeight = 100;
    this.boardGap = 10;
    this.radius = 8;
    this.leftName = "Left";
    this.rightName = "Right";
    
    this.leftPaddle = new Paddle(
      this.leftName,
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z
      )
      
      this.rightPaddle = new Paddle(
        this.rightName,
        this.height,
        this.paddleWidth,
        this.paddleHeight,
        (this.width - (this.paddleWidth + this.boardGap)),
        (this.height - this.paddleHeight) / 2,
        KEYS.up,
        KEYS.down
        )
        
        this.ball = new Ball(
          this.radius,
          this.width,
          this.height
          )
          
          this.score1 = new Score(this.width / 2 - 50, 30, 30)
          this.score2 = new Score(this.width / 2 + 25, 30, 30)
          
          // PAUSE event listener
          document.addEventListener('keydown', event =>{
            if (event.key === KEYS.spaceBar) {
              this.pause = !this.pause;
            }
          });
        }
        
        //pause game
        render() {
          if(this.pause) {
            return;
          }
          
          // empty out game element before rendering. 
          this.gameElement.innerHTML = '';
          
          let svg = document.createElementNS(SVG_NS, "svg");
          svg.setAttributeNS(null, "width", this.width);
          svg.setAttributeNS(null, "height", this.height);
          svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
          svg.setAttributeNS(null, 'version', '1.1');
          this.gameElement.appendChild(svg);
          
          // rendering all game elements insde the SVG
          this.board.render(svg);
          this.leftPaddle.render(svg);
          this.rightPaddle.render(svg);
          this.ball.render(svg, this.leftPaddle, this.rightPaddle);
          this.score1.render(svg, this.leftPaddle.score)
          this.score2.render(svg, this.rightPaddle.score)
        }
      }