export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  },
  verification: {
    url: process.env.VERIFICATION_URL || 'http://localhost:3000/badges/verify/',
  },
});
