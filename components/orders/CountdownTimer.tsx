import React, { useState, useEffect } from 'react';
import {Text,View} from "react-native"
import useOrders from '~/hooks/useOrders';
import { cn } from '~/lib/utils';

interface CountdownTimerProps {
  initialPreparationTime: number; // Initial time in seconds
  isPreparing: boolean | undefined;
  orderId: number;
  
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ orderId, initialPreparationTime, isPreparing }) => {
  
  const [remainingTime, setRemainingTime] = useState(initialPreparationTime);
  const {getOrderById} = useOrders();
  const startTime = getOrderById(orderId)?.start_time

  useEffect(() => {
    let timerInterval: string | number | NodeJS.Timeout | undefined;

    if (remainingTime === 0 || !isPreparing) return setRemainingTime(0);
    
    const fetchTimerData = async   () => {
      
      try {
        // Fetch start time from the database
        
        const duration = initialPreparationTime

        
        // Calculate remaining time based on current time
        const endTime = new Date(startTime).getTime() + duration * 1000;
        const currentTime = Date.now();
        console.log(startTime, endTime)
        let timeLeft = Math.floor((endTime - currentTime) / 1000);
        if (timeLeft < 0) return;

        setRemainingTime(timeLeft);

        // Timer countdown logic
        timerInterval = setInterval(() => {
          timeLeft -= 1;
          setRemainingTime(timeLeft);
        }, 1000);
      }
      catch (error) {
        console.error("Error fetching timer data:", error);
      }
    }
    fetchTimerData();

    return () => clearInterval(timerInterval); // Clean up on component unmount
  }, [isPreparing, orderId, startTime]);


  const formatTime = (seconds: number) => {
    const min = Math.floor(Math.abs(seconds) / 60);
    const sec = Math.abs(seconds) % 60;
    return `${seconds < 0 ? '-' : ''}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return ( 
    <Text className={cn('self-end text-center py-2 px-5 text-white rounded my-4', remainingTime > 300 ? "bg-[grey]" : "bg-red-600")}>{formatTime(remainingTime)}</Text>    
  );
};