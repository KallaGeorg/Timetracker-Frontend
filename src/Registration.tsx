import React, { useState } from "react";
import { User } from "./Menue";


interface RegistrationFormProps{
    onLoginSuccess:(user: User) => void;
}
const RegistrationForm: React.FC<RegistrationFormProps> = ({onLoginSuccess}) => {
    console.log('RegistrationForm render');
    const [formData, setFormData] = useState<User>({
        
        firstname:'',
        lastname:'',
        email:'',
        username:'',
        password:'',
    
    });
    const [registrationStatus, setRegistrationStatus] = useState<'pending'|'success'|'error'>('pending');
   
   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:8080/user', {
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
                
                
                   
                
            
                console.log('Registration status:', registrationStatus);
               
              
            }else{
                console.error('Error posting user');
                setRegistrationStatus('error');
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
                    required
                />
                <input
                    type="text"
                    name="lastname"
                    placeholder="eftenamn"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="användarnamn"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
                       <input
                    type="text"
                    name="password"
                    placeholder="lösenord"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    <button type="submit">Registrera</button>
                    {registrationStatus === 'error' && <p>Registrering misslyckades!</p>}
            </form>
             
              </>
        );
    };
export default RegistrationForm;