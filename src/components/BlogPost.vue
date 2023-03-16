<template>
  <div class="hello">
    <h1>The post is {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data() {
    return {
      article: null,
    };
  },
  async mounted() {
    let article = await fetch(
      'https://subscription-server.herokuapp.com/post/' + this.$route.params.id
    );
    let serialized = await article.json();
    this.article = serialized;
  },
};
</script>

<style scoped></style>
