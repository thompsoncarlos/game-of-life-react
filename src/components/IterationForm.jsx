import { useEffect, useRef, useState } from 'react';
import axios from 'axios'

import FormRow from './FormRow';
import FormCol from './FormCol';
import FormButton from './FormButton';
import InputField from './InputField';
import '../assets/index.css'

import { useBoard } from '../contexts/Board';
import { useRunningIterations } from '../contexts/RunningIterations';

const URL = 'http://localhost:3003'

export default function Controls() {
  const { board, updateBoard } = useBoard();
  const { runningIterations, updateRunningIterations } = useRunningIterations();
  
  const [numberOfIterations, setNumberOfIterations] = useState(0);
  const [iterationDelay, setIterationDelay] = useState(0.5);

  const iteration = useRef();
  const iterationsCount = useRef(0);

  const changeNumberOfIterations = (value) => {
    if (value < 0) setNumberOfIterations(0);
    else setNumberOfIterations(value);
  };

  const changeIterationDelay = (value) => {
    if (value < 0) setIterationDelay(0);
    else setIterationDelay(value);
  };

  const runOrStopIterations = (event) => {
    event.preventDefault();

    updateRunningIterations(! runningIterations);
  };

  const runIterations = () => {
    runNextIteration();
    iteration.current = setInterval(runIterations, iterationDelay * 1000);
    // console.log(iteration)
  };

  const stopIterations = () => {
    clearInterval(iteration.current);
    iterationsCount.current = 0;
  };

  useEffect(() => {
    if (runningIterations) {
      runIterations();
    } else {
      stopIterations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runningIterations]);

  const runNextIteration = () => {
    axios.put(`${URL}/board/next`)
    .then(response => response)
    .then(updateBoard);

    if (runningIterations) {
      iterationsCount.current++;
      if (iterationsCount.current === +numberOfIterations) {
        updateRunningIterations(false);
      }
    }
  };
  
  return (
    <form noValidate id="iterationForm" onSubmit={runOrStopIterations} disabled={board.length === 0}>
      <FormRow>
        <FormCol>
          <FormButton type="submit" disabled={board.length === 0} id="btnRunOrStopIterations">{runningIterations ? "Stop" : "Run"}</FormButton>
          <FormButton type="button" disabled={runningIterations || board.length === 0} id="btnRunNextIteration" onClick={runNextIteration}>Next Iteration</FormButton>
          <InputField type="number" label="Seconds/Iteration " value={iterationDelay} min="0" step="0.5" disabled={runningIterations} id="inputIterationDelay" onChange={changeIterationDelay} />
          <InputField type="number" label="# of iterations (0 for inifinite)" value={numberOfIterations} min={0} id="inputNumberOfIterations" onChange={changeNumberOfIterations} />
        </FormCol>
      </FormRow>
    </form>
  );
}