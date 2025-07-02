import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key');
}

export const stripe = loadStripe(stripePublishableKey);

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    interval: 'month',
    description: 'Perfect for small teams getting started with compliance',
    features: [
      'Up to 5 team members',
      '2 compliance frameworks',
      'Basic document templates',
      'Email support',
      'Monthly compliance reports'
    ],
    stripePriceId: 'price_starter_monthly',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 149,
    interval: 'month',
    description: 'Advanced features for growing organizations',
    features: [
      'Up to 25 team members',
      'All compliance frameworks',
      'Advanced document generator',
      'Automated monitoring',
      'Priority support',
      'Custom integrations',
      'Advanced analytics'
    ],
    stripePriceId: 'price_professional_monthly',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 399,
    interval: 'month',
    description: 'Complete solution for large enterprises',
    features: [
      'Unlimited team members',
      'All compliance frameworks',
      'Custom document templates',
      'Real-time monitoring',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'SSO integration',
      'Custom training'
    ],
    stripePriceId: 'price_enterprise_monthly',
    popular: false
  }
];