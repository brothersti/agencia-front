<template lang="es-MX">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-3">
    <router-link to="/bus/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Nuevo</router-link>
</div>
<table class="table container mt-3" v-if="buses">
    <thead>
        <tr>
            <th scope="col">Bus Id</th>
            <th scope="col">Número bus</th>
            <th scope="col">Total asientos</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody v-for="bus in buses" :key="bus.IdBus">
        <tr>
            <td>{{bus.IdBus}}</td>
            <td>{{bus.NumeroBus}}</td>
            <td>{{bus.TotalAsientos}}</td>
            <td>
                <router-link :to="`/bus/edit/${bus.IdBus}`" class="btn btn-warning"><i class="fa fa-pen"></i></router-link>
                <button v-on:click="handleClickDelete(bus.IdBus)" class="btn btn-danger" style="margin-left: 2px;"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
    </tbody>
</table>
<div class=" mt-5 container" v-else>
      <p>No hay información</p>
    </div>
</template>

<script>

import axios from "axios";
import ModulesHeader from "../../components/ModulesHeader.vue";
import Swal from "sweetalert2";


export default {
    name: "BusManager",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Bus manager",
            descripcion: "Aqui se podrá realizar acciones necesaria sobre el módulo de bus",
            loading: false,
            errorMessage: null,
            buses: [],
        };
    },
    methods: {
        getAllBuses() {
            try {
                const buses = axios
                    .get("http://127.0.0.1:8000/api/buses/")
                    .then((response) => (this.buses = response.data.buses));
            } catch (error) {
                this.errorMessage = error
            }
        },       
        handleClickDelete: async function (IdBus) {
            const { isConfirmed } = await Swal.fire({
                title: "¿Seguro qieres borrar la información?",
                text: "Una vez borrado, no se puede recuperar",
                showDenyButton: true,
                confirmButtonText: "Si, seguro",
            });
            if (isConfirmed) {
                new Swal({
                    title: "Espere por favor",
                    allowOutsideClick: false,
                });
                Swal.showLoading();
                axios
                    .delete(`http://127.0.0.1:8000/api/buses/${IdBus}`)
                    .then((response) => {
                        console.log(response);
                    });
                Swal.fire("Eliminado", "", "success");
                window.location.reload();
            }
        },
    },
    created() {
        this.getAllBuses();
    },
};
</script>

<style lang="es-MX">
</style>
