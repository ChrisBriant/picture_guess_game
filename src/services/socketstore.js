//Stores information related to the socket connection

import { writable } from 'svelte/store';

const socketStore = writable({});

const sockStoreActions = {
    subscribe: socketStore.subscribe,
    //// TODO: Try using a library like the one below to draw segments
    //https://github.com/alexbol99/flatten-js
    register: (id) => {
      socketStore.update(sock => {
        sock.id = id;
        return sock;
      });
    },
    addClientList: (clients) => {
      socketStore.update(sock => {
        sock.clients = clients;
        return sock;
      });
    },
    setName: (name) => {
      socketStore.update(sock => {
        sock.name = name;
        return sock;
      });
    },
    setRoomList: (rooms) => {
      socketStore.update(sock => {
        sock.rooms = rooms;
        return sock;
      });
    }
};


export {sockStoreActions};
