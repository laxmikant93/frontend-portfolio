<template>
  <div class="container">
    <h2>Your Custom Squad</h2>
    <div class="alert alert-info" v-if="customSquad.length < 11">
      <p>Please select exactly 11 players.</p>
    </div>
    <ul class="list-group">
      <li v-for="(player, index) in customSquad" :key="index" class="list-group-item">
        {{ player }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    customSquad: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
