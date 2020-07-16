import styled from 'styled-components';
import { Link as RRLink } from 'react-router-dom';

import device from 'shared/styles/mediaQueries';

const Link = styled(RRLink)`
  letter-spacing: 0.1em;
  font-weight: bold;
  font-size: 0.875rem;
  text-transform: uppercase;
  text-decoration: none;
  margin: 2rem;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 11rem;

  @media (min-width: 992px) {
    margin: 0;
    font-size: 0.95rem;
    width: 13rem;
  }
`;

export default Link;
