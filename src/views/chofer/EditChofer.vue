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
                    <label>Id chofer</label>
                    <input v-model="chofer.IdChofer" type="text" class="form-control" placeholder="Id del chofer" readonly>
                </div>
                <div class="mb-2">
                    <label>Nombre</label>
                    <input v-model="chofer.Nombre" type="text" class="form-control" placeholder="Nombre">
                </div>
                <div class="mb-2">
                    <label>Apellido</label>
                    <input v-model="chofer.Apellido" type="text" class="form-control" placeholder="Aplelido">
                </div>
                <div class="mb-2">
                    <label>Id bus</label>
                    <input v-model="chofer.IdBus" type="number" class="form-control" placeholder="Id del bus">
                </div>
                <div class="mb-2">
                    <label>Id trayecto</label>
                    <input v-model="chofer.IdTrayecto" type="number" class="form-control" placeholder="Id del trayecto">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="ActualizarDatos()" class="btn btn-outline-success">Actualizar</button>
                    <router-link to="/chofer" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</router-link>
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
            nombre: "Editar chofer",
            descripcion: "Aqui se podrá editar un chofer",
            errorMessage: '',
            id: this.$route.params.choferId,
            Nombre: null,
            Apellido: null,
            IdBus: null,
            IdTrayecto: null,
            chofer: {},
            errors: []
        };
    },
    created: async function () {

        var res = await axios
            .get(`http://127.0.0.1:8000/api/choferes/${this.id}`);

        this.chofer = res.data.chofer;
    },
    methods: {
        async ActualizarDatos() {
            this.errors = [];

            if (!this.chofer.Nombre) {
                this.errors.push('El nombre del chofer es obligatorio.');
            }
            if (!this.chofer.Apellido) {
                this.errors.push('El campo apellido es obligatorio.');
            }
            if (!this.chofer.IdBus) {
                this.errors.push('El campo id bus es obligatorio.');
            }
            if (!this.chofer.IdTrayecto) {
                this.errors.push('El campo id Trayecto es obligatorio.');
            }

            var choferJson = {
                Nombre: this.chofer.Nombre,
                Apellido: this.chofer.Apellido,
                IdBus: this.chofer.IdBus,
                IdTrayecto: this.chofer.IdTrayecto
            };

            if (this.errors.length <= 0) {

                const choferRes = await axios.put(`http://127.0.0.1:8000/api/choferes/${this.id}`, choferJson)
                    .then((response) => (this.choferRes = response.data))
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response.status);
                            if (error.response.status == 500) {
                                Swal.fire('Error', 'Entrada no registrada, el id bus esta duplicado', 'error')
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
                this.$router.push('/chofer');
            }
        }
    },
};
</script>

<style lang="">

</style>
