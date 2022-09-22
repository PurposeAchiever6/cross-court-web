import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from 'shared/styles/constants';

const TabsContainer = styled.div`
  .tabs {
    display: flex;
    justify-content: space-around;
    font-size: 1.7rem;
    margin-top: 1rem;
    font-weight: 200;
    color: ${colors.grey};
  }

  span {
    cursor: pointer;
  }

  .selected {
    font-weight: 500;
    color: ${colors.black};
  }
`;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <TabsContainer>
      <div className="tabs">
        {children.map(({ props: { label } }) => (
          <span
            key={label}
            className={activeTab === label ? 'selected' : undefined}
            onClick={() => setActiveTab(label)}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </TabsContainer>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
