//Stores information related to the socket connection

import { writable } from 'svelte/store';

const socketStore = writable({
  rooms: [],
  room: {}
});

const sockStoreActions = {
    subscribe: socketStore.subscribe,
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
    },
    setRoom: (room) => {
      socketStore.update(sock => {
        sock.room = room;
        return sock;
      });
    },
    reset: () => {
      socketStore.update(sock => {
        let resetSock = {
          ...sock,
          room: []
        }
        return resetSock;
      });
    }
};


export {sockStoreActions};
