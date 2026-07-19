import { Route, Routes } from "react-router"
import RootLayout from "./layouts/RootLayout"
import HomePage from "./pages/HomePage"
import PropertiesPage from "./pages/PropertiesPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import { Toaster } from "@/components/ui/sonner"
import PropertyDetailsPage from "./pages/PropertyDetailsPage"
import DashboardOverviewPage from "./pages/DashboardOverviewPage"
import DashboardPropertiesPage from "./pages/DashboardPropertiesPage"
import DashboardLayout from "./layouts/DashboardLayout"
import DashboardSavedPage from "./pages/DashboardSavedPage"

const App = () => {
  return (
    <>
      {/* ---- Routes ---- */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverviewPage />} />
          <Route path="/dashboard/properties" element={<DashboardPropertiesPage />} />
          <Route path="/dashboard/saved" element={<DashboardSavedPage />} />
        </Route>
      </Routes>

      {/* ---- Toaster ---- */}
      <Toaster position="top-right" />
    </>
  )
}

export default App