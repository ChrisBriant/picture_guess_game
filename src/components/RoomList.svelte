<script>
	import sock from '../services/socket';
  import { sockStoreActions } from '../services/socketstore';

  $:console.log('ROOMS', $sockStoreActions.rooms)

  const joinRoom = async (roomID) => {
    console.log('Trying to enter the room', roomID);
    let payload = {
      'type' : 'enter_room',
      'client_id' : $sockStoreActions.id,
      'name' : roomID
    }
    await sock.send(JSON.stringify(payload));
  }
</script>

<style>

</style>


<div>
  {#if $sockStoreActions.rooms.length > 0}
      {#each $sockStoreActions.rooms as room, i}
        <div class="row" key={i}>
          <div class="col">
            <p>{room.name}</p>
          </div>
          <div class="col">
            <p>{room.owner}</p>
          </div>
          <div class="col">
            <p>{room.members.length}</p>
          </div>
          <div class="col">
            <ul>
              {#each room.members as member}
                {member}
              {/each}
            </ul>
          </div>
          <div class="col">
            {#if room.locked === 'false' }
              <p><a href='#' class="join-room" on:click={() => {joinRoom(room.name)}}>Join</a></p>
            {:else}
              <p>Game in progress</p>
            {/if}
          </div>
        </div>
      {/each}
  {/if}
</div>
