<template lang="es-MX">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-3">
    <router-link to="/pasajero/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Nuevo</router-link>
</div>
<table class="table container mt-3" v-if="pasajeros">
    <thead>
        <tr>
            <th scope="col">Pasajero Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Asiento</th>
            <th scope="col">Id bus</th>
            <th scope="col">Id Trayecto</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody v-for="pasajero in pasajeros" :key="pasajero.PasajeroId">
        <tr>
            <td>{{pasajero.IdPasajero}}</td>
            <td>{{pasajero.Nombre}}</td>
            <td>{{pasajero.Asiento}}</td>
            <td>{{pasajero.IdBus_id}}</td>
            <td>{{pasajero.IdTrayecto_id}}</td>
            <td>
                <router-link :to="`/pasajero/edit/${pasajero.IdPasajero}`" class="btn btn-warning"><i class="fa fa-pen"></i></router-link>
                <button v-on:click="handleClickDelete(pasajero.IdPasajero)" class="btn btn-danger" style="margin-left: 2px;"><i class="fa fa-trash"></i></button>
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
    name: "PasajeroManager",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Pasajero manager",
            descripcion: "Aqui se podrá realizar acciones necesaria sobre el módulo Pasajero",
            loading: false,
            errorMessage: null,
            pasajeros: [],
        };
    },
    methods: {
        getAllPasajeros() {
            try {
                const pasajeros = axios
                    .get("http://127.0.0.1:8000/api/pasajeros/")
                    .then((response) => (this.pasajeros = response.data.pasajeros));
            } catch (error) {
                this.errorMessage = error
            }
        },
        handleClickDelete: async function (IdPasajero) {
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
                    .delete(`http://127.0.0.1:8000/api/pasajeros/${IdPasajero}`)
                    .then((response) => {
                        console.log(response);
                    });
                Swal.fire("Eliminado", "", "success");
                window.location.reload();
            }
        },
    },
    created() {
        this.getAllPasajeros();
    },
};
</script>

<style lang="es-MX">
</style>
