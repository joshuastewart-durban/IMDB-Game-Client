<template>
  <div>
    <Error
      v-if="error"
      :message="error"
    />
    <div v-else>
      <b-card
        v-if="!loading"
        style="width:75%; margin:auto;"
        title="Start a new game"
        sub-title="To start your game"
        class="shadow-sm"
      >
        <b-card-text>
          <p>Enter your name below.</p>
          <b-input
            v-model="name"
            type="text"
          />
          <br>
          <b-button
            v-if="name"
            class="start-button"
            @click="createGame"
          >
            Start game
          </b-button>
        </b-card-text>
      </b-card>

      <b-row
        v-else
        class="d-flex justify-content-center"
      >
        <b-spinner
          class="spinner-size mx-auto"
          type="grow"
          label="Spinning"
        />
      </b-row>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Error from "@/components/error";

export default {
  name: "StartGame",
  components: {
    Error
  },
  data() {
    return {
      socketMessage: "",
      newGameId: null,
      name: "",
      loading: false,
      error: ""
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
          params: {
            playerId: "playerOne",
            gameId: this.newGameId,
            name: this.name
          }
        });
    },
    err(data) {
      this.error = data.message;
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
<style>
.spinner-size {
  width: 6rem;
  height: 6rem;
  margin: 100px;
}
.start-button{
  margin-top: 30px;
  float:right;
}
.component-button{
  margin-top: 30px;
}
</style>
