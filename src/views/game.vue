<template>
  <div>
    <span>Game code: {{ gameId }}</span>
    <h1>Answer the questions and Win!</h1>
    <br />
    <h2>What year was {{question.title}} released in?</h2>
    <b-button @click="endGame">End game</b-button>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "@/router";

export default {
  name: "Game",
  components: {},
  props: {
    gameId: {
      type: String,
      required: true
    },
    name: {
      required: false,
      type: String
    }
  },
  data() {
    return {
      socketMessage: "",
      question: null,
      score: null,
      playerName: null
    };
  },
  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    playerOne(data) {
        this.question = data.question
    },
    playerTwo(data) {
        this.question = data.question
    }
  },
  methods: {
    endGame() {
      router.push({
        name: "SetupGame"
      });
    }
  }
};
</script>
