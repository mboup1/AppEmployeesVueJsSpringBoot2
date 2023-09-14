<template>
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="..." alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>

    
    <div id="EditForm" class="container text-center">
        <div id="add" class="row text-center mt-5 ">
            <div class="col-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
                <div class="bg-white shadow rounded p-4">
                    <h1 class="display-6 text-dark text-center">Modifier un employé</h1>
                    <hr class="bg-dark mb-5" />
                    <form @submit.prevent="saveEditedEmployee2">
                        <div class="form-group mb-3">
                            <label>Prénom</label>
                            <input v-model="editedEmployee.firstName" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Nom</label>
                            <input v-model="editedEmployee.name" type="text" class="form-control" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input v-model="editedEmployee.email" type="text" class="form-control" />
                        </div>
                        <div>
                            <button class="btn btn-success me-2 " style="width: 100px" type="submit">Enregistrer</button>
                            <button class="btn btn-danger" style="width: 100px" @click="cancelEdit">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    props: {
        editEmployeePros: {
            firstName: '',
            name: '',
            email: '',
        },
    },

    name: 'EmployeesList',
    data() {
        return {
            employeeBeingEdited: null, // Index of the employee being edited
            editedEmployee: {
                firstName: this.editEmployeePros.firstName,
                name: this.editEmployeePros.name,
                email: this.editEmployeePros.email,
            },
            members: [],
        };
    },

    methods: {
        saveEditedEmployee2() {
            console.log(this.employeeBeingEdited)
            this.$emit('EmployeeUpdate', { ...this.editedEmployee });
        },
        
        cancelEdit() {
            this.$router.push('/employers');
        },
    },
};
</script>

<style>
#EditForm {
    margin-top: 70px;
}
</style>