import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const Timer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View className="bg-black flex-row items-center px-4 py-2 rounded-full">
      <Ionicons name="time-outline" size={24} color="white" />
      <Text className="text-white font-bold text-[20px] mx-2">{formatTime(time)}</Text>
      <TouchableOpacity 
        onPress={() => setIsActive(!isActive)} 
        className="bg-white rounded-full p-1"
      >
        <Ionicons name={isActive ? "pause" : "play"} size={24} color="hotpink" />
      </TouchableOpacity>
    </View>
  );
};