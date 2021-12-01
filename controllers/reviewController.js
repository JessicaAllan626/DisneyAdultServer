const Express = require('express');
const router = Express.Router();
const {ReviewsModel} = require('../models');

let validateJWT = require('../middleware/validate-jwt');

//* Create a review
router.post('/create', validateJWT, async (req,res) => {
    const {nameOfDrink, reviewEntry, rating} = req.body.reviews;
    const {id} = req.user;
    const drinksReview = {
        nameOfDrink,
        reviewEntry,
        rating,
        owner: id  
    }

    try{
        const newReview = await ReviewsModel.create(drinksReview);          
        res.status(200).json(newReview)
    } catch(err) {
        res.status(500).json({
            message: `Review failed to post: ${err}`});
    }
});


//* Get my reviews
router.get('/mine', validateJWT, async (req, res) => {
    let {id} = req.user;

    try {
        const userReviews = await ReviewsModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userReviews);
    } catch (err) {
        res.status(500).json({error: `Failed to get reviews: ${err}`});
    }
});


//* Update a review
router.put('/update/:entryId', validateJWT, async (req, res) => {
    const {nameOfDrink, reviewEntry, rating} = req.body.reviews;
    const reviewId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: reviewId,
            owner: userId
        }
    };
    const updatedReview = {
        nameOfDrink: nameOfDrink,
        reviewEntry: reviewEntry,
        rating: rating
    };

    try {
        const update = await ReviewsModel.update(updatedReview, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: `Review failed to update: ${err}`});
    }

});


//* Delete a review
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    try {
        const query = {
            where: {
                id: reviewId,
                owner: userId
            }
        };
        await ReviewsModel.destroy(query);
        res.status(200).json({message: 'Review was deleted.'});
    } catch(err) {
        res.status(500).json({error: `Review failed to delete: ${err}`});
    }
});

module.exports = router;