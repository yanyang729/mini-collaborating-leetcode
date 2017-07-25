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
        sockect.on('change',(delta) =>{
            console.log('change ' + delta + 'from ' + sessionId);
            if (sessionId in collaborations){
                const participants = collaborations[sessionId]['participants'];
                for (let item of participants){
                    if( item != sockect.id){
                        io.to(item).emit('change',delta);
                    }
                }
            }else {
                console.log('sessionId not in collaborations')
            }

        })
    })
}