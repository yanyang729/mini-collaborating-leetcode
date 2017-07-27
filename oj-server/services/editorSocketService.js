/**
 * Created by yangyang on 7/22/17.
 */

const redisClient = require('../modules/redisClient');

module.exports = function (io) {
    const socketIdToSessionId = {};
    const collaborations = {};
    const sessionPath ='/ojserver/';
    io.on('connection',(sockect) => {
        // console.log(sockect);
        const sessionId = sockect.handshake.query['sessionId'];

        // IS NOT NECESSARY?
        socketIdToSessionId[sockect.id] = sessionId;

        // if(!(sessionId in collaborations)){
        //     collaborations[sessionId] = {
        //         'participants':[],
        //     }
        // }


        // TODO : REFACTOR BELOW
        if (sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(sockect.id);
        }else {

            redisClient.get(sessionPath + sessionId,function (data) {
                if (data){
                    collaborations[sessionId] = {
                        'cachedInstructions':JSON.parse(data),
                        'participants':[],
                    }
                }else{
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': [],
                    }
                }
                collaborations[sessionId]['participants'].push(sockect.id);
            })
        }

        // event listeners
        sockect.on('change',(delta) => {
            console.log('change ' + delta + 'from ' + sessionId);
            collaborations[sessionId]['cachedInstructions'].push(['change',delta,Date.now()]);
            forwardEvent(sockect.id,'change',delta);
        });

        sockect.on('cursorMove',(cursor) =>{
            console.log('new cursor ' + cursor + 'from sessionId' + sessionId);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = sockect.id;
            forwardEvent(sockect.id,'cursorMove',JSON.stringify(cursor))
        })

        sockect.on('restoreBuffer',() => {
            // const sessionId = socketIdToSessionId[socket.id];
            const cachedInstructions = collaborations[sessionId]['cachedInstructions'];
            for (let ins of cachedInstructions){
                sockect.emit(ins[0],ins[1])
            }
            forwardEvent(sockect.id,'change')
        })

        sockect.on('disconnect', () => {
            let foundAndRemove = true;
            
        })

    });


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
};