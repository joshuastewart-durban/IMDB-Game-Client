<template>
  <div>
    <Error
      v-if="error"
      :message="error"
    />
    <b-card
      v-else
      style="width:75%; margin:auto;"
      title="Join Game"
      sub-title="To join a game"
      class="shadow-sm"
    >
      <b-card-text>
        <p>Enter the game code</p>
        <b-input
          v-model="existingGameId"
          type="text"
        />
        <p>Enter your name below.</p>
        <b-input
          v-model="name"
          type="text"
        />
        <br>
        <b-button
          v-if="existingGameId && name"
          class="join-button"
          @click="joinGame"
        >
          Join game
        </b-button>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import router from "@/router";
import Error from "@/components/error";
export default {
  name: "JoinGame",
  components: {
    Error
  },
  data() {
    return {
      socketMessage: "",
      existingGameId: null,
      name: "",
      error: ""
    };
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
<style scpoed lang="scss">
.join-button {
  margin-top: 30px;
  float: right;
}
</style>
