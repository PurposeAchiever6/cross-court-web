import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import CheckImg from 'shared/images/CheckIcon.png';
import Button from 'shared/components/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { getSessionId, getSessionDate } from '../reducer';

const SessionReservedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .session-info-container {
    width: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    margin-bottom: 2.75rem;
    margin-top: 5rem;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${colors.black};
    margin-bottom: 3rem;
    width: 70%;
    text-align: center;
  }
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .share-buttons-container {
    display: flex;
    margin-bottom: 5rem;

    button {
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.14);
      border-radius: 2px;
      font-size: 1rem;
      border: 0;
      margin: 0 10px;
      height: 2.5rem;
      width: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .facebook {
      background: #3b5998;
      color: ${colors.white};
    }

    .whatsapp {
      background-color: #40c351;
      color: ${colors.white};
    }

    .facebook-messenger {
      background-color: ${colors.white};
      color: #448aff;
    }

    .external-link {
      background-color: ${colors.white};
      color: ${colors.black};
    }
  }

  a {
    width: 59%;
  }

  button {
    width: 100%;
    margin-bottom: 6rem;
  }
`;

const SessionReserved = () => {
  const sessionId = useSelector(getSessionId);
  const sessionDate = useSelector(getSessionDate);

  const APP_URL = process.env.REACT_APP_URL;
  const SHARE_URL = `${APP_URL}/session/${sessionId}/${sessionDate}`;

  const onCopyHandler = () => toast.success('Link Copied!');

  return (
    <SessionReservedContainer>
      <div className="session-info-container">
        <img src={CheckImg} alt="Check Icon" />
        <h1>The session was booked successfully!</h1>
        <span>
          Invite a friend !<strong>Share your session</strong>
        </span>
        <div className="share-buttons-container">
          <FacebookShareButton className="facebook" url={SHARE_URL}>
            <FontAwesomeIcon icon={faFacebookF} />
          </FacebookShareButton>
          <WhatsappShareButton className="whatsapp" url={SHARE_URL}>
            <FontAwesomeIcon icon={faWhatsapp} />
          </WhatsappShareButton>
          <button className="external-link" type="button">
            <CopyToClipboard text={SHARE_URL} onCopy={onCopyHandler}>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </CopyToClipboard>
          </button>
        </div>
        <Link to={ROUTES.MYACCOUNT}>
          <Button>Done</Button>
        </Link>
      </div>
    </SessionReservedContainer>
  );
};

export default SessionReserved;
