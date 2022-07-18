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
                    <input v-model="Nombre" type="text" class="form-control" placeholder="Nombre">
                </div>
                <div class="mb-2">
                    <input v-model="Apellido" type="text" class="form-control" placeholder="Aplelido">
                </div>
                <div class="mb-2">
                    <input v-model="IdBus" type="number" class="form-control" placeholder="Id del bus">
                </div>
                <div class="mb-2">
                    <input v-model="IdTrayecto" type="number" class="form-control" placeholder="Id del trayecto">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="GuardarDatos()" class="btn btn-outline-success">Guardar</button>
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
    name: "AddChofer",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Agregar nuevo chofer",
            descripcion: "Aqui se podrá dar de alta un nuevo chofer",
            errorMessage: '',
            Nombre: null,
            Apellido: null,
            IdBus: null,
            IdTrayecto: null,
            errors: []
        };
    },
    methods: {
        async GuardarDatos() {
            try {
                this.errors = [];

                if (!this.Nombre) {
                    this.errors.push('El nombre del chofer es obligatorio.');
                }
                if (!this.Apellido) {
                    this.errors.push('El campo apellido es obligatorio.');
                }
                if (!this.IdBus) {
                    this.errors.push('El campo id bus es obligatorio.');
                }
                if (!this.IdTrayecto) {
                    this.errors.push('El campo id Trayecto es obligatorio.');
                }

                var chofer = {
                    Nombre: this.Nombre,
                    Apellido: this.Apellido,
                    IdBus: this.IdBus,
                    IdTrayecto: this.IdTrayecto
                };

                if (this.errors.length <= 0) {

                    const choferRes = await axios.post(`http://127.0.0.1:8000/api/choferes/`, chofer)
                        .then((response) => {
                            (this.choferRes = response.data)
                            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
                            this.$router.push('/chofer');
                        })
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
                }

            } catch (error) {
                this.errorMessage = error
                console.log(this.errorMessage)
            }
        }
    },
};
</script>

<style lang="">
</style>
