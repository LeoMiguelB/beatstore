import React from 'react';

interface PlayIconProps {
  width: number
  height: number
}

const PlayIcon: React.FC<PlayIconProps> = (props) => {
  const {width, height, ...rest} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 6V18L18 12L8 6Z" fill="currentColor" />
    </svg>
  )
}

export default PlayIcon;