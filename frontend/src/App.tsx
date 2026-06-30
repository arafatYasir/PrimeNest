import { Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"
import PropertiesPage from "./pages/PropertiesPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
      </Route>
    </Routes>
  )
}

export default App