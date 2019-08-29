import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "szynysufitowe"
});

export default new Vuex.Store({
  state: {
    cart: [],
    sum: 0
  },
  mutations: {
    addProductToCart(state, product) {
      state.cart.push(product);

      state.sum = state.sum + product.price;
    },
    clearCart(state) {
      state.cart = [];
      state.sum = 0;
    },
    removeElement(state, { id, price }) {
      state.sum = state.sum - price;

      let filteredCart = state.cart.filter(function(value) {
        return value.id !== id;
      });

      state.cart = filteredCart;
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
});
