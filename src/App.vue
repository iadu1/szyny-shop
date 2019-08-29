<template>
  <div id="app">
    <div class="left-sidebar">
      <Cart />
    </div>

    <div class="right-sidebar">
      <router-view />
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart.vue";

export default {
  name: "app",
  components: {
    Cart
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display:block;
  margin: 30px auto;
  position: relative;
  width: 100%;
  text-align: left;
  max-width: 1200px;
}

.label {
  display: block;
  float: left;
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}

button {
  display: block;
  float:left;
  position: relative;
  padding: 15px 30px;
  background: #166cae;
  color:#fff;
  border: 0;
  cursor: pointer;
  margin-top: 50px;
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
}

button:hover {
  background: #0b5c99;
}
</style>
