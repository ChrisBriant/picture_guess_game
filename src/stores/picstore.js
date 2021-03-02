import { writable } from 'svelte/store';


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
    }
};


export {picStoreActions};
