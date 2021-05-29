const wsproto = 'wss';

const wsuri = wsproto + "://picgameserver.chrisbriant.uk:8080/ws";
const sock = new WebSocket(wsuri);

export default sock;
