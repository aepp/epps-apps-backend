// const context = '/api';

export const api = {
  auth: {
    // root: `${context}/auth`,
    root: '/auth',
    twitter: {
      authenticate: '/',
      loginSuccess: '/login/success',
      loginFailed: '/login/failed',
      logout: '/logout',
      redirect: '/redirect'
    }
  }
};
