<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../services/socketstore';
  import { uiStoreActions } from '../components/componentstatusstore';
</script>

<style>

</style>


<div>
  {#if $uiStoreActions.currentPlayer.id === $sockStoreActions.id}
    <p>You are the start player you go first!</p>
  {:else}
    <p>{$uiStoreActions.currentPlayer.name} is the start player.</p>
  {/if}
</div>
