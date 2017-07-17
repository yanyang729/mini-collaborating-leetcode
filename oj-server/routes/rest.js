/**
 * Created by yangyang on 7/16/17.
 */
const express = require('express');
const router = express();
const problemService = require('../services/problemService');

// GET /api/v1/problems
router.get('/problems', function(req,res) {
    problemService.getProblems().then(problems => (res.json(problems)))

});


// GET /api/v1/problems/:id

router.get('/problems/:id',function (req,res) {
    const id = req.params.id;
    problemService.getProblem(+id).then(problem => (res.json(problem)));
})

// POST /api/v1/problems
router.post('')


module.exports = router
