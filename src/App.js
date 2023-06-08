import React, { useState, useEffect, useRef } from "react";
import sound from "./music/notification.mp3";
import "./styles/TouchTypingApp.css";

const keysToPractice = [
  "a",
  "s",
  "k",
  " ",
  "d",
  "a",
  "d",
  " ",
  "s",
  "a",
  "l",
  "a",
  "d",
  "s",
  " ",
  "f",
  "a",
  "l",
  "l",
  " ",
  "l",
  "a",
  "s",
  "s",
  " ",
  "a",
  "l",
  "l",
  " ",
  "a",
  "d",
  "s",
  " ",
  "a",
  "d",
  "d",
  " ",
  "s ",
  "a ",
  "l",
  "s",
  "a",
  "j",
  "a",
  "f",
  "f",
  " ",
  "k",
  "a",
  "d",
  " ",
  "f",
  "l",
  "a",
  "s",
  "k",
  " ",
  "s",
  "a",
  "d",
  " ",
  "a",
  "l",
  "f",
  "a",
  " ",
  "a",
  "s",
  "k",
  " ",
  "d",
  "a",
  "d",
  " ",
  "s",
  "a",
  "l",
  "a",
  "d",
  "s",
  " ",
  "f",
  "a",
  "l",
  "l",
  " ",
  "l",
  "a",
  "s",
  "s",
  " ",
  "a",
  "l",
  "l",
  " ",
  "a",
  "d",
  "s",
  " ",
  "a",
  "d",
  "d",
  " ",
  "s",
  "a",
  "l",
  "s",
  "a",
  "j",
  "a",
  "f",
  "f",
  " ",
  "k",
  "a",
  "d",
  " ",
  "f",
  "l",
  "a",
  "s",
  "k",
  " ",
  "s",
  "a",
  "d",
  " ",
  "a",
  "l",
  "f",
  "a",
  " ",
  "a",
  "s",
  "k",
  " ",
  "d",
  "a",
  "d",
  " ",
  "s",
  "a",
  "l",
  "a",
  "d",
  "s",
  " ",
  "f",
  "a",
  "l",
  "l",
  " ",
  "l",
  "a",
  "s",
  "s",
  " ",
  "a",
  "l",
  "l",
  " ",
  "a",
  "d",
  "s",
  " ",
  "a",
  "d",
  "d",
  " ",
  "s ",
  "a ",
  "l",
  "s",
  "a",
  "j",
  "a",
  "f",
  "f",
  " ",
  "k",
  "a",
  "d",
  " ",
  "f",
  "l",
  "a",
  "s",
  "k",
  " ",
  "s",
  "a",
  "d",
  " ",
  "a",
  "l",
  "f",
  "a",
  " ",
  "a",
  "s",
  "k",
  " ",
  "d",
  "a",
  "d",
  " ",
  "s",
  "a",
  "l",
  "a",
  "d",
  "s",
  " ",
  "f",
  "a",
  "l",
  "l",
  " ",
  "l",
  "a",
  "s",
  "s",
  " ",
  "a",
  "l",
  "l",
  " ",
  "a",
  "d",
  "s",
  " ",
  "a",
  "d",
  "d",
  " ",
  "s",
  "a",
  "l",
  "s",
  "a",
  "j",
  "a",
  "f",
  "f",
  " ",
  "k",
  "a",
  "d",
  " ",
  "f",
  "l",
  "a",
  "s",
  "k",
  " ",
  "s",
  "a",
  "d",
  " ",
  "a",
  "l",
  "f",
  "a",
];

const TouchTypingApp = () => {
  const [typedText, setTypedText] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(300);
  const [correctWordsTyped, setCorrectWordsTyped] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const notificationSoundRef = useRef(null);

  const play = () => {
    new Audio(sound).play();
  };

  const startTimer = () => {
    setTypedText("");
    setAccuracy(100);
    setRemainingTime(300);
    setTimerRunning(true);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            setEndTime(Date.now());
            clearInterval(timer);
            setTimerRunning(false);
            window.alert("Time's up!");
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timerRunning]);

  useEffect(() => {
    if (typedText.length < keysToPractice.length) {
      setCurrentKeyIndex(typedText.length);
    }
    if (accuracy < 100) {
      // notificationSoundRef.current.play();
    }
  }, [typedText, accuracy]);

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Backspace') {
  //     e.preventDefault();
  //     setTypedText((prevText) => prevText.slice(0, -1));
  //     return;
  //   }

  //   const keyPressed = e.key.toLowerCase();
  //   setTypedText((prevText) => prevText + keyPressed);
  //   setAccuracy(calculateAccuracy(keyPressed));
  // };
  let keyPressed;
  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setTypedText((prevText) => prevText.slice(0, -1));
      return;
    }

    const keyPressed = e.key.toLowerCase();
    setTypedText((prevText) => prevText + keyPressed);
    const isCorrectKey = keyPressed === keysToPractice[typedText.length];
    // console.log(keyPressed);
    console.log(isCorrectKey, "check");
    console.log(keysToPractice[typedText.length]);
    console.log(keyPressed);

    if (keyPressed != keysToPractice[typedText.length]) {
      setAccuracy(
        (prevAccuracy) => prevAccuracy - (1 / keysToPractice.length) * 100
      );
      console.log("first");
      play();
    }
  };

  const calculateAccuracy = (keyPressed) => {
    const totalKeystrokes = typedText.length + 1;
    const incorrectKeystrokes = [...typedText, keyPressed].reduce(
      (count, char, index) =>
        char !== keysToPractice[index] ? count + 1 : count,
      0
    );
    const calculatedAccuracy =
      ((totalKeystrokes - incorrectKeystrokes) / totalKeystrokes) * 100;
    return calculatedAccuracy.toFixed(2);
  };

  const calculateTypingSpeed = () => {
    const wordsTyped = typedText.trim().split(" ").length;
    const elapsedTimeInMinutes = (endTime - startTime) / 1000 / 60;
    const wordsPerMinute = (wordsTyped / elapsedTimeInMinutes).toFixed(0);
    return wordsPerMinute;
  };

  const getKeyColor = (index) => {
    if (typedText.length > index) {
      return typedText[index] === keysToPractice[index] ? "green" : "red";
    }
    if (index === currentKeyIndex) {
      return "yellow";
    }
    return "white";
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (remainingTime === 0) {
      setTimerRunning(false);
    }
  }, [remainingTime]);

  return (
    <div className="touch-typing-app">
      <div style={{ border: "0px solid blue", width: "70%", margin: "auto" }}>
        <h1>Touch Typing Practice</h1>
        {!timerRunning ? (
          <button className="start-button" onClick={startTimer}>
            Start
          </button>
        ) : (
          <div className="keyboard-container">
            <div
              style={{
                border: "3px solid green",
                width: "auto",
                display: "grid",
                padding:"8px",
                height: "auto",
                gridTemplateColumns:"repeat(50, 20px)"
              }}
            >
              {keysToPractice.map((key, index) => (
                <p key={index} className={`key ${getKeyColor(index)}`}>
                  {key}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <audio ref={notificationSoundRef} src={sound} /> */}
      <textarea
        className="input-area"
        onKeyDown={handleKeyDown}
        value={typedText}
        readOnly
        // disabled={}
      />
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Accuracy:</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Typing Speed:</span>
          <span className="stat-value">{calculateTypingSpeed()} WPM</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time Remaining:</span>
          <span className="stat-value">{formatTime(remainingTime)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Correct Words Typed:</span>
          <span className="stat-value">{correctWordsTyped}</span>
        </div>
      </div>
    </div>
  );
};

export default TouchTypingApp;
