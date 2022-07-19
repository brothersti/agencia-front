<template lang="">
<!--  -->
<div>
    <teleport to="#destination" :disabled="isActive">
        <div v-show="isActive">
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
                    <input v-model="Capacidad" type="number" class="form-control" placeholder="Total de asientos">
                </div>
                <div class="mb-2">
                    <button type="button" v-on:click="GuardarDatos()" class="btn btn-outline-success">Guardar</button>
                    <button type="button" v-on:click="Cancelar()" class="btn btn-outline-danger" style="margin-left:3px;">Cancelar</button>
                </div>
            </form>
        </div>
    </teleport>
</div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
    props: {
        isActive: Boolean
    },
    data() {
        return {
            errorMessage: '',
            NumeroBus: null,
            Capacidad: 10,
            AsientoRestantes:0,
            errors: []
        };
    },
    methods: {       
        async GuardarDatos() {
            this.errors = [];

            if (!this.NumeroBus) {
                this.errors.push('El número del bus es obligatorio.');
            }
            if (!this.Capacidad) {
                this.errors.push('El campo total asiento es obligatorio.');
            }

            var bus = {
                NumeroBus: this.NumeroBus,
                Capacidad: this.Capacidad,
                AsientoRestantes: 0
            };

            if (this.errors.length <= 0) {

                const busRes = await axios.post(`http://127.0.0.1:8000/api/buses/`, bus)
                    .then((response) => (this.busRes = response.data));

                console.log(busRes)
                Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
                window.location.reload()
            }
        },
        Cancelar(){
           window.location.reload()
        }
    },
}
</script>

<style>

</style>
