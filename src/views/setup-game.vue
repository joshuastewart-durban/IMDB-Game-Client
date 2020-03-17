<template>
  <div>
    <b-container class="home">
      <b-row v-if="join || start">
        <b-col>
          <b-button class="back-button" @click="reset">
            Back
          </b-button>
        </b-col>
      </b-row>
      <h1>Welcome to movie trivia!</h1>
      <b-row v-if="!join && !start" class="start-row">
        <b-col class="divider">
          <h4>Would you like to start a new game?</h4>
          <b-button class="component-button" @click="startGame">
            Start game
          </b-button>
        </b-col>
        <b-col>
          <h4>Or join a game</h4>
          <b-button class="component-button" @click="joinGame">
            Join game
          </b-button>
        </b-col>
      </b-row>
      <startGame v-if="start" />
      <joinGame v-if="join" />
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
  h1{
    padding-bottom: 20px;
  }
}
.back-button {
  float: left;
  margin-bottom: 20px;;
}
.start-row{
  height: 200px;
  margin:auto;
  padding-top: 50px;
}
.divider{
  border-right: 2px solid black;
}
.component-button{
  margin-top: 30px;
}
</style>
