<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import DrawArea from '../components/DrawArea.svelte';
  import Guess from '../components/Guess.svelte';
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
  $: console.log('UI STORE',$uiStoreActions);

  const submit = () => {
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
          <h3>This is a modal</h3>
      </div>
      <div slot="footer">
          <br/>
          <Button type="button"
          on:click={submit}
          >
              Yes
          </Button>
          <Button type="button"
          on:click={() => {dispatch('cancel')}}
          >
              No
          </Button>
      </div>
    </Modal>
  {/if}
</div>
