import { checkout, polar, portal, webhooks } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin, emailOTP, twoFactor } from 'better-auth/plugins';
import { getDb } from '@/db';
import * as schema from '@/db/schema';
import {
  sendAppEmail,
  twoFactorEmailHtml,
  verificationEmailHtml,
} from '@/lib/email';

function polarPlugin() {
  const token = process.env.POLAR_ACCESS_TOKEN;
  if (!token) return [];

  const polarClient = new Polar({
    accessToken: token,
    server:
      process.env.POLAR_SERVER === 'production' ? 'production' : 'sandbox',
  });

  return [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          successUrl: '/checkout/exito?checkout_id={CHECKOUT_ID}',
          authenticatedUsersOnly: false,
        }),
        portal(),
        ...(process.env.POLAR_WEBHOOK_SECRET
          ? [
              webhooks({
                secret: process.env.POLAR_WEBHOOK_SECRET,
                onOrderPaid: async () => undefined,
              }),
            ]
          : []),
      ],
    }),
  ];
}

function createAuth() {
  return betterAuth({
    appName: 'Eólicos Gallego',
    baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), {
      provider: 'pg',
      schema,
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 10,
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendAppEmail({
          to: user.email,
          subject: 'Verifica tu correo — Eólicos Gallego',
          html: verificationEmailHtml(user.name, url),
        });
      },
    },
    user: {
      additionalFields: {
        role: {
          type: 'string',
          defaultValue: 'customer',
          input: false,
        },
      },
    },
    plugins: [
      admin({
        defaultRole: 'customer',
        adminRoles: ['admin'],
      }),
      emailOTP({
        otpLength: 6,
        expiresIn: 300,
        sendVerificationOnSignUp: true,
        async sendVerificationOTP({ email, otp, type }) {
          await sendAppEmail({
            to: email,
            subject:
              type === 'sign-in'
                ? 'Código de acceso — Eólicos Gallego'
                : 'Código de verificación — Eólicos Gallego',
            html: twoFactorEmailHtml(otp),
          });
        },
      }),
      twoFactor({
        issuer: 'Eólicos Gallego',
        otpOptions: {
          async sendOTP({ user, otp }) {
            await sendAppEmail({
              to: user.email,
              subject: 'Código 2FA — Eólicos Gallego',
              html: twoFactorEmailHtml(otp),
            });
          },
        },
      }),
      ...polarPlugin(),
      nextCookies(),
    ],
    trustedOrigins: [
      process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
      'http://localhost:3000',
    ],
  });
}

let _auth: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}
