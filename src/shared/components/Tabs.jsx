import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabContainer = styled.div`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Tabs = ({ variant, alignLabels, className, children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const variantClasses = (active) => {
    switch (variant) {
      case 'opacity-underline':
        return active ? 'opacity-100 border-b-2 border-b-current' : 'opacity-60 hover:opacity-100';
      case 'opacity':
      default:
        return active ? 'opacity-100' : 'opacity-50 hover:opacity-100';
    }
  };

  const alignLabelsClasses = (() => {
    switch (alignLabels) {
      case 'right':
        return 'justify-end';
      case 'center':
        return 'justify-center';
      case 'around':
        return 'justify-around';
      case 'between':
        return 'justify-between';
      case 'left':
      default:
        return '';
    }
  })();

  return (
    <div className={className}>
      <TabContainer className={`flex gap-8 mb-6 overflow-x-auto ${alignLabelsClasses}`}>
        {children.map(({ props: { label } }) => (
          <span
            key={label}
            className={`text-2xl font-shapiro95_super_wide cursor-pointer transition-all duration-300 ${variantClasses(
              activeTab === label
            )}`}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </span>
        ))}
      </TabContainer>
      <div>
        {children.map((child) => (child.props.label == activeTab ? child.props.children : null))}
      </div>
    </div>
  );
};

Tabs.defaultProps = {
  variant: 'opacity',
  alignLabels: 'left',
  className: '',
};

Tabs.propTypes = {
  variant: PropTypes.string,
  alignLabels: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Tabs;
