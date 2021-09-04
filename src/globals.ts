const localhostBackendBaseUrl = 'http://localhost:3134';
const localhostFrontendBaseUrl = 'http://localhost:3034';

export const Globals = {
  clientHomePageUrl:
    process.env.CLIENT_HOME_PAGE_URL || localhostFrontendBaseUrl,
  twitter: {
    apiKey: process.env.EA_TWITTER_API_KEY || '',
    apiSecretKey: process.env.EA_TWITTER_API_SECRET_KEY || '',
    apiBearerToken: process.env.EA_TWITTER_API_BEARER_TOKEN || '',
    callbackUrl: process.env.EA_TWITTER_CALLBACK_URL || localhostBackendBaseUrl
  }
};
