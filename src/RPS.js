import React, { useState, useRef, useEffect, useCallback } from 'react';
import './RPS.css';

const scores = {
  '✊': 1,
  '✋': 0,
  '✌': -1,
};

const RPS = () => {
  const [computer, setComputer] = useState('✊');
  const [user, setUser] = useState('💪');
  const [result, setResult] = useState('vs');
  const [score, setScore] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const interval = useRef(null);

  const changeHand = useCallback(() => {
    if (computer === '✊') {
      setComputer('✋');
    } else if (computer === '✋') {
      setComputer('✌');
    } else if (computer === '✌') {
      setComputer('✊');
    }
  }, [computer]);

  const onClickBtn = (user) => () => {
    setUser(user);
    setBtnDisabled(true);
    clearInterval(interval.current);
    const diff = scores[user] - scores[computer];
    if (diff === 0) {
      setResult('draw');
    } else if ([-1, 2].includes(diff)) {
      setResult('win');
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult('lose');
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
      setBtnDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [changeHand]);

  return (
    <div className="rps-box">
      <div className="score">Score: {score}</div>
      <div className="result-box">
        <div className="computer">
          <span>{computer}</span>
          <h3>Computer</h3>
        </div>
        <div className="result">
          <span>{result}</span>
        </div>
        <div className="user">
          <span>{user}</span>
          <h3>You</h3>
        </div>
      </div>
      <div className="btn-box">
        <button disabled={btnDisabled} onClick={onClickBtn('✊')}>
          ✊
        </button>
        <button disabled={btnDisabled} onClick={onClickBtn('✋')}>
          ✋
        </button>
        <button disabled={btnDisabled} onClick={onClickBtn('✌')}>
          ✌
        </button>
      </div>
    </div>
  );
};

export default RPS;
