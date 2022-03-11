import { createContext, useContext } from 'react';

const BoardContext = createContext();
BoardContext.displayName = "BoardContext";

const useBoard = () => {
  const [board, setBoard] = useContext(BoardContext);
  const updateBoard = (value) => {
    setBoard(value);
  };

  return { board, updateBoard };
};

const BoardProvider = ({ value, children }) => {
  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardProvider, useBoard };