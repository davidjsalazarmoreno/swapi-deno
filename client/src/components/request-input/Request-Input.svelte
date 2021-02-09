<script>
  import { createEventDispatcher } from "svelte";
  export let resource;
  export let id;
  export let prefix;
  const dispatch = createEventDispatcher();

  function request() {
    dispatch("request", {
      uri: resource + id,
    });
  }
</script>

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
      on:click={request}
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
