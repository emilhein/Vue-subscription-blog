<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="subscription"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <button @click="submit">Subscribe!</button>
  </div>
</template>

<script>
// :sessionId="sessionId"
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data() {
    return {
      publishableKey:
        'pk_test_51MlUlIIfSGgugy8a3BP9NeyNrH5lOQRcVJDJuQedLzpSZoLZMUo0HwwBv0RlEUAUqPOck2hCdqK09k2dng5HmitX00nOyQ6wMV',
      loading: false,
      sessionId: '',
      lineItems: [
        {
          price: 'price_1MlekDIfSGgugy8aCCvtVhmX', // The id of the recurring price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      // successURL: window.location.origin + '/success',
      successURL:
        'https://subscription-server.herokuapp.com/subscription/success?session_id={CHECKOUT_SESSION_ID}',
      cancelURL: window.location.origin + '/cancel',
    };
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>
