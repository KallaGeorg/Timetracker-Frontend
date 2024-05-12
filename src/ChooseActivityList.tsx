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
                    const res = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/${user.id}/activities`);
                    mode: 'no-cors';
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



    return (
        <div className="choose">
       
        {!selectedActivity &&  <h3 className="chooseHeader">Välj aktivitet du vill starta</h3>}
        {!selectedActivity && (
        <ol type="1">
            {activities.map((activity, index) => (
                <li key={index} >

                    <div className="chooseList">
                    <strong>Aktivitet:</strong> {activity.name}<br />
                    <strong>Intervaller:</strong> {activity.intervals.length}<br />
                    <button className="startaTimetrackingBtn" onClick={ () => handleActivitySelect(activity)}>starta timetracking</button>
                    

                    </div>

                
                    </li>
            ))}
            </ol>
               
            )}
            {selectedActivity && <ActivityTracking user={user} activity={selectedActivity} />}
            </div>
    );
};
export default ChooseActivityList;