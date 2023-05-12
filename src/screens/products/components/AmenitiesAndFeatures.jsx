import React from 'react';

import SectionLayout from 'shared/components/layout/SectionLayout';
import amenities0 from 'screens/products/images/amenities-0.png';
import amenities1 from 'screens/products/images/amenities-1.png';
import amenities2 from 'screens/products/images/amenities-2.png';
import amenities3 from 'screens/products/images/amenities-3.png';
import amenities4 from 'screens/products/images/amenities-4.png';
import amenities5 from 'screens/products/images/amenities-5.png';
import amenities6 from 'screens/products/images/amenities-6.png';
import amenities7 from 'screens/products/images/amenities-7.png';
import amenities8 from 'screens/products/images/amenities-8.png';
import amenities9 from 'screens/products/images/amenities-9.png';
import amenities10 from 'screens/products/images/amenities-10.png';
import amenities11 from 'screens/products/images/amenities-11.png';

const amenities = [
  { img: amenities0, description: 'Full Court' },
  { img: amenities1, description: 'Free Parking' },
  { img: amenities2, description: 'Shooting Machine' },
  { img: amenities3, description: 'On-site Staff' },
  { img: amenities4, description: 'Strength Training Equipment' },
  { img: amenities5, description: 'Lockers & Lounge' },
  { img: amenities6, description: 'Recovery Zone' },
  { img: amenities7, description: 'Warm Up Hoop' },
  { img: amenities8, description: 'Experienced Officials and Coaches' },
  { img: amenities9, description: 'Collaborative Workspace' },
  { img: amenities10, description: 'Free Wifi' },
  { img: amenities11, description: 'Grab N Go' },
];

const AmenitiesAndFeatures = () => (
  <SectionLayout className="mb-12 md:mb-24 pb-12 md:pb-24 border-b-2 border-cc-purple">
    <h2 className="font-shapiro95_super_wide text-3xl sm:text-4xl mb-6 sm:mb-10">
      Amenities &amp; Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {amenities.map((amenity, i) => (
        <div
          key={`amenity-${i}`}
          className="group flex flex-col items-center justify-center bg-cc-blue-700 p-8"
        >
          <img className="w-20 h-20" src={amenity.img} alt={`amenity-${i}`} />
          <span className="block text-center mt-4">{amenity.description}</span>
          <div className="w-20 h-20 blur-2xl group-hover:scale-150 rounded-full absolute bg-cc-purple-900" />
        </div>
      ))}
    </div>
  </SectionLayout>
);

export default AmenitiesAndFeatures;
