import { Route, Routes } from "react-router"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello World</div>} />
    </Routes>
  )
}

export default App