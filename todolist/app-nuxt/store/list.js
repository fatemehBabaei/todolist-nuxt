import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useTodoStore = defineStore({
    id: "todos",
    state: () => ({
        todos: useStorage("todos", [
            {
                task: "read book",
                status: true,
            },
            {
                task: "burn book",
                status: false,
            },
            {
                task: "burn books",
                status: true,
            },
        ]),
    }),
    actions: {
        update(todo) {
            this.todos = todo;
            // console.log(this.todos);
        },
    },
});
