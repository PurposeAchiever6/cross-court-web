import styled from 'styled-components';

export default styled.div(
  props => `
  background-image: url(${props.img});
  background-position: top;
  box-shadow: inset 0 0 0 2000px ${props.overlayColor};
  height: 35vh;
  background-size: cover;
  background-repeat: no-repeat;
`
);
