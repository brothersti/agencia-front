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
                    <label>Id trayecto</label>
                    <input v-model="trayecto.IdTrayecto" type="text" class="form-control" placeholder="Id del trayecto" readonly>
                </div>
                <div class="mb-2">
                    <label>Nombre trayecto</label>
                    <input v-model="trayecto.NombreTrayecto" type="text" class="form-control" placeholder="Nombre trayecto">
                </div>
                <div class="mb-2">
                    <label>Horario</label>
                    <Datepicker v-model="trayecto.Horario" locale="es-MX"></Datepicker>
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="ActualizarDatos()" class="btn btn-outline-success">Actualizar</button>
                    <router-link to="/trayecto" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</router-link>
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
            nombre: "Editar trayecto",
            descripcion: "Aqui se podrá editar un trayecto",
            errorMessage: '',
            id: this.$route.params.trayectoId,
            IdTrayecto: null,
            NombreTrayecto: null,
            Horario: null,
            trayecto: {},
            errors: []
        };
    },
    created: async function () {

        var res = await axios
            .get(`http://127.0.0.1:8000/api/trayectos/${this.id}`)

        this.trayecto = res.data.trayecto;
        console.log(this.id)
    },
    methods: {
        async ActualizarDatos() {
            this.errors = [];

            if (!this.trayecto.NombreTrayecto) {
                this.errors.push('El número del bus es obligatorio.');
            }
            if (!this.trayecto.Horario) {
                this.errors.push('El campo total asiento es obligatorio.');
            }

            var trayectoJson = {
                NombreTrayecto: this.trayecto.NombreTrayecto,
                Horario: this.trayecto.Horario
            };

            if (this.errors.length <= 0) {

                const trayectoRes = await axios.put(`http://127.0.0.1:8000/api/trayectos/${this.id}`, trayectoJson)
                    .then((response) => (this.trayectoRes = response.data));

                Swal.fire('Guardado', 'Entrada actualizada con éxito', 'success')
                this.$router.push('/trayecto');
            }
        }
    },
};
</script>

<style lang="">

</style>
