const root =
  process.env.NODE_ENV === 'production'
    ? require('./Root.prod').default
    : require('./Root.dev').default;

export default root;
