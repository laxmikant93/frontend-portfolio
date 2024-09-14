<template>
  <div>
    <input
      v-model="query"
      @input="search"
      placeholder="Search for players..."
    />

    <ul v-if="results.length">
      <li
        v-for="result in results"
        :key="result._id"
        @click="selectPlayer(result)"
        class="dropdown-item"
      >
        {{ result._source.player_name }} ({{ result._source.team }})
      </li>
    </ul>

    <div v-if="selectedPlayer">
      <h3>Selected Player:</h3>
      <p><strong>Name:</strong> {{ selectedPlayer._source.player_name }}</p>
      <p><strong>Team:</strong> {{ selectedPlayer._source.team }}</p>
      <p><strong>Position:</strong> {{ selectedPlayer._source.position }}</p>
    </div>
  </div>
</template>

<script>
import { searchPlayers } from "./services/elasticsearch";

export default {
  data() {
    return {
      query: "",
      results: [],
      selectedPlayer: null, // Store the selected player details
    };
  },
  methods: {
    async search() {
      if (this.query.length < 2) {
        this.results = [];
        return;
      }

      try {
        const response = await searchPlayers(this.query);
        this.results = response.data.hits.hits;
      } catch (error) {
        console.error("Error searching:", error);
      }
    },
    selectPlayer(player) {
      this.selectedPlayer = player; // Store the selected player's details
      this.results = []; // Clear the dropdown after selection
    },
  },
};
</script>

<style>
.dropdown-item {
  cursor: pointer;
  padding: 5px;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.selected-player {
  margin-top: 20px;
}
</style>
