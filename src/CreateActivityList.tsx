import React, { useEffect, useState } from "react";
import { User } from "./Menue";

export interface Interval{
    id: string;
    startTime: string;
    endTime: string;
    seconds: number;
    minutes: number;
    hours: number;
    
}
export interface Activity{
    id:string;
    name:string;
    intervals: Interval [];
  
}

interface Props {
    user: User;
    onSave: (updatedUser: User) => void;
}

const CreateActivityList: React.FC<Props> = ({user, onSave}) => {
    const [newActivity, setNewActivity] = useState<string>('');
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        if(user &&user.activities){
            setActivities(user.activities);
        }
    },[user]);
    
    const handleAddActivity = () => {
        if (newActivity.trim() !== '') {
            const newActivityObj = {
                id: String(Date.now()),
                name: newActivity,
                intervals: []
            };
            const updatedActivities = [
                ...activities,
                newActivityObj
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
        if (user && user.id) {
        const updatedUser: User = {
            ...user,
            activities: activities
        };
        fetch(`http://localhost:8080/user/${user.id}`, {
            method: 'PATCH',
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
        .then(updatedUserData =>{
            const updatedUser: User = {
                ...user,
                activities:updatedUserData.activities
            };
            onSave(updatedUser);
        })
        .catch(error =>{
            console.error('Error saving activities', error.message);
        });
    }else{
        console.error('User or user id is null User:',user);

    }
}

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
export default CreateActivityList;