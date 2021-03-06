<script>
  import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';
  import { uiStoreActions } from '../stores/componentstatusstore';
  import DrawArea from '../components/DrawArea.svelte';
  import Guess from '../components/Guess.svelte';
  import Modal from '../components/Modal.svelte';
  import Button from '../components/Button.svelte';
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

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
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
            on:click={submit}
          >
              Continue
          </Button>
      </div>
    </Modal>
  {/if}
</div>
