import React, { useEffect, useState } from "react";
import { User } from "./Menue";
import { Activity } from "./CreateActivityList";
import ActivityTracking from "./ActivityTracking";


interface ChooseActivityListProps {
    user: User;
}
const ChooseActivityList:React.FC<ChooseActivityListProps> = ( {user} ) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.id) {
                try {
                    const res = await fetch(`http://localhost:8080/user/${user.id}/activities`);
                    if (!res.ok) {
                        throw new Error(`Failed to fetch activities: ${res.status} ${res.statusText}`);
                    }
                    const data = await res.json();
                    console.log('Fetched data:', data);
                    console.log('Response status:', res.status);
                    if (!Array.isArray(data)) {
                        throw new Error('Invalid data received from the server');
                    }
                    setActivities(data);
                    
                } catch (error) {
                    console.error('Error fetching activities', error);
                   
                }
            }
        };
        

        fetchData();

    }, [user]);



    const handleActivitySelect = (activity: Activity) => {
        setSelectedActivity(activity);
    }

    // const handleDelete = async (actvityId:string) =>{
    //     try{
    //         const res = await fetch(`http://localhost:8080/user/${user.id}/activities/${actvityId}`,{
    //             method: 'DELETE',
    //         });
    //         if(!res.ok){
    //             throw new Error("Failed to delete activity with id:"+actvityId)
    //             }
    //         setActivities(prevActivities => prevActivities.filter(activity => activity.id !== actvityId));
    //         }catch (error){
    //             console.error('Error deleting activity', error);
    //         }
    // };

    return (
        <div>
       
        {!selectedActivity &&  <h3>Välj aktivitet du vill starta</h3>}
        {!selectedActivity && (
        <ul>
            {activities.map((activity, index) => (
                <li key={index} >

                    <div onClick={ () => handleActivitySelect(activity)}>
                    <strong>Aktivitet:</strong> {activity.name}<br />
                    <strong>Intervaller:</strong> {activity.intervals.length}<br />
                    </div>

                    {/* <button onClick={() => handleDelete(activity.id)}>Ta bort</button> */}
                    </li>
            ))}
            </ul>
               
            )}
            {selectedActivity && <ActivityTracking user={user} activity={selectedActivity} />}
            </div>
    );
};
export default ChooseActivityList;