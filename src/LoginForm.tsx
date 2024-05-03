import React, { useState } from 'react';
import ActivityList from './ActivityList';
import { Activity } from './ActivityList';

interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    activities: Activity[];
  }

const LoginForm: React.FC = () => {
const [loginData, setLoginData] = useState<User>({
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    activities:[]
});

const [loginError, setLoginError] = useState<string | null>(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
        ...prevState,
        [name]: value
    }));
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const res = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if(res.ok){
            console.log('Login successful');
            setIsLoggedIn(true);
        }else{
            console.log('Login failed');
            setLoginError('Felaktigt användarnamn eller lösenord');
        }
   }catch(error){
    console.error('Error logging in', error);
    setLoginError('Any error occured on login. Please try again later');
   }
   
}
const handleSaveActivities = (updatedUser: User) => {
    // Logic to handle saving activities
    console.log('Saving activities...', updatedUser);
}

    return(
       <div>
        {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Användarnamn:</label>
                <input
                 type="text"
                 id='username'
                 name='username'
                 value={loginData.username}
                 onChange={handleChange}
                 required
                  />
            </div>
            <div>
                <label htmlFor="password">Lösenord:</label>
                <input
                 type="password"
                 id='password'
                 name='password'
                 value={loginData.password}
                 onChange={handleChange}
                 required
                  />
            </div>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            <button type='submit'>logga in</button>
            </form>
            )}
            {isLoggedIn && <ActivityList user={loginData} onSave={handleSaveActivities}/>}
       </div>
        
        
     
    );
};
export default LoginForm;