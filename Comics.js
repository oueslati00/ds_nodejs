const express = require('express');
const Joi = require('joi');
const port = 3000;
const app = express();


app.use(express.json());

// comics json validation
const comics_validation_object= Joi.object({
    id : Joi.number().required(),
    author : Joi.string().required(),
    title : Joi.string().required(),
    url : Joi.string().uri().required()
})

// comics data
var comics = [
    { id:'', author : '' , title : '' , url : '',},
    { id:'', author :'' , title : '' , url : '',},
    { id:'', author : '', title : '' , url : '',},
    { id:'', author : '', title : '' , url : '',},
    { id:'', author :'' , title : '' , url : '',}
];
// CRUD creation
// create , read , update, remove

// read all
app.get('/comics', (req, res) => {
  res.send(comics);
});

//read by id
app.get('/comics/:id', (req, res) => {
 let comic = comics.find(s=>s.id == req.params.id);
 if(!comic)
     return res.status(404).send('this id does not exist ');
  res.send(comic);
});

// create comic method
app.post('/comics', (req, res)=>{
    // test Joi
     let result = comics_validation_object.validate(req.body);
     if(result.error)
        return res.status(400).send(result.error.details[0].message);
    // test if the current comic exist
     let comic = comics.find(s=>s.id===parseInt(req.body.id));
    if(!comic)
        return res.status(400).send('comics is already exist ');
    // add the comic to the list
    comics.push(req);
    res.status(200).send(req);
});

// update comic
app.put('/comics/:id', (req, res)=>{
    let comic = comics.find(s=>s.id===parseInt(req.params.id));
    if(!comic)
        return res.status(400).send('comics with this id was not found');
    comic.id=req.body.id;
    comic.author=req.body.author;
    comic.url=req.body.url;
    comic.title=req.body.title;
    res.status(200).send(comic);
});

//delete comic

app.delete('/comics/:id', (req, res)=>{
    let comic = students.find(s => s.id === parseInt(req.params.id));
    if(!comic)
        return res.status(404).send('Student with this id is not found');
    comics = comics.filter(s => s.id !== parseInt(req.params.id));
    res.send(comic)
});


