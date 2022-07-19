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
                    <label>Id pasajero</label>
                    <input v-model="pasajero.IdPasajero" type="text" class="form-control" placeholder="Id del pasajero" readonly>
                </div>
                <div class="mb-2">
                    <label>Nombre</label>
                    <input v-model="pasajero.Nombre" type="text" class="form-control" placeholder="Nombre">
                </div>
                <div class="mb-2">
                    <label>Asiento</label>
                    <input v-model="pasajero.Asiento" type="text" class="form-control" placeholder="Asiento">
                </div>
                <div class="mb-2">
                    <label>Id bus</label>
                    <input v-model="pasajero.IdBus_id" type="number" class="form-control" placeholder="Id del bus">
                </div>
                <div class="mb-2">
                    <label>Id trayecto</label>
                    <input v-model="pasajero.IdTrayecto_id" type="number" class="form-control" placeholder="Id del trayecto">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="ActualizarDatos()" class="btn btn-outline-success">Actualizar</button>
                    <router-link to="/pasajero" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</router-link>
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
    name: "EditPasajero",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Editar Pasajero",
            descripcion: "Aqui se podrá editar un pasajero",
            errorMessage: '',
            id: this.$route.params.pasajeroId,
            Nombre: null,
            Asiento: null,
            IdBus: null,
            IdTrayecto: null,
            pasajero: {},
            errors: []
        };
    },
    created: async function () {

        var res = await axios
            .get(`http://127.0.0.1:8000/api/pasajeros/${this.id}`);

        this.pasajero = res.data.pasajero;
    },
    methods: {
        async ActualizarDatos() {
            this.errors = [];

            if (!this.pasajero.Nombre) {
                this.errors.push('El nombre del pasajero es obligatorio.');
            }
            if (!this.pasajero.Asiento) {
                this.errors.push('El campo asiento es obligatorio.');
            }
            if (!this.pasajero.IdBus) {
                this.errors.push('El campo id bus es obligatorio.');
            }
            if (!this.pasajero.IdTrayecto) {
                this.errors.push('El campo id Trayecto es obligatorio.');
            }

            var pasajeroJson = {
                Nombre: this.pasajero.Nombre,
                Asiento: this.pasajero.Asiento,
                IdBus: this.pasajero.IdBus,
                IdTrayecto: this.pasajero.IdTrayecto
            };

            if (this.errors.length <= 0) {

                const pasajeroRes = await axios.put(`http://127.0.0.1:8000/api/pasajeros/${this.id}`, pasajeroJson)
                    .then((response) => (this.pasajeroRes = response.data))
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.status);
                            if (error.response.status == 500) {
                                Swal.fire('Error', 'Entrada no registrada', 'error')
                            }
                        } else if (error.request) {
                            console.log(error.request);
                            Swal.fire('Error', 'Entrada no registrada', 'error')
                        } else {
                            console.log('Error', error.message);
                            Swal.fire('Error', 'Entrada no registrada', 'error')
                        }
                        console.log(error.config);
                    });

                Swal.fire('Guardado', 'Entrada actualizada con éxito', 'success')
                this.$router.push('/pasajero');
            }
        }
    },
};
</script>

<style lang="">

</style>
