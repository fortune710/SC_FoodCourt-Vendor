import React, { useState, useEffect } from 'react';
import {Text,View} from "react-native"
import useOrders from '~/hooks/useOrders';

interface CountdownTimerProps {
  initialPreparationTime: number; // Initial time in seconds
  isPreparing: boolean | undefined;
  orderId: string;
  
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ orderId, initialPreparationTime, isPreparing }) => {
  
  const [remainingTime, setRemainingTime] = useState(initialPreparationTime);
 const {getOrderById} = useOrders()

  useEffect(() => {
    let timerInterval: string | number | NodeJS.Timeout | undefined;

    if (isPreparing) {
       
      const fetchTimerData = async   () => {
        try {
        // Fetch start time from the database
        const startTime =  await getOrderById(orderId)?.start_time
        const duration = initialPreparationTime

        // Calculate remaining time based on current time
        const endTime = new Date(startTime).getTime() + duration * 1000;
        const currentTime = Date.now();
        let timeLeft = Math.floor((endTime - currentTime) / 1000);

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
    }

    return () => clearInterval(timerInterval); // Clean up on component unmount
  }, [isPreparing, orderId]);


  const formatTime = (seconds: number) => {
    const min = Math.floor(Math.abs(seconds) / 60);
    const sec = Math.abs(seconds) % 60;
    return `${seconds < 0 ? '-' : ''}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <View>
      
      <View><Text className='self-end text-right py-2 px-2 bg-[grey] text-white rounded-md mt-2'>{formatTime(remainingTime)}</Text></View>
    </View>
  );
};