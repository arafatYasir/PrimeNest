import { Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"
import PropertiesPage from "./pages/PropertiesPage"
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <>
      {/* ---- Routes ---- */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
        </Route>
      </Routes>

      {/* ---- Toaster ---- */}
      <Toaster position="top-right" />
    </>
  )
}

export default App