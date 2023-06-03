<template>
    <v-card class="task-container">
        <v-tabs class="tab-head" v-model="tab">
            <v-tab value="all">All Task</v-tab>
            <v-tab value="complete" @click="completeFilter()">completed</v-tab>
            <v-tab value="notComplete" @click="notCompleteFilter()"
                >not Complete</v-tab
            >
        </v-tabs>
        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="all">
                    <v-table fixed-header height="400px" class="task-item">
                        <thead>
                            <tr>
                                <th
                                    class="text-center"
                                    style="min-width: 200px"
                                >
                                    Task
                                </th>
                                <th
                                    class="text-center"
                                    style="min-width: 100px"
                                >
                                    Status
                                </th>
                                <th
                                    class="text-center"
                                    style="min-width: 100px"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in todos" :key="index">
                                <td class="text-center">
                                    <v-checkbox
                                        style="min-width: 200px"
                                        class="checkbox text-center"
                                        @click="checkTask(item, index)"
                                        :id="index"
                                        v-model="item.status"
                                        :label="item.task"
                                        :checked="this.value"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                </td>
                                <td class="text-center">{{ item.status }}</td>
                                <td>
                                    <div class="action">
                                        <v-btn
                                            @click="deleteItem(index, event)"
                                            icon
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn
                                            title="pin to top"
                                            @click="pin(index)"
                                            icon
                                        >
                                            <v-icon>mdi-star</v-icon>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-window-item>

                <v-window-item value="complete">
                    <v-table fixed-header height="400px" class="task-item">
                        <thead>
                            <tr>
                                <th class="text-center">Task</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in completeTodo"
                                :key="index"
                            >
                                <td class="text-center">
                                    <v-checkbox
                                        class="checkbox text-center"
                                        @click="checkTask(item, index)"
                                        :id="index"
                                        v-model="item.status"
                                        :label="item.task"
                                        :checked="this.value"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                </td>
                                <td class="text-center">{{ item.status }}</td>
                                <td>
                                    <div class="action">
                                        <v-btn
                                            @click="deleteItem(index, event)"
                                            icon
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn
                                            title="pin to top"
                                            @click="pin(index)"
                                            icon
                                        >
                                            <v-icon>mdi-star</v-icon>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-window-item>

                <v-window-item value="notComplete">
                    <v-table fixed-header height="400px" class="task-item">
                        <thead>
                            <tr>
                                <th class="text-center">Task</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in notCompleteTodo"
                                :key="index"
                            >
                                <td class="text-center">
                                    <v-checkbox
                                        class="checkbox text-center"
                                        @click="checkTask(item, index)"
                                        :id="index"
                                        v-model="item.status"
                                        :label="item.task"
                                        :checked="this.value"
                                        color="primary"
                                        hide-details
                                    ></v-checkbox>
                                </td>
                                <td class="text-center">{{ item.status }}</td>
                                <td>
                                    <div class="action">
                                        <v-btn
                                            @click="deleteItem(index, event)"
                                            icon
                                        >
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn
                                            title="pin to top"
                                            @click="pin(index)"
                                            icon
                                        >
                                            <v-icon>mdi-star</v-icon>
                                        </v-btn>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script>
import { useTodoStore } from "~~/store/list";
export default {
    props: ["todos"],

    async setup() {
        const listStore = useTodoStore();
        return { listStore };
    },
    data() {
        return {
            completeTodo: "",
            notCompleteTodo: "",
            value: "",
            tab: null,
        };
    },
    methods: {
        async checkTask(item, index) {
            if (event.target.checked) {
                item.status = "true";
                this.value = "true";
                if (index != null) {
                    this.completeTodo.splice(index, 1);
                }
                // this.listStore.update(this.todos);
            } else {
                item.status = "false";
                this.value = "false";
                if (index != null) {
                    this.notCompleteTodo.splice(index, 1);
                }
                // this.listStore.update(this.todos);
            }
            console.log(this.completeTodo);
            this.notCompleteFilter();
            this.completeFilter();
        },
        async deleteItem(index) {
            if (index != null) {
                this.todos.splice(index, 1);
                this.listStore.update(this.todos);
            }
        },
        async pin(index) {
            this.todos.unshift(this.todos.splice(index, 1)[0]);
            this.listStore.update(this.todos);
        },
        async completeFilter() {
            this.completeTodo = this.todos.filter(
                (item) => item.status == true
            );
            // this.completeTodo = complete;
            // console.log(this.completeTodo);
        },
        async notCompleteFilter() {
            this.notCompleteTodo = this.todos.filter(
                (item) => item.status == false
            );
            // this.notCompleteTodo = notComplete;
            // console.log(this.notCompleteTodo);
        },
    },
};
</script>
<style lang="scss" scoped>
.task-container {
    width: min(700px, 100%);
    margin: 0 auto;
    padding: 10px;
    box-shadow: 12px 12px 2px 1px rgba(166, 167, 175, 0.8);
    margin-bottom: 50px;
    .action {
        display: flex;
        gap: 5px;
        justify-content: center;
        button {
            box-shadow: none;
            icon {
                font-size: 0.8rem;
            }
            transition: 0.3s ease;
            &:nth-child(1):hover {
                color: red;
                transform: scale(1.1);
            }
            &:nth-child(2):hover {
                color: rgb(255, 251, 14);
                transform: scale(1.1);
            }
        }
    }
}
.tab-head {
    background-color: #ffff;
    // color: #523fad;
    font-family: Raleway;
    font-size: 1rem;
    font-weight: 900;
}
.v-slide-group .v-slide-group__container .v-slide-group__content {
    justify-content: center !important;
}
@media screen and (max-width: 768px) {
    .task-container {
        width: 90%;
    }
}
</style>
