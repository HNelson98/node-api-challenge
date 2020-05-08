const router = require('express').Router();
const Actions = require('./data/helpers/actionModel')
const Projects = require('./data/helpers/projectModel');


// POST an action
router.post('/:id', (req, res) =>{
    const id = Number(req.params.id)
    const {description, notes} = req.body
    Projects.get(id)
    .then(project => {
        if (project){
            const project_id = project.id

            if ( !description || !notes){
                res.status(400).json({errorMessage: 'missing the name or description'})
            } else if (project_id === id){
                req.body = {
                    ...req.body,
                    project_id
                }

                Actions.insert(req.body)
                .then(action => {
                    res.status(200).json(action)
                })
                .catch(err =>{
                    console.log('POST action err', err)
                res.status(500).json({ errorMessage: 'there was an error in uploading the action to the database'})
                })
            }
        } else {
            res.status(404).json({error: "There is no project with that ID"})
        }
    })

   
})

module.exports = router;