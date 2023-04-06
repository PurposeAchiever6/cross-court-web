import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionLayout from 'shared/components/layout/SectionLayout';
import ShowMore from 'shared/components/ShowMore';

const Item = ({ name, content }) => (
  <div className="flex flex-col md:flex-row mt-4">
    <span className="md:w-1/2 font-shapiro95_super_wide md:text-right md:mr-2">{name}</span>
    <p className="md:w-1/2 md:ml-2">{content}</p>
  </div>
);

const MyInfo = ({ profile }) => {
  const [expanded, setExpanded] = useState(false);

  const { bio, age } = profile;

  return (
    <SectionLayout>
      <div className="bg-cc-blue-900 px-4 md:px-28 py-12">
        <Item name="BIO" content={bio} />
        <div className={expanded ? 'block' : 'hidden'}>
          <Item name="AGE" content={age} />
        </div>
      </div>
      <ShowMore className={expanded ? 'hidden' : 'mt-2'} onClick={() => setExpanded(true)} />
    </SectionLayout>
  );
};

MyInfo.propTypes = {
  profile: PropTypes.shape().isRequired,
};

export default MyInfo;
