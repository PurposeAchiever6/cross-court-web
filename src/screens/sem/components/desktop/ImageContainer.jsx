import styled from 'styled-components';

export default styled.div`
  grid-row: 1 / 3;
  grid-column: 1 / 4;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 0 2000px ${props => props.overlayColor || 'transparent'};
  height: 100%;
`;
