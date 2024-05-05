 import { useState } from "react";
import LoginAndRegistration from "./LoginAndRegistration";


const Frontpage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthPage, setShowAuthPage] = useState(false);

    const handleLoginClick = () => {
        setShowAuthPage(true);
    }
    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setShowAuthPage(false);
    }
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    }


    return (
        <>
        <h1>Timetracker</h1>
        {!isLoggedIn ? (
            <button onClick={handleLoginClick}>Login</button>
        ):(
            <button onClick={handleLogoutClick}>Logout</button>
        )}
        {showAuthPage && <LoginAndRegistration onLoginSuccess={handleLoginSuccess} onLogout={() => setIsLoggedIn(false)}/>}
     
        </>
        
    );
};
export default Frontpage;