<script lang="ts">
  import ActionButton from "../buttons/ActionButton.svelte";
  import Button from "app/components/buttons/Button.svelte";

  import SelectAvailableTags from "app/components/subjectsAndTags/tags/SelectAvailableTags.svelte";
  import SelectAvailableSubjects from "app/components/subjectsAndTags/subjects/SelectAvailableSubjects.svelte";

  import DisplaySelectedTags from "app/components/subjectsAndTags/tags/DisplaySelectedTags.svelte";
  import DisplaySelectedSubjects from "app/components/subjectsAndTags/subjects/DisplaySelectedSubjects.svelte";
  import FlexRow from "../layout/FlexRow.svelte";
  import FlowItems from "../layout/FlowItems.svelte";

  export let book;

  let editingBook;
  $: bookChanged(book);

  function bookChanged(book) {
    editingBook = { ...book };
  }

  const addSubject = subject => (editingBook.subjects = editingBook.subjects.concat(subject._id));
  const removeSubject = subject => (editingBook.subjects = editingBook.subjects.filter(_id => _id != subject._id));

  const addTag = tag => (editingBook.tags = editingBook.tags.concat(tag._id));
  const removeTag = tag => (editingBook.tags = editingBook.tags.filter(_id => _id != tag._id));

  let missingTitle = false;

  export let saveBook;
  export let onSave = book => {};
  export let cancel;

  const save = evt => {
    evt.preventDefault();

    if (!editingBook.title) {
      missingTitle = true;
      return;
    }
    missingTitle = false;
    //trim out empty authors now, so they're not applied in the reducer, and show up as empty entries on subsequent edits
    editingBook.authors = editingBook.authors.filter(a => a);
    return Promise.resolve(saveBook(editingBook)).then(savedBook => {
      onSave(savedBook);
    });
  };

  const syncAuthor = index => evt => {
    editingBook.authors[index] = evt.target.value;
  };
  const addAuthor = evt => {
    editingBook.authors = [...editingBook.authors, ""];
  };
</script>

<form on:submit={save}>
  <FlexRow>
    <div class="col-xs-6">
      <div class={"form-group"}>
        <label>Title</label>
        <input class="form-control" name="title" class:error={missingTitle} bind:value={editingBook.title} placeholder="Title (required)" />
      </div>
    </div>

    <div class="col-xs-6">
      <div class="form-group"><label>ISBN</label> <input class="form-control" bind:value={editingBook.isbn} placeholder="ISBN" /></div>
    </div>

    <div class="col-xs-6">
      <div class="form-group">
        <label>Pages</label>
        <input class="form-control" bind:value={editingBook.pages} type="number" placeholder="Number of pages" />
      </div>
    </div>

    <div class="col-xs-6">
      <div class="form-group"><label>Publisher</label> <input class="form-control" bind:value={editingBook.publisher} placeholder="Publisher" /></div>
    </div>

    <div class="col-xs-6">
      <div class="form-group">
        <label>Published</label>
        <input class="form-control" bind:value={editingBook.publicationDate} placeholder="Publication date" />
      </div>
    </div>

    <div class="col-xs-12">
      <FlexRow>
        <div class="col-sm-3 col-xs-12">
          <SelectAvailableTags currentlySelected={editingBook.tags} onSelect={addTag} />
        </div>
        <div style="display: {editingBook.tags.length ? '' : 'none'}" class="col-sm-9 col-xs-12">
          <DisplaySelectedTags currentlySelected={editingBook.tags} onRemove={removeTag} />
        </div>
      </FlexRow>
    </div>

    <div class="col-xs-12">
      <FlexRow>
        <div class="col-sm-3 col-xs-12">
          <SelectAvailableSubjects currentlySelected={editingBook.subjects} onSelect={addSubject} />
        </div>
        <div style="display: {editingBook.subjects.length ? '' : 'none'}" class="col-sm-9 col-xs-12">
          <DisplaySelectedSubjects currentlySelected={editingBook.subjects} onRemove={removeSubject} />
        </div>
      </FlexRow>
    </div>

    {#each editingBook.authors || [] as author, index (index)}
      <div class="col-xs-4">
        <div class="form-group">
          <label>Author</label>
          <input bind:value={editingBook.authors[index]} class="form-control" placeholder={`Author ${index + 1}`} />
        </div>
      </div>
    {/each}
    <div class="col-xs-12">
      <Button type="button" onClick={evt => addAuthor(evt)} preset="default-xs"><i class="fa fa-fw fa-plus" /> Add author</Button>
    </div>
  </FlexRow>
  <hr />

  <FlowItems>
    <ActionButton
      onClick={save}
      type="submit"
      style="min-width: 10ch"
      finishedText="Saved"
      text="Save"
      class="pull-right"
      preset="primary"
      runningText="Saving"
    />
    <Button style="margin-left: auto;" type="button" onClick={cancel}>Cancel</Button>
  </FlowItems>
</form>
