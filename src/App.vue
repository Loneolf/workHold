<template>
	<div class="appbox" id="app">
		<!-- <ul class="nav">
      <div> <router-link to="/home">home</router-link> </div>
      <div> <router-link to="/about">About</router-link> </div>
      <div> <router-link to="/jkf10">jkf10</router-link> </div>
    </ul> -->
		<ul class="nav">
			<div @click="routerClick('/home')">home</div>
			<div @click="routerClick('/about')">about</div>
			<div @click="routerClick('/hq')">hq</div>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	data() {
		return {
			params: {
				stockcode: "688328",
				stocktype: "4353",
				stockName: "贵州茅台",
				oldmanP: "120",
			},
			current: "",
		};
	},
	methods: {
		routerClick(path) {
			if (path === this.current) return;
			this.current = path;
			this.$router.push({ path, query: this.params });
		},
	},
};
</script>

<style>
.nav {
	display: flex;
}
.nav > div {
	margin-left: 10px;
}
.appbox {
	color: #2c3e50;
	margin-top: 10px;
	font-size: 14px;
	height: 100%;
}
</style>
