<template lang="es-MX">
<ModulesHeader :nombre="nombre" :descripcion="descripcion" />
<div class="container mt-3">
    <router-link to="/trayecto/add" class="btn btn-success btn-sm"><i class="fa fa-plus-circle"></i> Nuevo</router-link>
</div>
<table class="table container mt-3" v-if="trayectos">
    <thead>
        <tr>
            <th scope="col">Trayecto Id</th>
            <th scope="col">Nombre trayecto</th>
            <th scope="col">Horario</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody v-for="trayecto in trayectos" :key="trayecto.IdTrayecto">
        <tr>
            <td>{{trayecto.IdTrayecto}}</td>
            <td>{{trayecto.NombreTrayecto}}</td>
            <td>{{trayecto.Horario}}</td>
            <td>
                <router-link :to="`/trayecto/edit/${trayecto.IdTrayecto}`" class="btn btn-warning"><i class="fa fa-pen"></i></router-link>
                <button v-on:click="handleClickDelete(trayecto.IdTrayecto)" class="btn btn-danger" style="margin-left: 2px;"><i class="fa fa-trash"></i></button>
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
            nombre: "Trayecto manager",
            descripcion: "Aqui se podrá realizar acciones necesaria sobre el módulo Trayecto",
            loading: false,
            errorMessage: null,
            trayectos: [],
        };
    },
    methods: {
        getAllTrayectos() {
            try {
                const trayectos = axios
                    .get("http://127.0.0.1:8000/api/trayectos/")
                    .then((response) => (this.trayectos = response.data.trayectos));
            } catch (error) {
                this.errorMessage = error
            }
        },       
        handleClickDelete: async function (IdTrayecto) {
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
                    .delete(`http://127.0.0.1:8000/api/trayectos/${IdTrayecto}`)
                    .then((response) => {
                        console.log(response);
                    });
                Swal.fire("Eliminado", "", "success");
                window.location.reload();
            }
        },
    },
    created() {
        this.getAllTrayectos();
    },
};
</script>

<style lang="es-MX">
</style>
