import React, { useState, useRef, useEffect } from 'react';

const scores = {
  '👊': 1,
  '✋': 0,
  '✌': -1,
};

const RPS = () => {
  const [computer, setComputer] = useState('👊');
  const [user, setUser] = useState('🤘');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const interval = useRef(null);

  const changeHand = () => {
    if (computer === '👊') {
      setComputer('✋');
    } else if (computer === '✋') {
      setComputer('✌');
    } else if (computer === '✌') {
      setComputer('👊');
    }
  };

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
      changeHand();
      setBtnDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(interval.current);
    };
  }, [computer]);

  return (
    <div>
      <div>{computer}</div>
      <div>{result}</div>
      <div>{user}</div>
      <div>
        <button disabled={btnDisabled} onClick={onClickBtn('👊')}>
          Rock
        </button>
        <button disabled={btnDisabled} onClick={onClickBtn('✋')}>
          Paper
        </button>
        <button disabled={btnDisabled} onClick={onClickBtn('✌')}>
          Scissors
        </button>
      </div>
      <div>Score: {score}</div>
    </div>
  );
};

export default RPS;
