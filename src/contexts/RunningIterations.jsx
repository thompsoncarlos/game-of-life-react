import { createContext, useContext } from 'react';

const RunningIterationsContext = createContext();
RunningIterationsContext.displayName = "RunningIterationsContext";

const useRunningIterations = () => {
  const [runningIterations, setRunningIterations] = useContext(RunningIterationsContext);
  const updateRunningIterations = (value) => {
    setRunningIterations(value);
  };

  return { runningIterations, updateRunningIterations };
};

const RunningIterationsProvider = ({ value, children }) => {
  return (
    <RunningIterationsContext.Provider value={value}>
      {children}
    </RunningIterationsContext.Provider>
  );
};

export { RunningIterationsProvider, useRunningIterations };