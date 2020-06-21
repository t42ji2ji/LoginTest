<template lang="pug">
  #app
    Login(@changLoginState="changLoginState")
    .note 
      h3 isLogin: {{loginState}}
      h3 email：admin@gmail.com 密碼：admin
</template>

<script>
import Login from './components/Login';

export default {
  data() {
    return {
      loginState: false,
    };
  },
  methods: {
    changLoginState(payload) {
      console.log('object');
      this.loginState = payload;
    },
  },
  name: 'App',
  components: {
    Login,
  },
};
</script>

<style lang="scss">
.note {
  position: absolute;
  bottom: 5%;
}
html,
body {
  margin: 0;
  background: rgb(245, 245, 245);
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
