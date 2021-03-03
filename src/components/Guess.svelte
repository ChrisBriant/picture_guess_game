<script>
  //Component to allow the user to make guesses as to the word the picture represents
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import TextInput from './TextInput.svelte';
  import Button from './Button.svelte';
  import Canvas from './Canvas.svelte';

  let guess = '';

  const sendGuess = () => {
    console.log('SENDING GUESS');
  }
</script>

<style>

</style>


<div>
  <Canvas drawMode={false}/>
  <TextInput
   id = "guess"
   label = "Guess what the user is drawing"
   value = {guess}
   on:input = {e => {guess = e.target.value} }
  />
  <Button id="sendguess" on:click={sendGuess}>Guess</Button>
</div>
