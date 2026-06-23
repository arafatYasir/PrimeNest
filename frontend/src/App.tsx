import { Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App