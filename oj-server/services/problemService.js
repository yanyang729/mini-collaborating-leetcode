const ProblemModel = require('../model/problemModel');


const getProblems = function () {
    // return new Promise((resolve,reject) => {
    //     resolve(problems);
    return new Promise((resolve,reject) => {
        ProblemModel.find({},function (err,data) {
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const getProblem = function (id) {
    // return new Promise((resolve,reject) => {
    //     resolve(problems.find(p => p.id === id));
    // })
    return new Promise((resolve,reject) => {
        ProblemModel.findOne({id:id},function (err,data) {
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
};


const addProblem = function (p) {
    // return new Promise((resolve,reject) => {
    //     if(problems.find(problem => problem.name === p.name)) {
    //         reject('error');
    //     } else {
    //         p.id = problems.length + 1;
    //         resolve(p);
    //     }
    // })
    return new Promise((resolve,reject) => {
        ProblemModel.findOne({name:p.name}, function (err,data) {
          if(data){
              reject('already exits');
          } else {
              ProblemModel.count({},function (err,num) {
                  p.id = num + 1;
                  let newDoc = new ProblemModel(p);
                  newDoc.save();
                  resolve(p);
              })
          }
        }
        )
    })
};

module.exports = {
    getProblems,
    getProblem,
    addProblem,
};