<script>
	import sock from '../services/socket';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';
	import { sockStoreActions } from '../stores/socketstore';

	//$:console.log('STORE',$sockStoreActions);
	let name = '';

 const sendName = async () => {
	 console.log('sending name');
	 let payload = {
		'type' : 'name',
		'client_id' : $sockStoreActions.id,
		'name' : name
	}
	console.log(payload);
	await sock.send(JSON.stringify(payload));
}

</script>

<style>

</style>


<div>
	<TextInput
		id = "name"
		label = "Enter Name"
		value = {name}
		on:input = {e => {name = e.target.value} }
	 />
	 <Button id="sendname" on:click={sendName}>Start</Button>
</div>
