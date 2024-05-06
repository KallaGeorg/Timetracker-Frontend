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
        if (startTime) {
            clearInterval(Number(timerId));
            const currentTime = Date.now();
            const intervalData = {
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(currentTime).toISOString(),
                seconds: Math.floor(elapsedTime / 1000), 
                minutes: Math.floor(elapsedTime / 60000),
                hours: Math.floor(elapsedTime / 3600000), 
            };
            
            try {
                const res = await fetch(`http://localhost:8080/user/${user.id}/activities/${activity.id}/intervals`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(intervalData),
                });
                if(!res.ok){
                    throw new Error("Failed to save interval data");
                }
                const intervalWithId: Interval = await res.json();
                console.log('Interval saved successfully:', intervalWithId);
                setIntervals(prevIntervals => [...prevIntervals, intervalWithId]);
            }catch(error){
                console.error('Error saving interval data', error);
            }
            setIsRunning(false);
            setStartTime(null);
            setElapsedTime(0);
        }
    };
    const formatTime = (ms: number):string => {
        const seconds = Math.floor((ms / 1000) %60);
        const minutes = Math.floor((ms/(1000*60)) % 60);
        const hours = Math.floor((ms/(1000*60*60)) % 24);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return (
        <div>

            <h3>Tracking Activity</h3>
            <p>Tar tid av: {activity.name}</p>
            {!isRunning && <button onClick={handleStart}>Start</button>}
            {isRunning && <button onClick={handleStop}>Stopp</button>}
            <p className="timer">{isRunning ? formatTime(elapsedTime): "00:00:00"}</p>

            {intervals.map((interval, index) => (
                <div key={index}>
                    <p>Klockslag start: {interval.startTime}</p>
                    <p>Klockslag stopp: {interval.endTime}</p>
                    <p>Sekunder: {interval.seconds}</p>
                    <p>Minuter: {interval.minutes}</p>
                    <p>Timmar: {interval.hours}</p>
                </div>
                
            ))}
        </div>
        

    )
}
export default ActivityTracking;