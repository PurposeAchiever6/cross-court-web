export const identify = email => {
  window._learnq.push([
    'identify',
    {
      $email: email,
    },
  ]);
};

export const startedCheckout = product => {
  window._learnq.push([
    'track',
    'Started Checkout',
    {
      ProductName: product.name,
      ProductPrice: product.price,
    },
  ]);
};
