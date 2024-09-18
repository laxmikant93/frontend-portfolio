<template>
  <div>
    <input 
      v-model="query" 
      @input="onInput" 
      placeholder="Search..." 
      @focus="showDropdown = true"
      @blur="hideDropdown"
    />
    <ul v-if="showDropdown && suggestions.length > 0" class="dropdown">
      <li v-for="(suggestion, index) in suggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
    <ul v-if="results.hits.hits.length > 0">
      <li v-for="(hit, index) in results.hits.hits" :key="index">
        <h3>{{ hit._source.title }}</h3>
        <p>{{ hit._source.description }}</p>
      </li>
    </ul>
    <p v-else>No results found.</p>
  </div>
</template>

<script>
import { search, autocomplete } from '../services/elasticsearch';

export default {
  data() {
    return {
      query: '',
      suggestions: [],
      results: { hits: { hits: [] } },
      showDropdown: false
    };
  },
  methods: {
    async onInput() {
      if (this.query.length > 2) {
        try {
          this.suggestions = await autocomplete('my_index', this.query);
        } catch (error) {
          console.error('Autocomplete failed:', error);
        }
      } else {
        this.suggestions = [];
      }
    },
    async selectSuggestion(suggestion) {
      this.query = suggestion;
      this.showDropdown = false;
      await this.performSearch();
    },
    async performSearch() {
      if (this.query.length > 2) {
        try {
          this.results = await search('my_index', this.query);
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        this.results = { hits: { hits: [] } };
      }
    },
    hideDropdown() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 200); // Delay to allow click event on dropdown items
    }
  }
};
</script>

<style scoped>
.dropdown {
  border: 1px solid #ddd;
  background: #fff;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 1000;
}
.dropdown li {
  padding: 8px;
  cursor: pointer;
}
.dropdown li:hover {
  background: #f0f0f0;
}
</style>
