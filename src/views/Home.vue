<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>Wellcome home.</p>
    <p><button @click="dialog">dialog</button></p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import CustomDialog from '../components/CustomDialog.vue'
export default {
  name: 'Home',
  methods: {
    dialog () {
      this.$dialog.registerComponent('CustomDialog', CustomDialog)
      this.$dialog.alert('Here is dialog plugin.', {
        view: 'CustomDialog'
      })
    }
  }
}
</script>
