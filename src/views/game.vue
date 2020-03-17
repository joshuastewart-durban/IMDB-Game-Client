<template>
  <div>
    <Error v-if="error" :message="error" />
    <div v-else>
      <span>Game code: {{ gameId }}</span>
      <h1>Answer the questions and Win!</h1>
      <br />
      <span v-if="question">
        <h2 v-if="question">What year was {{ question }} released in?</h2>
        <input v-model="answer" />
        <b-button @click="submitAnswer">Submit</b-button>
      </span>
      <p v-else>Waiting for other player.</p>
      <br />
      <span>Your Score: {{ players[playerId].score }}</span>
      <span>
        {{ players[opponentId].name }} score :
        {{ players[opponentId].score }}
      </span>
      <br />
      <b-button @click="endGame">End game</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "@/router";
import Error from "@/components/error";

export default {
  name: "Game",
  components: { Error },
  props: {
    gameId: {
      type: String,
      required: true
    },
    name: {
      required: true,
      type: String
    },
    playerId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      socketMessage: "",
      question: null,
      players: {
        playerOne: {
          score: 0,
          name: ""
        },
        playerTwo: {
          score: 0,
          name: ""
        }
      },
      answer: null,
      finished: false,
      round: 1,
      error: ""
    };
  },
  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    playerOne(data) {
      this.question = data.question;
      this.players = data.players;
    },
    playerTwo(data) {
      this.question = data.question;
      this.players = data.players;
    },
    turnPlayed(data) {
      this.players[data.playerId].score = data.score;
      if (data.playerId === this.playerId) {
        this.question = data.question;
      }
    },
    result(data) {
      alert(data);
    },
    err(data) {
      this.error = data.message;
    }
  },
  computed: {
    opponentId() {
      if (this.playerId === "playerOne") {
        return "playerTwo";
      }
      return "playerOne";
    }
  },
  watch: {
    gameId(value) {
      if (value === undefined) {
        this.endGame();
      }
    }
  },
  mounted() {
    if (this.gameId === undefined) {
      this.endGame();
    }
  },
  methods: {
    endGame() {
      router.push({
        name: "SetupGame"
      });
    },
    submitAnswer() {
      this.$socket.emit("playTurn", {
        game: this.gameId,
        playerId: this.playerId,
        question: this.question,
        answer: this.answer
      });
    }
  }
};
</script>
