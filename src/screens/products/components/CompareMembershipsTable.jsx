import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { UNLIMITED_VALUE } from 'screens/products/constants';
import { formatPrice, isRecurring } from 'screens/products/utils';
import ShowMore from 'shared/components/ShowMore';
import CheckSvg from 'shared/components/svg/CheckSvg';
import CrossSvg from 'shared/components/svg/CrossSvg';
import InfoTooltip from 'shared/components/InfoTooltip';

const ROWS = [
  {
    description: 'Price',
    tooltip: '',
    accessor: (product) =>
      isRecurring(product)
        ? `${formatPrice(product.priceForUser)}/month`
        : formatPrice(product.priceForUser),
  },
  {
    description: 'Session Credits',
    tooltip:
      'Session credits allow you to book sessions but they can also be used to book any other experience as well (refer to Non Session Credits).',
    subDescription: 'Can be used for Sessions.',
    accessor: (product) => {
      const { credits } = product;
      if (credits === UNLIMITED_VALUE) {
        return 'Unlimited';
      }

      if (isRecurring(product)) {
        return `${credits}/month`;
      }

      return credits;
    },
  },
  {
    description: 'Non-Session Credits',
    tooltip:
      'Non session credits are used to book experiences other than sessions such as SKLZ, Activations, Events, and more. Non session credits can also be used to reserve the court during Office Hours, rent the shooting machine, or to book out our recovery devices.',
    subDescription:
      'Can be used for SKLZ, events, Activations, rentals, and other scheduled experiences besides sessions.',
    accessor: (product) => {
      const { skillSessionCredits } = product;
      if (skillSessionCredits === UNLIMITED_VALUE) {
        return 'Unlimited';
      }

      if (isRecurring(product)) {
        return `${skillSessionCredits}/month`;
      }

      return skillSessionCredits;
    },
  },
  {
    description: 'Rollover Credits',
    tooltip:
      'A certain number of unused credits each month carry over to the next month. Only applies to session credits.',
    accessor: (product) => {
      const { credits, maxRolloverCredits } = product;

      return credits === UNLIMITED_VALUE || !isRecurring(product) ? 'N/A' : maxRolloverCredits;
    },
  },

  {
    description: 'Last Minute Free Booking',
    tooltip:
      'Receive a "last minute" notification to book upcoming sessions that need a few more players using complementary AKA free credits. Email notifications are prioritized for MVP, Vet, and Rookie members in that order.',
    accessor: (product) => {
      const { noBookingChargeFeature, noBookingChargeFeaturePriority } = product;

      return noBookingChargeFeature ? noBookingChargeFeaturePriority : 'N/A';
    },
  },
  {
    description: 'Office Hours',
    tooltip:
      'The Club is open all day for members and their guests to utilize our spaces to get work done, workout, hangout, hoop, recover, and generally use the space as it works for them. Using credits, members can reserve the court, the shooting machine, recovery devices, and other services during Office Hours through the schedule as well as add their guests.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Back to Back Booking',
    tooltip: 'The ability to book two sessions in a row.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Highlights',
    tooltip:
      'Watch, clip, edit, and upload personalized highlights all from your mobile device using the Pixellot app.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Shooting Machine Access',
    tooltip:
      'Members have access to our Shooting Machine during Office Hours to work on that jumper.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Normatec Compression Recovery',
    tooltip:
      'We have partnered with Hyperice to improve your recovery. Use our Normatec devices in the recovery zone. Our staff will set you up.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Unlimited Guest Passes',
    tooltip:
      'Add guests to Office Hours and most experiences available on our schedule using the post session booked page or going into "My Account". See more information in our Member Handbook. Certain restrictions apply.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Activations',
    tooltip:
      'Unique pop up events and competitive experiences centered around team sport. From a 3v3 tournament, to a dodgeball event, to a skills challenge. May require a credit.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'CC Cash',
    tooltip:
      'Collect store credit to use on CC swag, grab n go items, and other purchases by referring members, winning challenges, and capitalzing on other CC Cash opportunities. CC Cash in your account is auto applied to purchases.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Discounted Day Pass',
    tooltip:
      'Purchase additional, discounted one off credits to use for bookings when all of your credits have been used in a given month.',
    accessor: (product) =>
      isRecurring(product) ? (
        <CheckSvg className="w-6 text-cc-purple inline-block" />
      ) : (
        <CrossSvg className="w-6 text-white/60 inline-block" />
      ),
  },
  {
    description: 'Member Events',
    tooltip:
      'Access a variety of unique events and meetups hosted by us or built around other members on and off site. Some examples include a group fitness workout, TopGolf outing, yoga class, ball and brunch, and much more. May require a credit.',
    accessor: (product) =>
      isRecurring(product) ? (
        <CheckSvg className="w-6 text-cc-purple inline-block" />
      ) : (
        <CrossSvg className="w-6 text-white/60 inline-block" />
      ),
  },
  {
    description: 'Waitlist Priority',
    tooltip:
      'Waitlist priority is tiered with MVP members having highest priority, followed by VET and then Rookie members.',
    accessor: (product) => {
      const { waitlistPriority } = product;

      if (!isRecurring(product)) {
        return <CrossSvg className="w-6 text-white/60 inline-block" />;
      }

      return waitlistPriority;
    },
  },
  {
    description: 'Free Jersey & Towel Rental',
    tooltip: 'No charge for jersey and towel rentals.',
    accessor: ({ freeJerseyRental, freeTowelRental }) =>
      freeJerseyRental && freeTowelRental ? (
        <CheckSvg className="w-6 text-cc-purple inline-block" />
      ) : (
        <CrossSvg className="w-6 text-white/60 inline-block" />
      ),
  },
  {
    description: 'Free Membership Freeze',
    tooltip:
      'Members have the ability to pause their membership for reasons such as traveling or resting a mild injury. Once your free pause(s) has been used, you can pause your membership by paying a fee. Free pauses reset each year.',
    accessor: (product) => {
      const { freePausesPerYear } = product;
      if (!isRecurring(product)) {
        return 'N/A';
      }

      return freePausesPerYear > 0 ? (
        `${freePausesPerYear} mo.`
      ) : (
        <CrossSvg className="w-6 text-white/60 inline-block" />
      );
    },
  },
];

