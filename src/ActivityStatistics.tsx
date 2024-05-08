import React, { useEffect, useState } from "react";
import { User } from "./Menue"; 




interface ActivityStatisticsProps {
    user: User;
 
   
}
const ActivityStatistics: React.FC<ActivityStatisticsProps> = ({user}) => {
   
    const [activityStatistics, setActivityStatistics] = useState<{[key:string]: {name:string;hours:number; minutes:number; seconds:number}}>({});
    
    useEffect(() => {
       
        const fetchActivityStatistics = async () => {
            console.log('Fetch activity statistics triggered');
            
            if (user && user.id) {
                try {
                    
                    const res = await fetch(`http://localhost:8080/user/${user.id}/activities`);
                    if (!res.ok) {
                        throw new Error(`Failed to fetch activities: ${res.status} ${res.statusText}`);
                    }
                    const activities = await res.json();
                    console.log('Fetched activities:', activities);
                    const actStats: {[key:string]: {name:string;hours:number; minutes:number; seconds:number}} = {};
                    for (const activity of activities) {
                        const activityId = activity.id;
                        const activityRes = await fetch(`http://localhost:8080/user/${user.id}/activities/${activityId}/intervals/sum`);
                        console.log(`Fetch intervals for activity ${activityId} response status:`, activityRes.status);
                        if (!activityRes.ok) {
                            throw new Error(`Failed to fetch intervals for activity ${activityId}: ${activityRes.status} ${activityRes.statusText}`);
                        } 
                        const data = await activityRes.json();
                        console.log("fetched s u m", data);
                        
                        const activityData = {
                            name: activity.name,
                            hours: data.sumHours || 0,
                            minutes: data.sumMinutes || 0,
                            seconds: data.sumSeconds || 0
                        };
                        console.log(`Mapped data for activity ${activityId}:`, activityData);

                        actStats[activityId] = activityData; 
                    }
                    setActivityStatistics(actStats);
                } catch (error) {
                    console.error('Error fetching activity statistics', error);
                }             
            } else {
                
            }
           
        }
        fetchActivityStatistics();
    }, [user]);
      
    return(
        <div>
        <h3>Activity Statistics</h3>
        <ul>
            {Object.entries(activityStatistics).map(([activityId, actStats]) => (
                <li key={activityId}>
                    <strong>Activity:</strong> {actStats.name || "no name"}<br/>
                    <strong>Hours:</strong> {actStats.hours || 0}<br/>
                    <strong>Minutes:</strong> {actStats.minutes || 0}<br/>
                    <strong>Seconds:</strong> {actStats.seconds || 0}<br/>
                </li>
            ))}
        </ul>
    </div>
       
    );
};
export default ActivityStatistics;