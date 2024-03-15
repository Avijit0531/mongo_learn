const {MongoClient}=require('mongodb');
let connectDb
// module.exports={
//     connectToDb:(cb)=>{
//         //MongoClient.connect('mongodb://127.0.0:27017/Bookstore')
//         const uri = 'mongodb://localhost:27017/Bookstore';
    
//         const client = new MongoClient(uri);
    
//         client.connect()
//           .then(() => {
//             dbConnection = client.db();
//             return cb();
//           })
//         // .then((client)=>{
//         //     connectDb = client.db();
//         //     return cb()
//         // })
//         .catch(err=>{
//             console.log(err);
//             return cb();
//         })
//     },
//     getDb:()=>connectDb
// }

module.exports = {
    connectToDb: (cb) => {
      
        const uri = 'mongodb://localhost:27017/Bookstore';

       
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,family:4 });

        client.connect()
            .then(() => {
                connectDb = client.db();
                console.log('Connected successfully to the database');
                return cb();
            })
            .catch(err => {
                console.error('Failed to connect to the database:', err);
                return cb(err); 
            });
    },
    getDb: () => connectDb 
};