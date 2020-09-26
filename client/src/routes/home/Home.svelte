<script>
  import { link } from "svelte-spa-router";
  export const routes = ["/api/people"];
  export let name;
  export let json;

  function handleGet() {
    fetch("/api/people")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        json = JSON.stringify(data, null, 2);
      });
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>

  <select>
    {#each routes as route}
      <option>{route}</option>
    {/each}
  </select>

  <textarea bind:value={json} cols="30" rows="10" />
  <button on:click={handleGet}>Get</button>

  <a href="/films" use:link>Thus Spoke Zarathustra</a>
  <a href="/234324" use:link>Thus Spoke Zarathustra</a>
</main>
