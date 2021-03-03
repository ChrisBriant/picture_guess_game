<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import DrawArea from '../components/DrawArea.svelte';
  import Guess from '../components/Guess.svelte';

  $: console.log('UI STORE',$uiStoreActions);
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
</div>
