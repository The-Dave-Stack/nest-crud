export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
  },
});

export const getEnvFilePath = () => {
  const nodeEnv = process.env.NODE_ENV;
  if (nodeEnv && nodeEnv !== 'development') {
    return `.env.${nodeEnv}`;
  }
  return '.env';
};
