'use client'

import { Player } from '@lottiefiles/react-lottie-player';

export const LoadingAnimation = () => {
  return (
    <Player
      autoplay
      loop
      src="https://lottie.host/4efe3d52-f700-4ca8-81bc-6ff3814e2bd2/J0fxvPdbu0.json"
      style={{ height: '300px', width: '300px' }}
    >
    </Player>
  );
};