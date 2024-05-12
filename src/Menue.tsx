import CreateActivityList,{ Activity }  from "./CreateActivityList";
import ChooseActivityList from "./ChooseActivityList";
import ActivityStatistics from "./ActivityStatistics";
import React, { useState } from "react";
import DeleteAccountForm from "./DeleteAccountForm";


export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    activities?: Activity[];
}

export interface Admin{
    id?: string;
    name: string;
    password: string;
    users:User[];
}

interface MenueProps {
    user: User ;
    onSave?: (updatedUser: User) => void;
    isLoggedIn: boolean;
    onDeleteSuccess: () => void;
 
}
const Menue: React.FC<MenueProps> = ({user, onDeleteSuccess}) => {
    console.log('Menue render');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [, setUser] = useState<User | null>(null);

    const handleSaveUser =(updatedUser: User) => {
        setUser(updatedUser);
    }
    const handleMenuOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleBackToMenyClick = () => {
        setSelectedOption(null);
       
    };
    
   const handleDeleteAccountSuccess = () => {
       onDeleteSuccess();
   }

    return(
        <div className="menueButtonContainer">
        
        {!selectedOption && <h1 className="menueHeader">Meny</h1>}
        {!selectedOption && (
            
        
        <div >
            <button className="menueButton" onClick={() => handleMenuOptionClick("createActivity")}>Lägg till aktivitet</button>
            <button className="menueButton" onClick={() => handleMenuOptionClick("chooseActivity")}>Timetracking</button>
            <button className="menueButton" onClick={() => handleMenuOptionClick("activityStatistics")}>Titta på statistik</button>
            <button className="menueButton" onClick={() => handleMenuOptionClick("deleteAccount")}>Ta bort konto</button>

        </div>
        )}
        {selectedOption === 'createActivity' && <CreateActivityList user={user!} onSave={handleSaveUser} />}
        {selectedOption === 'chooseActivity' &&  user  && <ChooseActivityList user={user!}/>}
        {selectedOption === 'activityStatistics' &&  user &&  <ActivityStatistics user={user}/>}
        {selectedOption === 'deleteAccount' && user && <DeleteAccountForm userId={user.id!} onDeleteSuccess={handleDeleteAccountSuccess}/>}
        {selectedOption && (
             <button className="backToMenyBtn" onClick={handleBackToMenyClick}>Tillbaka till menyn</button>
        )}
        </div>

    );
    
};
export default Menue;


