import Footer from "@/components/Footer"
import Navbar from "@/components/navbar/Navbar"
import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    )
}

export default RootLayout