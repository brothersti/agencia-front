<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
    <a class="navbar-brand" style="margin-left:10px;">Agency<i class="fa fa-bus m-2 fa-1x"></i></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li >
          <router-link class="btn btn-outline-success" to="/">Home</router-link>
        </li>
        <li>
          <router-link class="btn btn-outline-success" to="/bus">Bus módulo</router-link>
        </li>
        <li >
          <router-link class="btn btn-outline-success" to="/chofer">Chofer módulo</router-link>
        </li>
         <li>
          <router-link class="btn btn-outline-success" to="/pasajero">Pasajero módulo</router-link>
        </li>
         <li >
          <router-link class="btn btn-outline-success" to="/trayecto">Trayecto módulo</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
