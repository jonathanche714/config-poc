import { useState } from 'react';
import styled from 'styled-components';
import { transformTableDataToConfigData } from '../utils';

const StyledOverlay = styled.div`
  height: 400px;
  width: 768px;
  border: 1px solid black;
  position: absolute;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const StyledButton = styled.button`
  margin: 10px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const addNewConfigFields = (target, source) => {
  target.push(source);
  return target;
};

export const Overlay = ({ setIsOverlayDisplayed, data }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const onSubmit = async () => {
    await fetch('/api/test', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        transformTableDataToConfigData(addNewConfigFields(data, { key, value }))
      ),
    });

    setIsOverlayDisplayed(false);
  };

  return (
    <StyledOverlay>
      <StyledCloseButton
        onClick={() => {
          setIsOverlayDisplayed(false);
        }}
      >
        X
      </StyledCloseButton>
      <InputContainer>
        <label htmlFor="key">
          Key:
          <input
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            name="key"
          />
        </label>
        <label htmlFor="value">
          Value:
          <input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            name="value"
          />
        </label>
      </InputContainer>
      <StyledButton onClick={onSubmit}>submit</StyledButton>
    </StyledOverlay>
  );
};
