<template>
  <!-- <img src="./components/LogoPersonnel.jpg" alt="" srcset=""> -->
  <div id="nav">
    <img src="./components/LogoPersonnel.jpg" alt="LogoPersonnel" class="nav-logo">
    <router-link to="/employers">Gestion du personnel</router-link> -
    <router-link to="/add">Ajouter un employé</router-link>
  </div>
  <router-view :members="members" @EmployeeAdded="addEmployee" @EmployeeUpdateFormList="editEmployeeForm"
    @EmployeeUpdate="saveEditedEmployee" :editEmployeePros="editedEmployee" />
</template>

<script>
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import AddEmployeeForm from './components/AddEmployeeForm.vue';
import EmployeesList from './components/EmployeesList.vue';
import UpdateEmployeeForm from './components/UpdateEmployeeForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/add', component: AddEmployeeForm },
    { path: '/employers', component: EmployeesList },
    { path: '/update', component: UpdateEmployeeForm },
  ]
});

export default {

  name: 'App',
  data() {
    return {
      members: [],
      newEmployee: {
        firstName: '',
        name: '',
        email: '',
      },

      employeeBeingEdited: null, // Index of the employee being edited
      IdBack: null,
      editedEmployee: {
        firstName: '',
        name: '',
        email: '',
      },
    };
  },

  methods: {
    //Ajouter un employé
  addEmployee(newEmployee) {
      axios.post('http://localhost:8080/employer/id', newEmployee)
        .then(() => {
          this.members.push(newEmployee);
          this.newEmployee = {
            firstName: '',
            name: '',
            email: '',
          };
        })
        .catch(error => {
          console.error('Error adding employee:', error);
        });
      this.$router.push('/employers');
      setTimeout(() => {
              window.location.reload();
      }, );
    },
    //Modification remplir les inputs en cliquant sur le bouton modifier
    editEmployeeForm(index, updateEmployeeList, IdBackList) {
      this.editedEmployee = updateEmployeeList
      this.employeeBeingEdited = index;
      this.IdBack = IdBackList
    },

    saveEditedEmployee(editedEmployee) {

      if (this.employeeBeingEdited !== null) {
        const updatedEmployee = {
          id: this.IdBack,
          firstName: editedEmployee.firstName,
          name: editedEmployee.name,
          email: editedEmployee.email,
        };
        console.log("updatedEmploye : " + JSON.stringify(updatedEmployee))
        const BASE_URL = `http://localhost:8080/employer/${this.IdBack}`;

        axios.put(BASE_URL, updatedEmployee)
          .then(() => {
            this.employeeBeingEdited = null;
            this.$router.push('/employers');
          })
          .catch(error => {
            console.error('Error updating employee:', error);
          });
      }
    },
  },
  router
};
</script>

<style>
#nav {
  padding: 16px 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  background-color: lightgrey;
}

.nav-logo {
    margin-right: 10px; /* Marge à droite de la forme circulaire */
   margin-left: 10px;

  width: 50px;
  height: 50px;
   border-radius: 50%;
  margin-right: 16px; /* Marge à droite de l'image */
}

/* Style pour les liens dans la barre de navigation */
#nav a {
  color: blue;
  text-decoration: none;
  font-size: 24px; /* Augmenter la taille du texte à 24px */
}

/* Style pour les liens actifs */
#nav .router-link-exact-active {
  color: #007bff;
  font-size: 25px;
  border: 2px solid blue; /* Ajouter une bordure bleue */
  padding: 5px 10px; /* Espacement intérieur pour la bordure */
  border-radius: 10px; /* Ajouter une bordure arrondie */
}
</style>