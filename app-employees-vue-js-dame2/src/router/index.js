import { createRouter, createWebHashHistory } from 'vue-router'
import EmployeesList from '../components/EmployeesList.vue';
import AddEmployeeForm from '../components/AddEmployeeForm.vue';
import UpdateEmployeeForm from '../components/UpdateEmployeeForm.vue';

const routes = [
    { path: '/employers', component: EmployeesList, name: 'Employers' },
    { path: '/add', component: AddEmployeeForm, name: 'AddEmployeeForm' },
    { path: '/update', component: UpdateEmployeeForm, name: 'UpdateEmployeeForm' },
    { path: '/:pathMatch(.*)', redirect: '/employers'}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
