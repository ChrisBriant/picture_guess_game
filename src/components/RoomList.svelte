<script>
	import sock from '../services/socket';
  import { sockStoreActions } from '../stores/socketstore';

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
	.room-panel {
			border: 1px solid black;
			border-radius: 5px;
			padding: 1rem;
	}
</style>


<div class="{$sockStoreActions.rooms.length>0 ?'room-panel' : '' }">
  {#if $sockStoreActions.rooms.length > 0}
			<h2>Rooms</h2>
			<div class="row">
				<div class="col">
					<strong>Room Name</strong>
				</div>
				<div class="col">
					<strong>Owner</strong>
				</div>
				<div class="col">
				</div>
				<div class="col">
					<strong>Players</strong>
				</div>
				<div class="col"></div>
			</div>
      {#each $sockStoreActions.rooms as room, i}
        <div class="row" key={i}>
          <div class="col">
            <p>{room.name}</p>
          </div>
          <div class="col">
            <p>{room.owner_name}</p>
          </div>
          <div class="col">
            <p>{room.members.length}</p>
          </div>
          <div class="col">
						<ul>
              {#each room.user_names as member}
                <li>{member}</li>
              {/each}
						</ul>
          </div>
          <div class="col">
            {#if room.locked === 'false' }
              <p><a id={room.name} href='#' class="join-room" on:click={() => {joinRoom(room.name)}}>Join</a></p>
            {:else}
              <p>Game in progress</p>
            {/if}
          </div>
        </div>
      {/each}
  {/if}
</div>
