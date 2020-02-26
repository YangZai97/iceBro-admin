import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
    // permissions: '超级管理员',
    permissions: "普通会员"
};

const getters = {
    permissions: state => state.permissions
};
const mutations = {
    setSuper() {
        this.state.permissions = "超级管理员";
    },
    setVip() {
        this.state.permissions = "二级管理员";
    },
    setUser() {
        this.state.permissions = "普通会员";
    }
};
const actions = {
    setSuper: ({ commit }) => commit("setSuper"),
    setVip: ({ commit }) => commit("setVip"),
    setUser: ({ commit }) => commit("setUser")
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;
