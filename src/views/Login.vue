<template>
  <div class="view-login">
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="user.name" placeholder="username" /><br>
      <input type="password" v-model="user.password" placeholder="password" /><br>
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      localStorage.token = window.btoa(JSON.stringify(this.user))
      this.$router.push(this.$route.query.redirect)
    }
  }
}
</script>
