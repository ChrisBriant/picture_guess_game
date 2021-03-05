//Stores information for use with the UI components

import { writable } from 'svelte/store';

const uiStore = writable({
  registered:false,
  inRoom:false,
  inGame:false,
  currentPlayer: null,
  word : '',
  guesses: [],
  winner: null,
  winnerList: []
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
    },
    setGuess: (guess) => {
      uiStore.update(ui => {
        let newGuesses = [...ui.guesses];
        newGuesses.push(guess);
        ui.guesses = newGuesses;
        return ui;
      });
    },
    setWinner: (data) => {
      uiStore.update(ui => {
        let winner;

        if(data) {
          winner = {
            'id' : data.client_id,
            'name': data.client_name
          };
        } else {
          winner = null;
        }
        ui.winner = winner;
        return ui;
      });
    },
    continueNextRound: () => {
      //remove the winner and add to the winner list
      uiStore.update(ui => {
        let newWinnerList = [...ui.winnerList];
        newWinnerList.push(ui.winner);
        ui.winnerList = newWinnerList;
        ui.winner = null;
        return ui;
      });
    }
};


export {uiStoreActions};
