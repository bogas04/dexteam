const AUTH_URL = `https://accounts.google.com/o/oauth2/auth`;
const response_type = 'token';
const client_id = `1064189879937-6vgmin66evo08gojd3ru9l0voc862vrs.apps.googleusercontent.com`;
const scope = [
  'https://www.googleapis.com/auth/fitness.activity.read',
  'https://www.googleapis.com/auth/fitness.body.read',
  'https://www.googleapis.com/auth/fitness.location.read',
  'https://www.googleapis.com/auth/fitness.nutrition.read',
].join(' ');

const redirect_uri = window.location.href.replace(/\/$/, '');

const params = {
  client_id,
  response_type,
  scope,
  redirect_uri,
};

export const objectToParams = params =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

export const OAUTH_URL = `${AUTH_URL}?${objectToParams(params)}`;

export const authenticate = () => {
  location.href = OAUTH_URL;
};

export const getTokenFromURL = () =>
  location.hash
    // remove #
    .slice(1)
    .split('&')
    // In case there's no hash
    .filter(e => e !== '')
    // get [key, value]
    .map(e => e.split('='))
    .reduce((o, [key, value]) => ({ ...o, [key]: value }), {});

export const isAuthenticated = () => {
  const access_token = localStorage.getItem('access_token');
  const expires_in = localStorage.getItem('expires_in');

  // Check localStorage
  if (access_token !== null) {
    return {
      access_token,
      expires_in,
    };
  } else {
    // Check URL (in case of redirect)
    const data = getTokenFromURL();
    location.hash = '';

    if (data.access_token !== undefined) {
      Object.entries(data).map(([k, v]) => localStorage.setItem(k, v));
      return data;
    }
  }
};

export const callAPI = (
  url,
  { body, headers, ...options },
  transform = r => r.json()
) => {
  const { access_token } = isAuthenticated();

  if (access_token === undefined) {
    return Promise.reject('Error! No access_token.');
  }

  return fetch(url, {
    ...options,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  }).then(transform);
};
