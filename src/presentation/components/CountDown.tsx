import moment from "moment";
import { useEffect, useState } from "react";

interface CountDownProps {
    date: string;
};

export default function CountDown({ date }: CountDownProps) {
    const [countdown, setCountDown] = useState('');

    useEffect(() => {
        setInterval(() => {
            if (!didPassTheDate()) {
                setCountDown(getCountdown(date));
            }
        }, 1000);
    }, []);

    const didPassTheDate = () => {
        const startDate = new Date(date);
        const currentDate = new Date();

        return currentDate >= startDate;
    }

    const getCountdown = (targetDate: string): string => {
        const duration = moment.duration(moment(targetDate).diff(moment()));
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        const countdownString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

        return countdownString;
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-xl text-gray-50 font-bold">{countdown}</div>
        </div>
    )
}