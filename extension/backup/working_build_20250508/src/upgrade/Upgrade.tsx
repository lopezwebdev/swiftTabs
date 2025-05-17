import React from 'react';
import { Check, Star } from 'lucide-react';
import { SUBSCRIPTION_PRICES } from '../utils/subscription';

const Upgrade: React.FC = () => {
  const handleSubscribe = (plan: 'monthly' | 'yearly' | 'lifetime') => {
    // Here you would integrate with your payment processor
    // For now, we'll just show an alert
    alert(`Selected ${plan} plan at $${SUBSCRIPTION_PRICES[plan]}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upgrade to SwiftTabs Premium
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Get access to all premium features and enhance your browsing experience
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {/* Monthly Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Monthly</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for trying out premium features</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">${SUBSCRIPTION_PRICES.monthly}</span>
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('monthly')}
                className="mt-8 block w-full bg-blue-500 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-600"
              >
                Subscribe Monthly
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Floating Tab Windows</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Workspace Save/Restore</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Cross-device Sync</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Yearly</h3>
              <p className="mt-4 text-sm text-gray-500">Best value for long-term users</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">${SUBSCRIPTION_PRICES.yearly}</span>
                <span className="text-base font-medium text-gray-500">/year</span>
              </p>
              <button
                onClick={() => handleSubscribe('yearly')}
                className="mt-8 block w-full bg-blue-500 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-600"
              >
                Subscribe Yearly
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">All Monthly Features</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Save 17% vs Monthly</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Priority Support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Lifetime</h3>
              <p className="mt-4 text-sm text-gray-500">One-time payment, lifetime access</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">${SUBSCRIPTION_PRICES.lifetime}</span>
                <span className="text-base font-medium text-gray-500"> one-time</span>
              </p>
              <button
                onClick={() => handleSubscribe('lifetime')}
                className="mt-8 block w-full bg-blue-500 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-600"
              >
                Get Lifetime Access
              </button>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-sm font-medium text-gray-900 tracking-wide">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">All Premium Features</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Lifetime Updates</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">VIP Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade; 