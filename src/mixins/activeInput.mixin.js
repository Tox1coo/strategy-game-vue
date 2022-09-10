export const activeInputMixin = {
	props: {
		inputId: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			activeInput: false
		}
	},
	mounted() {
		console.log(this.$refs.input);
		this.$refs.input.addEventListener('focus', () => {
			this.activeInput = true
		})
		this.$refs.input.addEventListener('blur', () => {
			if (!this.modelValue) {
				this.activeInput = false
			}
		})

		/* window.addEventListener("click", function (e) {
			if (!e.target.localName != "input" && then.activeInput === true && this.inputId === e.target.dataset.input && then.modelValue === '') {
				then.activeInput = false;
			}
		}); */
	}
}