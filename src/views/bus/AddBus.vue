<template lang="">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
        </div>
        <div class="col-md-4">
            <form>
                <p v-if="errors.length">
                    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
                    <ul>
                        <li class="text-danger" v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
                <div class="mb-2">
                    <input v-model="NumeroBus" type="text" class="form-control" placeholder="Número del bus">
                </div>
                <div class="mb-2">
                    <input v-model="TotalAsientos" type="number" class="form-control" placeholder="Total de asientos">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="GuardarDatos()" class="btn btn-outline-success">Guardar</button>
                    <router-link to="/bus" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</router-link>
                </div>
            </form>
        </div>
        <div class="col-md-4"></div>
    </div>
</div>
</template>

<script>
import ModulesHeader from "../../components/ModulesHeader.vue";
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    name: "AddBus",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Agregar nuevo bus",
            descripcion: "Aqui se podrá dar de alta un nuevo bus",
            errorMessage: '',
            NumeroBus: null,
            TotalAsientos: 10,
            errors: []
        };
    },
    methods: {
        async GuardarDatos() {
            this.errors = [];

            if (!this.NumeroBus) {
                this.errors.push('El número del bus es obligatorio.');
            }
            if (!this.TotalAsientos) {
                this.errors.push('El campo total asiento es obligatorio.');
            }

            var bus = {
                NumeroBus: this.NumeroBus,
                TotalAsientos: this.TotalAsientos
            };

            if (this.errors.length <= 0) {

                const busRes = await axios.post(`http://127.0.0.1:8000/api/buses/`, bus)
                    .then((response) => (this.busRes = response.data));

                console.log(busRes)
                Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
                this.$router.push('/bus');
            }
        }
    },
};
</script>

<style lang="">
</style>
