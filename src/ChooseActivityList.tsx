import React, { useEffect, useState } from "react";
import { User } from "./Menue";
import { Activity } from "./CreateActivityList";


interface ChooseActivityListProps {
    user: User | null;
}
const ChooseActivityList:React.FC<ChooseActivityListProps> = ( {user} ) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching activities', error);
                    setLoading(false); 
                }
            }
        };
        

        fetchData();

    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>Choose Activity</h1>
        <ul>
            {activities.map((activity, index) => (
                <li key={index}>
                    <strong>ID:</strong> {activity.id}<br />
                    <strong>Name:</strong> {activity.name}<br />
                    <strong>Intervals:</strong> {activity.intervals.join(', ')}
                    {activity.intervals.length === 0 ? (
                            <p>No intervals</p>
                        ) : (
                            <ul>
                                {activity.intervals.map((interval, intervalIndex) => (
                                    <li key={intervalIndex}>
                                        <strong>Interval ID:</strong> {interval.id}<br />
                                        <strong>Start Time:</strong> {interval.startTime}<br />
                                        <strong>End Time:</strong> {interval.endTime}<br />
                                        <strong>Seconds:</strong> {interval.seconds}<br />
                                        <strong>Minutes:</strong> {interval.minutes}<br />
                                        <strong>Hours:</strong> {interval.hours}<br />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            </div>
    );
};
export default ChooseActivityList;