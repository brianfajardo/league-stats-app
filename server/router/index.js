const router = app => {
  // Developer message
  app.get('/api', (req, res) => {
    res.send({ message: 'Greetings developer!' }).status(200)
  })

  // Fetch users' warding stats in the 20 most recent ranked matches.
  app.post('/api/wardstats', (req, res) => {
    res.send({ message: 'Ward stat route' }).status(200)
  })
}

module.exports = router
