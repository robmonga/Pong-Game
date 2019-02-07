import './styles/game.css';
import Game from './partials/Game';

// create a game instance
const game = new Game('game', 512, 256);

//IFFE creates a local scope here. Prevents polluting the global scope with variables. 
//This is a recursive function that passes itself as an argument so that it loops
// 
(function gameLoop() {
  game.render();
  requestAnimationFrame(gameLoop);
})();
