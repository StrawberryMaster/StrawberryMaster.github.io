<script>
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';
  import Index from './routes/index.svelte';
  import NotFound from './routes/404.svelte';
</script>

<Router>
  <Route path="/" component={Index} />
  <Route path="/*" component={NotFound} />
</Router>

<style>
  @import './style.css';
</style>
