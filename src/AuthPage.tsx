import React, { useState } from "react";
import ActivityList, { Activity } from "./ActivityList";
import RegistrationForm from "./Registration";
import LoginForm from "./LoginForm";
export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    activities?: Activity[];
}
interface AuthPageProps {
    onLoginSuccessful: (user: User) => void;
    onLogout: () => void;
   
}
const AuthPage: React.FC<AuthPageProps> = ({onLoginSuccessful }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[loginData, setLoginData] = useState<User | null>(null);
    const [showRegistration, setShowRegistration] = useState(false);

    const handleLoginSuccess = (user: User) => {
        setIsLoggedIn(true);
        setLoginData({...user, activities: []});
        onLoginSuccessful(user);
    };
 
    
    const handleToggleRegistration = () => {
        setShowRegistration(!showRegistration);
    };
    const handleSaveUser =(updatedUser: User) => {
        setLoginData(updatedUser);
    }
    return (
        <div>
            {!isLoggedIn && !showRegistration && (
                 <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
            {!isLoggedIn && showRegistration && (
                <RegistrationForm onLoginSuccess={handleLoginSuccess} /> 
            )}
            {isLoggedIn && <ActivityList user={loginData!} onSave={handleSaveUser}/>}
            {!isLoggedIn && (
             <button onClick={handleToggleRegistration}>
                {showRegistration ? "logga in" : "registrera"}
             </button>
             )}
        </div>

    )
}
export default AuthPage;