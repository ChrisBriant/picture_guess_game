<script>
	//Screen to display the options for joining a room and lists other users
	import sock from '../services/socket';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';
	import RoomList from '../components/RoomList.svelte';
	import RoomScreen from '../screens/RoomScreen.svelte';
	import Modal from '../components/Modal.svelte';
	import { sockStoreActions } from '../stores/socketstore';
	import { uiStoreActions } from '../stores/componentstatusstore';

  let roomName = '';

	//$:console.log('STORE',$sockStoreActions);

 const sendRoom = async () => {
   let payload = {
     'type' : 'create_room',
     'client_id' : $sockStoreActions.id,
     'name' : roomName
   }
   console.log(payload);
   await sock.send(JSON.stringify(payload));
 }

</script>

<style>

</style>


<div>
	{#if $uiStoreActions.inRoom }
		<RoomScreen />
	{:else}
		<div class="row">
			<div class="col-4"></div>
			<div class="col-4">
		 		<TextInput
				id = "room-name"
				label = "Room Name"
				value = {roomName}
		   	on:input = {e => {roomName = e.target.value} }
			 />
			 <Button id="sendroom" on:click={sendRoom}>Create Room</Button>
			</div>
			<div class="col-4"></div>
		</div>
		<RoomList />
	{/if}
	{#if $uiStoreActions.roomFailure }
		<Modal on:cancel="{() => {uiStoreActions.setRoomFailure(false)}}"
			on:close="{() => {uiStoreActions.setRoomFailure(false)}}">
			<div slot="header" class="modal-title">
					<h3>Unable to Create Room</h3>
			</div>
			<div slot="content">
				<p>Sorry, this room already exists, please choose a different name.</p>
			</div>
			<div slot="footer">
					<br/>
					<Button type="button"
						id="ok"
						on:click={() => {uiStoreActions.setRoomFailure(false)}}
					>
							Ok
					</Button>
			</div>
		</Modal>
	{/if}
	{#if $uiStoreActions.limit5 }
		<Modal on:cancel="{() => {uiStoreActions.setRoomFailure(false)}}"
			on:close="{() => {uiStoreActions.setRoomFailure(false)}}">
			<div slot="header" class="modal-title">
					<h3>Unable to Join Room</h3>
			</div>
			<div slot="content">
				<p>Sorry, this room has reached it's limit of five players. You can
				create a new room and wait for players to join.</p>
			</div>
			<div slot="footer">
					<br/>
					<Button type="button"
						id="ok"
						on:click={() => {uiStoreActions.setLimit5(false)}}
					>
							Ok
					</Button>
			</div>
		</Modal>
	{/if}
</div>
