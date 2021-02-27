//Stores information for use with the UI components

import { writable } from 'svelte/store';

const uiStore = writable({
  registered:false
});

const uiStoreActions = {
    subscribe: uiStore.subscribe,
    setRegistered: () => {
      uiStore.update(ui => {
        ui.registered = true;
        return ui;
      });
    },
};


export {uiStoreActions};
