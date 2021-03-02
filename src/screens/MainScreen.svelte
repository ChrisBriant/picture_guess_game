<script>
	//Screen to display the options for joining a room and lists other users
	import sock from '../services/socket';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';
	import RoomList from '../components/RoomList.svelte';
	import RoomScreen from '../screens/RoomScreen.svelte';
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
	 <TextInput
			id = "room-name"
			label = "Room Name"
			value = {roomName}
	   on:input = {e => {roomName = e.target.value} }
		 />
		 <Button id="sendroom" on:click={sendRoom}>Create Room</Button>
		 <RoomList />
	{/if}
</div>
