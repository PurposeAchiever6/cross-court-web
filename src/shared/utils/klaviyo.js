export const identify = (email) => {
  window._learnq.push([
    'identify',
    {
      $email: email,
    },
  ]);
};

export const startedCheckout = (product, redirectTo) => {
  window._learnq.push([
    'track',
    'Started Checkout',
    {
      productName: product.name,
      productPrice: product.price,
      redirectTo,
    },
  ]);
};
