<template>
  <div class="home">
    <div>
      <h1>Welcome to movie trivia!</h1>
      <h3>Would you like to start a new game?</h3>
      <p>Enter your name below.</p>
      <input v-model="name" type="text" />
      <br />
      <button v-if="name" @click="createGame">
        Start game
      </button>
    </div>
    <div>
      <h3>Or join a game, enter the game code.</h3>   
      <input v-model="gameId" type="text" />
      <br />
      <button v-if="name" @click="createGame">
        Join game
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "SetupGame",
  components: {},
  data() {
    return {
      isConnected: false,
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
      if(data.gameId)router.push({ name: "Game", params: { gameId: this.newGameId } });
    }
  },

  methods: {
    createGame() {
      // Send the "createGame" event to the server.
      this.$socket.emit("createGame", { name: "John Snow" });
    }
  }
};
</script>
