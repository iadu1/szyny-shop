<template>
  <div class="calculator">
      <img class="product-image" :src="products[product].image"/>

      <div class="label">Produkt:</div>
      <select @change="calculatePrice()" v-model="product">
        <option selected value="0">Szyna natynkowa</option>
        <option value="1">Szyna podtynkowa</option>
      </select>

      <div class="label">Ilość torów:</div>
      <select @change="calculatePrice()" v-model="multiplier">
        <option selected :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
      </select>

      <div class="label">Rodzaj agrafki:</div>
      <select @change="calculatePrice()" v-model="pinSinglePrice">
        <option selected :value="0.153">x-ślizg z agrafką</option>
        <option :value="0.456">klik ślizg z agrafką</option>
        <option :value="1.616">x-ślizg z obrtową klamerką</option>
        <option :value="0.139">ślizg z uchwytem</option>
        <option :value="1.02">wave system co 6</option>
        <option :value="1.26">wave system co 8</option>
        <option :value="0">Bez agrafek</option>
      </select>
      
      <div class="label">Odległość między agrafkami:</div>
      <select @change="calculatePrice()" v-model="distance">
        <option selected :value="10">10 cm</option>
        <option :value="8">8 cm</option>
        <option :value="6">6 cm</option>
      </select>
      
      <div class="label">Długość szyny (cm):</div>
      <div class="range-calc">
        <range-slider
          class="slider"
          min="100"
          max="600"
          step="1"
          v-model="length">
        </range-slider><br/>
        <input @change="calculatePrice()" type="text" v-model="length"/>
      </div>
      <div style="clear:both"></div>
      <table class="calculation">
        <tr>
          <th>Szyna (cm)</th>
          <th>Uchwyty</th>
          <th>Agrafki</th>
          <th>Cena</th>
        </tr>
        <tr v-for="(n, i) in multiplier" :key="i">
          <td>{{ length }}</td>
          <td>{{ handles }}</td>
          <td>{{ pin }}</td>
          <td>{{ overallPrice }}</td>
        </tr>
      </table>

      <!-- <div class="label">Dostawa:</div>
      <select @change="calculatePrice()" v-model="shipping">
        <option selected value="0">Kurier (do 250 cm)</option>
        <option value="1">Kurier (do 400 cm)</option>
        <option value="2">Odbiór osobisty</option>
      </select> -->

      <div class="overall-price">
        <span style="color:#000">Razem:</span> {{ singleOrderPrice }} zł brutto
      </div>
      <button @click="addProuductToCart()">Dodaj do koszyka</button>
    </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import store from "../store";

export default {
  name: "Calculator",
  components: {
    RangeSlider
  },
  props: {
    msg: String
  },
  data() {
    return {
      products: [{
        name: "Szyna natynkowa",
        image: "http://szynysufitowe.pl/wp-content/uploads/2019/03/szyna_na.png",
      },
      {
        name: "Szyna podtynkowa",
        image: "http://szynysufitowe.pl/wp-content/uploads/2019/03/szyna_pod.png",
      }],
      product: 0,
      multiplier: 1,
      length: 100,
      handles: 0,
      price: 0,
      pin: 0,
      pinPrice: 0,
      pinSinglePrice: 0.153,
      overallPrice: 0,
      singleOrderPrice: 0,
      distance: 10,
      order: {},
    }
  },
  computed: {
    cart() {
      return store.state.cart;
    },
  },
  watch: {
    length: function() {
      this.calculatePrice();
    },
  },
  methods: {
    updateOrder(name, price, quantity, length, id) {
      this.order = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        length: length,
      };
    },
    calculatePrice() {

      this.handles = Math.round((this.length + 10) / 35);
      if(this.pinSinglePrice != 0) {
        this.pin = Math.ceil(this.length / this.distance);
      } else {
        this.pin = 0;
      }
      this.pinPrice = this.pin * this.pinSinglePrice;
      this.price = (this.length * 0.2037) * 1.23;
      this.overallPrice = Math.round((this.price + this.pinPrice) * 100) / 100;
      this.singleOrderPrice = Math.round((this.overallPrice * this.multiplier) * 100) / 100;

      let timestamp = new Date().getUTCMilliseconds();

      this.updateOrder(this.products[this.product].name, this.singleOrderPrice, this.multiplier, this.length, timestamp);

    },
    addProuductToCart() {
      store.commit('addProductToCart', this.order);
      this.resetProductData();
    },
    resetProductData() {
      Object.assign(this.$data, this.$options.data());
      this.calculatePrice();
    }
  },
  beforeMount() {
    this.calculatePrice();
  }
};
</script>

<style >
  .calculation {
    display: table;
    position: relative;
    margin:20px auto 50px auto;
    width: 100%;
    text-align:center;
    border-collapse:collapse;
  }

  .calculation td, .calculation th {
    border: 1px solid #cacaca;
    width: 20%;
    padding: 10px;
  }

  .left-sidebar {
    display: block;
    float: left;
    position: relative;
    width: 40%;
    text-align: left;
    min-height: 300px;
    box-sizing: border-box;
    padding-right: 50px;
  }

  .right-sidebar {
    display: block;
    float: right;
    position: relative;
    width: 60%;
    min-height: 300px;
    text-align:left;
  }

  .right-sidebar .product-image {
    width: 350px;
    height: auto;
    position:absolute;
    right:0;
    top:0;
  }

  .range-calc {
    display:block;
    float:left;
    position:relative;
    width: 100%;
  }

  select, input {
    display: block;
    box-sizing: border-box;
    float: left;
    position:relative;
    padding: 10px;
    border: 1px solid #cacaca;
    text-align: left;
    margin:0px auto 30px auto;
    clear: both;
  }

  .range-slider {
    width: calc(100% - 20px);
    margin:10px 0 20px 0;
  }

  .range-slider-fill {
    background-color:#166cae !important;
  }

  .left-sidebar img {
    display: block;
    position: relative;
    width: 70%;
    height: auto;
    margin: 0 auto;
  }

  .overall-price {
    display: block;
    float:left;
    position:relative;
    width: 100%;
    color:#f40000;
    font-size: 25px;
  }
</style>
