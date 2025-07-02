import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Check, 
  Star,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { pricingPlans } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Billing: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<string>('starter');
  const [billingHistory, setBillingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const { profile } = useAuth();

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      // Fetch subscription data
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('organization_id', profile?.organization_id)
        .single();

      if (subscription) {
        setCurrentPlan(subscription.plan);
      }

      // Mock billing history
      setBillingHistory([
        {
          id: 1,
          date: '2024-03-01',
          amount: 149,
          plan: 'Professional',
          status: 'paid',
          invoice: 'INV-2024-001'
        },
        {
          id: 2,
          date: '2024-02-01',
          amount: 149,
          plan: 'Professional',
          status: 'paid',
          invoice: 'INV-2024-002'
        },
        {
          id: 3,
          date: '2024-01-01',
          amount: 49,
          plan: 'Starter',
          status: 'paid',
          invoice: 'INV-2024-003'
        }
      ]);
    } catch (error) {
      console.error('Error fetching billing data:', error);
    }
  };

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      // In a real app, you'd integrate with Stripe here
      // For demo purposes, we'll just update the local state
      
      // Create checkout session with Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: pricingPlans.find(p => p.id === planId)?.stripePriceId,
          customerId: profile?.id
        }),
      });

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentPlanData = pricingPlans.find(plan => plan.id === currentPlan);
  const usageStats = {
    users: 12,
    maxUsers: currentPlanData?.id === 'starter' ? 5 : currentPlanData?.id === 'professional' ? 25 : 999,
    frameworks: 3,
    maxFrameworks: currentPlanData?.id === 'starter' ? 2 : 999,
    documents: 45,
    storage: '2.3 GB',
    maxStorage: '10 GB'
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing & Subscription</h1>
        <p className="text-slate-600">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Current Plan</h2>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-blue-600">
                {currentPlanData?.name}
              </span>
              <span className="text-slate-600">
                ${currentPlanData?.price}/month
              </span>
              {currentPlanData?.popular && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Team Members</span>
              <span className="text-xs text-slate-500">
                {usageStats.users}/{usageStats.maxUsers === 999 ? '∞' : usageStats.maxUsers}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min((usageStats.users / usageStats.maxUsers) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Frameworks</span>
              <span className="text-xs text-slate-500">
                {usageStats.frameworks}/{usageStats.maxFrameworks === 999 ? '∞' : usageStats.maxFrameworks}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((usageStats.frameworks / usageStats.maxFrameworks) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Storage</span>
              <span className="text-xs text-slate-500">{usageStats.storage}/{usageStats.maxStorage}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl border border-slate-200 mb-8">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Billing History</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Download All</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Date</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Plan</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-slate-900">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-900">
                        {new Date(bill.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-900">{bill.plan}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">${bill.amount}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {bill.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      {bill.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Choose Your Plan</h2>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-xl p-6 relative ${
                      plan.popular 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-slate-900">${plan.price}</span>
                        <span className="text-slate-600">/{plan.interval}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={loading || plan.id === currentPlan}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        plan.id === currentPlan
                          ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                          : plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      {plan.id === currentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;