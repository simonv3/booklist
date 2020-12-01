<script context="module">
  import { register } from 'svelte-loadable'
 
  // Loaders must be registered outside of the render tree.
  const BookLoader = register({
    loader: () => import('./modules/books/Books.svelte'),
    resolve: () => require.resolve('./modules/books/Books.svelte'),
  })

</script>

<script>
  import { setContext } from "svelte";
  import Loadable from "svelte-loadable";
  import { createBrowserHistory } from "history";

  import Link from "./app/Link.svelte";

  let currentModule = "";

  if ($$props.serverModule) {
    syncHistory($$props.serverModule)
  } else {
    const history = createBrowserHistory();
    setContext("booklist-history", history);
    syncHistory(history.location.pathname);

    // Listen for changes to the current location.
    let unlisten = history.listen(({ location, action }) => {
      syncHistory(location.pathname);
    });
  }



  function syncHistory(moduleName) {
    currentModule = moduleName.replace(/^\//, "") || "home";
  }
</script>

<Link href="">Home</Link>
<Link href="home">Home</Link>
<Link href="books">Books</Link>
<Link href="subjects">Subjects</Link>
<Link href="login">Login</Link>


{#if true || currentModule == 'books'}
  <Loadable loader={BookLoader} />
{:else if currentModule == 'subjects'}
  <Loadable loader={() => import('./modules/subjects/Subjects.svelte')} />
{:else if currentModule == 'login'}
  <Loadable loader={() => import('./modules/login/Login.svelte')} />
{:else if currentModule == 'home'}
  <Loadable loader={() => import('./modules/home/Home.svelte')} />
{/if}
