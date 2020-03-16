import Vue from "vue";
import VueRouter from "vue-router";
import SetupGame from "../views/setup-game.vue";
import Game from "../views/game.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SetupGame",
    component: SetupGame
  },
  {
    path:"/game",
    name: "Game",
    component: Game,
    props:(route)=>({
      gameId: route.params.gameId,
      playerId: route.params.playerId,
      name: route.params.name
    })
  }
];

const router = new VueRouter({
  routes
});

export default router;
