import styled from 'styled-components';

const Icons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2rem;
  margin-top: 5rem;
  text-align: baseline;

  @media (min-width: 992px) {
    margin: 0;
    justify-content: flex-start;
  }
`;

export default Icons;
