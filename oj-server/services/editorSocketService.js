/**
 * Created by yangyang on 7/22/17.
 */
module.exports = function (io) {
    io.on('connection',(sockect) => {
        // console.log(sockect);
        const message = sockect.handshake.query['message'];
        console.log(message);
        io.to(sockect.id).emit('message','hehehahas from server');
    })
}