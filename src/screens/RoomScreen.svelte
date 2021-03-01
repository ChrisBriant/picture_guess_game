<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../services/socketstore';
  import { uiStoreActions } from '../components/componentstatusstore';
  import Button from '../components/Button.svelte';
  import GameScreen from './GameScreen.svelte';


  const exitRoom = async () => {
    let payload = {
      'type' : 'exit_room',
      'client_id' : $sockStoreActions.id,
      'name' : $sockStoreActions.room.name
    }
    await sock.send(JSON.stringify(payload));
  }

  const startGame = async () => {
    let payload = {
    'type' : 'start_game',
    'name' : $sockStoreActions.room.name
    }
    await sock.send(JSON.stringify(payload));
  }
</script>

<style>

</style>


<div>
  <div class="row">
    <div class="col"><h1>You are in room {$sockStoreActions.room.name}</h1></div>
  </div>
  {#if !$uiStoreActions.inGame}
    <div class="row">
      <div class="col"><p>Members</p></div>
    </div>
    {#each $sockStoreActions.room.members as member}
      <div class="row">
        <div class="col"><p>{member.name}</p></div>
      </div>
    {/each}
    {#if $sockStoreActions.room.members > 1}
      <div class="row">
        <div class="col">
          <Button on:click={startGame}>Start Game</Button>
        </div>
      </div>
    {/if}
    <div class="row">
      <div class="col">
        <Button id="start-game" on:click={startGame}>Start Game</Button>
      </div>
    </div>
  {:else}
    <GameScreen />
  {/if}
</div>
