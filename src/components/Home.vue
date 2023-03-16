<template>
  <div class="description">
    <Subscribed v-show="userSubscribed" />
    <Snippet
      v-for="story in stories"
      :key="story.id"
      :title="story.title"
      :id="story.id"
      :img="story.img"
    />
  </div>
  <!-- <div class="description">
    <h3>{{ userSubscribed }}</h3>
  </div>
  <section>
    <h3>{{ customerId }}</h3>
  </section> -->

  <Checkout v-show="!userSubscribed" />
</template>

<script>
import Checkout from './Checkout';
import Snippet from './display/PostSnippet';
import Subscribed from './display/Subscribed';
import { loadStripe } from '@stripe/stripe-js';

export default {
  components: { Checkout, Snippet, Subscribed },
  async mounted() {
    this.customerId = this.getCookie('customerId');

    this.$nextTick(() => {
      console.log(this.getCookie('customerId'));
    });
    const stripe = await loadStripe(
      'pk_test_51MlUlIIfSGgugy8a3BP9NeyNrH5lOQRcVJDJuQedLzpSZoLZMUo0HwwBv0RlEUAUqPOck2hCdqK09k2dng5HmitX00nOyQ6wMV'
    );

    // console.log(stripe);
    // const customer = await stripe.customers.retrieve('cus_NWiFORBHIfOqEy');
    let stories = await fetch(
      'https://subscription-server.herokuapp.com/posts'
    );
    let serialized = await stories.json();
    this.stories = serialized;
  },
  data() {
    return {
      stories: [],
      customerId: null,
    };
  },
  methods: {
    getCookie(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
  },
  computed: {
    userSubscribed() {
      return Boolean(this.customerId);
    },
  },
};
</script>
<style>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #242d60; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Helvetica Neue', 'Ubuntu', sans-serif;
  height: 100vh;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
section {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 112px;
  border-radius: 6px;
  justify-content: space-between;
}
.product {
  display: flex;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
p {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #242d60;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
img {
  border-radius: 6px;
  margin: 10px;
  width: 54px;
  height: 57px;
}
h3,
h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #242d60;
  margin: 0;
}
h5 {
  opacity: 0.5;
}
button {
  height: 36px;
  background: #556cd6;
  color: white;
  width: 100%;
  font-size: 14px;
  border: 0;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.6;
  border-radius: 0 0 6px 6px;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
}
button:hover {
  opacity: 0.8;
}
</style>
