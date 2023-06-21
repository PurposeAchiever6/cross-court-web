import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';

const TabContainer = styled.div`
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TAB_QUERY_PARAM = 'tab';

const Tabs = ({
  variant,
  alignLabels,
  className,
  children,
  tabContainerClasses,
  showSeparator,
  noActiveTab,
}) => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const defaultActiveTab = children[0].props.label;

  const [activeTab, setActiveTab] = useState(
    noActiveTab ? defaultActiveTab : searchParams.get(TAB_QUERY_PARAM) || defaultActiveTab
  );

  useEffect(() => {
    if (noActiveTab) {
      return;
    }

    searchParams.set(TAB_QUERY_PARAM, activeTab);
    history.replace({ search: searchParams.toString() });
  }, [activeTab]);

  const variantClasses = (active) => {
    switch (variant) {
      case 'opacity-underline':
        return active ? 'opacity-100 border-b-3 border-b-current' : 'opacity-60 hover:opacity-100';
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
      <TabContainer
        className={`flex gap-8 ${
          showSeparator ? '' : 'mb-6'
        } overflow-y-hidden overflow-x-auto ${tabContainerClasses} ${alignLabelsClasses}`}
      >
        {children.map(({ props: { label, showSeparator: childShowSeparator } }) => (
          <div
            key={label}
            onClick={() => setActiveTab(label)}
            className={`relative text-2xl font-shapiro95_super_wide cursor-pointer transition-opacity duration-300 ${
              showSeparator ? 'pb-2 md:pb-3' : ''
            } ${variantClasses(activeTab === label)}`}
          >
            <span className="whitespace-nowrap">{label}</span>
            {childShowSeparator && (
              <div className="absolute top-1 -right-4 h-1/2 w-[2px] bg-white" />
            )}
          </div>
        ))}
      </TabContainer>
      {showSeparator && <hr className="mb-6" />}
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
  tabContainerClasses: '',
  noActiveTab: false,
};

Tabs.propTypes = {
  variant: PropTypes.string,
  alignLabels: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  tabContainerClasses: PropTypes.string,
  noActiveTab: PropTypes.bool,
};

export default Tabs;
