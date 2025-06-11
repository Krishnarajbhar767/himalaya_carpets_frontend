import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import JoinNewsLetter from "../components/common/JoinNewsLetter";
import { AnimatePresence } from "motion/react";
import WhatsAppChatIcon from "../components/common/WhatsAppChatIcon";
function MainLayout() {
    // When This Public Route Mount Then Render JoinNewsLetter Component

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />

            <main className="flex-1 overflow-x-hidden  place-content-center  overflow-y-auto ">
                <Outlet />
            </main>

            <Footer />
            <AnimatePresence>
                <JoinNewsLetter />
            </AnimatePresence>
            <WhatsAppChatIcon />
        </div>
    );
}

export default MainLayout;
