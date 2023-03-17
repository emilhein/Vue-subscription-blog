<template>
  <h1>Your trying to read post {{ $route.params.id }}</h1>
  <h3>{{ article.body }}</h3>
  <Checkout v-if="article.body === 'Not subscribed'" />
</template>

<script>
import Checkout from './Checkout';

export default {
  name: 'BlogPost',
  components: { Checkout },
  data() {
    return {
      article: {
        id: null,
        body: '',
      },
    };
  },
  async mounted() {
    let article = await fetch(
      'https://subscription-server.herokuapp.com/post/' + this.$route.params.id,
      {
        headers: {
          'Content-Type': 'application/json',
          customerId: this.getCookie('customerId'),
        },
      }
    );
    let serialized = await article.json();
    this.article = serialized;
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
};
</script>

<style></style>
