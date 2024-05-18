import React, { useEffect, useState } from "react";
import { User } from "./Menue"; 
import { Interval } from "./CreateActivityList"





interface ActivityStatisticsProps {
    user: User;
    
 
   
}

const ActivityStatistics: React.FC<ActivityStatisticsProps> = ({user}) => {
   
    const [activityStatistics, setActivityStatistics] = useState<{[key:string]: {name:string; intervals: Interval[]; totalHours:number; totalMinutes:number; totalSeconds:number}}>({});
    const [updateIndicator, setUpdateIndicator] = useState(false);
    useEffect(() => {
       
        const fetchActivityStatistics = async () => {
            console.log('Fetch activity statistics triggered');

            if (user && user.id) {
                try {

                    const res = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/user/${user.id}/activities`);
                   
                    if (!res.ok) {
                        throw new Error(`Failed to fetch activities: ${res.status} ${res.statusText}`);
                    }
                    const activities = await res.json();
                    console.log('Fetched activities:', activities);
                    const actStats: {[key:string]: {name:string;  intervals: Interval[]; totalHours:number; totalMinutes:number; totalSeconds:number}} = {};
                    for (const activity of activities) {
                        const activityId = activity.id;
                        const intervals = activity.intervals || [];
                        const mappedIntervals: Interval[] =intervals.map((interval:any)=>{
                            return{
                                id: interval.id,
                                startTime: interval.startTime,
                                endTime: interval.endTime,
                                hours: interval.hours || 0,
                                minutes: interval.minutes || 0,
                                seconds: interval.seconds || 0
                            };
                        });
                        const activityRes = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/user/${user.id}/activities/${activityId}/intervals/sum`);
                       
                        console.log(`Fetch intervals for activity ${activityId} response status:`, activityRes.status);
                        if (!activityRes.ok) {
                            throw new Error(`Failed to fetch intervals for activity ${activityId}: ${activityRes.status} ${activityRes.statusText}`);
                        }
                        const data = await activityRes.json();
                        console.log("fetched s u m", data);

                        const activityData = {
                            name: activity.name,
                            intervals: mappedIntervals.reduce((acc:any, cur:any,idx:number)=>{
                                acc[`interval${idx+1}`] = cur;
                                return acc;
                            },{}),
                            totalHours: data.sumHours || 0,
                            totalMinutes: data.sumMinutes || 0,
                            totalSeconds: data.sumSeconds || 0
                        };
                        console.log(`Mapped data for activity ${activityId}:`, activityData);

                        actStats[activityId] = activityData;
                    }
                    setActivityStatistics(actStats);
                } catch (error) {
                    console.error('Error fetching activity statistics!', error);
                }
            } else {

            }

        }
        fetchActivityStatistics();
    }, [user, updateIndicator]);
    const handleDelete = async (activityId:string) =>{
        try{
            const res = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/user/${user.id}/activities/${activityId}`,{
                method: 'DELETE',
            });
            if(!res.ok){
                throw new Error("Failed to delete activity with id:${activityId}")
                }
                setActivityStatistics((prevStats) => {
                    const updatedStats = { ...prevStats };
                    delete updatedStats[activityId];
                    return updatedStats;
                  });
                  setUpdateIndicator((prev) => !prev);
            }catch (error){
                console.error('Error deleting activity', error);
            }
    };
      
    return(
        <div>
        <h3 className="statisticsHeader">Statistik av alla activiteter</h3>
        <ul>
            
            {Object.entries(activityStatistics).map(([activityId, actStats]) => (
                <li className="activitSatisticsList" key={activityId}>
                    <div>
                    <strong>Aktivitet:</strong> {actStats.name || "no name"}<br/>
                    <strong>total timmar:</strong> {actStats.totalHours || 0}<br/>
                    <strong>total minuter:</strong> {actStats.totalMinutes || 0}<br/>
                    <strong>total sekunder:</strong> {actStats.totalSeconds || 0}<br/>
                    </div>
                    <ul>
                        {Object.entries(actStats.intervals).map(([intervalKey, interval], idx)=>(
                            <ol key={intervalKey}>
                                <strong>{idx +1 } Interval:</strong> {interval.hours} hours, {interval.minutes} minutes, {interval.seconds} seconds
                                <span>// Start tid: {new Date(interval.startTime).toLocaleString()} // Slut tid: {new Date(interval.endTime).toLocaleString()}</span>
                            </ol>
                        ))}
                    </ul>
                    <button className="deleteActBtn" onClick={() => handleDelete(activityId)}>Ta bort</button>
                </li>

            ))}
        </ul>
    </div>
       
    );
};
export default ActivityStatistics;