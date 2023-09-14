<template>
    <div id="AddForm" class="container text-center">
        <div id="add" class="row text-center mt-5 container ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div class="bg-white shadow rounded p-4">
                    <h1 class="display-6 text-dark text-center">Ajouter un employé</h1>
                    <hr class="bg-dark mb-5" />
                    <form @submit.prevent="addEmployee2()">
                        <div class="form-group mb-3">
                            <label>Prénom</label>
                            <input v-model="newEmployee.firstName" type="text" id="personFirstNameInput"
                                class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Nom</label>
                            <input v-model="newEmployee.name" type="text" id="personNameInput" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input v-model="newEmployee.email" type="text" id="personEmailInput" class="form-control" />
                        </div>
                        <div>
                            <button class="btn btn-success mx-auto mb-2" type="submit">Enregistrer</button>
                        </div>
                    </form>
                    <button class="btn btn-danger" style="width: 100px" @click="cancelAdd">Annuler</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    name: 'EmployeesList',
    data() {
        return {
            newEmployee: {
                firstName: '',
                name: '',
                email: '',
            },
        };
    },

    methods: {
        addEmployee2() {
            this.$emit('EmployeeAdded', { ...this.newEmployee });
        },
        cancelAdd() {
            this.$router.push('/employers');
        },
    },
};
</script> 

<style>
#AddForm {
    margin-top: 80px;
}
</style>