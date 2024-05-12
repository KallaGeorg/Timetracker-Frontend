import React, { useEffect, useState } from "react";
import { User } from "./Menue";
import { Activity, Interval } from "./CreateActivityList";


interface ActivityTrackingProps{
    activity: Activity;
    user: User;
}const ActivityTracking: React.FC<ActivityTrackingProps> = ({ activity, user }) => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [timerId, setTimerId] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [intervals, setIntervals] = useState<Interval[]>([]);
    
useEffect(() => {
    if (startTime !== null) {
        const id = window.setInterval(() => {
            setElapsedTime(Date.now() - (startTime || 0));
        }, 1000);
        setTimerId(id);

        return () => {
            if (id !== null) {
                clearInterval(id);
            }
        };
    }
}, [startTime]);

const handleStart = () => {
    setStartTime(Date.now());
    setIsRunning(true);
};

const handleStop = async () => {
    if (startTime !== null) {
        clearInterval(Number(timerId));
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        const seconds = Math.floor((elapsedMilliseconds / 1000) % 60);
        const minutes = Math.floor((elapsedMilliseconds / (1000 * 60)) % 60);
        const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
        console.log("endTime before setting:", new Date(currentTime).toLocaleString());

        const formatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const intervalData = {
            startTime: new Date(startTime).toLocaleString('sv-SE', formatOptions),
            endTime: new Date(currentTime).toLocaleString('sv-SE', formatOptions),
            seconds: seconds,
            minutes: minutes,
            hours: hours,
        };
        try {
            const res = await fetch(`https://stingray-app-2hrxo.ondigitalocean.app/user/${user.id}/activities/${activity.id}/intervals`, {
                method: "PATCH",
                mode: 'no-cors',
                
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(intervalData),
            });
            if(!res.ok){
                throw new Error("Failed to save interval data");
            }
            const intervalWithId: Interval = await res.json();
            const updatedInterval = { ...intervalWithId, endTime: intervalData.endTime, startTime: intervalData.startTime };
            console.log('Interval saved successfully:', intervalWithId, updatedInterval);
            setIntervals(prevIntervals => [...prevIntervals,updatedInterval]);
        }catch(error){
            console.error('Error saving interval data', error);
        }
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
    }
};
const formatTime = (ms: number): string => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
return (
    <div>

        <h3 className="trackingActivityHeader">Tidsmätning</h3>
        <p className="timeOfActivityItem">Tar tid av: {activity.name}</p>
        {!isRunning && <button className="startOchStoppBtn"  onClick={handleStart}>Start</button>}
        {isRunning && <button className="startOchStoppBtn" onClick={handleStop}>Stopp</button>}
        <p className="timer">{isRunning ? formatTime(elapsedTime): "00:00:00"}</p>

        {intervals.map((interval, index) => (
    <div key={index}>
        <p className="startOchSlutTime"> Start Tid: {new Date(interval.startTime).toLocaleString()}</p>
        <p className="startOchSlutTime"> Slut Tid: {new Date(interval.endTime).toLocaleString()}</p>
        <p>Tid: {formatTime(interval.seconds * 1000 + interval.minutes * 60 * 1000 + interval.hours * 3600 * 1000)}</p>
    </div>
))}

    </div>
    

)
}
export default ActivityTracking;