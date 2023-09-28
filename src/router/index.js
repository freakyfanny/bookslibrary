import { createWebHistory, createRouter } from "vue-router";
import BooksLibrary from "@/views/BooksLibrary.vue";
import ReadBook from "@/views/ReadBook.vue";

const routes = [
  {
    path: "/",
    name: "BooksLibrary",
    component: BooksLibrary,
  },
  {
    path: "/readBook",
    name: "Read Book",
    component: ReadBook,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;