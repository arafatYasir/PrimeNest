import { Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"
import PropertiesPage from "./pages/PropertiesPage"
import ContactPage from "./pages/ContactPage"
import { Toaster } from "@/components/ui/sonner"

const App = () => {
  return (
    <>
      {/* ---- Routes ---- */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>

      {/* ---- Toaster ---- */}
      <Toaster position="top-right" />
    </>
  )
}

export default App