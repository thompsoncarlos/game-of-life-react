import { useEffect, useState } from 'react';
import axios from 'axios'

import FormRow from './FormRow';
import FormCol from './FormCol';
import FormButton from './FormButton';
import InputField from './InputField';
import SelectField from './SelectField';
import '../assets/index.css'

import { useBoard } from '../contexts/Board';
import { useRunningIterations } from '../contexts/RunningIterations';

const URL = 'http://localhost:3003'

export default function Controls() {
  const { board, updateBoard } = useBoard();
  const { runningIterations } = useRunningIterations();
  
  const [boardSize, setBoardSize] = useState(20);
  const [boardType, setBoardType] = useState("");
  const [boardTypeOptions, setBoardTypeOptions] = useState([]);

  const changeBoardSize = (value) => {
    if (value < 0) setBoardSize(3);
    else setBoardSize(value);
  };

  const getBoardTypes = () => {
    axios.get(`${URL}/boards`).then(response => {
      setBoardTypeOptions(response);
      setBoardType(response[0]);
    });
  };

  useEffect(getBoardTypes, []);

  const createBoard = (event) => {
    event.preventDefault();

    axios.post(`${URL}/board`)
      .then(response => response)
      .then(updateBoard);
  };
  
  return (
    <form noValidate id="boardForm" onSubmit={createBoard}>
      <FormRow>
         <FormCol>
          <InputField type="number" label="Size of board " value={boardSize} min="3" id="inputBoardSize" onChange={changeBoardSize} />
          <SelectField value={boardType} id="selectBoardType" onChange={setBoardType}>
            {boardTypeOptions.map(option => <option key={option} value={option}>{option.toUpperCase()}</option>)}
            {boardTypeOptions.length === 0 && <option defaultValue="">Select a board</option>}
          </SelectField>
          <FormButton type="submit" disabled={runningIterations || Boolean(boardSize < 3) || ! Boolean(boardType)} id="btnCreateOrResetBoard">
            {board.length === 0 ? "Create Game" : "Reset Game"}
          </FormButton>
        </FormCol>
      </FormRow>
    </form>
  );
}