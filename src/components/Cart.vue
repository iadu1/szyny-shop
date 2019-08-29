<template>
  <div>
    <div class="label">Koszyk: <div class="overall">Razem: {{ Math.round(sum * 100) / 100 }} zł</div></div>
    <div class="cart">
      <div class="cart--products">
        <div class="cart--box">
          <div class="cart--empty" v-if="cart.length === 0">
            Koszyk jest pusty
          </div>
          <div class="cart--product" v-else v-for="(product, index) in cart" :key="index">
            {{ product.name }} ({{product.price}} zł) <div class="cart--remove" @click="removeElement(product.id, product.price)" style="float:right"><font-awesome-icon icon="trash" /></div>
          </div>
        </div>
        
        <button v-if="cart.length !== 0" @click="clearCart()">Wyczyść</button>
        <button class="cart--order" v-if="cart.length !== 0" @click="createOrder()">Zamów</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "cart",
  computed: {
    cart() {
      return store.state.cart;
    },
    sum() {
      return store.state.sum;
    },
  },
  methods: {
    clearCart() {
      store.commit('clearCart');
    },
    removeElement(id, price) {
      store.commit('removeElement', { id, price });
    },
    createOrder(){
      console.log("Nowe zamówienie");
    }
  }
};
</script>
<style scoped>
.cart {
  display: block;
  width: 100%;
  position: relative;
  border: 1px solid #cacaca;
  box-sizing:border-box;
  padding: 30px;
  min-height: 100px;
  float: left;
}

.cart button {
  margin-top: 20px;
  width: 50%;
}

.cart--empty {
  display: block;
  width: 100%;
  float:left;
  position:relative;
  line-height:100px;
  height:100px;
  text-align:center;
  color: #cccccc;
}

.cart--order {
  background: #079000;
  border-left: 1px solid #fff;
  box-sizing: border-box;
}

.overall {
  float:right;
}

.cart--box {
  display: block;
  float: left;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
}

.cart--clear-cart {
  display: block;
  float: right;
  position: relative;
  cursor: pointer;
}

.cart--product {
  display: block;
  float: left;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background: #f0f0f0;
  color: #000;
  margin-bottom: 1px;
}

.cart--product:last-of-type {
  margin-bottom: 0;
}

.cart--remove {
  cursor: pointer;
  opacity: 0.3;
}

.cart--remove:hover {
  opacity: 1;
}

.cart--product-count {
  display:inline-block;
  width: 20px;
  margin-right: 10px;
  color: #2fda7f;
  font-weight: 500;
  text-align: center;
}
</style>
