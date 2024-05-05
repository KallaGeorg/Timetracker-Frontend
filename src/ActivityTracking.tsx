import React from "react";
import { User } from "./Menue";

interface ActivityTrackingProps{
    user: User | null
}
const ActivityTracking: React.FC<ActivityTrackingProps> = () =>{
    return (
        <h1>Tracking Activity</h1>
    )
}
export default ActivityTracking;