const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService');

const Client = require('node-rest-client').Client;
const client = new Client();
const EXE_URL = 'http://www.executor.com/build_and_run';
client.registerMethod('build_and_run',EXE_URL,'POST');

// GET /api/v1/problems
router.get('/problems', function(req, res) {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

// GET /api/v1/problems/:id
router.get('/problems/:id', function(req, res) {
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

// POST /api/v1/problems
router.post('/problems', jsonParser, function(req, res) {
    problemService.addProblem(req.body)
        .then(function(problem) {
            res.json(problem);
        }, function(error) {
            res.status(400).send('Problem name already exists');
        });
});

//POST /api/v1/build_and_run
router.post('/build_and_run',jsonParser,(req,res) => {
    const userCodes = req.body.userCodes;
    const lang = req.body.lang;
    console.log(`server received ${lang} ${userCodes}`);
    client.methods.build_and_run(
        {
            data: {
                code: userCodes,
                lang: lang
            },
            headers: {
                'Content-Type': 'application/json',
            }
        },
        (data,response) => {
            console.log('received reponse form excutor server: ');
            const text = `build output: ${data['build']}, run output: ${data['run']}`;
            console.log('test is: ' + `build outputs: ${data['build']}, run outputs: ${data['run']}`);
            data['text'] = text;
            res.json(data);
        }
    );
    
})

module.exports = router;