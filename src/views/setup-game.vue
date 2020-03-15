<template>
  <b-container class="home">
    <b-row class="setup-container">
      <b-col>
        <h1>Welcome to movie trivia!</h1>
        <h3>Would you like to start a new game?</h3>
        <p>Enter your name below.</p>
        <input v-model="name" type="text" />
        <br />
        <button v-if="name" @click="createGame">
          Start game
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h3>Or join a game</h3>
        <p>Enter the game code</p>
        <input v-model="existingGameId" type="text" />
        <p>Enter your name below.</p>
        <input v-model="name" type="text" />
        <br />
        <button v-if="existingGameId && name" @click="joinGame">
          Join game
        </button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import router from "@/router";

export default {
  name: "SetupGame",
  components: {},
  data() {
    return {
      socketMessage: "",
      newGameId: null,
      existingGameId: null,
      name: ""
    };
  },

  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    newGame(data) {
      console.log(data, "newGame");
      this.newGameId = data.gameId;
      if (data.gameId)
        router.push({ name: "Game", params: { gameId: this.newGameId } });
    }
  },

  methods: {
    createGame() {
      // Send the "createGame" event to the server.
      this.$socket.emit("createGame", { name: this.name });
    },
    joinGame() {
      // Send the "createGame" event to the server.
      this.$socket.emit("joinGame", {
        name: this.name,
        game: this.existingGameId
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.setup-container {
  padding-top: 100px;
}
</style>
