// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    css: [
        "vuetify/lib/styles/main.sass",
        "@mdi/font/css/materialdesignicons.min.css",
        "~/assets/styles/master.scss",
    ],
    build: {
        transpile: ["vuetify"],
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
    },
    modules: ["@pinia/nuxt", "@vueuse/nuxt"],
    runtimeConfig: {
        public: {
            baseURL:
                "https://fatemehbabaei.github.io/todolist-nuxt/todolist/app-nuxt/dist/",
        },
    },
});
