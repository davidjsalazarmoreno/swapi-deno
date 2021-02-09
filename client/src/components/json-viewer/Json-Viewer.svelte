<script>
  export let json;
</script>

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
