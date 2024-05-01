import React, { useState } from 'react';

const LoginForm: React.FC = () => {
const [loginData, setLoginData] = useState({
    username: '',
    password: ''
});

const [loginError, setLoginError] = useState<string | null>(null);

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
        }else{
            console.log('Login failed');
            setLoginError('Felaktigt användarnamn eller lösenord');
        }
   }catch(error){
    console.error('Error logging in', error);
    setLoginError('Any error occured on login. Please try again later');
   }
}

    return(
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
     
    );
};
export default LoginForm;