import React, { useState } from 'react';
import { User } from './Menue';

  interface LoginFormProps {
    onLoginSuccess: (user:User) => void;
  }

const LoginForm: React.FC<LoginFormProps> = React.memo(({onLoginSuccess}) => {
    console.log('LoginForm render');

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
const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const res = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})  
        });
        
        if(res.ok){
             const user: User = await res.json();
            onLoginSuccess(user);
           
        }else{
            console.log('Login failed');
            setLoginError('Felaktigt lösenord eller användernamn');
        }
   }catch(error){
    console.error('Error logging in', error);
    setLoginError('Any error occured on login. Please try again later');
   }
   
};


    return (
        
    
       <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Användarnamn:</label>
                <input
                 type="text"
                 id='username'
                 name='username'
                 value={username}
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
                 value={password}
                 onChange={handleChange}
                 required
                  />
            </div>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
            <button type='submit'>logga in</button>
            </form>
       </div>  
    );
    
});
export default LoginForm;