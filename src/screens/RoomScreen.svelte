<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
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
  .member-panel {
      border: 1px solid black;
      border-radius: 5px;
      padding: 1rem;
  }

  .gap {
    margin: 1rem;
  }
</style>


<div>
  <div class="row">
    <div class="col"><h1>You are in room &quot;{$sockStoreActions.room.name}&quot;</h1></div>
  </div>
  {#if !$uiStoreActions.inGame}
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4">
        <div class="member-panel">
          <div class="row">
            <div class="col"><p><strong>Members</strong></p></div>
          </div>
          <ul>
            {#each $sockStoreActions.room.members as member}
              <div class="row">
                <div class="col"><li>{member.name}</li></div>
              </div>
            {/each}
          </ul>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
    {#if $sockStoreActions.room.members.length > 1}
      <div class="row gap">
        <div class="col">
          <Button id="start-game" on:click={startGame}>Start Game</Button>
        </div>
      </div>
    {/if}
  {:else}
    <GameScreen />
  {/if}
</div>
