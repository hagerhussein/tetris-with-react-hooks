import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { createStage, checkCollision } from '../gameHelpers';

const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

console.log('re-render')
// moving left and right 
const movePlayer = direction => {
  if(!checkCollision(player, stage, {x: direction, y:0})){
updatePlayerPosition({ x:direction, y:0 })
  }
} 
const startGame = () => {
setStage(createStage());
resetPlayer();
setGameOver(false);
}
// moving down 
const drop = () => {
  if(!checkCollision(player, stage, {x: 0, y:1})){
    updatePlayerPosition({ x:0, y:1, collided:false})
  } else {
    if (player.position.y < 1) {
      console.log ("game over");
      setGameOver(true);
      setDropTime(null);
    }
    updatePlayerPosition({ x:0, y:0, collided: true})
  }
}
const dropPlayer = () => {
drop()
}
const move = ({ keyCode }) => {
if (!gameOver) {
  if(keyCode === 37) {
    movePlayer(-1)
  } else if (keyCode === 39) {
    movePlayer(1)
  } else if (keyCode === 40) {
    dropPlayer()
  }
}
}
  return (
    <StyledTetrisWrapper 
    role="button" 
    tabIndex="0" 
    onKeyDown={e => move(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris