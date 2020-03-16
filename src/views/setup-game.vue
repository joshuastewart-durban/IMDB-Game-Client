<template>
  <div>
    <b-container class="home">
      <h1>Welcome to movie trivia!</h1>
      <b-row v-if="!join && !start">
        <b-col>
          <h3>Would you like to start a new game?</h3>
          <b-button @click="startGame">
            Start game
          </b-button>
        </b-col>
        <b-col>
          <h3>Or join a game</h3>
          <b-button @click="joinGame">
            Join game
          </b-button>
        </b-col>
      </b-row>
      <startGame v-if="start" />
      <joinGame v-if="join" />
      <b-row v-if="join || start">
        <h3>You can go back if you want to.</h3>
        <b-col>
          <b-button @click="reset">
            Back
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import joinGame from "@/components/join-game";
import startGame from "@/components/start-game";

export default {
  name: "SetupGame",
  components: {
    joinGame,
    startGame
  },
  data() {
    return {
      join: false,
      start: false
      };
  },
  methods: {
    joinGame() {
      this.start = false;
      this.join = true;
    },
    startGame() {
      this.start = true;
      this.join = false;
    },
    reset() {
      this.start = false;
      this.join = false;
    }
  }
};
</script>
<style lang="scss">
.home {
  padding-top: 100px;
}
</style>
