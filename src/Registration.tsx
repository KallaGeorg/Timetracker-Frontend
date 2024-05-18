import React, { useState } from "react";
import { User } from "./Menue";


interface RegistrationFormProps{
    onLoginSuccess:(user: User) => void;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({onLoginSuccess}) => {
    console.log('RegistrationForm render!');
    const [formData, setFormData] = useState<User>({
        
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:'',
    
    });
    const [registrationStatus, setRegistrationStatus] = useState<'pending'|'success'|'error'>('pending');
    const [usernameError, setUsernameError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
   
   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.username.length !== 6) {
            setUsernameError('Användarnamn måste ha 6 tecken');
        } else {
            setUsernameError('');
        }

        if (formData.password.length !== 8) {
            setPasswordError('Lösenordet måste ha 8 tecken');
        } else {
            setPasswordError('');
        }

        if (formData.username.length !== 6 || formData.password.length !== 8) {
            setRegistrationStatus('error');
            return;
        }

        try{
            const res = await fetch('https://stingray-app-2hrxo.ondigitalocean.app/user', {
                method: 'POST',
              
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(res.ok){
                console.log('User posted successfully');
                const user: User = await res.json();
                onLoginSuccess(user);
                setRegistrationStatus('success');
                resetForm();
            
            } else {
                const errorMessage = await res.text();
                if (errorMessage === 'Username already exists') {
                     setUsernameError('Användarnamn upptaget');
                } else {
                    console.error('Error posting user');
                    setRegistrationStatus('error');
                }
            }
           }catch(error){
                console.error('There was an error while registrating', error);
                setRegistrationStatus('error');
            }
        };
        const resetForm = () => {
            setFormData({
                
                firstname: '',
                lastname: '',
                email: '',
                username: '',
                password: '',   
                
            });
         
            
        };
      
        
        return(
           <>
           
     <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstname"
                    placeholder="förnamn"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="registerField"
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="eftenamn"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="registerField"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="registerField"
                    required
                />
              
                <input
                    type="text"
                    name="username"
                    placeholder="användarnamn 6 tecken"
                    value={formData.username}
                    onChange={handleChange}
                    className="registerField"
                    required
                    />
                   
                       <input
                    type="text"
                    name="password"
                    placeholder="lösenord 8 tecken"
                    value={formData.password}
                    onChange={handleChange}
                    className="registerField"
                    required
                    />
                    
                   
                    <button className="registerButton" type="submit">Registrera</button>
                    {usernameError && <p>{usernameError}</p>}
                    {passwordError && <p>{passwordError}</p>}
                    {registrationStatus === 'error' && <p>Registrering misslyckades!</p>}
            </form>
                    
              </>
        );
    };
export default RegistrationForm;