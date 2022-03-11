import { useState } from 'react';
import BoardForm from './BoardForm';
import IterationForm from './IterationForm';
import '../assets/index.css'

import { RunningIterationsProvider } from '../contexts/RunningIterations';

export default function Controls() {
  const [runningIterations, setRunningIterations] = useState(false);

  return (
    <div className='controls'>
      <RunningIterationsProvider value={[runningIterations, setRunningIterations]}>
        <BoardForm />
        <IterationForm />
      </RunningIterationsProvider>
    </div>
  );
}