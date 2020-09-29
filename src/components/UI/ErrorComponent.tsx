import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
function ErrorComponent({message}: {message: string}) {
  const history = useHistory();

  return (
    <View>
      <div className="message">
        <strong>에러!</strong> {message}
      </div>
      <div className="actions">
        <Button color="primary" variant="contained" onClick={() => history.replace("/")}>메인으로 가기</Button>
        <Button color="inherit" onClick={() => window && window.location && window.location.reload()}>새로고침</Button>
      </div>
    </View>
  );
}

const View = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  
  .actions {
    margin-top: .5em;
    > * {
      margin: 0 8px;
    }
  }
`;

export default ErrorComponent;