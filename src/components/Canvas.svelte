<script>
	import { onMount } from 'svelte';
  import { picStoreActions } from '../stores/picstore';
	import { uiStoreActions } from '../stores/componentstatusstore';
	import { sockStoreActions } from '../stores/socketstore';
	import Toolbox from '../components/Toolbox.svelte';

  export let width = 300;
  export let height = 200;
	export let drawMode = false;

	let canvas = null;
  let m = { x: 0, y: 0, pos:'' };
  let draw = false;


	const updateCanvas = () => {
		if(canvas) {
			if($uiStoreActions.currentPlayer.id !== $sockStoreActions.id) {
				console.log('REDRAW THE CANVAS');
				reDraw();
			} else {
				console.log('LEAVE CANVAS');
			}
		}
	}

  $: console.log($picStoreActions);

	$: $picStoreActions, updateCanvas();

	onMount(() => {
		const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#edeae6';
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 4;

	});

	const reDraw = () => {
		//Wipe first
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = '#edeae6';
		ctx.fillRect(0, 0, width, height);
		//Now redraw
		console.log('Redrawing');
		ctx.moveTo($picStoreActions[0].x,$picStoreActions[0].y);
		for(let i=0;i<$picStoreActions.length;i++) {
			if($picStoreActions[i].pos === 's') {
				ctx.beginPath();
				ctx.moveTo($picStoreActions[i].x,$picStoreActions[i]);
			} else if ($picStoreActions[i].pos === 'e') {
				ctx.closePath();
			} else {
				ctx.lineTo($picStoreActions[i].x,$picStoreActions[i].y);
				ctx.stroke();
			}
		}
	}

	const wipeBoard = () => {
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = '#edeae6';
		ctx.fillRect(0, 0, width, height);
		picStoreActions.wipe();
	}

  const handleClick = (e) => {
    let ctx = e.target.getContext('2d');
		//ctx.beginPath();
    m.x = e.clientX - e.target.offsetLeft;
    m.y = e.clientY - e.target.offsetTop;
		m.pos = 's';
    console.log('Click');
    draw = true;
		ctx.beginPath();
    ctx.moveTo(m.x,m.y);
		picStoreActions.draw(m);
  }

  const handleDrag = (e) => {
    let ctx = e.target.getContext('2d');
		m.x = e.clientX - e.target.offsetLeft;
		m.y = e.clientY - e.target.offsetTop;
		m.pos = '';
    if(draw) {
      ctx.lineTo(m.x,m.y);
      ctx.stroke();
      //Add to store
      picStoreActions.draw(m);
    }
  }

  const handleUnClick = (e) => {
		let ctx = e.target.getContext('2d');
		m.x = e.clientX - e.target.offsetLeft;
		m.y = e.clientY - e.target.offsetTop;
		m.pos = 'e';
		ctx.closePath();
		picStoreActions.draw(m);
		let payload = {
			cid : $sockStoreActions.id,
			gameId : $uiStoreActions.gameId
		}
		picStoreActions.sendPicture(payload);
    draw = false;
    console.log('Un Click');
  }
</script>

<style>
	canvas {
		cursor:crosshair;
	}

	.tool-panel {
		text-align: center;
		margin:auto;
	}
</style>

<div>
	{#if drawMode}
		<canvas
		  bind:this={canvas}
		  on:mousemove={(e) => handleDrag(e)}
		  on:mousedown={(e) => handleClick(e)}
		  on:mouseup={(e) => handleUnClick(e)}
			width={width}
			height={height}
		>
		</canvas>
		<div class="tool-panel">
			<Toolbox
				on:wipeboard={wipeBoard}
				on:redraw={reDraw}
			 />
		 </div>
	{:else}
		<canvas
			bind:this={canvas}
			width={width}
			height={height}
		>
		</canvas>
	{/if}
</div>
