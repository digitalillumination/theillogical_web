import React, { useState } from "react";
import styled from "styled-components";
import { Step, StepContent, StepLabel, Stepper } from "@material-ui/core";
import useUploadStepContent from "../components/pages/useUploadStepContent";
import ErrorComponent from "../components/UI/ErrorComponent";

const steps = ["작업물 형태 정하기", "앨범 정보 등록", "곡 올리기", "완료"];

function UploadPage() {
  const [activeStep, setStep] = useState(0);
  const {element, error } = useUploadStepContent(activeStep, setStep);

  return (
    <Layout>
      {error && <ErrorComponent message={(error as any).message} />}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, i) => (
          <Step key={i}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              {element}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 1em 1.5em;
  
  .action-buttons {
    button {
      margin: 0 1em;
    }
    button:first-child {
      margin: 0;
    }
  }
  .album-image {
    img {
      width: 100%;
      height: auto;
    }
  }
  .form {
    margin: 1em 0;
  }
`;

export default UploadPage;