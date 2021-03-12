import React, {Reducer, useReducer} from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "./setup/theme";
import {Container} from "@material-ui/core";
import Scheduler from "./components/Scheduler";
import {ContextApp, initialState, reducer} from "./state/reducer";

function App() {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState);
  return (
    <ContextApp.Provider value={{dispatch, state}}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"}>
          <Scheduler />
        </Container>
      </ThemeProvider>
    </ContextApp.Provider>
  );
}

export default App;
