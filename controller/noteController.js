const db = require('../models')

class NoteController {

    static async getNote(req, res, next) {
        try {
            const getNote = await db.notes.findAll({
                where: {
                    userId: req.user.id
                },
                include: db.users
            })
            res.send(getNote)
        } catch (err) {
            next(err);
        }
    }

    static async addNote(req, res, next) {
        try {
            const addNote = await db.notes.create({
                note: req.body.note,
                userId: req.user.id
            })
            res.send(addNote)
        } catch (err) {
            next(err);
        }
    }

    static async editNote(req, res, next) {
        try {
            const findNote = await db.notes.findOne({
                where: {
                    id: req.query.id
                }
            })
            if (findNote) {
                const body = req.body
                const updateNote = await db.notes.update(body, {
                    where: {
                        id: req.query.id
                    }
                })
                if (updateNote.length === 1) {
                    const updatedNote = await db.notes.findOne({
                        where: {
                            id: req.query.id
                        }
                    })
                    return res.send(updatedNote)
                } else {
                    res.status(200).send('There is no data updated')
                }
            } else {
                res.status(404).send('Id not found')
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteNote(req, res, next) {
        try {
            const deleteNote = await db.notes.destroy({
                where: {
                    id: req.query.id
                }
            })
            if (deleteNote) {
                res.send('oke')
            }
        } catch (err) {
            next(err);
        }
    }

}
module.exports = NoteController;

