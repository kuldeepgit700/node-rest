let io;

module.exports = {

    init:httpServer =>{
       io = require('socket.io')(httpServer,{
            cors: {
              origin: '*',
            }
    })
       return io;
    },
    getIO: ()=>{
        if(!io){
            throw new Error('socket.io not initilized!');
        }
        return io;
    }
}