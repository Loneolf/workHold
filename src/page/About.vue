<template>
	<div class="about">
		<br />
		<p>about</p>
		<br />
		当前数值: {{ $store.state.count.num }} , 该数值为 {{ evenOrOdd }}.<br />
		<button @click="addnum">+</button><br />
		<button @click="minus">-</button><br />
		<button @click="addNumAsync">addNumAsync</button><br />
		<input v-model="inputValue" />
		<button @click="setNum(Number(inputValue))">setNum</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "About",
	data() {
		return {
			inputValue: 0,
		};
	},
	mounted() {
		console.log(this.$store.state.count.num);
	},
	computed: {
		...mapGetters(["evenOrOdd"]),
	},
	methods: {
		...mapActions(["addnum", "minus", "addNumAsync", "setNum"]),
	},
};
</script>

<style>
.about {
	font-size: 16px;
}
</style>
