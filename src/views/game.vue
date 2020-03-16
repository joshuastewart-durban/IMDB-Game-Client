<template>
  <div>
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
      score: {
        playerOne: 0,
        playerTwo: 0
      },
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
      round: 1
    };
  },
  sockets: {
    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    },
    playerOne(data) {
      this.playerId = "playerOne";
      this.question = data.question;
    },
    playerTwo(data) {
      this.playerId = "playerTwo";
      this.question = data.question;
    },
    turnPlayed(data) {
      this.players[data.playerId].score = data.score;
      if (data.playerId === this.playerId) {
        this.question = data.question;
      }
    },
    winner(data) {
      console.log(data);
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
