<template>
  <div class="hello">
    <h1>The post is {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
};
</script>

<style scoped></style>
