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
          <h4 class="sub-header-padding">Or join a game</h4>
          <b-button class="component-button" @click="joinGame">
            Join game
          </b-button>
        </b-col>
      </b-row>
      <startGame v-if="start" />
      <joinGame v-if="join" />
      <b-row>
        <b-col class="card-padding-top">
          <b-card
            style="width:80%; margin:auto;"
            title="Game rules"
            class="shadow-sm"
          >
            <b-card-text>
              <p>
                You are given a random movie title from IMDB’s top 250 list and asked to guess
                the year it was released. <br>
                A game consists of 8 rounds with 5
                points allocated for a correct answer and -3 for an incorrect
                answer. <br>The player with the highest score at the end of the game
                wins.
              </p>
            </b-card-text>
          </b-card>
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
  padding-top: 20px;
  h1 {
    padding-bottom: 20px;
  }
}
.back-button {
  float: left;
  margin-bottom: 20px;
  margin-top: 20px;
}
.start-row {
  height: 200px;
  margin: auto;
  padding-top: 50px;
}
.divider {
  border-right: 2px solid black;
}
.component-button {
  margin-top: 30px;
}
.card-padding-top{
  padding-top: 50px;
  padding-bottom: 50px;
}
@media screen and (max-width: "800px") {
  .sub-header-padding {
    padding-bottom: 28px;
  }
}
</style>
