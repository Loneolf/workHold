const state = () => ({
	num: 0,
});

const getters = {
	evenOrOdd: (state) => {
		return state.num % 2 === 0 ? "偶数" : "奇数";
	},
};

const actions = {
	addNumAsync({ commit }) {
		setTimeout(() => {
			commit("addnum");
		}, 2000);
	},
	addnum({ commit }) {
		commit("addnum");
	},
	minus({ commit }) {
		commit("minus");
	},
	setNum({ commit }, num) {
		commit("setNum", { num });
	},
};

// mutations
const mutations = {
	addnum(state) {
		state.num += 1;
	},

	minus(state) {
		state.num -= 1;
	},

	setNum(state, { num }) {
		state.num = num;
	},
};

export default {
	// namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
