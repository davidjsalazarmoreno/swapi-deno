<script>
  import Home from "./pages/home/Home.svelte";
</script>

<main class="h-full bg-primary-swapi text-gray-400">
  <Home />
</main>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */

  @tailwind utilities;
</style>
