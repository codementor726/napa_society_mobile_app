import React from 'react';
import {SvgXml} from 'react-native-svg';

export const HiIcon = () => {
  const xml = `
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M126.75 17.25H52.5C32.6177 17.25 16.5 33.3677 16.5 53.25V127.5C16.5 147.382 32.6177 163.5 52.5 163.5H126.75C146.632 163.5 162.75 147.382 162.75 127.5V53.25C162.75 33.3677 146.632 17.25 126.75 17.25Z" fill="url(#paint0_linear_9695_16392)"/>
  <g filter="url(#filter0_d_9695_16392)">
  <path d="M80.6149 63.0553C83.3356 62.7698 86.0416 63.6184 88.9434 64.9545C91.8315 66.2843 95.3668 68.3221 99.832 70.896L100.108 71.0551C104.574 73.6294 108.109 75.6671 110.706 77.4989C113.32 79.3428 115.392 81.2482 116.491 83.7136C118.17 87.4776 118.17 91.7724 116.491 95.5364C115.392 98.0018 113.32 99.9072 110.706 101.751C108.109 103.583 104.574 105.621 100.108 108.195L99.8319 108.354C95.3668 110.928 91.8315 112.966 88.9435 114.295C86.0416 115.632 83.3356 116.48 80.6149 116.195C76.4676 115.76 72.7162 113.589 70.2838 110.247C68.6949 108.064 68.0813 105.329 67.79 102.159C67.5 99.0026 67.5 94.9314 67.5 89.7786V89.4713C67.5 84.3186 67.5 80.2474 67.79 77.0911C68.0813 73.9211 68.6949 71.1865 70.2838 69.0032C72.7162 65.6606 76.4676 63.4905 80.6149 63.0553Z" fill="url(#paint1_linear_9695_16392)"/>
  </g>
  <defs>
  <filter id="filter0_d_9695_16392" x="65.0581" y="60.5581" width="60.0175" height="63.0175" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dx="2.44187" dy="2.44187"/>
  <feGaussianBlur stdDeviation="2.44187"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.686275 0 0 0 0 0.717647 0 0 0 0.5 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9695_16392"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9695_16392" result="shape"/>
  </filter>
  <linearGradient id="paint0_linear_9695_16392" x1="16.5" y1="163.5" x2="165.866" y2="20.5052" gradientUnits="userSpaceOnUse">
  <stop stop-color="#00969C"/>
  <stop offset="1" stop-color="#16E6EF"/>
  </linearGradient>
  <linearGradient id="paint1_linear_9695_16392" x1="93.0481" y1="127.595" x2="166.334" y2="59.8039" gradientUnits="userSpaceOnUse">
  <stop stop-color="white"/>
  <stop offset="1" stop-color="white" stop-opacity="0.2"/>
  </linearGradient>
  </defs>
  </svg>
  `;
  return <SvgXml xml={xml} />;
};
