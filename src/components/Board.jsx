import BoardCell from "./BoardCell";
import axios from 'axios'
import "../assets/index.css";

import { useBoard } from "../contexts/Board";

const URL = 'http://localhost:3003'

export default function Board() {
  const { board, updateBoard } = useBoard();

  const toggleCellState = (x, y) => {
    let newBoard = board;
    newBoard[x][y] = !Boolean(newBoard[x][y]);

    // axios.post({BOARD_IMPORT})
    axios.post(`${URL}/board/import`)
      .then((response) => response)
      .then(updateBoard);
  };

  return (
    <div className="board">
      <div className="container">
        {board.map((row, x) => (
          <div className="row" key={`row${x}`}>
            {row.map((col, y) => (
              <BoardCell
                key={`col${y}`}
                aria-label="Toggle populate"
                id={`btnToggleCellState-${x + 1}-${y + 1}`}
                onClick={() => toggleCellState(x, y)}
              >
                {Boolean(col) ? "😎" : ""}
              </BoardCell>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
