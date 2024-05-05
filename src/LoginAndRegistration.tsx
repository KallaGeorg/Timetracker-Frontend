import React, { useEffect, useState } from "react";
import RegistrationForm from "./Registration";
import LoginForm from "./LoginForm";
import Menue from "./Menue";
import { User } from "./Menue";
interface LoginAndRegistrationProps {
    onLoginSuccess: (user: User) => void;
    onLogout: () => void;
   
}
const LoginAndRegistration: React.FC<LoginAndRegistrationProps> = ({ onLoginSuccess }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[loginData, setLoginData] = useState<User | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLoginSuccess = (user: User) => {
        setIsLoggedIn(true);
        setLoginData({...user, activities: []});
        onLoginSuccess(user);
    };
 
    
    const handleToggleRegistration = () => {
        setShowRegistration(!showRegistration);
    };
    
    useEffect(() => {
        console.log("LoginAndRegistration component re-rendered");
    },[]);
    
    return (
        <div>
            {!isLoggedIn && !showRegistration && (
                 <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
            {!isLoggedIn && showRegistration && (
                <RegistrationForm onLoginSuccess={handleLoginSuccess} /> 
            )}
            {isLoggedIn && <Menue user={loginData!} />}
            {!isLoggedIn && (
             <button onClick={handleToggleRegistration}>
                {showRegistration ? "logga in" : "registrera"}
             </button>
             )}
        </div>

    )
}
export default LoginAndRegistration;