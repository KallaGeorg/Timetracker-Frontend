import React, { useState } from 'react';
import { User } from './Menue';
import { Admin } from './Menue';

  interface LoginFormProps {
    onUserLoginSuccess: (user:User) => void;
    onAdminLoginSuccess: (admin: Admin) => void;
   
  }

const LoginForm: React.FC<LoginFormProps> = React.memo(({ onUserLoginSuccess, onAdminLoginSuccess }) => {
    console.log('LoginForm render testing');

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
        const res = await fetch('https://stingray-app-2hrxo.ondigitalocean.app/user/login', {
            method: 'POST',
           
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) 
        });
        
        if(res.ok){
             const user: User = await res.json();
            onUserLoginSuccess(user);
           
        }else{
            const adminRes = await fetch('https://stingray-app-2hrxo.ondigitalocean.app/admin/login', {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: username, password })
        });
        if(adminRes.ok){
            const admin:Admin = await adminRes.json();
            onAdminLoginSuccess(admin);
        }else{
            const errorText = await adminRes.text();
            console.log('admin login failed', errorText);
            setLoginError('Felaktigt lösenord eller användarnamn');
        }
        }
   }catch(error){
    console.error('Error logging in', error);
    setLoginError('Any error occured on login. Please try again later');
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