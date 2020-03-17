<template>
  <div>
    <Error v-if="error" :message="error" />
    <b-row v-else>
      <b-col>
        <h3>To start your game</h3>
        <p>Enter the game code</p>
        <input v-model="existingGameId" type="text" />
        <p>Enter your name below.</p>
        <input v-model="name" type="text" />
        <br />
        <b-button v-if="existingGameId && name" @click="joinGame">
          Join game
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import router from "@/router";
import Error from "@/components/error";
export default {
  name: "JoinGame",
  data() {
    return {
      socketMessage: "",
      existingGameId: null,
      name: "",
      error: ""
    };
  },
  components: {
    Error
  },
  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    joinGame(data) {
      this.existingGameId = data.gameId;
      if (data.gameId)
        router.push({
          name: "Game",
          params: {
            playerId: "playerTwo",
            gameId: this.existingGameId,
            name: this.name
          }
        });
    },
    disconnected(data) {
      this.error = data.message;
    },
    err(data) {
      this.error = data.message;
    }
  },

  methods: {
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
