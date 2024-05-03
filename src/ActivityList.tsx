import React, { useState } from "react";

export interface Activity{
    id:string;
    name:string;
    duration:number;
  
}
interface User{
    id:string;
    firstname:string;
    lastname:string;
    email:string;
    username:string;
    password:string;
    activities:Activity[];
}
interface Props {
    user: User;
    onSave: (updatedUser: User) => void;
}

const ActivityList: React.FC<Props> = ({user, onSave}) => {
    const [newActivity, setNewActivity] = useState<string>('');
    const [activities, setActivities] = useState<Activity[]>(user.activities);

    const handleAddActivity = () => {
        if (newActivity.trim() !== '') {
        const updatedActivities =[
            ...activities,
            {id:String(Date.now()), name:newActivity, duration:0}
        ];
        setActivities(updatedActivities);
        setNewActivity('');
    }
    };
    const handleDeleteActivity = (id: string) => {
        const updatedActivities = activities.filter((activity) => activity.id !== id);
        setActivities(updatedActivities);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewActivity(e.target.value);
    }
    const handleSaveActivities = () => {
        const updatedUser: User = {
            ...user,
            activities: activities
        };
        fetch('http://localhost:8080/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res =>{
            if(!res.ok){
                throw new Error('Failed to save activities');
            }
            console.log('Activities saved successfully');
            return res.json();
        })
        .then((updatedUser: User)=>{
            onSave(updatedUser);
        })
        .catch(error =>{
            console.error('Error saving activities', error.message);
        });
    };

    return(
        <div>
             <h3>Lägg till aktiviteter</h3>
             <input 
                type="text"
                value={newActivity}
                onChange={handleInputChange} 
                placeholder="skriv aktivitet"
                />
                <button onClick={handleAddActivity}>lägg till</button>
                <ul>
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            {activity.name}
                            <button onClick={() => handleDeleteActivity(activity.id)}>radera</button>
                        </li>
                    ))}
                </ul>
                <button onClick={handleSaveActivities}>Spara</button>
        </div>
       
    );
};
export default ActivityList;