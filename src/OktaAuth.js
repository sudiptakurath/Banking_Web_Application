import { OktaAuth } from '@okta/okta-react';

export default oktaAuth = new OktaAuth({
    issuer: 'https://dev-75829336.okta.com/oauth2/default',
    clientId: '0oaa7te4ujpuv9OVV5d7',
    redirectUri: window.location.origin + '/implicit/callback',
    pkce: true
});
