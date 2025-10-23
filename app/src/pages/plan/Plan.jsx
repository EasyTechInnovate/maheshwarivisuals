import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, CreditCard, Calendar, Users } from 'lucide-react'

const Plan = () => {
  const [currentPlan] = useState('premium')

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29',
      period: 'per year',
      description: 'Perfect for independent artists starting their journey',
      features: [
        '5 releases per month',
        'Basic analytics dashboard',
        'Email support',
        'Standard distribution',
        'Basic royalty tracking'
      ],
      buttonText: 'Upgrade to Basic',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$99',
      period: 'per year',
      description: 'Ideal for growing artists and small labels',
      features: [
        'Unlimited releases',
        'Advanced analytics dashboard',
        'Priority customer support',
        'Playlist pitching service',
        'Custom artist profile',
        'Advanced royalty tracking',
        'Social media integration'
      ],
      buttonText: 'Current Plan',
      popular: true,
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: 'per year',
      description: 'For established labels and music professionals',
      features: [
        'Everything in Premium',
        'Label management tools',
        'Team collaboration features',
        'Custom branding options',
        'API access',
        'Dedicated account manager',
        'White-label solutions',
        'Advanced reporting'
      ],
      buttonText: 'Upgrade to Enterprise',
      popular: false
    }
  ]

  const currentPlanDetails = plans.find(plan => plan.id === currentPlan)

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your music distribution needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Current Plan Summary */}
      {currentPlanDetails && (
        <Card className="border-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <div>
                  <CardTitle className="text-xl">Current Plan: {currentPlanDetails.name}</CardTitle>
                  <p className="text-muted-foreground">{currentPlanDetails.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{currentPlanDetails.price}</div>
                <div className="text-sm text-muted-foreground">{currentPlanDetails.period}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Next billing: Jan 15, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Auto-renewal enabled</span>
              </div>
              <Badge className="bg-green-600 text-white">Active</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? 'border-2 border-purple-600 shadow-lg' : 'border border-slate-200 dark:border-slate-700'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {plan.price}
                <span className="text-base font-normal text-muted-foreground ml-1">
                  {plan.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full mt-6 ${
                  plan.current
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={plan.current}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Can I upgrade or downgrade my plan anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">What happens to my music if I downgrade?</h4>
            <p className="text-sm text-muted-foreground">
              Your existing releases will remain active on all platforms. However, you may have limited access to some advanced features.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
            <p className="text-sm text-muted-foreground">
              We offer a 30-day money-back guarantee for all new subscriptions. Contact support for assistance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Can I cancel my subscription?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your current billing period.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Plan