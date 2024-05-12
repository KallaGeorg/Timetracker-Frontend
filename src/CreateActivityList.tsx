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
    const [editedActivityId, setEditedActivityId] = useState<string>('');
    const [editedActivityName, setEditedActivityName] = useState<string>('');
    const [listSaved, setListSaved] = useState<boolean>(false);

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
    const handleEditActivity = (activity: Activity) => {
        setEditedActivityId(activity.id);
        setEditedActivityName(activity.name);
      };

      const handleSaveEditedActivity = () => {
        const updatedActivities = activities.map((activity) => {
          if (activity.id === editedActivityId) {
            return {
              ...activity,
              name: editedActivityName
            };
          }
          return activity;
        });
        setActivities(updatedActivities);
        setEditedActivityId('');
        setEditedActivityName('');
      };

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
            setListSaved(true);
            setTimeout(()=>{
                setListSaved(false);
                setActivities([]);
            },2000);
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
};

    return(
        <div>
             <h3 className="chooseHeader">Lägg till aktiviteter</h3>
             <input 
                type="text"
                value={newActivity}
                onChange={handleInputChange} 
                placeholder="skriv aktivitet"
                className="addInput"
                />
                <button className="läggTillBtn" onClick={handleAddActivity}>lägg till</button>
                {!listSaved && (
                    <>
                    
                <ul>
                    {activities.map((activity) => (
                        <li className="createActItem" key={activity.id}>
                               {activity.id === editedActivityId ? (
              <>
                <input
                  type="text"
                  value={editedActivityName}
                  onChange={(e) => setEditedActivityName(e.target.value)}
                  className="editInput"
                />
                <button className="editSaveBtn" onClick={handleSaveEditedActivity}>spara</button>
              </>
            ) : (
              <>
                {activity.name}
                <button className="createActBtn" onClick={() => handleEditActivity(activity)}>redigera</button>
                <button className="createActBtn" onClick={() => handleDeleteActivity(activity.id)}>radera</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className="sparaListanBtn" onClick={handleSaveActivities}>Spara Listan</button>
      </>
      )}        
                {listSaved && <p className="messageListSaved">Listan sparad!</p>}
              
        </div>
       
    );
};
export default CreateActivityList;