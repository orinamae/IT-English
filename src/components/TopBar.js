import React, { useState, useEffect } from 'react';
import './TopBar.css';
import halfMoonIcon from './half-moon-icon.svg';

const TopBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState('../images/uk.jpg');
  const [fontColor, setFontColor] = useState('#000000');

  useEffect(() => {
    document.documentElement.style.setProperty('--font-color', fontColor);
  }, [fontColor]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    setBgImage(isDarkMode ? '../images/us.jpg' : '../uk.jpg');
    setFontColor(isDarkMode ? '#000000' : '#ffffff');
  };

  return (
    <div
      className="top-bar"
      style={{
        backgroundColor: '#007bff',
        backgroundImage: `url(${bgImage})`,
        color: fontColor,
      }}
    >
      <h1>IT-English</h1>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <img src={halfMoonIcon} alt="Dark Mode Toggle" />
      </button>
    </div>
  );
};

export default TopBar;
