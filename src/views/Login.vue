<template>
  <div class="auth">
    <form @submit.prevent="loginUser()" class="auth__form">
      <h2 class="subtitle subtitle_auth">Sign in</h2>

      <div class="auth__input">
        <MyInput
          :typeInput="'email'"
          :placeholderInput="'Введите ваш емайл'"
          :inputId="'email'"
          :error="{
            errorStatus: v$.email.$error || false,
            errorMessage: errorInputs.email,
          }"
          v-model.trim="email"
        ></MyInput>
        <MyInput
          :typeInput="'password'"
          :placeholderInput="'Введите ваш пароль'"
          :inputId="'password'"
          :error="{
            errorStatus: v$.password.$error || false,
            errorMessage: errorInputs.password,
          }"
          v-model.trim="password"
        ></MyInput>
      </div>
      <div class="auth__btns">
        <MyButton class="btn_auth">Войти в аккаунт</MyButton>
        <span
          >Если у вас нет аккаунта:
          <a @click="$router.push('/register')">Зарегестрироваться</a>
        </span>
      </div>
      <span v-if="error" class="auth__error">{{ errorForm }}</span>
    </form>
  </div>
</template>

<script>
/*  eslint-disable no-unused-vars */
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { messages } from "@/utils/messages";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      v$: useVuelidate(),
      password: "",
      email: "",
      errorInputs: {
        email: "",
        password: "",
      },
      errorForm: "",
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.user.error,
      errorMessage: (state) => state.user.errorMessage,
    }),
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  methods: {
    ...mapActions({
      getLoginUser: "user/getLoginUser",
    }),
    async loginUser() {
      this.errorForm = "";
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.getLoginUser({ email: this.email, password: this.password }).then(
          () => {
            this.errorForm = messages[this.errorMessage];
            if (!this.errorForm) this.$router.push("/");
          }
        );
      }
      if (this.v$.email.$error)
        this.errorInputs.email = messages[this.v$.email.$errors[0].$message];
      else if (this.v$.password.$error)
        this.errorInputs.password =
          messages[this.v$.password.$errors[0].$message];
    },
  },
};
</script>

<style lang="scss"></style>
