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


module.exports = router;