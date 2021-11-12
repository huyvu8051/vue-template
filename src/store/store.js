import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	plugins: [
		createPersistedState()
	],
	state: {
		token: null,
		username: null,
		isUserLoggedIn: false,
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUsername(state, username) {
			state.username = username
		},
		setUserLogin(state, isUserLoggedIn) {
			state.isUserLoggedIn = isUserLoggedIn
		}
	},
	actions: {
		setToken({ commit }, token) {
			commit('setToken', token)
		},
		setUsername({ commit }, username) {
			commit('setUsername', username)
		},
		setUserLogin({ commit }, isLogin) {
			commit('setUserLogin', isLogin)
		}
	}
})