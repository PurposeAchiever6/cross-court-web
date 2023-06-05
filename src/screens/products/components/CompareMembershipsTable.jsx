import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { UNLIMITED_VALUE } from 'screens/products/constants';
import { formatPrice } from 'screens/products/utils';
import ShowMore from 'shared/components/ShowMore';
import CheckSvg from 'shared/components/svg/CheckSvg';
import InfoTooltip from 'shared/components/InfoTooltip';

const ROWS = [
  {
    description: 'Monthly Price',
    tooltip: '',
    accessor: ({ priceForUser }) => formatPrice(priceForUser),
  },
  {
    description: 'Session Credits (refill monthly)',
    tooltip:
      'Session credits allow you to book sessions but they can also be used to book any other experience as well (refer to Non Session Credits)',
    subDescription: 'Can be used for Sessions.',
    accessor: ({ credits }) => (credits === UNLIMITED_VALUE ? 'Unlimited' : credits),
  },
  {
    description: 'Non-Session Credits (refill monthly)',
    tooltip:
      'Non session credits are used to book experiences other than sessions such as SKLZ, Activations, Events, and more. Non session credits can also be used to reserve the court during Office Hours, rent the shooting machine, or to book out our recovery devices.',
    subDescription:
      'Can be used for SKLZ, events, Activations, rentals, and other scheduled experiences besides sessions.',
    accessor: ({ skillSessionCredits }) =>
      skillSessionCredits === UNLIMITED_VALUE ? 'Unlimited' : skillSessionCredits,
  },
  {
    description: 'Rollover Credits',
    tooltip:
      'A certain number of unused credits each month carry over to the next month. Only applies to session credits.',
    accessor: ({ credits, maxRolloverCredits }) =>
      credits === UNLIMITED_VALUE ? 'N/A' : maxRolloverCredits,
  },
  {
    description: 'Waitlist Priority',
    tooltip:
      'Waitlist priority is tiered with MVP members having highest priority, followed by VET and then Rookie members',
    accessor: ({ waitlistPriority }) => waitlistPriority,
  },
  {
    description: 'Free Membership Freeze',
    tooltip:
      'Members have the ability to pause their membership for reasons such as traveling or resting a mild injury. Once your free pause(s) has been used, you can pause your membership by paying a fee. Free pauses reset each year.',
    accessor: ({ freePausesPerYear }) =>
      freePausesPerYear > 0 ? `${freePausesPerYear} mo.` : 'None',
  },
  {
    description: 'Office Hours',
    tooltip:
      'The Club is open all day for members and their guests to utilize our spaces to get work done, workout, hangout, hoop, recover, and generally use the space as it works for them. Using credits, members can reserve the court, the shooting machine, recovery devices, and other services during Office Hours through the schedule as well as add their guests.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Digital Network',
    tooltip:
      'Discover new connections and learn more about other members using our community Discord server, socially driven schedule, personalized player profiles, and member directory (coming soon).',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Member Events',
    tooltip:
      'Access a variety of unique events and meetups hosted by us or built around other members on and off site. Some examples include a group fitness workout, TopGolf outing, yoga class, ball and brunch, and much more. May require a credit.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Unlimited Guest Passes',
    tooltip:
      'Members can add guests to Office Hours and most experiences available on our schedule using the post session booked page or going into "My Account". See more information in our Member Handbook. Certain restrictions apply.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Activations',
    tooltip:
      'Unique pop up events and competitive experiences centered around team sport. From a 3v3 tournament, to a dodgeball event, to a skills challenge. May require a credit.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Challenges',
    tooltip:
      'From a March Madness bracket challenge, to an NFL survivor pool, to the best Crosscourt highlight of the week, we provide consistent opportunities to connect and compete.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Highlights',
    tooltip:
      'Watch, clip, edit, and upload personalized highlights all from your mobile device using the Pixellot app.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Tiered and Themed Sessions',
    tooltip:
      'Book sessions that fit your desired intensity level or sign up for themed sessions like CC The Game, no win streak limit Wednesdays, Throwback Thursdays, 4 QTR Friday, and others.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Discounted Day Pass',
    tooltip:
      'Purchase additional, discounted one off credits to use for bookings when all of your credits have been used in a given month.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Private Training Access',
    tooltip:
      'Work with our Coaches one on one to develop your skills. Private Training credits sold seperately. Email us to set up.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'CC Cash',
    tooltip:
      'Collect store credit to use on CC swag, grab n go items, and other purchases by referring members, winning challenges, and capitalzing on other CC Cash opportunities. CC Cash in your account is auto applied to purchases.',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
  },
  {
    description: 'Free Jersey & Towel Rental',
    accessor: ({ freeJerseyRental, freeTowelRental }) =>
      freeJerseyRental && freeTowelRental ? (
        <CheckSvg className="w-6 text-cc-purple inline-block" />
      ) : null,
  },
  {
    description: 'SNZS Access (Coming Soon)',
    accessor: () => <CheckSvg className="w-6 text-cc-purple inline-block" />,
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
