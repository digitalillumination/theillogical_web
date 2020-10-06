import React, { useRef } from "react";
import styled from "styled-components";

function PlayerSeekBar({percent, seekByRatio}: {percent: number, seekByRatio(ratio: number): any}) {
  const ref = useRef<HTMLDivElement|null>(null);

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const ratio = e.clientX / ref.current.clientWidth;
    seekByRatio(ratio);
  }
  return (
    <Bar onClick={seek} ref={ref}>
      <div className="progress" style={{width: `${percent * 100}%`}}/>
    </Bar>
  )
}

const Bar = styled.div`
  position: absolute;
  top: -5px;
  height: 5px;
  left: 0;
  right: 0;
  background: #EAEAEA;
  transition: height .5s, top .5s;
  cursor: pointer;
  
  .progress {
    background: blue;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  :hover {
    height: 15px;
    top: -15px;
  }
`;

export default PlayerSeekBar;