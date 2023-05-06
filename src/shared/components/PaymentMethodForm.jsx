import React from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { hexToRgb } from 'shared/utils/colors';
import Label from 'shared/components/Label';
import Button from 'shared/components/Button';
import theme from '~/tailwind.theme';

const colorClasses = (dark) => {
  if (dark) {
    return `
      background-color: ${theme.colors['cc-blue']['500']};; // bg-cc-blue-500
      border-color: ${theme.colors['cc-blue']['500']};; // bg-cc-blue-500

      &.StripeElement--focus {
        border-color: ${hexToRgb(theme.colors.cream, '0.1')} !important; // focus:border-cream/10
      }
    `;
  }

  return `
    background-color: ${theme.colors['cc-gray']['400']}; // bg-cc-gray-400
    border-color: ${theme.colors['cc-gray']['400']}; // border-cc-gray-400

    &.StripeElement--focus {
      border-color: ${theme.colors['cc-gray']['600']} !important; // border-cc-gray-600
    }
  `;
};

const inputClasses = (variant) => {
  switch (variant) {
    case 'expanded':
      return `
        padding-left: 1rem; // px-4
        padding-right: 1rem;
        padding-top: 1.25rem; // py-5
        padding-bottom: 1.25rem;
      `;
    case 'normal':
    default:
      return `
        padding-left: 0.5rem; // px-2
        padding-right: 0.5rem; // px-2
        padding-top: 0.5rem; // py-2
        padding-bottom: 0.5rem; // py-2

        @media (min-width: 768px) {
          padding-top: 0.75rem; // md:py-3
          padding-bottom: 0.75rem; // md:py-3
        }
      `;
  }
};

const Container = styled.div`
  input,
  .StripeElement {
    border-width: 1px;
    ${(props) => colorClasses(props.dark)}
    ${(props) => inputClasses(props.variant)}
  }
`;

const PaymentMethodForm = ({
  label,
  labelColor,
  variant,
  onSubmit,
  submitLoading,
  dark,
  className,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const style = {
    invalid: {
      // text-cream/70 & text-cc-black/70
      color: dark ? hexToRgb(theme.colors.cream, '0.7') : hexToRgb(theme.colors['cc-black'], '0.7'),
    },
    base: {
      fontSize: '16px',
      // text-cream/70 & text-cc-black/70
      color: dark ? hexToRgb(theme.colors.cream, '0.7') : hexToRgb(theme.colors['cc-black'], '0.7'),
      ':focus': {
        // text-cream & text-cc-black
        color: dark ? theme.colors.cream : theme.colors['cc-black'],
      },
      '::placeholder': {
        // text-gray-400/50 & text-gray-400
        color: dark ? hexToRgb(theme.colors.gray['400'], '0.5') : theme.colors.gray['400'],
      },
    },
  };

  return (
    <Container variant={variant} dark={dark} className={className}>
      {label && (
        <Label color={labelColor} forInput>
          {label}
        </Label>
      )}
      <div className="mb-2">
        <CardNumberElement options={{ style }} />
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <CardExpiryElement options={{ style }} />
        </div>
        <div className="w-full">
          <CardCvcElement options={{ style }} />
        </div>
      </div>
      {onSubmit && (
        <Button
          variant={dark ? 'outline-white' : 'outline-black'}
          onClick={() => onSubmit(stripe, elements.getElement('cardNumber'))}
          loading={submitLoading}
          className="mt-6"
        >
          Submit
        </Button>
      )}
    </Container>
  );
};

PaymentMethodForm.defaultProps = {
  label: null,
  labelColor: null,
  variant: 'normal',
  onSubmit: null,
  submitLoading: false,
  dark: false,
  className: '',
};

PaymentMethodForm.propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  variant: PropTypes.oneOf(['normal', 'expanded']),
  onSubmit: PropTypes.func,
  submitLoading: PropTypes.bool,
  dark: PropTypes.bool,
  className: PropTypes.string,
};

export default PaymentMethodForm;
