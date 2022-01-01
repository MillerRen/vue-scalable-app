<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Wellcome home.</p>
    <p><button @click="dialog">dialog</button></p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    dialog () {
      this.$dialog.alert('Here is dialog plugin.')
    }
  }
}
</script>
