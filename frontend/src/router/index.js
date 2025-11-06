import { createRouter, createWebHistory } from "vue-router";
import Contact from "../views/Contact.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Service from "../views/Service.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

const routes = [
    {path: "/", component: Home},
    {path: "/contato", component: Contact},
    {path: "/login", component: Login},
    {path: "/cadastrar", component: Register},
    {path: "/perfil", component: Profile},
    {path: "/servicos", component: Service}
]

export default createRouter({history: createWebHistory(), routes})