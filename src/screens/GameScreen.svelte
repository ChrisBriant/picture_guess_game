<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import DrawArea from '../components/DrawArea.svelte';
  import Guess from '../components/Guess.svelte';
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
  $: console.log('UI STORE',$uiStoreActions);

  const submit = async () => {
    uiStoreActions.continueNextRound();
    //Dispatch the signal to start the new round
    let payload = {
      'type' : 'next_round',
      'game_id' : $uiStoreActions.gameId
    }
    await sock.send(JSON.stringify(payload));
    console.log('I want to submit something');
  }
</script>

<style>

</style>


<div>
  {#if $uiStoreActions.currentPlayer.id === $sockStoreActions.id}
    <p>You are the start player you go first!</p>
    <DrawArea />
  {:else}
    <p>{$uiStoreActions.currentPlayer.name} is the start player.</p>
    <Guess />
  {/if}
  {#if $uiStoreActions.winner}
    <Modal on:cancel="{() => dispatch('cancel')}"
      on:close="{() => dispatch('cancel')}">
      <div slot="header" class="modal-header">
          <h3>Winner!</h3>
      </div>
      <div slot="content">
        <p>{$uiStoreActions.winner.name} has won. Click continue to play the next round.</p>
      </div>
      <div slot="footer">
          <br/>
          <Button type="button"
            id="continue"
            on:click={submit}
          >
              Continue
          </Button>
      </div>
    </Modal>
  {/if}
</div>
