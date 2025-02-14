<script context="module">
  const initialBooksState = { selectedBooks: {}, savingReadForBooks: {}, pendingDelete: {}, deleting: {} };
  const keysToHash = (_ids, value) => (Array.isArray(_ids) ? _ids : [_ids]).reduce((o, _id) => ((o[_id] = value), o), {});

  function booksUiStateReducer(state, [action, payload = null]) {
    switch (action) {
      case "select":
        return { ...state, selectedBooks: { ...state.selectedBooks, ...keysToHash(payload, true) } };
      case "de-select":
        return { ...state, selectedBooks: { ...state.selectedBooks, ...keysToHash(payload, false) } };
      case "toggle-select":
        return { ...state, selectedBooks: { ...state.selectedBooks, [payload]: !state.selectedBooks[payload] } };
      case "start-delete":
        return { ...state, pendingDelete: { ...state.pendingDelete, ...keysToHash(payload, true) } };
      case "cancel-delete":
        return { ...state, pendingDelete: { ...state.pendingDelete, ...keysToHash(payload, false) } };
      case "delete":
        return { ...state, deleting: { ...state.deleting, [payload]: true } };
      case "reset":
        return { ...initialBooksState };
      default:
        throw "Invalid key";
    }
  }

  const prepBookForSaving = book => {
    let propsToUpdate = ["title", "isbn", "smallImage", "pages", "publisher", "publicationDate", "authors", "subjects", "tags"];
    let pages = parseInt(book.pages, 10);
    book.pages = isNaN(pages) ? void 0 : pages;

    return propsToUpdate.reduce((obj, prop) => ((obj[prop] = book[prop]), obj), {});
  };
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { mutation } from "micro-graphql-svelte";
  import { MutationOf, Mutations } from "graphql-typings";

  import UpdateBookMutation from "graphQL/books/updateBook.graphql";
  import UpdateBooksReadMutation from "graphQL/books/updateBooksRead.graphql";
  import DeleteBookMutation from "graphQL/books/deleteBook.graphql";

  import useReducer from "util/useReducer";

  import GridView from "./bookViews/GridView.svelte";
  import BasicView from "./bookViews/BasicView.svelte";
  import CoversView from "./bookViews/CoversView.svelte";

  import BookSearchModal from "./SearchModal.svelte";
  import BooksMenuBar from "./menuBar/MenuBar.svelte";
  import { searchBooks } from "./booksState";
  import { getBookSearchUiView, GRID_VIEW, BASIC_LIST_VIEW, COVERS_LIST } from "./booksUiState";
  import SubjectEditModal from "./SubjectEditModal.svelte";
  import TagEditModal from "./TagEditModal.svelte";
  import EditBookModal from "app/components/editBook/EditBookModal.svelte";
  import BookSubjectSetter from "./BookSubjectSetter.svelte";
  import BookTagSetter from "./BookTagSetter.svelte";
  import ModuleLoading from "app/components/navigation/ModuleLoading.svelte";
  import { fade } from "svelte/transition";
  import { quadOut } from "svelte/easing";

  const { mutationState: deleteBookState } = mutation<MutationOf<Mutations["deleteBook"]>>(DeleteBookMutation);
  const deleteBook = $deleteBookState.runMutation;

  const { mutationState: updateMutationState } = mutation<MutationOf<Mutations["updateBooks"]>>(UpdateBooksReadMutation);
  const setRead = (_ids, isRead) => Promise.resolve($updateMutationState.runMutation({ _ids, isRead }));

  const { mutationState: runBookEditState } = mutation<MutationOf<Mutations["updateBook"]>>(UpdateBookMutation);

  const saveEditingBook = book => {
    let bookToUse = prepBookForSaving(book);
    return Promise.resolve($runBookEditState.runMutation({ _id: book._id, book: bookToUse }));
  };

  let menuBarHeight = 0;
  const setMenuBarHeight = val => (menuBarHeight = val);

  const uiView = getBookSearchUiView();
  const booksState = searchBooks(uiView);
  $: ({ books, booksLoaded, totalPages, resultsCount, currentQuery, reload, booksLoading } = $booksState);

  let filterModalOpen = false;
  let openFilterModal = () => (filterModalOpen = true);

  let editSubjectsModalOpen = false;
  let editSubjects = () => (editSubjectsModalOpen = true);

  let editTagsModalOpen = false;
  let editTags = () => (editTagsModalOpen = true);

  const [booksUiState, dispatchBooksUiState] = useReducer(booksUiStateReducer, initialBooksState);

  let editingBook = null;
  const editBook = book => (editingBook = book);

  let booksSubjectEditing = [];
  const editBooksSubjects = books => (booksSubjectEditing = books);

  let booksTagEditing = [];
  const editBooksTags = books => (booksTagEditing = books);

  let booksModuleContext = {
    openFilterModal,
    editSubjects,
    editTags,
    booksUiState,
    dispatchBooksUiState,
    deleteBook,
    setRead,
    editBook,
    editBooksSubjects,
    editBooksTags,
    saveEditingBook
  };
  setContext("books-module-context", booksModuleContext);
</script>

<style>
  :global(.bookTitle) {
    font-size: 15px;
    font-weight: normal;
  }

  :global(.bookAuthor) {
    font-size: 14px;
    font-weight: normal;
    color: var(--neutral-light-text);
  }
</style>

{#if booksLoading || $uiView.pending}
  <ModuleLoading />
{/if}

<section class="full flush-bottom">
  <div style="background-color: white;">
    <BooksMenuBar {setMenuBarHeight} {uiView} bookResultsPacket={$booksState} />
    <div>
      <div class="overlay-holder" style="flex: 1; padding: 0px;">
        {#if booksLoaded}
          {#if !books?.length}
            <div transition:fade|local={{ duration: 150, easing: quadOut }}>
              <div class="alert alert-warning" style="margin-top: 20px">No books found</div>
            </div>
          {:else if booksLoaded && books != null}
            <div transition:fade|local={{ duration: 150, easing: quadOut }} style="min-height: 450px;">
              {#if $uiView.view == GRID_VIEW}
                <GridView {booksState} {menuBarHeight} />
              {:else if $uiView.view == BASIC_LIST_VIEW}
                <BasicView {booksState} />
              {:else if $uiView.view == COVERS_LIST}
                <CoversView {booksState} />
              {/if}
            </div>
          {/if}
        {/if}

        {#if filterModalOpen}
          <BookSearchModal isOpen={filterModalOpen} onHide={() => (filterModalOpen = false)} />
        {/if}
        {#if editSubjectsModalOpen}
          <SubjectEditModal isOpen={editSubjectsModalOpen} onHide={() => (editSubjectsModalOpen = false)} />
        {/if}
        {#if editTagsModalOpen}
          <TagEditModal isOpen={editTagsModalOpen} onHide={() => (editTagsModalOpen = false)} />
        {/if}
        {#if editingBook}
          <EditBookModal saveBook={saveEditingBook} isOpen={!!editingBook} book={editingBook} onHide={() => (editingBook = null)} />
        {/if}
        {#if !!booksSubjectEditing.length}
          <BookSubjectSetter isOpen={!!booksSubjectEditing.length} onHide={() => (booksSubjectEditing = [])} modifyingBooks={booksSubjectEditing} />
        {/if}
        {#if !!booksTagEditing.length}
          <BookTagSetter isOpen={!!booksTagEditing.length} onHide={() => (booksTagEditing = [])} modifyingBooks={booksTagEditing} />
        {/if}
      </div>
    </div>
  </div>
</section>
