<script>
  //Component to allow the user to make guesses as to the word the picture represents
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import TextInput from './TextInput.svelte';
  import Canvas from './Canvas.svelte';
  import Toolbox from './Toolbox.svelte';
  import GuessList from './GuessList.svelte';
</script>

<style>

</style>


<div class="row">
  <div class="col-8">
    <p>The word is <strong id='the-word'>{$uiStoreActions.word}</strong></p>
    <Canvas drawMode={true}/>
  </div>
  <div class="col-4">
    <h2>Guesses</h2>
    <GuessList />
  </div>
</div>
