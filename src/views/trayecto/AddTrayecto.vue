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
                    <input v-model="NombreTrayecto" type="text" class="form-control" placeholder="Nombre del trayecto">
                </div>
                <div class="mb-2">
                   <Datepicker v-model="Horario" placeholder="Selecciona un horario" locale="es-MX"></Datepicker>
                </div>

                <div class="mb-2">
                    <button type="button" v-on:click="GuardarDatos()" class="btn btn-outline-success">Guardar</button>
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
    name: "AddTrayecto",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Agregar nuevo trayecto",
            descripcion: "Aqui se podrá dar de alta un nuevo trayecto",
            errorMessage: '',
            NombreTrayecto: null,
            Horario: null,
            errors: []
        };
    },
    methods: {
        async GuardarDatos() {
            try {
                this.errors = [];

                if (!this.NombreTrayecto) {
                    this.errors.push('El nombre del trayecto es obligatorio.');
                }
                if (!this.Horario && this.Horario < Date.now) {
                    this.errors.push('El campo Horario es obligatorio, y debe ser mayor o igual a la fecha actual.');
                }

                var trayecto = {
                    NombreTrayecto: this.NombreTrayecto,
                    Horario: this.Horario
                };

                if (this.errors.length <= 0) {

                    const trayectoRes = await axios.post(`http://127.0.0.1:8000/api/trayectos/`, trayecto)
                        .then((response) => {
                            (this.trayectoRes = response.data)
                            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
                            this.$router.push('/trayecto');
                        })
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
