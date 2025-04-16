import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FloatingButton } from "../components/FloatingButton/FloatingButton";

export function DefaultLayout(){
    return(
        <>
        <Header/>
            <Outlet/>
            <FloatingButton/>
        <Footer/>
        </>
    );
}
