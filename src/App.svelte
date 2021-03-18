<script>
	import sock from './services/socket';
	import TextInput from './components/TextInput.svelte';
	import Button from './components/Button.svelte';
	import StartScreen from './screens/StartScreen.svelte';
	import MainScreen from './screens/MainScreen.svelte';
	import { sockStoreActions } from './stores/socketstore';
	import { uiStoreActions } from './stores/componentstatusstore';
	import { picStoreActions } from './stores/picstore';
	import Toolbox from './components/Toolbox.svelte';

	$:console.log('STORE',$sockStoreActions);

	let connected = false;


	if (sock) {
	 sock.onopen = function() {
			console.log("Connected");
			connected = true;
	 }

	 sock.onclose = (e) =>  {
			console.log("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
			console.log(e,sock);
			connected = false;
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
				 	sockStoreActions.setRoomList(JSON.parse(data.rooms));
					break;
				 case 'room_entrance':
				 	 sockStoreActions.setRoom(data);
					 uiStoreActions.setInRoom(true);
					 //dispatch({type:'enterRoom', payload:data});
					 break;
				 case 'room_exit':
				 		//// TODO: Factor in room exiting
					 //sockStoreActions.exitRoom();
					 uiStoreActions.setInRoom(false);
					 inRoom = false;
					 //dispatch({type:'exitRoom', payload:data});
					 break;
				 case 'game_start':
					 //sockStoreActions.exitRoom();
					 uiStoreActions.setStartGame({
						 'startPlayer' : data.startplayer,
						 'gameId' : data.game_id
					 });
					 //dispatch({type:'exitRoom', payload:data});
					 break;
				 case 'word':
					 uiStoreActions.setWord(data.word);
					 break;
				 case 'picture':
					 picStoreActions.recievePicture(data.picture);
					 break;
				 case 'guess':
				 	 if (data.correct) {
						 uiStoreActions.setWinner(data);
					 }
					 uiStoreActions.setGuess(data);
					 break;
				 case 'new_round':
				 	 uiStoreActions.continueNextRound();
				 	 uiStoreActions.setWinner(false);
					 uiStoreActions.setStartGame({
						 'startPlayer' : data.startplayer,
						 'gameId' : data.game_id
					 });
					 break;
				 case 'win_from_give_up':
				 	 console.log('WIN FROM GIVE UP', $uiStoreActions.currentPlayer);
					 data = {
						 client_id : $uiStoreActions.currentPlayer.id,
						 client_name : $uiStoreActions.currentPlayer.name,
						 guess : 'Player(s) gave up'
					 }
					 uiStoreActions.setWinner(data);
					 //uiStoreActions.setGameOver(data);
					 break;
				 case 'game_over':
					 uiStoreActions.setGuess(data);
					 uiStoreActions.setGameOver(data);
					 break;
				 case 'game_over_from_give_up':
					 data = {
						 client_id : $uiStoreActions.currentPlayer.id,
						 client_name : $uiStoreActions.currentPlayer.name,
						 guess : 'Player(s) gave up'
					 }
					 uiStoreActions.setGameOver(data);
					 break;
				 case 'game_over_from_give_up':
					 data = {
						 client_id : $uiStoreActions.currentPlayer.id,
						 client_name : $uiStoreActions.currentPlayer.name,
						 guess : 'Player(s) gave up'
					 }
					 uiStoreActions.setGameOver(data);
					 break;
					case 'giveup':
						let guessData = {
													  guess: "I give up!",
													  client_id: data.client_id,
													  client_name: data.client_name,
													  correct: false
												}
					 uiStoreActions.setGuess(guessData);
					 if($sockStoreActions.id === data.client_id) {
						 uiStoreActions.setGiveUp();
					 }
					 break;
			 	 case 'room_failure':
				 	uiStoreActions.setRoomFailure(true);
				 	break;
				 case 'everyone_quit':
				 	uiStoreActions.setAllPlayersQuit(true);
					break;
				case 'limit_5':
 				 	uiStoreActions.setLimit5(true);
 					break;
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
	{#if connected}
		{#if !$uiStoreActions.registered}
			<StartScreen />
		{:else}
			<MainScreen />
		{/if}
	{:else}
		<div class="row">
			<div class="col">
				<h2>Sorry there is no connection to the server!</h2>
				<p>Please try again later.</p>
			</div>
		</div>
	{/if}

</main>
