<script>
  import { link } from "svelte-spa-router";
  // const routes = ["/api/people"];
  let prefix = "/api/";
  let json;
  let resource;
  let id;

  function handleGet(uri) {
    const api = "http://localhost:8000";
    fetch(`${api}${uri}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        json = JSON.stringify(data, null, 2);
      });
  }
</script>

<header class="p-5">
  <nav class="flex place-content-between">
    <h1>SWAPI Clone</h1>
    <ol class="flex space-x-4">
      <li class="crumb"><a href="/">Home</a></li>
      <li class="crumb"><a href="#">Article</a></li>
      <li class="crumb"><a href="#">About</a></li>
    </ol>
  </nav>
</header>
<!-- ./Header -->

<section class="p-5 h-2/3">
  <h2>Try it now!</h2>

  <div>
    <span />
    <select id="apis" bind:value={resource}>
      <option>{prefix}people/</option>
      <option>{prefix}films/</option>
      <option>{prefix}starships/</option>
      <option>{prefix}vehicles/</option>
      <option>{prefix}species/</option>
      <option>{prefix}planets/</option>
    </select>

    <input
      type="text"
      placeholder="Resource id, like 1 or 10"
      bind:value={id}
    />

    <button disabled={!id | !resource} on:click={handleGet(resource + id)}>
      Request
    </button>
  </div>

  {#if json}
    <div>
      Result:
      <pre>
      {json}
    </pre>
    </div>
  {/if}
</section>

<section
  class="flex flex-col sm:flex-row p-5 space-x-4 space-y-4 sm:space-y-0 h-1/3 justify-center"
>
  <div>
    <h2 class="text-center font-bold mb-5">What is this?</h2>
    <p class="max-w-xs">
      The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified
      and programmatically-accessible data source for all the data from the Star
      Wars canon universe! SWAPI Deno is just a clone of a swapi subset just for
      fun.
    </p>
  </div>

  <div>
    <h2 class="text-center font-bold mb-5">How can I use it?</h2>
    <p class="max-w-xs">
      This project is not intented to be consumed as API, instead is just an
      invitation for you to check the repo and practice Deno, Svelte and
      Tailwind.
    </p>
  </div>

  <div>
    <h2 class="text-center font-bold mb-5">Is there an article?</h2>
    <p class="max-w-xs">
      I wrote an article telling my experience learning such techologies, if you
      want to learn more, please take a look
    </p>
  </div>
</section>
<!-- ./Three questions -->

<footer class="p-5">
  <p>
    Created by David Salazar inspired on
    <a href="https://swapi.dev/"> https://swapi.dev/ </a>
  </p>

  <!-- Place this tag where you want the button to render. -->
  <!-- <a
      class="github-button"
      href="https://github.com/davidjsalazarmoreno"
      aria-label="Follow @davidjsalazarmoreno on GitHub">
      Follow @davidjsalazarmoreno
    </a>

    <a
      href="https://twitter.com/davidjsmoreno?ref_src=twsrc%5Etfw"
      class="twitter-follow-button"
      data-show-count="false">Follow @davidjsmoreno</a
    > -->
</footer>
