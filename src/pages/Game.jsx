import { useState } from 'react';

import Controls from '../components/Controls';
import Board from '../components/Board';

import { BoardProvider } from '../contexts/Board';

export default function Game() {
  const [board, setBoard] = useState([]);

  return (
    <BoardProvider value={[board, setBoard]}>
      <Controls />
      <Board />
    </BoardProvider>
  );
}