<script>
  import { onMount } from "svelte";

  import Footer from "../../components/footer/Footer.svelte";
  import Header from "./../../components/header/Header.svelte";
  import JsonViewer from "./../../components/json-viewer/Json-Viewer.svelte";
  import RequestInput from "../../components/request-input/Request-Input.svelte";
  import ThreeQuestions from "../../components/three-questions/Three-Questions.svelte";
  import getResource from "./get-resource.js";
  let prefix = "/api/";
  let json;
  let resource = prefix + "people/";
  let id = 5;

  async function onResourceRequest(uri) {
    json = await getResource(uri);
  }

  onMount(async () => {
    json = await getResource(resource + id);
  });
</script>

<Header />

<RequestInput
  {resource}
  {id}
  {prefix}
  on:request={(event) => onResourceRequest(event.detail.uri)}
/>

<JsonViewer {json} />

<ThreeQuestions />

<Footer />
