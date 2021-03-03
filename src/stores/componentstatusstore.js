//Stores information for use with the UI components

import { writable } from 'svelte/store';

const uiStore = writable({
  registered:false,
  inRoom:false,
  inGame:false,
  currentPlayer: null,
  word : ''
});

const uiStoreActions = {
    subscribe: uiStore.subscribe,
    setRegistered: () => {
      uiStore.update(ui => {
        ui.registered = true;
        return ui;
      });
    },
    setInRoom: (inRoom) => {
      uiStore.update(ui => {
        ui.inRoom = inRoom;
        return ui;
      });
    },
    setStartGame: (data) => {
      uiStore.update(ui => {
        ui.inGame = true;
        ui.currentPlayer = data.startPlayer;
        ui.gameId = data.gameId;
        return ui;
      });
    },
    setWord: (word) => {
      uiStore.update(sock => {
        sock.word = word;
        return sock;
      });
    }
};


export {uiStoreActions};
