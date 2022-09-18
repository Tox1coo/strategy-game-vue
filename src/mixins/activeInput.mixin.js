export const activeInputMixin = {
  props: {
    inputId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeInput: false,
    };
  },
  mounted() {
    this.$refs.input.addEventListener("focus", () => {
      this.activeInput = true;
    });
    this.$refs.input.addEventListener("blur", () => {
      if (!this.modelValue) {
        this.activeInput = false;
      }
    });
  },
};
