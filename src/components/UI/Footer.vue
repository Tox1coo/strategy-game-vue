<template>
	<footer class="footer">
		<div class="footer__inner">
			<div class="nav__item" v-for="(linkItem, index) in linksInfo" :key="index">
				<a :href="linkItem.link" target="_blank">{{ linkItem.text }}</a>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			linksInfo: [
				{
					text: 'Скачать лицезионное соглашение.',
					link: 'https://disk.yandex.ru/i/W_r3fgmcBw6fkA',
				},
				{
					text: 'Скачать техническое задание.',
					link: 'https://disk.yandex.ru/i/gCQgMsC7xfJ9zA',
				},
				{
					text: 'Скачать руководства пользователя.',
					link: 'https://disk.yandex.ru/i/gCQgMsC7xfJ9zA',
				},
				{
					text: 'Ссылка на GitHub репозиторий.',
					link: 'https://github.com/Tox1coo/strategy-game-vue'
				}
			]
		}
	},
	methods: {
		forceFileDownload(response) {
			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', 'file.png') //or any other extension
			document.body.appendChild(link)
			link.click()
		},

		dowload() {
			this.$http({
				method: 'get',
				url: this.url,
				responseType: 'arraybuffer'
			})
				.then(response => {
					this.forceFileDownload(response)
				})
				.catch(() => console.log('error occured'))
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.footer {
	@include background;
	min-height: 60px;
	display: flex;

	&__inner {
		width: 100%;
		margin: auto 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		a {
			color: $primary-brown-nav;
		}
	}
}
</style>