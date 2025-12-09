import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, CreditCard, Calendar, Users, Loader } from 'lucide-react'
import { getMySubscription, getAllSubscriptionPlans } from '@/services/api.services'

const Plan = () => {
  // Fetch current subscription
  const { data: currentSubData, isLoading: currentSubLoading, error: currentSubError } = useQuery({
    queryKey: ['mySubscription'],
    queryFn: getMySubscription,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Fetch all subscription plans
  const { data: allPlansData, isLoading: allPlansLoading, error: allPlansError } = useQuery({
    queryKey: ['allSubscriptionPlans'],
    queryFn: getAllSubscriptionPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(dateString))
    } catch (error) {
      return dateString
    }
  }

  const currentPlanId = currentSubData?.data?.subscription?.planId
  const currentPlan = currentSubData?.data?.subscription
  const allPlans = allPlansData?.data || []

  // Map API response to component format
  const transformedPlans = allPlans.map((plan) => ({
    id: plan.planId,
    name: plan.name,
    price: `₹${plan.price.current}`,
    period: `per ${plan.interval}`,
    description: plan.description,
    features: Object.entries(plan.features)
      .filter(([key, value]) => value === true || (typeof value === 'object' && value.description))
      .map(([key]) => {
        // Convert camelCase to readable text
        return key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .trim()
      }),
    buttonText: currentPlanId === plan.planId ? 'Current Plan' : 'Upgrade to ' + plan.name,
    popular: plan.isPopular,
    bestValue: plan.isBestValue,
    current: currentPlanId === plan.planId,
    originalPrice: plan.price.original,
    discount: plan.price.original - plan.price.current,
  }))

  if (currentSubLoading || allPlansLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (currentSubError || allPlansError) {
    return (
      <div className="p-6">
        <Card className="border-red-600 bg-red-50 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">
              Error loading subscription plans. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

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
      {currentPlan && (
        <Card className="border-purple-600 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <div>
                  <CardTitle className="text-xl">
                    Current Plan: {currentPlan.planName}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {currentSubData?.data?.plan?.name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{currentSubData?.data?.plan?.price?.current}
                </div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Valid until: {formatDate(currentPlan.validUntil)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {currentPlan.autoRenewal ? 'Auto-renewal enabled' : 'Auto-renewal disabled'}
                </span>
              </div>
              <Badge className="bg-green-600 text-white">
                {currentPlan.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {transformedPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${
              plan.popular ? 'border-2 border-purple-600 shadow-lg' : 'border border-slate-200 dark:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            {plan.bestValue && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-600 text-white px-3 py-1">
                  Best Value
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
              {plan.discount > 0 && (
                <div className="text-sm text-green-600 font-semibold">
                  Save ₹{plan.discount}
                </div>
              )}
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.slice(0, 7).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {plan.features.length > 7 && (
                  <li className="text-sm text-purple-600 font-semibold">
                    +{plan.features.length - 7} more features
                  </li>
                )}
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
      {/* <Card>
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
      </Card> */}
    </div>
  )
}

export default Plan