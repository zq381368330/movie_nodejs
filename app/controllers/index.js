 //主页
 //var express = require('express')
 //var app = express()
 var Movie = require('../models/movie')
 var Category = require('../models/category')
 exports.index = function(req, res) {
     console.log('user in session:')
     console.log(req.session.user)

     //var _user = req.session.user

     //app.locals.user = _user
     Category
         .find({})
         .populate({
             path: 'movies',
             options: {
                 limit: 5
             }
         })
         .exec(function(err, categories) {
             if (err) {
                 console.log(err)
             }
             res.render('index', {
                 title: '电影网首页',
                 categories: categories
             })
         })
 }
 exports.search = function(req, res) {
  var catId=req.query.cat
  var count=2
  var page=req.query.p
  var index=page*count
     Category
         .find({_id:catId})
         .populate({
             path: 'movies',
             select:'title poster',
             
         })
         .exec(function(err, categories) {
             if (err) {
                 console.log(err)
             }
             var category=categories[0]||{}
             var movies=category.movies||{}
             var results=movies.slice(index,index+count)
             res.render('results', {
                 title: '电影网 结果列表页',
                 keyword:category.name,
                 currentPage:(page+1),
                 query:'cat='+catId,
                 totalPage:Math.ceil(movies.length/count),
                 movies: results
             })
         })
     }