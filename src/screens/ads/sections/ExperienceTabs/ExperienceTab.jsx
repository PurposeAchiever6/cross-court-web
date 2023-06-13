import React from 'react';
import PropTypes from 'prop-types';
import LazyBackgroundImage from 'shared/components/LazyBackgroundImage';

const ExperienceTab = ({ tab }) => {
  const { title, logo, description, image, comingSoon, buttons } = tab;

  return (
    <div className="md:flex pt-6">
      <div className="md:w-1/2 bg-cc-blue-900 flex flex-col px-8 md:px-14 py-12 md:py-20">
        {title && <h3 className="mb-4 font-shapiro95_super_wide text-2xl md:text-3xl">{title}</h3>}
        {logo && <img className="mb-4 w-40" src={logo} alt="experience-logo" />}
        {comingSoon && (
          <span className="mb-4 block uppercase font-shapiro95_super_wide text-lg text-cc-purple">
            Coming Soon
          </span>
        )}
        <p className="mb-4">{description}</p>
        <div>{buttons}</div>
      </div>
      <LazyBackgroundImage img={image} className="md:w-1/2 min-h-[25em] bg-cover bg-center" />
    </div>
  );
};

ExperienceTab.propTypes = {
  tab: PropTypes.shape({
    title: PropTypes.string,
    logo: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    comingSoon: PropTypes.bool,
    buttons: PropTypes.node,
  }),
};

ExperienceTab.defaultProps = {
  tab: {
    title: null,
    logo: null,
    comingSoon: false,
    buttons: null,
  },
};

export default ExperienceTab;
