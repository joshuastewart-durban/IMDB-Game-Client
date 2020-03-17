<template>
  <b-row>
    <b-col>
      <img class="error-icon" src="@/assets/error.svg" alt="Error svg" />
      <h3>{{ message }}</h3>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.error-icon {
  width: 100px;
}
</style>
