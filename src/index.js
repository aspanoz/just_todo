import ReactDOM from "react-dom"
import { BaseProvider, LightTheme } from "baseui"
import { Provider as StyletronProvider, DebugEngine } from "styletron-react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as ReduxProvider } from "react-redux"

import store from "./store"

import Auth from "./auth"
import Task from "./task"
import TaskEditModal from "./edit"
import TaskList from "./list"

const debug = new DebugEngine() // 0 void
const engine = new Styletron()

const App = () => {
  return (
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <ReduxProvider store={store}>
        <BaseProvider theme={LightTheme}>
          <TaskList />
          <Auth />
          <Task />
          <TaskEditModal />
        </BaseProvider>
      </ReduxProvider>
    </StyletronProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
