<template lang="">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-5">
    <div class="row">
        <div class="col-md-4">
            <AddBusModal :isActive="isActive" />
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
                    <input v-model="Asiento" type="text" class="form-control" placeholder="Asiento">
                </div>
                <div class="mb-2">
                    <div class="input-group">
                        <select v-model="IdBus_id" class="form-control">
                            <option value="">Selecciona un bus</option>
                            <option :value="bus.IdBus" v-for="bus in buses" :key="bus.IdBus">{{bus.NumeroBus}}</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-success" type="button" v-on:click="agregarBus()"> <i class="fa fa-plus"></i> </button>
                        </div>
                    </div>                  
                </div>
                <div class="mb-2">
                    <div class="input-group">
                        <select v-model="IdTrayecto_id" class="form-control">
                            <option value="">Selecciona un trayecto</option>
                            <option :value="trayecto.IdTrayecto" v-for="trayecto in trayectos" :key="trayecto.IdTrayecto">{{trayecto.NombreTrayecto}}</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-success" type="button" v-on:click="mostrarModalTrayecto()"> <i class="fa fa-plus"></i> </button>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="GuardarDatos()" class="btn btn-outline-success">Guardar</button>
                    <router-link to="/pasajero" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</router-link>
                </div>
            </form>
        </div>
        <div class="col-md-4">
            <AddTrayectoModal :isActiveModalTrayecto="isActiveModalTrayecto" />
        </div>
    </div>
</div>
</template>

<script>
import ModulesHeader from "../../components/ModulesHeader.vue";
import AddBusModal from "../../components/AddBusModal.vue";
import AddTrayectoModal from '../../components/AddTrayectoModal'

import axios from "axios";
import Swal from 'sweetalert2';

export default {
    name: "AddPasajero",
    components: {
        ModulesHeader,
        AddBusModal,
        AddTrayectoModal
    },
    data() {
        return {
            nombre: "Agregar nuevo pasajero",
            descripcion: "Aqui se podrá dar de alta un nuevo pasajero",
            errorMessage: '',
            isActive: false,
            isActiveModalTrayecto: false,
            IdTrayecto_id: null,
            NombreTrayecto: null,
            Horario: null,
            IdBus_id: null,
            Nombre: null,
            Asiento: null,
            IdBus: null,
            IdTrayecto: null,
            errors: [],
            buses: [],
            trayectos: []
        };
    },
    methods: {
        getAllBuses() {
            try {
                const busesRes = axios
                    .get("http://127.0.0.1:8000/api/buses/")
                    .then((response) => (this.buses = response.data.buses))
                    .then((res) => console.log(res));


            } catch (error) {
                this.errorMessage = error
            }
        },
        getAllTrayectos() {
            try {
                const trayectos = axios
                    .get("http://127.0.0.1:8000/api/trayectos/")
                    .then((response) => (this.trayectos = response.data.trayectos));
            } catch (error) {
                this.errorMessage = error
            }
        },
        async GuardarDatos() {
            try {
                this.errors = [];

                if (!this.Nombre) {
                    this.errors.push('El nombre del pasajero es obligatorio.');
                }
                if (!this.Asiento) {
                    this.errors.push('El campo asiento es obligatorio.');
                }
                if (!this.IdBus_id) {
                    this.errors.push('El campo id bus es obligatorio.');
                }
                if (!this.IdTrayecto_id) {
                    this.errors.push('El campo id Trayecto es obligatorio.');
                }

                var pasajero = {
                    Nombre: this.Nombre,
                    Asiento: this.Asiento,
                    IdBus_id: this.IdBus_id,
                    IdTrayecto_id: this.IdTrayecto_id
                };

                if (this.errors.length <= 0) {

                    const pasajeroRes = await axios.post(`http://127.0.0.1:8000/api/pasajeros/`, pasajero)
                        .then((response) => {
                            (this.pasajeroRes = response.data)
                            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
                            this.$router.push('/pasajero');
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
        },
        agregarBus() {
            this.isActive = !this.isActive
            console.log(this.isActive)
        },
        async guardarBus() {
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
            }
        },
         async mostrarModalTrayecto() {
            this.isActiveModalTrayecto = !this.isActiveModalTrayecto
            console.log(this.isActiveModalTrayecto)
        },
         async AgregarTrayecto() {
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
    created() {
        this.getAllBuses()
        this.getAllTrayectos()
    }
};
</script>

<style lang="">
</style>
