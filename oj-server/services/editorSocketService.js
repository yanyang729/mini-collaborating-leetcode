/**
 * Created by yangyang on 7/22/17.
 */

module.exports = function (io) {
    const socketIdToSessionId = {};
    const collaborations = {};
    io.on('connection',(sockect) => {
        // console.log(sockect);
        const sessionId = sockect.handshake.query['sessionId'];
        // console.log(message);
        socketIdToSessionId[sockect.id] = sessionId;

        if(!(sessionId in collaborations)){
            collaborations[sessionId] = {
                'participants':[],
            }
        }

        collaborations[sessionId]['participants'].push(sockect.id);

        // event listeners
        sockect.on('change',(delta) => {
            console.log('change ' + delta + 'from ' + sessionId);
            forwardEvent(sockect.id,'change',delta);
        })


        sockect.on('cursorMove',(cursor) =>{
            console.log('new cursor ' + cursor + 'from sessionId' + sessionId);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = sockect.id;
            forwardEvent(sockect.id,'cursorMove',JSON.stringify(cursor))
        })
    })

    const forwardEvent = function(socketId, eventName, dataString){
        const sessionId = socketIdToSessionId[socketId];
        if (sessionId in collaborations){
            const participants = collaborations[sessionId]['participants'];
            for (let item of participants) {
                if (item != socketId){
                    io.to(item).emit(eventName,dataString);
                }
            }
        } else {
            console.log('sessionId not in collaborations')
        }
    }
}