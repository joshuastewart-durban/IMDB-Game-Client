<template>
  <b-container class="game">
    <Error v-if="error" class="error" :message="error" />
    <div v-else>
      <h1>Answer the questions and Win!</h1>
      <div v-if="!finished" class="row">
        <div class="col-sm-6">
          <b-card>
            <b-card-text>
              <span v-if="question">
                <h5 v-if="question">
                  What year was <strong>{{ question }}</strong> released in?
                </h5>
                <b-input class="input-padding" v-model="answer" type="number" />
                <div>
                  <b-button class="submit-button" @click="submitAnswer"
                    >Submit</b-button
                  >
                </div>
              </span>
              <p v-else>
                Waiting for other player.
              </p>
              <br />
            </b-card-text>
          </b-card>
        </div>
        <div class="col-sm-6">
          <b-card>
            <b-card-text>
              <div>Round: {{ this.round }}</div>
              <div>Game code: {{ gameId }}</div>
              <div>Your Score: {{ players[playerId].score }}</div>
              <div>
                {{
                  players[opponentId].name
                    ? players[opponentId].name
                    : "Opponent"
                }}
                score :
                {{ players[opponentId].score }}
              </div>
              <b-toast id="result-toast" title="Well done" static no-auto-hide>
                {{ answerResult }}
              </b-toast>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div v-else class="row">
        <div class="col">
          <b-card class="giphy-card">
            <b-card-body>
              <div v-if="winner">
                <h3>Congratulations you are the winner!</h3>
                <iframe
                  src="https://giphy.com/embed/cOtvwSHKaFK3Ul1VVu"
                  frameBorder="0"
                  class="giphy-embed giphy"
                  allowFullScreen
                />
              </div>
              <div v-else-if="loser">
                <h3>
                  Sorry you have lost!
                </h3>
                <iframe
                  src="https://giphy.com/embed/EndO2bvE3adMc"
                  frameBorder="0"
                  class="giphy-embed giphy"
                  allowFullScreen
                />
              </div>
              <div v-else-if="draw">
                <h3>
                  It's a draw!
                </h3>
                <iframe
                  src="https://giphy.com/embed/A0KitrLeiHw52"
                  frameBorder="0"
                  class="giphy-embed giphy"
                  allowFullScreen
                />
              </div>
              <div v-else>
                <h3>Waiting for your opponent to finish...</h3>
              </div>
              <div>Game code: {{ gameId }}</div>
              <div>Your Score: {{ players[playerId].score }}</div>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <b-button class="end-game" style="float:left;" @click="endGame">
          End game
        </b-button>
      </div>
    </div>
  </b-container>
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
      winner: false,
      loser: false,
      draw: false,
      round: 1,
      error: "",
      answerResult: ""
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
        if (this.round === 8) {
          this.finished = true;
        } else {
          this.showToast(data.answer);
          ++this.round;
        }
      }
    },
    result(data) {
      if (data.draw) {
        this.draw = true;
      } else {
        if (data.winnerId === this.playerId) {
          this.winner = true;
        } else {
          this.loser = true;
        }
      }
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
    showToast(answer) {
      this.$bvToast.toast(
        `Your answer is ${answer ? "correct!" : "incorrect!"}`,
        {
          title: "Answer",
          autoHideDelay: 2000,
          appendToast: false
        }
      );
    },
    submitAnswer() {
      if (this.round < 9) {
        this.$socket.emit("playTurn", {
          game: this.gameId,
          playerId: this.playerId,
          question: this.question,
          answer: this.answer
        });
        this.answer = "";
      }
    }
  }
};
</script>
<style lang="scss">
.game {
  h1 {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  .card {
    height: 13rem;
  }
  .error {
    padding-top: 200px;
  }
  .submit-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    float: right;
  }
  .end-game {
    margin-top: 15%;
  }
  .giphy-card {
    height: 25rem !important;
  }
  .giphy {
    width: 100%;
  }
  .input-padding {
    margin-top: 30px !important;
  }
}
</style>
