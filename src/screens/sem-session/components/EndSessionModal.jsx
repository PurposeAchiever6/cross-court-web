import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import CloseButton from 'shared/components/CloseButton';

const Container = styled.div`
  position: relative;

  .close-btn {
    top: 0;
    right: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  margin: auto;
  height: 20rem;

  h2 {
    font-weight: bold;
    font-size: 28px;
    line-height: 44px;
    margin-bottom: 1.2rem;
  }

  p {
    margin-bottom: 3rem;
  }

  .link {
    position: absolute;
    bottom: 2rem;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1em;
    text-decoration-line: underline;
    cursor: pointer;
    text-transform: uppercase;
    width: 80%;
    text-align: center;
  }

  .end-session-btn {
    background-color: ${colors.red};
    color: ${colors.white};
  }
`;

const EndSessionModal = ({ closeHandler, endSession }) => (
  <Container>
    <CloseButton className="close-btn" color={colors.black} onClick={closeHandler} />
    <ContentContainer>
      <h2>End Session</h2>
      <p>Are you sure you want to end this session?</p>
      <Button className="end-session-btn" onClick={endSession}>
        End Session
      </Button>
      <span className="link" onClick={closeHandler}>
        Continue Session
      </span>
    </ContentContainer>
  </Container>
);

export default EndSessionModal;

EndSessionModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  endSession: PropTypes.func.isRequired,
};
