<template lang="">
   <div class="container mt-3">
  <p class="h3 text-success fw-bold">{{nombre}}</p>    
  <p class="fst-italic">{{descripcion}}</p>
  <hr/>
</div>
</template>

<script>
export default {
  props: {
    nombre: String,
    descripcion: String,
  },
  name: "ModulesHeader",
};
</script>


<style lang="">
</style>