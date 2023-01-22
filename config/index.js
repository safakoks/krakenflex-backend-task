import dotenv from 'dotenv';

dotenv.config();

export default {
  apiKey: process.env.API_KEY,
  serviceUrl: process.env.SERVICE_URL,
  limitDate: process.env.LIMIT_DATE,
  specificSiteId: process.env.SPECIFIC_SITE_ID,
  retryAttemps: Number(process.env.RETRY_ATTEMPS),
  retryInterval: Number(process.env.RETRY_INTERVAL),
};
