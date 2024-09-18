<template>
  <div id="app">
    <header>
      <h1>My Elasticsearch App</h1>
    </header>
    <main>
      <ElasticsearchSearch />
    </main>
  </div>
</template>

<script>
import ElasticsearchSearch from './components/ElasticsearchSearch.vue';

export default {
  name: 'App',
  components: {
    ElasticsearchSearch
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 10px 0;
}

header h1 {
  margin: 0;
}

main {
  padding: 20px;
}
</style>
