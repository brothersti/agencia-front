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
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
                <div class="mb-2">
                    <label>Id bus</label>
                    <input v-model="bus.IdBus" type="text" class="form-control" placeholder="Id del bus" readonly>
                </div>
                <div class="mb-2">
                    <label>Número bus</label>
                    <input v-model="bus.NumeroBus" type="text" class="form-control" placeholder="Número del bus">
                </div>
                <div class="mb-2">
                    <label>Total asientos</label>
                    <input v-model="bus.TotalAsientos" type="number" class="form-control" placeholder="Total de asientos">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="ActualizarDatos()" class="btn btn-outline-success">Actualizar</button>
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
    name: "EditBus",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Editar bus",
            descripcion: "Aqui se podrá editar un bus",
            errorMessage: '',
            id: this.$route.params.busId,
            NumeroBus: null,
            TotalAsientos: null,
            bus: {},
            errors: []
        };
    },
    created: async function () {

        var res = await axios
            .get(`http://127.0.0.1:8000/api/buses/${this.id}`);

        this.bus = res.data.bus;
    },
    methods: {
        async ActualizarDatos() {
            this.errors = [];

            if (!this.bus.NumeroBus) {
                this.errors.push('El número del bus es obligatorio.');
            }
            if (!this.bus.TotalAsientos) {
                this.errors.push('El campo total asiento es obligatorio.');
            }

            var busJson = {
                BusId: this.id,
                NumeroBus: this.bus.NumeroBus,
                TotalAsientos: this.bus.TotalAsientos
            };

            if (this.errors.length <= 0) {

                const busRes = await axios.put(`http://127.0.0.1:8000/api/buses/${this.id}`, busJson)
                    .then((response) => (this.busRes = response.data));

                Swal.fire('Guardado', 'Entrada actualizada con éxito', 'success')
                this.$router.push('/bus');
            }
        }
    },
};
</script>

<style lang="">

</style>
