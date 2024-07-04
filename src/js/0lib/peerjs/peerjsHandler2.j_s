// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// var hostPeerId = urlParams.get('peer');
// var peerEntities = [];
// var peerEntitiesHash = {};
// var peerIds = [];
// var peerConnections = [];

// var peerPrefix = "votosLocosPreAlpha"

// var id = null;
// var peer;
// // if(!hostPeerId)
//   id= peerPrefix
// var hostConnection;
// function setupPeerObject(peer) {
//   peer.on('open', function(id) {  
//     var url = (window.location+"").split('?')[0] + "?peer="+(hostPeerId||id);
//     console.log(url);
//     QRit(url);
//     peerIds.push(id);
//     if(hostPeerId) {
//       peerIds.push(hostPeerId);
//       console.log('attempting to connect to ', hostPeerId)
//       hostConnection = peer.connect(hostPeerId);
//       hostConnection.on('open', function() {
//         console.log('connected to host');
//         hostConnection.isHost = true;
//         setUpConnection(hostConnection);
//         hostPing = Date.now();
//         hostConnection.send(flags.getAllPeers);
//       })
//     }
//     peer.on('connection', function(conn){
//       console.log('connected to client', conn);
//       conn.on('open', function() {
//         console.log('client connection open')
//         peerIds.push(conn.peer);
//         setUpConnection(conn);
//       })
//     })
//     peer.on('close', function(c) {
//       console.log("Peer close ", c);
//     });
//   })
// }
// function beginP2P() {
//   peer = new Peer(id);
//   setupPeerObject(peer);
//   peer.on("error", function(error) {
//     console.log(error);
//     peer = new Peer();
//     if(!hostPeerId) hostPeerId= peerPrefix
//     setupPeerObject(peer);  
//   })
// }
// beginP2P();

// var flags ={
//   getAllPeers: 'getAllPeers',
//   updateData: 1,
//   ping1: 2,
//   ping2: 3,
// }



// function QRit(url) {
//   var QR_CODE = new QRCode("qrcode", {
//     width: 100,
//     height: 100,
//     colorDark: "#000000",
//     colorLight: "#ffffff",
//     correctLevel: QRCode.CorrectLevel.L,
//   });
//   QR_CODE.makeCode(url);
// }
// var hostPing;


// function createPeerConnection(peerId) {
//   var conn = peer.connect(peerId);
//   conn.on('open', function() {
//     setUpConnection(conn);
//   })
// }
// var p2pHostClient=1;
// var p2pSendAll=2;
// var p2pType = p2pHostClient;
// var simulateDroppedFrames = false;
// var simulateDroppedFramesRate = 0.5;
// // var dirtyNets = [];
// entities.push({
//   update: function() {
//     if(!player)return;
//     if(peerConnections.length==0)return;
//     // if(frameCount%2==0)return;
//     var netData = player.getNetData();
//     netData.flag = flags.updateData;
//     // peerConnections.forEach(connection => {
//     //   connection.send(netData);
//     // });
//     if(p2pType == p2pHostClient) {
//       if(hostConnection) {
//         //this is accesible in the object, but it isn't mentioned in the api
//         //and since it starts with _ its probably not reliable
//         // if(hostConnection._buffering) {
//         if(hostConnection.bufferSize>0) {
//           console.log("host buffering");
//           //since we post updates every frame, if it is buffering just wait for the next frame that it is not buffering
//           return;
//         }
//         if(simulateDroppedFrames&&Math.random()<simulateDroppedFramesRate) {
//           return;
//         }
//         netData.forwardToAll = true;
//         hostConnection.send(netData);
//       } else {
//         var netDatas = [];
//         netData.peerId = peer.id;
//         netDatas.push(netData);
//         peerEntities.forEach(entity=> {
//           var nd = entity.getNetData();
//           if(nd) {
//             nd.peerId = entity.peerId;
//             netDatas.push(nd);
//           }
//         })
//         var data = {
//           netDatas
//         }
//         peerConnections.forEach(connection => {
//           if(connection.bufferSize>0)return;
//           if(simulateDroppedFrames&&Math.random()<simulateDroppedFramesRate) {
//             return;
//           }
//           //again, dont send data if it is already busy sending data
//           connection.send(data);
//         })
//       }
//     } else 
//     for(var i=0;i<peerConnections.length;i++) {
//       var connection = peerConnections[i];
//       if(connection.closed) {
//         peerConnections.splice(i--,1);
//       } else {
//         connection.send(netData);
//       }
//     }
//   }
// })

// function setUpConnection(conn) {
//   var peerEntity = new NetPlayer(conn.peer);
//   peerEntities.push(peerEntity);
//   peerEntitiesHash[conn.peer] = peerEntity;
//   peerConnections.push(conn);
//   var startPing;
//   var ping;
//   conn.on('close', function(){
//     console.log('closedConnection');
//     peerEntity.shouldDelete = true;
//     conn.closed = true;
//   });
//   conn.on('data', function(data) {
//     if(data == flags.ping2) {
//       ping = Date.now() - startPing;
//       // conn.ping = ping;
//       console.log("Ping: " + ping);
//       return;
//     }
//     if(data == flags.ping1) {
//       conn.send(flags.ping2);
//       return;
//     }
//     if(data===flags.getAllPeers) {
//       conn.isClient = true;
//       conn.send({
//         peerIds
//       })
//     }
//     if(data.peerIds) {
//       hostPing = Date.now() - hostPing;
//       //connect to your peers
//       data.peerIds.forEach(peerId=>{
//         //do not reconnect to host
//         //do not connect to yourself
//         if(peerIds.includes(peerId))return;
//         createPeerConnection(peerId);
//       })
//       peerIds = data.peerIds;
//     }
//     if(data.flag==flags.updateData) {
//       // dirtyNets.push()
//       // setTimeout(() => {
//         if(data.time<peerEntity.netUpdateTime)return;
//         peerEntity.setNetData(data);
//       // }, 100,);//20+200*Math.random());
//     }
//     if(data.netDatas) {
//       data.netDatas.forEach(data => {
//         var entity = peerEntitiesHash[data.peerId];
//         if(!entity) {
//           //this will happen for yourself
//           return;
//         }
//         entity.setNetData(data);
//       })
//     }
//   })
  
//   startPing = Date.now();
//   conn.send(flags.ping1);
// }

// window.addEventListener('beforeunload', function() {
//   // peerConnections.forEach(conn => {
//   //   conn.close();
//   // })
//   peer.destroy();
//   return null;
// }, false)

// /*
// User1 creates a room and creates a link for users to join
// User2 joins and makes a host connection to User1
//   User1 sends peer list, which is empty, so nothing happens
//     (could actually just not send in this case)
//   User1 now has one peer client connection to User2
//   User2 now has one host connection to User1
// User3 joins with User1's code
//   User1 sends list [User2]
//   User3 connects to User2
//   User2 receives a client connection
//   User1: H[]             C[User2, User3]
//   User2: H[User1]        C[User3]
//   User3: H[User1, User2] C[]

// User4 joines with User2's code
//   User2 sends its list of all peer ids
//   User4 connects to [User1, User2, User3]

// Any new user can join with any peers link,
//   The peer will send list of peerIds which needs to include its host
// */