<template lang="es-MX">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-3">
    <router-link to="/chofer/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Nuevo</router-link>
</div>
<table class="table container mt-3" v-if="choferes">
    <thead>
        <tr>
            <th scope="col">Chofer Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Id bus</th>
            <th scope="col">Id Trayecto</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody v-for="chofer in choferes" :key="chofer.IdChofer">
        <tr>
            <td>{{chofer.IdChofer}}</td>
            <td>{{chofer.Nombre}}</td>
            <td>{{chofer.Apellido}}</td>
            <td>{{chofer.IdBus_id}}</td>
            <td>{{chofer.IdTrayecto_id}}</td>
            <td>
                <router-link :to="`/chofer/edit/${chofer.IdChofer}`" class="btn btn-warning"><i class="fa fa-pen"></i></router-link>
                <button v-on:click="handleClickDelete(chofer.IdChofer)" class="btn btn-danger" style="margin-left: 2px;"><i class="fa fa-trash"></i></button>
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
    name: "ChoferManager",
    components: {
        ModulesHeader,
    },
    data() {
        return {
            nombre: "Chofer manager",
            descripcion: "Aqui se podrá realizar acciones necesaria sobre el módulo Chofer",
            loading: false,
            errorMessage: null,
            choferes: [],
        };
    },
    methods: {
        getAllChoferes() {
            try {
                const choferes = axios
                    .get("http://127.0.0.1:8000/api/choferes/")
                    .then((response) => (this.choferes = response.data.choferes));
            } catch (error) {
                this.errorMessage = error
            }
        },       
        handleClickDelete: async function (IdChofer) {
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
                    .delete(`http://127.0.0.1:8000/api/choferes/${IdChofer}`)
                    .then((response) => {
                        console.log(response);
                    });
                Swal.fire("Eliminado", "", "success");
                window.location.reload();
            }
        },
    },
    created() {
        this.getAllChoferes();
    },
};
</script>

<style lang="es-MX">
</style>
