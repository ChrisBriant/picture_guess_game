<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import { picStoreActions } from '../stores/picstore';
  import DrawArea from '../components/DrawArea.svelte';
  import Guess from '../components/Guess.svelte';
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
  import {groupBy} from '../services/helpers';


  $: console.log('UI STORE',$uiStoreActions);

  let scores = {};
  let scoreKeys = [];

  //Call game over if it is gameover has been added
  $: $uiStoreActions.gameOver, gameOver()

  const submit = async () => {
    //Dispatch the signal to start the new round
    let payload = {
      'type' : 'next_round',
      'game_id' : $uiStoreActions.gameId
    }
    await sock.send(JSON.stringify(payload));
    console.log('I want to submit something');
  }



  const gameOver = () => {
    //Calculate the scores
    console.log('GAMEOVER STATUS', $uiStoreActions.gameOver);
    if($uiStoreActions.gameOver) {
      scores = groupBy($uiStoreActions.winnerList,'name');
      console.log('SCORES', scores);
      //scoreKeys = scores.keys();
    }
  }

  const clearGame = async () => {
    let payload = {
      'type' : 'destroy_room',
      'client_id' :  $sockStoreActions.id
    }
    await sock.send(JSON.stringify(payload));

    //Clear stores
    uiStoreActions.reset();
    picStoreActions.reset();
    sockStoreActions.reset();
  }

</script>

<style>

</style>


<div>
  {#if $uiStoreActions.currentPlayer.id === $sockStoreActions.id}
    <p>You are the start player you go first!AAAAAA</p>
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
  {#if $uiStoreActions.gameOver}
    <Modal on:cancel="{() => dispatch('cancel')}"
      on:close="{() => dispatch('cancel')}">
      <div slot="header" class="modal-header">
          <h3>Game Over</h3>
      </div>
      <div slot="content">
        <p>Here are the scores:</p>
        {#each Object.keys(scores) as player}
          <div class="row">
            <div class="col">
              <p>{player}</p>
            </div>
            <div class="col">
              <p>{scores[player].length}</p>
            </div>
            <div class="col">
              {#each scores[player] as score}
                <div class="row">
                  <div class="col">
                    <p>{score.guess}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      <div slot="footer">
          <br/>
          <Button type="button"
            id="continue"
            on:click={clearGame}
          >
              Continue
          </Button>
      </div>
    </Modal>
  {/if}
  {#if $uiStoreActions.quitStatus}
    <Modal on:cancel="{() => dispatch('cancel')}"
      on:close="{() => dispatch('cancel')}">
      <div slot="header" class="modal-header">
          <h3>Game Over</h3>
      </div>
      <div slot="content">
        <div class="Row">
          <div class="Col">
            <p>All other players have quit, press continue to return to the lobby.</p>
          </div>
        </div>
      </div>
      <div slot="footer">
          <br/>
          <Button type="button"
            id="continue"
            on:click={clearGame}
          >
              Continue
          </Button>
      </div>
    </Modal>
  {/if}
</div>
