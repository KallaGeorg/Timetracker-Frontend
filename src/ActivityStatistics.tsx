import React from "react";
import { User } from "./Menue";

interface ActivityStatisticsProps {
    user: User | null
}
const ActivityStatistics: React.FC<ActivityStatisticsProps> = () => {
// const[loginData, setLoginData] = useState<User | null>(null);
  
// const handleSaveUser =(updatedUser: User) => {
//     setLoginData(updatedUser);
// }
    return(
        <h1>Activity Statistics</h1>
    )
}
export default ActivityStatistics;