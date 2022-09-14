export const notify = {
	state() {
		return {
			notify: {
				visible: false,
				message: ''
			}
		}
	},
	mutations: {
		updateNotify(state, notify) {
			state.notify = notify

			setTimeout(() => {
				state.notify.visible = false;
				state.notify.message = ''

			}, 4000);
		}
	},
	namespaced: true
}