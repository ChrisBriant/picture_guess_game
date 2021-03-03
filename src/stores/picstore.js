import { writable } from 'svelte/store';
import sock from '../services/socket';

const picStore = writable([]);


const picStoreActions = {
    subscribe: picStore.subscribe,
    draw: (coords) => {
      picStore.update(pic => {
        let newPic = [...pic,{...coords}];
        return newPic;
      });
    },
    wipe: () => {
      picStore.update(pic => {
        let newPic = [];
        return newPic;
      });
    },
    sendPicture: (clientData) => {
      const unsubscribe = picStore.subscribe(async (picture) => {
        let payload = {
          'type' : 'picture',
          'client_id' : clientData.cid,
          'game_id' : clientData.gameId,
          'picture' : picture
        }
        await sock.send(JSON.stringify(payload));
      });
      unsubscribe();
    }
};


export {picStoreActions};
