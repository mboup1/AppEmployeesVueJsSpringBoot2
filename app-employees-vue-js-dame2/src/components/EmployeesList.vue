
<template>
    <div id="List" class="container">
        <!-- Employee List -->
        <button v-if="employeeBeingEdited == null" class="btn btn-success mt-5" @click="addForm">Ajouter un employé
        </button>

        <div v-if="employeeBeingEdited == null" class="pt-5 text-center">
            <h1>Liste des employés</h1>
            <div class="container">
                <div class="row">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Prénom</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(employee, index) in members" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ employee.firstName }}</td>
                                <td>{{ employee.name }}</td>
                                <td>{{ employee.email }}</td>
                                <td>
                                    <button class="btn btn-success me-2" @click="edit(index)">Modifier</button>
                                    <button class="btn btn-danger"
                                        @click="deleteEmployee(employee.id, employee.firstName, employee.name)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'; // Import the axios library

export default {

    name: 'EmployeesList',
    data() {
        return {
            employeeBeingEdited: null, // Index of the employee being edited
            editedEmployee: {
                firstName: '',
                name: '',
                email: '',
            },
            members: [],
        };
    },

    mounted() {
        this.fetchEmployees(); // Fetch employees when the component is mounted
    },

    methods: {
        async fetchEmployees() {
            try {
                const response = await axios.get('http://localhost:8080/employers'); // Replace with your API endpoint
                this.members = response.data; // Update the members data property with fetched data
                // console.log(this.members)
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        },

        deleteEmployee(employeeId, firstName, name) {
            const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employer/";
            let conf = confirm(`Etes-vous sûr de vouloir supprimer ${firstName} ${name} ?`);
            if (conf)
                axios.delete(EMPLOYEE_API_BASE_URL + employeeId)
                    .then(() => {
                        console.log("Personne supprimée avec succès!");
                    })
                    .catch(error => {
                        console.error("Erreur lors de la suppression de la personne:", error);
                    });
            window.location.reload();
            localStorage.setItem("members", JSON.stringify(this.members));
        },

        //Modification remplir les inputs en cliquant sur le bouton modifier
        edit(index) {
            this.$router.push('/update');

            this.employeeBeingEdited = index;
            const employee = this.members[index];
            const IdBackList = employee.id
            // console.log("IdBackList : " + IdBackList)
            this.editedEmployee = {
                firstName: employee.firstName,
                name: employee.name,
                email: employee.email,
            };
            this.$emit('EmployeeUpdateFormList', index, this.editedEmployee, IdBackList);
        },

        addForm() {
            this.$router.push('/add');
        },
    },
};
</script>

<style>
#List {
    margin-top: 50px;
}
</style>
