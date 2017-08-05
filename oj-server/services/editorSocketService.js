/**
 * Created by yangyang on 7/22/17.
 */
const TIMEOUT = 3600;

const redisClient = require('../modules/redisClient');

module.exports = function (io) {
    const collaborations = {};
    const sessionPath ='/ojserver/';
    io.on('connection',(sockect) => {
        console.log(sockect)
        const sessionId = sockect.handshake.query['sessionId'];

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

        sockect.on('change',(delta) => {
            console.log('change ' + delta + 'from ' + sessionId);
            collaborations[sessionId]['cachedInstructions'].push(['change',delta,Date.now()]);
            forwardEvent(sockect.id,'change',delta,sessionId);
        });

        sockect.on('cursorMove',(cursor) =>{
            console.log('new cursor ' + cursor + 'from sessionId' + sessionId);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = sockect.id;
            forwardEvent(sockect.id,'cursorMove',JSON.stringify(cursor),sessionId)
        })

        sockect.on('restoreBuffer',() => {
            const cachedInstructions = collaborations[sessionId]['cachedInstructions'];
            for (let ins of cachedInstructions){
                sockect.emit(ins[0],ins[1])
            }
        })

        sockect.on('disconnect', () => {
            let foundAndRemove = true;
            if (sessionId in collaborations){
                const index = collaborations[sessionId]['participants'].indexOf(sockect.id);
                if (index >= 0) {
                    collaborations[sessionId]['participants'].splice(index,1);
                    foundAndRemove = true;
                    if (collaborations[sessionId]['participants'].length === 0){
                        const key = sessionPath + sessionId;
                        const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                        redisClient.set(key,value,redisClient.redisPrint);
                        redisClient.expire(key,TIMEOUT);
                        delete collaborations[sessionId];
                    }
                }else {
                    console.error('not found participant index')
                }

            }else {
                console.log('session id not in collaborations when discnnecting')
            }
            // check if successfully deleted
            if (!foundAndRemove){
                console.error('failed to disconnect')
            }
        })

    });

    const forwardEvent = function(socketId, eventName, dataString,sessionId){
        if (sessionId in collaborations){
            const participants = collaborations[sessionId]['participants'];
            for (let item of participants) {
                if (item != socketId){
                    io.to(item).emit(eventName,dataString);
                }
            }
        } else {
            console.log('sessionId not in collaborations when forwarding events')
        }
    }
};