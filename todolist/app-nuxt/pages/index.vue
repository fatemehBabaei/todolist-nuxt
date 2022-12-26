<template>
    <v-main>
        <v-container>
            <h1 class="head-description">Todo List</h1>
            <p class="title">Just do it</p>
            <v-row>
                <form @submit.prevent="onSubmit" method="post">
                    <v-text-field
                        class="form-control"
                        type="text"
                        v-model="value"
                        name="task"
                    ></v-text-field>
                    <v-btn
                        class="btn-submit"
                        prepend-icon="mdi-plus"
                        type="submit"
                    >
                        add
                    </v-btn>
                </form>
            </v-row>
            <List :todos="todos" />
        </v-container>
    </v-main>
</template>
<script>
import { useTodoStore } from "~~/store/list";
import { storeToRefs } from "pinia";
export default {
    async setup() {
        const store = useTodoStore();
        const { todos } = storeToRefs(store);
        return { todos, store };
    },
    data() {
        return {
            value: "",
            todo: "",
            newtodo: [],
        };
    },
    methods: {
        async onSubmit() {
            if (this.value.trim() != "") {
                this.todo = { task: this.value, status: false };
                this.newtodo = [...this.todos, this.todo];
                // this.todos = ref(this.newtodo);
                this.store.update(this.newtodo);
                this.value = "";
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.head-description {
    font-size: 2rem !important;
    font-family: Raleway;
    text-align: center;
    margin: 0 auto;
}
.title {
    font-family: Raleway;
    font-size: 6rem;
    font-style: italic;
    font-weight: 700;
    text-align: center;
}
form {
    background-color: #fff;
    padding: 10px;
    margin: 50px auto;
    display: flex;
    gap: 10px;
    width: min(700px, 100%);
    box-shadow: 12px 12px 2px 1px rgba(166, 167, 175, 0.8);
    color: #000;
    .form-control {
        color: #000;
        background-color: #fff;
        &:focus {
            background-color: #fff;
        }
    }
    .v-input__control {
        font-family: Raleway;
        font-size: 1rem;
        font-weight: 600;
        color: red !important;
    }
    .btn-submit {
        height: 100%;
        margin: auto;
        width: 20%;
        font-weight: bolder;
        text-align: center;
        background-color: #bcaeff;
    }
}
@media screen and (max-width: 768px) {
    .head-description {
        font-size: 1rem;
    }
    .title {
        font-size: 2rem;
    }
}
</style>
