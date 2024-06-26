import React, { useState } from 'react';
import { User } from './Menue';
import { Admin } from './Menue';

  interface LoginFormProps {
    onUserLoginSuccess: (user:User) => void;
    onAdminLoginSuccess: (admin: Admin) => void;
   
  }

const LoginForm: React.FC<LoginFormProps> = React.memo(({ onUserLoginSuccess, onAdminLoginSuccess }) => {
    console.log('LoginForm render testing ok');

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState<string | null>(null);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
        setUsername(value);
    } else if (name === 'password') {
        setPassword(value);
    }
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null); // Reset login error

    try {
      const isAdmin = username === 'Admin' && password === 'Admin';
      const loginUrl = isAdmin 
        ? 'https://stingray-app-2hrxo.ondigitalocean.app/admin/login' 
        : 'https://stingray-app-2hrxo.ondigitalocean.app/user/login';
        const credentials = isAdmin 
        ? { name: username, password } 
        : { username, password };
        console.log('Sending request to:', loginUrl);
        console.log('Credentials:', credentials);
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      console.log('Response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('Response data:', data);

        if (isAdmin) {
          const admin: Admin = data;
          onAdminLoginSuccess(admin);
        } else {
          const user: User = data;
          onUserLoginSuccess(user);
        }
      } else {
        const errorText = await res.text();
        console.log(`${isAdmin ? 'Admin' : 'User'} login failed`, errorText);
        setLoginError('Felaktigt lösenord eller användarnamn');
      }
    } catch (error) {
      console.error('Error logging in', error);
      setLoginError('An error occurred on login. Please try again later');
    }
  };
  


    return (
        
    
       <div >
        <form onSubmit={handleSubmit}>
            <div className='loginForm'>
               
                <input
                 type="text"
                 id='username'
                 name='username'
                 placeholder='Användarnamn'
                 value={username}
                 onChange={handleChange}
                 required
                 className='loginFormField'
                  />
            </div>
            <div className='loginForm'>
              
                <input
                 type="password"
                 id='password'
                 name='password'
                 placeholder='Lösenord'
                 value={password}
                 onChange={handleChange}
                 required
                 className='loginFormField'
                  />
            </div>
            <div className='loggaInBtnDiv'>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            <button className='loggaInBtn' type='submit'>logga in</button>
            </div>
          
            </form>
       </div>  
    );
    
});
export default LoginForm;