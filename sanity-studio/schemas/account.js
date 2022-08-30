export default {
    name: 'account',
    title: 'Account',
    type: 'document',
    fields: [
      {
        name: 'providerType',
        title: 'Provider Type',
        type: 'string'
      },
      {
        name: 'providerId',
        title: 'Provider Id',
        type: 'string'
      },
      {
        name: 'providerAccountId',
        title: 'Provider Account Id',
        type: 'string'
      },
      {
        name: 'refreshToken',
        title: 'Refresh Token',
        type: 'string'
      },
      {
        name: 'accessToken',
        title: 'Access Token',
        type: 'string'
      },
      {
        name: 'accessTokenExpires',
        title: 'Access Token Expires',
        type: 'string'
      },
      {
        name: 'user',
        title: 'User',
        type: 'reference',
        to: { type: 'user' }
      }
    ]
  };