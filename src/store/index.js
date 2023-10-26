import Vue from "vue";
import Vuex from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import router from "../router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error.code);
        return;
      }

      commit("SET_USER", auth.currentUser);
      router.push("/");
    },
    async register(details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("cadastro realizado com sucesso");
      } catch (error) {
        console.log(error.code);
        return;
      }
    },
    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");
      router.push("/login");
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", user);

          if (router.currentRoute.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
});

export { store };
