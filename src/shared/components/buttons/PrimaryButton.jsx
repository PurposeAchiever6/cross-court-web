import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Spinner from '../Spinner';

const StyledDiv = styled.div`
  background-color: transparent;
  display: inline-block;
  text-transform: uppercase;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
  font-family: ${(props) => (props.font ? props.font : 'shapiro95_super_wide')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '18px')};
  min-width: 130px;
  width: ${(props) => (props.w ? props.w : '')};
  height: ${(props) => (props.h ? props.h : '')};
  padding: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  opacity: ${(props) => (props.disabled || props.loading ? '0.3' : '1')};

  .content {
    background-color: ${(props) =>
      props.bg ? props.bg : props.inverted ? colors.white : colors.brandPurple};
    border: 3px solid
      ${(props) =>
        props.double
          ? props.inverted
            ? colors.brandPurple
            : colors.white
          : props.color || colors.brandPurple};
    color: ${(props) => props.color || (props.inverted ? colors.brandPurple : colors.white)};
    padding: ${(props) => (props.py ? props.py : '8px')} ${(props) =>
  props.px ? props.px : '15px'}
    position: relative;
    transition: 500ms background-color ease, 500ms border-color ease, 500ms color ease;
    z-index: 1;
    :hover {
      background-color: ${(props) => (props.inverted ? colors.brandPurple : colors.white)};
      color: ${(props) => (props.inverted ? colors.white : colors.brandPurple)};
      border: 3px solid ${(props) => (props.inverted ? colors.white : colors.brandPurple)};
    }
  }

  .double-drop {
    background-color: ${(props) =>
      props.bg ? props.bg : props.inverted ? colors.white : colors.brandPurple};
    border: 3px solid ${(props) => (props.inverted ? colors.brandPurple : colors.white)};
    height: 100%;
    left: 9px;
    position: absolute;
    top: 9px;
    width: 100%;
    z-index: 0;
  }
`;

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: ${(props) => (props.w ? props.w : '')};
`;

const PrimaryButton = ({
  className = '',
  to,
  children,
  loading,
  inverted,
  double,
  disabled,
  font,
  bg,
  w,
  h,
  px,
  py,
  color,
  type,
  fontSize,
  lineHeight,
  contentClasses = '',
  ...props
}) => {
  const content = (
    <StyledDiv
      font={font}
      inverted={inverted}
      disabled={disabled}
      color={color}
      bg={bg}
      w={w}
      h={h}
      px={px}
      py={py}
      double={double}
      fontSize={fontSize}
      lineHeight={lineHeight}
      className={contentClasses}
      {...props}
    >
      {<div className="content">{loading ? <Spinner /> : children}</div>}
      {double && <div className="double-drop"></div>}
    </StyledDiv>
  );

  return to ? (
    <Link
      style={{ pointerEvents: disabled || loading ? 'none' : '' }}
      to={to}
      className={`primary-button ${className}`}
    >
      {content}
    </Link>
  ) : (
    <StyledButton
      style={{ pointerEvents: disabled || loading ? 'none' : '' }}
      className={`primary-button ${className}`}
      type={type}
      w={w}
    >
      {content}
    </StyledButton>
  );
};

export default PrimaryButton;
