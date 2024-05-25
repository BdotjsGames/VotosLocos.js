var peerPrefix = "VotosLocosPreAlpha";

var peer = new Peer();
var connectedPeers = [];

// peer.on('connection', function(conn) {
//     connectedPeers.push(conn);
//     conn.on('data', function(data){
//       // Will print 'hi!'
//       console.log(data);
//       // if the data is model data, create a networked peer using the model data
//       // if the data is networkedstatediff, find networked player from this conn (id map? or obj attr?)
//       //   and send the networkedstatediff to the networked player
//     });
// });
peer.on('connection', onConnection);

function onConnection(conn) {
    //find networkedPeer 
    connectedPeers.push(conn);
    conn.on('data', function(data) {
        if(!conn.playerNetworked) {
            conn.playerNetworked = new PlayerNetworked(data.x,data.y, data.modelData);
        } else {
            conn.playerNetworked.receiveNetworkedState(data);
        }
    })
}

function getAllData() {

}


function hostOrConnectTo(peerid, modelData, scene) {
    try {
        var host = new Peer(peerPrefix+peerid);
        host.on('error', e=> {
            console.log(e)
            if(!host.connectionOpened) {
                // connect to host instead
            }
        });
        host.on('open', e=> {
            host.connectedPeers = [];
            console.log('started host')
            host.connectionOpened = true;
            // host.on('connection', onConnection);
            host.on('connection', function(conn) {
                //send data of all connected clients and self
                conn.send(modelData);
                host.connectedPeers.push(conn);
                conn.on('data', function (data) {
                    //recv data from client
                })
            })
        })
    } catch(e) {
        console.log(e);
    }
}
function connectTo(peerid, modelData, scene) {
    var conn = peer.connect(peerPrefix+peerid);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
        // here you have conn.id
        conn.send(modelData);
    });
    conn.on('error', function(e) {
        console.log(e);
    })
}


