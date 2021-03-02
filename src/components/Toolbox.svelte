<script>
  import {createEventDispatcher} from 'svelte';
  import Icon from 'svelte-awesome';
  import { eraser, pencil,beer,comment } from 'svelte-awesome/icons';

  const dispatch = createEventDispatcher();

  let showtip = false;
</script>

<style>
  .toolbox {
    display: inline-block;
    text-align: center;
    margin: auto;
  }

  .showtooltip {
    display: block;
    position: absolute;
    z-index: 10;
    bottom: 45%;
    left: 45%;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    border: solid black 1px;
  }

  .hidetooltip {
    display: none;
    position: relative;

  }


</style>

<div class="toolbox">
  <div
    class="tooltip"
    on:click={() => {dispatch('wipeboard')}}
    on:mouseover={() => {showtip = true}}
    on:mouseout={() => {showtip = false}}
  >
      <Icon
        data={eraser}
        scale="3"
        />
        <p class={showtip ? "showtooltip" : "hidetooltip"}>Erase the drawing</p>
  </div>
</div>
