import React from 'react';
import background8 from '../assets/background8.jpg';

const styles = {
  position: 'fixed',
  zIndex: '-1',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  opacity: 0.8
};

export default function Background() {
  return (
    <img src={background8} style={styles} alt="Background" />
  );
}