const CompareMembershipsTable = forwardRef(({ products, initialRowsShown, className }, ref) => {
  const [rowsShown, setRowsShown] = useState(initialRowsShown || ROWS.length);

  return (
    <div ref={ref} className={className}>
      <div className="md:flex md:items-center border-b border-white/30 font-shapiro95_super_wide pb-6">
        <h2 className="md:w-1/3 text-3xl mb-8 md:mb-0">
          Compare <br /> Memberships
        </h2>
        <div className="flex md:w-2/3 text-center text-sm md:text-lg uppercase">
          {products.map((product) => (
            <h4 key={product.id} className="w-full">
              {product.name}
            </h4>
          ))}
        </div>
      </div>
      {ROWS.map((row, index) =>
        index + 1 > rowsShown ? null : (
          <div
            key={index}
            className={`md:flex md:items-center text-sm py-6 ${
              index + 1 < ROWS.length && index + 1 < rowsShown ? 'border-b border-white/30' : ''
            }`}
          >
            <div className="md:w-1/3 flex mb-5 md:mb-0">
              <div className="w-8 shrink-0">
                {row.tooltip && <InfoTooltip info={row.tooltip} />}
              </div>
              <div>
                {row.description}
                {row.subDescription && (
                  <span className="block text-xs text-white/60">{row.subDescription}</span>
                )}
              </div>
            </div>
            <div className="flex md:w-2/3 text-center">
              {products.map((product) => (
                <div key={product.id} className="w-full">
                  {row.accessor(product)}
                </div>
              ))}
            </div>
          </div>
        )
      )}
      {rowsShown < ROWS.length && (
        <ShowMore onClick={() => setRowsShown(rowsShown + 4)} className="mt-4" />
      )}
    </div>
  );
});

CompareMembershipsTable.defaultProps = {
  initialRowsShown: null,
  className: '',
};

CompareMembershipsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  initialRowsShown: PropTypes.number,
  className: PropTypes.string,
};

export default CompareMembershipsTable;
