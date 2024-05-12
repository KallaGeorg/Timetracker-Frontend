import React, { useState } from 'react';

interface DeleteAccountFormProps {
    userId: string;
    onDeleteSuccess: () => void;
    
}
const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({userId, onDeleteSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       try {
        const res = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/user/${userId}`, {
            method:"DELETE",
            mode: 'no-cors',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if (res.ok){
            onDeleteSuccess();
        }else{
            const errorMessage = await res.text();
            setError(errorMessage);
        }
       }catch(error){
        console.error('Error deleting account', error);
        setError("bort tagning av kontot misslyckades");
       }
        
    }

    return (
        <div>
        <h3 className='deleteAccountTitle'>Skriv användarnamn och lösenord för att ta bort ditt konto</h3><br />
        <form onSubmit={handleSubmit}>
          <label className='deleteAccountLabel'>
            Användarnamn:
            <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='deleteAccountField'
            required
            />
        </label>
        <label className='deleteAccountLabel'>
            Lösenord:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='deleteAccountField'
            required
            />
        </label>
        <button className='deleteAccountBtn' type='submit'>Ta bort konto</button>
        {error && <p>{error}</p>}
        </form>

        </div>
      
       
    )
}
export default DeleteAccountForm;