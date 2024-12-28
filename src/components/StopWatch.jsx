import React, { useEffect, useState } from 'react';
import styles from '../styles/stopwatch.module.css';

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [miliseconds, setMiliSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} : ${minutes >= 10 ? minutes : `0${minutes}`} : ${seconds >= 10 ? seconds : `0${seconds}`} : ${miliseconds}`;
  }

  const startTime = () => {
    setIsRunning(true);
  }
  const stopTime = () => {
    setIsRunning(false);
  }
  const resetTime = () => {
    setIsRunning(false);
    setTime(0);
    setMiliSeconds(0);
  }

  useEffect(() => {
    let interval;
    if(isRunning) {
      interval = setInterval(() => {
        setMiliSeconds((prev) => {
          if(prev === 99) {
            setTime((prev) => prev + 0.5);
            return 0;
          }
          else {
            return prev + 1;
          }
        }) 
      }, 10);
    }
    else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className={styles.main}>
      <h1>My Stopwatch</h1>
      <div className={styles.clock}>
        <div>{formatTime()}</div>
      </div>
      <div className={styles.btns}>
        <button onClick={startTime} className={styles.btn}>Start</button>
        <button onClick={stopTime} className={styles.btn}>Stop</button>
        <button onClick={resetTime} className={styles.btn}>Reset</button>
      </div>
    </div>
  )
}

export default StopWatch;