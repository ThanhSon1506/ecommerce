const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const slugify = require('slugify');
const router = express.Router();

router.post('/category/create', (req, res, next) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.body.parentId) {
        category.Obj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
            return res.status(201).json({ category });
        }
    })
})