import React, { useState } from "react";
import RegistrationForm from "./Registration";
import LoginForm from "./LoginForm";
import Menue from "./Menue";
import { User } from "./Menue";
import { Admin } from "./Menue";
import AdminPage from "./AdminPage";
interface LoginAndRegistrationProps {
    onLoginSuccess: (user: User | Admin) => void;
    
    onLogout: () => void;
   
}
const LoginAndRegistration: React.FC<LoginAndRegistrationProps> = ({ onLoginSuccess }) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[loginData, setLoginData] = useState<User | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleUserLoginSuccess = (user: User) => {
        setIsLoggedIn(true);
        setLoginData({...user, activities: []});
        onLoginSuccess(user);
      
    };
    const handleAdminLoginSuccess = (admin:Admin) => {
        setIsLoggedIn(true);
        setLoginData(null);
        setIsAdmin(true);
        onLoginSuccess(admin);
      
    };
    
    const handleToggleRegistration = () => {
        setShowRegistration(!showRegistration);
    };
    const handleDeleteAccountSuccess = () => {
        setIsLoggedIn(false);
    };
    
   
    
    return (
        <div>
            {!isLoggedIn && !showRegistration && (
                 <LoginForm onUserLoginSuccess={handleUserLoginSuccess} onAdminLoginSuccess={handleAdminLoginSuccess} />
            )}
            {!isLoggedIn && showRegistration && (
                <RegistrationForm onLoginSuccess={handleUserLoginSuccess} /> 
            )}
            {isLoggedIn && !isAdmin && <Menue user={loginData!} onDeleteSuccess={handleDeleteAccountSuccess} isLoggedIn={isLoggedIn}/>}
            {isLoggedIn && isAdmin && <AdminPage /> }
            {!isLoggedIn && (
             <button onClick={handleToggleRegistration}>
                {showRegistration ? "logga in" : "registrera"}
             </button>
             )}
        </div>

    )
}
export default LoginAndRegistration;