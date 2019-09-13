<template>
  <div>
    <h3>{{title}}</h3>
    <h2>{{value}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String
  }
}

</script>

<style scoped>
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
}
h3{
    font-weight: normal;
    font-size: 1em;
}
h2,h3{
    margin: 0;
}
</style>
