import React, { useEffect, useState } from "react"
import { User } from "./Menue";
import { Activity, Interval }  from "./CreateActivityList";
// import ActivityStatistics from "./ActivityStatistics";
const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:8080/users");
                if (res.ok) {
                    const data = await res.json();
                    
                    setUsers(data);
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);

  
    return (
        
        <div>
            <h3 className="adminTitle">Adminsida</h3>
            <div>
                <ol style={{ listStyleType: "none" }}>
                    {users.map((user) => (
                        <li  className="adminList" key={user.id}>
                             <h3 className="clientTitle">Användare:</h3>
                            <h4>Användarnamn: {user.username}</h4>
                            <h4>Förnamn: {user.firstname}</h4>
                            <h4>Efternamn: {user.lastname}</h4>
                            <h4>E-postadress: {user.email}</h4>
                            <h3 className="clientTitle">Aktiviteter:</h3>
                            <ol  style={{ listStyleType: "none" }}>
                                {user.activities &&
                                    user.activities.map((activity: Activity) => (
                                        <li className="aktivitetList" key={activity.id}>
                                            <h4>Aktivitet: {activity.name}</h4>
                                            <h4>Intervaller: {activity.intervals.length}</h4>
                                            <h4>
                                             Tid: {calculateTotalTime(activity.intervals)}
                                            </h4>
                                        </li>
                                    ))}
                            </ol>
                            <h4>Total tid för alla aktiviteter: {calculateTotalTimeForUser(user)}</h4>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
const calculateTotalTime = (intervals: Interval[]): string => {
    let totalSeconds = 0;
    intervals.forEach((interval) => {
        totalSeconds += interval.seconds + interval.minutes * 60 + interval.hours * 3600;
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
const calculateTotalTimeForUser = (user: User): string => {
    let totalSeconds = 0;
    user.activities?.forEach((activity) => {
        activity.intervals.forEach((interval: Interval) => {
            totalSeconds += interval.seconds + interval.minutes * 60 + interval.hours * 3600;
        });
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};
export default AdminPage;