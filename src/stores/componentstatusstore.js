//Stores information for use with the UI components

import { writable } from 'svelte/store';

const defaultStore = {
  inRoom:false,
  inGame:false,
  currentPlayer: null,
  word : '',
  guesses: [],
  winner: null,
  winnerList: [],
  gameOver: false,
  giveUp: false,
  roomFailure: false,
  quitStatus: false,
  limit5: false
}

const uiStore = writable({
  ...defaultStore,
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
            'name': data.client_name,
            'guess': data.guess
          };
        } else {
          winner = null;
        }
        ui.winner = winner;
        return ui;
      });
    },
    continueNextRound: (data) => {
      //remove the winner and add to the winner list
      uiStore.update(ui => {
        let newWinnerList = [...ui.winnerList];
        newWinnerList.push({...ui.winner});
        ui.winnerList = newWinnerList;
        ui.winner = null;
        ui.giveUp = false;
        ui.guesses = [];
        return ui;
      });
    },
    setGameOver: (data) => {
      //Add winner to winner list
      uiStore.update(ui => {
        let winner = {
          'id' : data.client_id,
          'name': data.client_name,
          'guess': data.guess
        };
        let newWinnerList = [...ui.winnerList];
        newWinnerList.push(winner);
        ui.winnerList = newWinnerList;
        ui.winner = null;
        ui.gameOver = true;
        return ui;
      });
    },
    reset: (data) => {
      uiStore.update(ui => {
        let resetStore = {
          registered: ui.registered,
          ...defaultStore
        };
        return resetStore;
      });
    },
    setGiveUp: () => {
      uiStore.update(ui => {
        ui.giveUp = true;
        return ui;
      });
    },
    setRoomFailure: (failstatus) => {
      uiStore.update(ui => {
        ui.roomFailure = failstatus;
        return ui;
      });
    },
    setAllPlayersQuit: (quitstatus) => {
      uiStore.update(ui => {
        ui.quitStatus = quitstatus;
        return ui;
      });
    },
    setLimit5: (limit5Status) => {
      uiStore.update(ui => {
        ui.limit5 = limit5Status;
        return ui;
      });
    }
};


export {uiStoreActions};
