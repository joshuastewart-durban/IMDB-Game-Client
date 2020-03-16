<template>
  <b-row>
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
</template>

<script>
import router from "@/router";

export default {
  name: "JoinGame",
  data() {
    return {
      socketMessage: "",
      existingGameId: null,
      name: ""
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
          params: { player: "playerTwo", gameId: this.existingGameId }
        });
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
