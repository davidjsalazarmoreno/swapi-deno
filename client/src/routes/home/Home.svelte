<script>
  import { onMount } from "svelte";

  import { link } from "svelte-spa-router";
  let prefix = "/api/";
  let json;
  let resource = prefix + "people/";
  let id = 5;

  function getResource(uri) {
    const api = "http://localhost:8000";
    return fetch(`${api}${uri}`)
      .then((r) => r.json())
      .then((data) => JSON.stringify(data, null, 4))
      .catch(() => "No data for the requested resource");
  }

  async function onResourceRequest(uri) {
    json = await getResource(uri);
  }

  onMount(async () => {
    json = await getResource(resource + id);
  });
</script>

<header class="p-5 bg-primary-swapi bg-nav-bar">
  <nav class="flex place-content-between">
    <h1 class="text-yellow-300 font-bold">SWAPI Clone</h1>
    <ol class="flex space-x-4">
      <li>
        <a class="hover:text-gray-200 transition no-underline" href="/">
          Home
        </a>
      </li>
      <li>
        <a class="hover:text-gray-200 transition no-underline" href="#">
          Article
        </a>
      </li>
    </ol>
  </nav>
</header>
<!-- ./Header -->

<section
  class="sm:p-5 mt-20 flex flex-col items-center h-2/5 sm:h-3/5 justify-center bg-secondary-swapi border-t-2 border-b-2 border-black"
>
  <h2 class="text-6xl font-bold m-5 text-yellow-300">Try it now!</h2>
  <h3 class="text-2xl m-5 text-yellow-300">The Star Wars API</h3>
  <div class="flex m-5 w-8/12 sm:w-6/12">
    <select
      id="apis"
      bind:value={resource}
      class="w-full sm:w-2/5 bg-nav-bar p-3 sm:p-5 border-transparent text-white"
    >
      <option class="bg-secondary-swapi">{prefix}people/</option>
      <option class="bg-secondary-swapi">{prefix}films/</option>
      <option class="bg-secondary-swapi">{prefix}starships/</option>
      <option class="bg-secondary-swapi">{prefix}vehicles/</option>
      <option class="bg-secondary-swapi">{prefix}species/</option>
      <option class="bg-secondary-swapi">{prefix}planets/</option>
    </select>

    <input
      type="text"
      placeholder="Resource id, like 1 or 10"
      bind:value={id}
      class="w-15 sm:w-full border-transparent text-black"
    />

    <button
      disabled={!id | !resource}
      on:click={onResourceRequest(resource + id)}
      class="w-15 sm:w-1/4 text-white border-transparent bg-nav-bar"
    >
      Request
    </button>
  </div>

  <small class="m-5">
    Need a hint? try people/1/ or planets/3/ or starships/9/
  </small>
</section>
<!-- ./Request input -->

{#if json}
  <section
    class="sm:p-5 flex flex-col justify-center items-center bg-primary-swapi"
  >
    <h2 class="text-5xl font-bold m-8">Result:</h2>
    <div
      class="overflow-hidden w-11/12 bg-gray-900 border-black border-2 p-7 rounded-xl"
    >
      <pre
        class="bg-gray-100 text-gray-600 p-4 rounded-xl overflow-scroll sm:max-h-96">
        <code class="json ">
          {json}
        </code>
      </pre>
    </div>
  </section>
{/if}
<!-- ./JSON viewer -->

<section
  class="flex flex-col sm:flex-row p-5 space-x-4 space-y-4 sm:space-y-0 bg-primary-swapi sm:h-3/5 justify-center items-center"
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

<footer
  class="bg-primary-swapi border-t-2 border-gray-900 p-5 flex justify-between"
>
  <p class="flex-grow">
    Created by David Salazar inspired on
    <a href="https://swapi.dev/"> https://swapi.dev/ </a>
  </p>

  <!-- Place this tag where you want the button to render. -->
  <a
    class="github-button"
    href="https://github.com/davidjsalazarmoreno"
    aria-label="Follow @davidjsalazarmoreno on GitHub"
  >
    Follow @davidjsalazarmoreno
  </a>

  <a
    href="https://twitter.com/davidjsmoreno?ref_src=twsrc%5Etfw"
    class="twitter-follow-button"
    data-show-count="false"
    >Follow @davidjsmoreno
  </a>
</footer>

<style>
  a {
    color: rgba(159, 166, 178, var(--tw-text-opacity));
  }
</style>
