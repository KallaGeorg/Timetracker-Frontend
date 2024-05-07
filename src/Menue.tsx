import CreateActivityList,{ Activity }  from "./CreateActivityList";
import ChooseActivityList from "./ChooseActivityList";
import ActivityStatistics from "./ActivityStatistics";
import React, { useState } from "react";


export interface User {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    activities?: Activity[];
}

interface MenueProps {
    user: User ;
    activity: Activity;
    onSave?: (updatedUser: User) => void;
 
}
const Menue: React.FC<MenueProps> = ({user}) => {
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
   

    return(
        <>
        
        {!selectedOption && <h1>Menue</h1>}
        {!selectedOption && (
            
        
        <div className="menueButtonContainer">
            <button onClick={() => handleMenuOptionClick("createActivity")}>Lägg till aktivitet</button>
            <button onClick={() => handleMenuOptionClick("chooseActivity")}>Timetracking</button>
            <button onClick={() => handleMenuOptionClick("activityStatistics")}>Titta på statistik</button>
        </div>
        )}
        {selectedOption === 'createActivity' && <CreateActivityList user={user!} onSave={handleSaveUser} />}
        {selectedOption === 'chooseActivity' &&  user  && <ChooseActivityList user={user!}/>}
        {selectedOption === 'activityStatistics' &&  user &&  <ActivityStatistics user={user}/>}
        {selectedOption && (
             <button onClick={handleBackToMenyClick}>Tillbaka till menyn</button>
        )}
        </>

    );
    
};
export default Menue;


