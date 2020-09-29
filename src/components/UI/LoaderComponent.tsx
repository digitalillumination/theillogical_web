import React from 'react';
import styled from "styled-components";
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function LoaderComponent() {
  return (
    <Wrap>
      <Loader type="TailSpin" width={200} height={200} color="black" />
    </Wrap>
  )
}

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoaderComponent;