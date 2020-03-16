<template>
  <div>
    <div v-if="!error.state">
      <b-row v-if="!loading">
        <b-col>
          <h3>To start your game</h3>
          <p>Enter your name below.</p>
          <input v-model="name" type="text" />
          <br />
          <b-button v-if="name" @click="createGame">
            Start game
          </b-button>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-spinner type="grow" label="Spinning" />
      </b-row>
    </div>
    <b-row v-else>
      <b-col>
        <h3>{{ error.message }}</h3>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "StartGame",
  data() {
    return {
      socketMessage: "",
      newGameId: null,
      existingGameId: null,
      name: "",
      loading: false,
      error: {
        message: "",
        state: false
      }
    };
  },
  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    newGame(data) {
      this.newGameId = data.gameId;
      this.loading = false;
      if (data.gameId)
        router.push({
          name: "Game",
          params: { player: "playerOne", gameId: this.newGameId }
        });
    },
    error(data) {
      this.errorMessage = data;
    }
  },

  methods: {
    createGame() {
      // Send the "createGame" event to the server.
      this.loading = true;
      this.$socket.emit("createGame", { name: this.name });
    }
  }
};
</script>
