import './App.css'
import TodoList from './components/TodoList' // Importerar TodoList-komponenten

function App() {

  return (
    <>
      <h1>Att göra</h1>
      {/* Renderar TodoList-komponenten */}
      <TodoList />
    </>
  )
}

export default App
