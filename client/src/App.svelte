<script>
  import Router from "svelte-spa-router";
  import Films from "./routes/films/Films.svelte";
  import Home from "./routes/home/Home.svelte";
  import NotFound from "./routes/not-found/NotFound.svelte";

  const routes = {
    // Exact path
    "/": Home,

    // Wildcard parameter
    "/films": Films,

    // Catch-all
    // This is optional, but if present it must be the last
    "*": NotFound,
  };
</script>

<main class="h-full bg-primary-swapi text-gray-400">
  <Router {routes} />
</main>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
