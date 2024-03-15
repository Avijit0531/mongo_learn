const express=require('express');
const app=express();
const {ObjectId}=require('mongodb');
const PORT=3000;
const {connectToDb,getDb}=require('./db.js');
app.use(express.json());
let db;
connectToDb((err)=>{
    if(!err){
        app.listen(PORT,()=>{
            console.log(`app listening to port:${PORT}`);
        })
    }
    db=getDb();
})
app.get("/books",(req,res)=>{
    let books=[]
    let page=req.query.p || 0
    let bookPerPage=3;
     db.collection('books')
     .find()
     .sort({author:1})
     .skip(page*bookPerPage)
     .limit(bookPerPage)
     .forEach(book=>books.push(book))
     .then(()=>{
        res.status(200).json(books);

     })
     .catch(()=>{
        res.status(500).send("Error occrued cant process the request");
     })
    
});
app.get('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id:new ObjectId(req.params.id)})
        .then((doc)=>{
            res.status(200).json(doc);
        })
        .catch((err)=>{
            res.status(500).send("Error encountered");
        })
    }
   else {
    res.status(500).json({err:"not valid"});
   }
})
app.post('/books',(req,res)=>{
    const book=req.body;
    db.collection('books')
    .insertOne(book)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        res.status(500).json({err:'cant add the document'});
    })
})
app.delete('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id:new ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)
        })
        .catch(err=>{
            res.status(500).json({err:'cannot find the specified Id'})
        })
    }
    else {
        res.status(500).send('invalid id')
    }
})
app.patch('/books/:id',(req,res)=>{
    const update=req.body;
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id:new ObjectId(req.params.id)},{$set:update})
        .then(result=>{
            res.status(200).json({result})
        })
        .catch(err=>{
            res.status(500).send('could not update')
        })
    }
    else{
        res.status(500).send('Invalid Update Id')
    }
})
