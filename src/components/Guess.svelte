<script>
  //Component to allow the user to make guesses as to the word the picture represents
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import TextInput from './TextInput.svelte';
  import Button from './Button.svelte';
  import Canvas from './Canvas.svelte';
  import GuessList from './GuessList.svelte';

  let guess = '';

  const sendGuess = async () => {
    console.log('SENDING GUESS');
    let payload = {
      'type' : 'guess',
      'client_id' : $sockStoreActions.id,
      'game_id' : $uiStoreActions.gameId,
      'guess' : guess
    }
    await sock.send(JSON.stringify(payload));
  }
</script>

<style>

</style>


<div>
  <div class="row">
    <div class="col">
      <Canvas drawMode={false}/>
    </div>
    <div class="col">
      <TextInput
       id = "guess"
       label = "Guess what the user is drawing"
       value = {guess}
       on:input = {e => {guess = e.target.value} }
      />
      <Button id="sendguess" on:click={sendGuess}>Guess</Button>
      <GuessList />
    </div>
  </div>
</div>
