// let problems = [
//     {
//         "id":1,
//         "name":"Two Sum",
//         "desc":"Given an array of integers, find two numbers such that they add up to a specific target number.\n\nThe function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.",
//         "difficulty":"easy"
//     },
//     {
//         "id":2,
//         "name":"3Sum",
//         "desc":"Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
//         "difficulty":"medium"
//     },
//     {
//         "id":3,
//         "name":"4Sum",
//         "desc":"Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?\n\nFind all unique quadruplets in the array which gives the sum of target.",
//         "difficulty":"medium"
//     },
//     {
//         "id":4,
//         "name":"Triangle Count",
//         "desc":"Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?",
//         "difficulty":"hard"},
//     {
//         "id":5,
//         "name":"Sliding Window Maximum",
//         "desc":"Given an array of n integer with duplicate number, and a moving window(size k), move the window at each iteration from the start of the array, find the maximum number inside the window at each moving.",
//         "difficulty":"super"
//     }];

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
        ProblemModel.find({id:id},function (err,data) {
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