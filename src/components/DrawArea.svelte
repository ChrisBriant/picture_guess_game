<script>
  //Component to allow the user to make guesses as to the word the picture represents
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import TextInput from './TextInput.svelte';
  import Canvas from './Canvas.svelte';
  import Toolbox from './Toolbox.svelte';
</script>

<style>

</style>


<div>
  <p><strong>The word is {$uiStoreActions.word}</strong></p>
  <Canvas drawMode={true}/>
</div>
