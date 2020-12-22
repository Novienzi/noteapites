const express = require('express');
const app = express.Router()

const NoteController = require('../../controller/noteController');
const authentication = require('../../middleware/authenticationMiddleware');



app.get('/note/get', authentication, NoteController.getNote);
app.post('/note/add', authentication, NoteController.addNote);
app.patch('/note/edit', authentication, NoteController.editNote);
app.delete('/note/delete', authentication, NoteController.deleteNote);



module.exports = app