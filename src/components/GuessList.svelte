<script>
  //Displays the list of guesses made by users
  import { uiStoreActions } from '../stores/componentstatusstore';
  import Canvas from './Canvas.svelte';
  import Icon from 'svelte-awesome';
  import { check, times } from 'svelte-awesome/icons';
</script>

<style>

</style>

<div>
  {#if $uiStoreActions.guesses.length > 0}
      {#each $uiStoreActions.guesses as guess }
        <div class="row">
          <div class="col"><p>{guess.client_name}:</p></div>
          <div class="col"><p>{guess.guess}</p></div>
          {#if guess.correct }
            <div class="col">
              <Icon
                data={check}
                scale="1"
              />
            </div>
          {:else}
            <div class="col">
              <Icon
                data={times}
                scale="1"
              />
            </div>
          {/if}
        </div>
      {/each}
  {/if}
</div>
