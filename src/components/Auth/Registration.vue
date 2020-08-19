<template>
  <section class="modal-mask">
    <form @submit.prevent="onSubmit">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              Registration
            </slot>
          </div>
          <div class="modal-body">
            <div :class="{ 'errorWrap': $v.email.$error }">
              <div class="input_wrapper" >
                <label class="form__label" for="email">Email</label>
                <input  
                  :class="{ 'errorInput': $v.email.$error }" 
                  class="form__input" 
                  type="email" 
                  id="email" 
                  placeholder="enter email" 
                  @change="$v.email.$touch" 
                  v-model="email">
              </div>
              <div class="error" v-if="!$v.email.required">Field is required</div>
              <div class="error" v-if="!$v.email.email">Email is not correct</div>
            </div>
            <div :class="{ 'errorWrap': $v.password.$error }">
              <div class="input_wrapper">
                <label class="form__label" for="password" >Password</label>
                <input 
                  :class="{ 'errorInput': $v.password.$error }" 
                  class="form__input" 
                  type="password" 
                  id="password"  
                  placeholder="enter password" 
                  v-model="password"  
                  @change="$v.password.$touch">
              </div>
              <div class="error" v-if="!$v.password.required">Field is required</div>
              <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters.</div>
            </div>
            <div :class="{ 'errorWrap': $v.repeatPassword.$error }">
              <div class="input_wrapper">
                <label class="form__label" for="repeatPassword" >Repeat password</label>
                <input 
                  :class="{ 'errorInput': $v.repeatPassword.$error }" 
                  class="form__input" 
                  type="password" 
                  id="repeatPassword"  
                  placeholder="enter repeat password" 
                  v-model="repeatPassword"  
                  @change="$v.repeatPassword.$touch">
              </div>
              <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" type="submit">
              OK
            </button>
            <span>Do you have account?  <router-link to="/">Enter here</router-link></span>
          </div>
          <span class="errorMsg">{{submitStatus}}</span>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log(this.submitStatus)
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user).then(() => {
          this.$router.push('/task')}).catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}
.modal-wrapper {
  display: flex;
}

.modal-container {
  min-width: 300px;
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-header {
  text-align: left;
}

.modal-body {
  margin: 20px 0 10px 0;
}

.modal-default-button {
  width: 100%;
  justify-content: center;
  margin-bottom: 0.2rem;
}
.error{
  display: none;
  color: $danger;
  font-size: .5rem;
}
.input_wrapper{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label{
    margin-left: 1rem;
  }
  input{
    width: 85%;
  }
}
.errorWrap{
  .error{
    display: block;
  }
  .input_wrapper{
    outline: 1px solid $danger;
  }
}
.errorMsg{
  font-size: .5rem;
  color: $danger;
}
</style>