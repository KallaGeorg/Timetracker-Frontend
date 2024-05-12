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
        <div>
        <h1 className="timetrackerHeader">Timetracker</h1>
        <button className="loginLogoutButton" onClick={!isLoggedIn ? handleLoginClick : handleLogoutClick}>
            {!isLoggedIn ? "Login" : "Logout"}
        </button>
        {showAuthPage && <LoginAndRegistration onLoginSuccess={handleLoginSuccess} onLogout={() => setIsLoggedIn(false)} />}
    </div>
    
    );
};
export default Frontpage;