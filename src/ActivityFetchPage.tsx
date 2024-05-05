// import React, { useState, useEffect } from 'react';
// import ChooseActivityList from './ChooseActivityList';
// import { Activity } from './CreateActivityList';
// import { User } from './Menue';

// interface ActivityFetchPageProps {
//     user: User | null
// }
//  const ActivityFetchPage: React.FC<ActivityFetchPageProps> = ({ user }) => {
//     const [activities, setActivities] = useState<Activity[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         if(user && user.id){
//             fetch(`http://localhost:8080/user/${user.id}/activities`)
//             .then((res) =>{
//                 if(!res.ok){
//                     throw new Error('Failed to fetch activities');
//                 }
//                 return res.json();
//             })
//             .then((data) =>{
//                 setActivities(data.activities);
//                 console.log('Data fetched successfully:', data.activities);
                
//             })
//             .catch((error)=>{
//                 console.error('Error fetching activities', error);
//             });
//             setLoading(false);
//         }
//     },[user]);
//     if(loading){
//         return <div>Loading...</div>
//     }

//     return activities.length > 0 ? <ChooseActivityList user={user} activities={activities} />: <div>No activities found</div>;
//  }
//  export default ActivityFetchPage;