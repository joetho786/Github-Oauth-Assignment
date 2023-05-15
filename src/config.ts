// get from env file
import * as dotenv from 'dotenv';
dotenv.config();

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_OAUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user%20repo%20public_repo`;
export const GITHUB_API_URL = 'https://api.github.com';
export const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

export const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';
