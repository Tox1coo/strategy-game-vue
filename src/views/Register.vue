<template>
  <div class="auth">
    <form @submit.prevent="registerUser()" class="auth__form">
      <h2 class="subtitle subtitle_auth">Sign Up</h2>

      <div class="auth__input">
        <MyInput
          :placeholderInput="'Введите ваш Никнейм'"
          :inputId="'name'"
          :error="{
            errorStatus: v$.name.$error || false,
            errorMessage: errorInputs.name,
          }"
          v-model.trim="name"
        ></MyInput>

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
            errorStatus:
              v$.password.$error ||
              password.match(/[а-яА-Я]/) !== null ||
              false,
            errorMessage: errorInputs.password,
          }"
          v-model.trim="password"
        ></MyInput>
        <MyInput
          :typeInput="'password'"
          :placeholderInput="'Подтвердите ваш пароль'"
          :inputId="'confirmPassword'"
          :error="{
            errorStatus: v$.confirmPassword.$error || false,
            errorMessage: errorInputs.confirmPassword,
          }"
          v-model.trim="confirmPassword"
        ></MyInput>
      </div>
      <div class="auth__btns">
        <MyButton class="btn_auth">Зарегестрироваться</MyButton>
        <span
          >Если у вас уже есть аккаунт:
          <a @click="$router.push('/login')">Войти</a>
        </span>
      </div>
      <span v-if="error" class="auth__error">{{ errorForm }}</span>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import { messages } from "@/utils/messages";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      v$: useVuelidate(),
      password: "",
      email: "",
      name: "",
      confirmPassword: "",
      errorInputs: {
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
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
      name: { required, minLength: minLength(4) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAs: sameAs(this.password) },
    };
  },
  methods: {
    ...mapActions({
      getRegisterUser: "user/getRegisterUser",
    }),
    async registerUser() {
      if (this.password.match(/[а-яА-Я]/) === null) {
        this.errorForm = "";
        const isFormCorrect = await this.v$.$validate();
        if (isFormCorrect) {
          this.getRegisterUser({
            email: this.email,
            password: this.password,
            name: this.name,
          }).then(() => {
            this.errorForm = messages[this.errorMessage];
            if (!this.errorForm) this.$router.push("/");
          });
        }
        if (this.v$.email.$error)
          this.errorInputs.email = messages[this.v$.email.$errors[0].$message];
        else if (this.v$.password.$error)
          this.errorInputs.password =
            messages[this.v$.password.$errors[0]?.$message] ||
            messages["russian-word-in-passowrd"];
        else if (this.v$.name.$error)
          this.errorInputs.name = messages[this.v$.name.$errors[0].$message];
        else if (this.v$.confirmPassword.$error)
          this.errorInputs.confirmPassword =
            messages[this.v$.confirmPassword.$errors[0].$message];
      } else {
        this.errorInputs.password = messages["russian-word-in-passowrd"];
      }
    },
  },
};
</script>

<style></style>
