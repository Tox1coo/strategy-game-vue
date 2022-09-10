<template>
  <div class="input">
    <input
      ref="input"
      :data-input="inputId"
      :type="typeInput"
      @input="$emit('update:modelValue', $event.target.value)"
      @click="activeInput = true"
    />
    <span :class="{ 'input-span__active': activeInput }" class="input-span">
      {{ placeholderInput }}</span
    >
  </div>
  <Transition name="error"
    ><span v-if="error.errorStatus" id="error">{{
      error.errorMessage
    }}</span></Transition
  >
</template>

<script>
import { activeInputMixin } from "@/mixins/activeInput.mixin.js";
export default {
  inheritAttrs: false,
  name: "MyInput",
  props: {
    placeholderInput: {
      type: String,
      default: "Введите...",
    },
    typeInput: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    error: {
      type: Object,
      default: () => {
        return { errorStatus: false, errorMessage: "" };
      },
    },
  },
  mixins: [activeInputMixin],
  watch: {
    modelValue(value) {
      if (!value) {
        this.activeInput = false;
      } else if (!this.activeInput && value) {
        this.activeInput = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#error {
  display: inline-block;
  color: $error-color;
  font-size: 1.7rem;
  height: 0;
  margin-top: 5px;
  padding-bottom: 10px;
}
</style>