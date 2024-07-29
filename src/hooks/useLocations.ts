import * as ExpoLocation from 'expo-location';
import { useEffect, useRef, useState } from 'react';

import useDatabaseQueries from '@/hooks/useDatabaseQueries';

import { INTERVAL } from '@/config';

import { Location } from '@/types';

export default function useLocations() {
  const [location, setLocation] = useState<Location | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState(INTERVAL);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const { insertLocationSnapshot, clearLocationSnapshots } = useDatabaseQueries();

  const logLocation = async () => {
    try {
      let newLocation = await ExpoLocation.getCurrentPositionAsync({});

      if (newLocation.coords.latitude === 0 && newLocation.coords.longitude === 0) return;

      await insertLocationSnapshot({
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
      });

      setLocation(newLocation.coords);
      setLastCheckTime(new Date());
      setCountdown(INTERVAL);
    } catch (error) {
      console.error('Error logging location:', error);
    }
  };

  const clearLocationsSnapshots = async () => {
    try {
      await clearLocationSnapshots();
    } catch (error) {
      console.error('Error clearing logged locations:', error);
    }
  };

  const startLogging = () => {
    setIsLogging(true);
    logLocation();
    intervalRef.current = setInterval(logLocation, INTERVAL);
    startCountdown();
  };

  const stopLogging = () => {
    setIsLogging(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(INTERVAL);
  };

  const toggleLogging = () => {
    if (isLogging) {
      stopLogging();
    } else {
      startLogging();
    }
  };

  const startCountdown = () => {
    setCountdown(INTERVAL);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 100) {
          return INTERVAL;
        }
        return prev - 100;
      });
    }, 100);
  };

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setLoading(true);
      try {
        let location = await ExpoLocation.getCurrentPositionAsync({});

        setLocation(location.coords);
      } catch (error) {
        console.error('Error fetching location:', error);
        setErrorMsg('Unable to fetch location information');
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      stopLogging();
    };
  }, []);

  return {
    loading,
    location,
    isLogging,
    toggleLogging,
    errorMsg,
    lastCheckTime,
    countdown,
    logLocation,
    clearLocationsSnapshots,
  };
}
