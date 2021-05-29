<script>
	import sock from '../services/socket';
	import TextInput from '../components/TextInput.svelte';
	import Button from '../components/Button.svelte';
	import { sockStoreActions } from '../stores/socketstore';

	let name = '';

 const sendName = async () => {
	 let payload = {
		'type' : 'name',
		'client_id' : $sockStoreActions.id,
		'name' : name
	}
	await sock.send(JSON.stringify(payload));
}

</script>

<style>

</style>


<div class="row">
	<div class="col-4"></div>
	<div class="col-4">
		<TextInput
			id = "name"
			label = "Enter Name"
			value = {name}
			on:input = {e => {name = e.target.value} }
		 />
		 <Button id="sendname" on:click={sendName}>Start</Button>
	 </div>
	 <div class="col-4"></div>
</div>
