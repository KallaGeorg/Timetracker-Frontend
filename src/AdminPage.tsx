import React, { useEffect, useState } from "react"
import { Admin, User } from "./Menue";
import { Activity }  from "./CreateActivityList";
import ActivityStatistics from "./ActivityStatistics";
const AdminPage: React.FC = () => {
    const [adminData, setAdminData] = useState<Admin | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch("http://localhost:8080/admin");
                if(res.ok){
                    const data = await res.json();
                    setAdminData(data);
                }else{
                    console.error("Failed to fetch admin data");
                }
            }catch(error){
                console.error("Failed to fetch admin data", error);
            }
        };
        fetchData();
    },[]);

    return (
        
        <div>
            <h3>Bara för admin</h3>
            {adminData && adminData.users &&(
                <div>
                    <h3>Användare:</h3>
                    <ul>
                        {adminData.users.map((user) => (
                            <li key={user.id}>
                               <h4>Användarnamn: {user.username}</h4>
                               <h4>Förnamn: {user.firstname}</h4>
                               <h4>Efternamn {user.lastname}</h4>
                               <h4>E-post adress {user.email}</h4>
                                <h3>Aktiviteter:</h3>
                                <ul>
                                    {user.activities && user.activities.map((activity: Activity) => (
                                        <ol  key={activity.id}>
                                           <h4>Namn: {activity.name}</h4>
                                           <h4>Intervaller: {activity.intervals.length}</h4>
                                           <h4><ActivityStatistics user={user} /> </h4>
                                        </ol>
                                        
                                    ))}
                                </ul>
                                </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default AdminPage;