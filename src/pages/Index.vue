<template>
  <q-page class="bg-light-blue window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Speech to Text</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="user.username" type="text" label="usuario" />
              <q-input square filled clearable v-model="user.password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-blue-7" size="lg" class="full-width" label="Login" @click="login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">2021 Icolabora</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
// import Cookies from '../helpers/Cookies'
import AuthService from '../services/Auth'
// import Operation from '../helpers/Operation'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      emptyUsername: false,
      emptyPass: false,
      isLogging: false
    }
  },
  methods: {
    login () {
      this.isLogging = true
      // let typeOffer = ''
      if (this.usernameFilled() && this.passwordFilled()) {
        // const formData = new FormData()
        // formData.append('username', this.user.username)
        // formData.append('password', this.user.password)
        // console.log('formData em index ', formData)
        // AuthService.login(formData).then(res => {
        AuthService.login(this.user).then(res => {
          console.log('res ', res)
          // if (res.data.success === true) {
          // Ao fazer login, define o cookie com os dados do usuário e redireciona para a tela de ofertas.
          // Cookies.set('__userInfo', JSON.stringify(res.data.userInfo), 7)
          // this.$store.commit('setUser', res.data.userInfo)
          console.log('Fez login')
          this.$router.push({ name: 'uso' })
          // } else {
          //   console.log('não logou')
          //   this.isLogging = false
          // }
        }, err => {
          console.error(err.toString())
          console.log('Não fez login')
          this.isLogging = false
        })
      } else {
        this.isLogging = false
      }
    },

    // Valida o usuário
    usernameFilled () {
      if (!this.user.username) {
        this.emptyUsername = true
        return false
      } else {
        this.emptyUsername = false
        return true
      }
    },

    // Valida a senha
    passwordFilled () {
      if (!this.user.password) {
        this.emptyPass = true
        return false
      } else {
        this.emptyPass = false
        return true
      }
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
