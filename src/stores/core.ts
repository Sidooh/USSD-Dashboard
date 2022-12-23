import {defineStore} from "pinia";
import LocalStorage from "../utils/localStorage";


export const useCoreStore = defineStore("core", {
    state: () => ({
        isNavbarVerticalCollapsed: false,
        theme: 'light',
        isFluid: false,
        navbarStyle: 'transparent',
        navbarPosition: 'vertical'
        // isFluid: false, JSON.parse(localStorage.getItem("isFluid"))
    }),

    getters: {
        getLayout: (state) => {
            return LocalStorage.get('sidenav.fluid', state.isFluid, {})
        },
        getTheme: (state) => {
            return LocalStorage.get('sidenav.theme', state.theme, {})
        },
        getCollapsed: (state) => {
            return LocalStorage.get('sidenav.collapsed', state.isNavbarVerticalCollapsed, {})
        }
    },

    actions: {
        toggleLayout() {
            this.isFluid = !this.isFluid
            LocalStorage.set('sidenav.fluid', this.isFluid)
        },
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
            LocalStorage.set('sidenav.theme', this.theme)
        },
        toggleSideNav() {
            this.isNavbarVerticalCollapsed = !this.isNavbarVerticalCollapsed
            LocalStorage.set('sidenav.collapsed', this.isNavbarVerticalCollapsed)
        }
    }
})