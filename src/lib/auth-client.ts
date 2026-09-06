'use client';

import { polarClient } from '@polar-sh/better-auth/client';
import {
  adminClient,
  emailOTPClient,
  twoFactorClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    emailOTPClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = '/2fa';
      },
    }),
    polarClient(),
  ],
});
