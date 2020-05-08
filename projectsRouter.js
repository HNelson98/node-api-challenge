const router = require('express').Router();
const Projects = require('./data/helpers/projectModel');


// GET all projects
router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        console.log('GET all projects err', err)
        res.status(500).json({ errorMessage: 'could not find projects' })
      })
})

// GET project by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    Projects.get(id)
    .then(project => {
        if(project){
            res.status(200).json(project)
        } else {
            res.status(404).json({error: "There is no project with that ID"})
        }
        
      })
      .catch(err => {
        console.log('GET project err', err)
        res.status(500).json({ errorMessage: 'could not find the project' })
      })
})

// GET project actions
router.get('/:id/actions', (req, res) => {
    const id = Number(req.params.id)

    Projects.getProjectActions(id)
    .then(actions => {
        if(actions){
            res.status(200).json(actions)
        } else {
            res.status(404).json({error: "There are no actions for the project with that ID"})
        }
        
      })
      .catch(err => {
        console.log('GET project err', err)
        res.status(500).json({ errorMessage: 'could not find the actions' })
      })
})

//POST new project
router.post('/', (req, res) =>{
    const {name, description} = req.body

    if (!name || !description){
        res.status(400).json({errorMessage: 'missing the name or description'})
    } else {
        Projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err =>{
            console.log('POST project err', err)
        res.status(500).json({ errorMessage: 'there was an error in uploading the project to the database'})
        })
    }
})

// PUT on a project
router.put('/:id', (req, res) => {
    const {name, description} = req.body
    const id = Number(req.params.id)

    if (!name || !description){
        res.status(400).json({errorMessage: 'missing the name or description'})
    } else {
        Projects.update(id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err =>{
            console.log('POST project err', err)
        res.status(500).json({ errorMessage: 'there was an error in updating the project in the database'})
        })
    }
})

// DELETE a project

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    Projects.remove(id)
    .then(project => {
        if(project){
            res.status(200).json({message: "project deleted succsesfully"})
        } else {
            res.status(404).json({error: "There is no project with that ID"})
        }
        
      })
      .catch(err => {
        console.log('GET project err', err)
        res.status(500).json({ errorMessage: 'could not delete the project' })
      })
})




module.exports = router;