<script>
	import sock from './services/socket';
	import TextInput from './components/TextInput.svelte';
	import Button from './components/Button.svelte';
	import StartScreen from './screens/StartScreen.svelte';
	import MainScreen from './screens/MainScreen.svelte';
	import { sockStoreActions } from './services/socketstore';
	import { uiStoreActions } from './components/componentstatusstore';


	$:console.log('STORE',$sockStoreActions);


	if (sock) {
	 sock.onopen = function() {
			console.log("Connected");
	 }

	 sock.onclose = (e) =>  {
			console.log("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
			//this = null;
			console.log(e,sock);
	 }

	 sock.onmessage = function(e) {
		 let data = JSON.parse(e.data)
		 //let data = e;
		 console.log(data);
		 switch(data.type) {
				 case 'register':
					 sockStoreActions.register(data.yourid);
					 break;
			 	 case 'client_list':
				 	sockStoreActions.addClientList(data.clients)
				 	break;
				 case 'set_name':
				 	sockStoreActions.setName(data.message);
					uiStoreActions.setRegistered();
					break;
				 case 'room_list':
				 	sockStoreActions.setRoomList(data.rooms);
					break;
				 // case 'room_entrance':
					//  dispatch({type:'enterRoom', payload:data});
					//  break;
				 // case 'room_exit':
					//  dispatch({type:'exitRoom', payload:data});
					//  break;
				 // case 'game_exit':
					//  dispatch({type:'exitGameAndRoom', payload:data});
					//  break;
				 // case 'room_exit_nonmember':
					//  dispatch({type:'exitRoomKnockout', payload:data});
					//  break;
				 // case 'hand':
					//  dispatch({type:'hand', payload:data});
					//  break;
				 // case 'new_round':
					//  dispatch({type:'roundResult', payload:data});
					//  break;
				 // case 'destroy_room':
					//  dispatch({type:'destroyRoom', payload:JSON.parse(data.rooms)});
					//  break;
				 // case 'room_message':
					//  dispatch({type:'roomMessage', payload:data});
					//  break;
				 // case 'in_room_pm':
					//  dispatch({type:'roomPm', payload:data});
					//  break;
				 // case 'trump_selected':
					//  dispatch({type:'newTrump', payload:data});
					//  break;
				 // case 'end_game':
					//  dispatch({type:'endGame', payload:data});
					//  break;
				 // case 'tie_break':
					//  dispatch({type:'tieBreak', payload:data});
					//  break;
				 // case 'end_tie_break':
					//  dispatch({type:'endTieBreak', payload:data});
					//  break;
				 // case 'win_as_knockout':
					//  dispatch({type:'winAsKnockout', payload:data});
					//  break;
				 // case 'knockout':
					//  dispatch({type:'knockout', payload:data});
					//  break;
				 default:
				 	console.log('default aciton');
		 }
	}
 }

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
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>


<main>
	<h1>Picture Game</h1>
	{#if !$uiStoreActions.registered}
		<StartScreen />
	{:else}
		<MainScreen />
	{/if}

</main>
