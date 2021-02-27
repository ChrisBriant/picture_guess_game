<script>
	//Screen to display the options for joining a room and lists other users
	import sock from '../services/socket';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';
	import { sockStoreActions } from '../services/socketstore';

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
	<TextInput
		id = "room-input"
		label = "Room Name"
		value = {roomName}
    on:input = {e => {roomName = e.target.value} }
	 />
	 <Button on:click={sendRoom}>Create Room</Button>
</div>
