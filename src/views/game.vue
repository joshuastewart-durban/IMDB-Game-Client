<template>
  <div>
    <span>Game code: {{ gameId }}</span>
    <h1>Answer the questions and Win!</h1>
    <br />
    <h2>What year was {{}} released in?</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Game",
  components: {},
  props: {
    gameId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
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
    }
  },
  methods: {}
};
</script>
