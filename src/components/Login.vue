<template lang="pug">
  #login-page
    .face-icon
      h1 Log in
      //- img(src="https://source.unsplash.com/200x200/?logo")
    form.form-style(@submit.prevent)
      .input-group
        label(for="account" ) email
        input#account(@focus="focusInput($event, true)" @focusout="focusInput($event, false)" v-model="account" placeholder="your email" ref="account" :class="{'focus-input-error': accountHasError}")
        label.hint(for="account" v-if="accountHasError") {{accErrMsg}}

      .input-group
        label(for="password") password
        input#password(@focus="focusInput($event, true)" @focusout="focusInput($event, false)" v-model="password" placeholder="your password" :class="{'focus-input-error': passwordHasError}" type="password") 
        label.hint(for="password" v-if="passwordHasError") {{pawErrMsg}}
      
      button.btn(@click="login" :class="{'btnlock':isbtnBlock}" type='submit') Log in
      .hint(v-if="loginHasError") {{loginErrMsg}}

      <Hr/>
      .bubble-group
        .bubble(@click="socialLogin('fb')" :class="{'btnlock':isbtnBlock}") Facebook 
        .bubble(@click="socialLogin('tw')" :class="{'btnlock':isbtnBlock}") Twitter
        .bubble(@click="socialLogin('gg')" :class="{'btnlock':isbtnBlock}") Google

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      account: '',
      password: '',
      accountHasError: false,
      passwordHasError: false,
      loginHasError: false,
      loginErrMsg: 'Account or password is not correct',
      accErrMsg: '',
      pawErrMsg: '',
      isbtnBlock: false,
    };
  },
  mounted() {},
  methods: {
    changLoginState() {
      this.$emit('changLoginState', true);
    },
    focusInput(self, isfocus) {
      if (isfocus) {
        self.target.parentNode.classList.add('focus-input');
      } else {
        self.target.parentNode.classList.remove('focus-input');
      }
    },
    login() {
      if (this.isbtnBlock) {
        return;
      }
      this.isbtnBlock = true;
      this.resetValidate();
      if (this.validateLogin()) {
        axios
          .post('/api/addGoods', {
            account: this.account,
            password: this.password,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 200) {
              console.log('login');
              this.changLoginState();
            } else {
              console.log('fail');
              this.loginHasError = true;
              this.loginErrMsg = 'Account or password not correct';
            }
            this.isbtnBlock = false;
          });
      } else {
        this.isbtnBlock = false;
      }
    },
    resetValidate() {
      this.accountHasError = false;
      this.loginHasError = false;
      this.passwordHasError = false;
    },
    validateLogin() {
      let pwValid = true;
      let acValid = true;
      if (this.account === '') {
        this.accountHasError = true;
        this.accErrMsg = 'email cant be empty';
        acValid = false;
      } else if (!this.validateEmail(this.account)) {
        this.accountHasError = true;
        this.accErrMsg = 'please enter valid email ';
        acValid = false;
      }
      if (this.password === '') {
        this.passwordHasError = true;
        this.pawErrMsg = 'password cant be empty';
        pwValid = false;
      }
      if (acValid == false || pwValid == false) {
        return false;
      } else {
        return true;
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    socialLogin(name) {
      this.isbtnBlock = false;
      if (this.isbtnBlock) {
        return;
      }
      switch (name) {
        case 'fb':
          break;
        case 'tw':
          break;
        case 'gg':
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: rgb(47, 180, 98);
$alert-color: rgba(241, 67, 67, 0.623);
$facebook-color: #3b5998;
$google-color: white;
$twitter-color: #1da1f2;

hr {
  margin: 2rem 1rem;
  border: 0.5px solid rgb(238, 238, 238);
}
input,
button,
submit {
  border: none;
}

#login-page {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 12px 12px 20px rgb(214, 214, 214);
  width: 88vw;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  .form-style {
    width: 100%;
  }
  .face-icon {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.input-group {
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
  text-align: left;
  position: relative;
  transition: 0.4s;

  &::after {
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    background-color: $primary-color;
    bottom: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s;
  }

  input {
    background: transparent;
    border: none;
    padding-top: 0.7rem;
    position: relative;
    margin: 1rem 0rem;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }
}

.hint {
  margin: 0.5rem 0rem;
  color: $alert-color;
  font-size: 0.9rem;
}
.focus-input {
  color: $primary-color;
  &::after {
    transform: scaleX(1);
  }
}
.focus-input-error {
  border: 1px solid $alert-color !important;
}

.btn {
  width: 96%;
  padding: 0.8rem 2rem;
  background-color: $primary-color;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    filter: brightness(1.1);
  }
}
.btnlock {
  background: rgb(143, 143, 143);
}

.bubble-group {
  display: flex;
  font-weight: bold;
  .bubble {
    cursor: pointer;
    flex: 1;
    background: red;
    padding: 10px 10px;
    margin: 0rem 0.8rem;
    border-radius: 10px;
    transition: 0.3s;
    &:nth-child(1) {
      background: $facebook-color;
      color: white;
    }
    &:nth-child(2) {
      background: $twitter-color;
      color: white;
    }
    &:nth-child(3) {
      background: $google-color;
      color: black;
      border: 2px solid rgb(90, 90, 90);
    }
    &:hover {
      transform: translateY(-0.5rem);
      filter: brightness(1.1);
    }
  }
}
</style>
