const router = require('express').Router();
const Actions = require('./data/helpers/actionModel')
const Projects = require('./data/helpers/projectModel');

//GET all actions
router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
      })
      .catch(err => {
        console.log('GET all projects err', err)
        res.status(500).json({ errorMessage: 'could not find the actions' })
      })
})

//GET action by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    Actions.get(id)
    .then(action => {
        if(action){
            res.status(200).json(action)
        } else {
            res.status(404).json({error: "There is no action with that ID"})
        }
        
      })
      .catch(err => {
        console.log('GET project err', err)
        res.status(500).json({ errorMessage: 'could not find the project' })
      })
})

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

// PUT an action

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const {description, notes} = req.body

    if ( !description || !notes){
        res.status(400).json({errorMessage: 'missing the name or description'})
    } else Actions.update(id, req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'there was an error in updating the action in the database'})
    })
})

//DELETE an action

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    Actions.remove(id)
    .then(project => {
        if(project){
            res.json({message: "action deleted succsesfully"})
        } else {
            res.status(404).json({error: "There is no action with that ID"})
        }
        
      })
      .catch(err => {
        console.log('GET project err', err)
        res.status(500).json({ errorMessage: 'could not delete the action' })
      })
})

module.exports = router;