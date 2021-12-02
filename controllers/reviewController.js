let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { ReviewsModel } = require('../models');

  router.post('/create/:drinksId', validateJWT, async (req, res) => {
          const { review } = req.body.review;
          const drinksId = req.params.drinksId;
          const userId = req.user.id;
          const reviewEntry = {
            review,
            drinksId: drinksId,
            userId: userId
          }
          try {
            const newReview = await ReviewsModel.create(reviewEntry);
            res.status(200).json(newReview);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });
        
        module.exports = router;


    router.get("/mine", validateJWT, async (req, res) => {
          let { id } = req.user;
          try {
            const userReviews = await ReviewsModel.findAll({
              where: {
                userId: id
              }
            });
            res.status(200).json(userReviews);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });

    
    router.get('/:drinksId', validateJWT, async (req, res) => {
          let { drinksId } = req.params;
          try {
            const drinksReview = await ReviewsModel.findAll({
              where: {
                drinksId: drinksId
              }
            });
            res.status(200).json(drinksReview);
          } catch (err) {
            res.status(500).json({ error: err });
          }
        });

    router.put("/update/:id", validateJWT, async (req, res) => {
          const { review } = req.body.review;
       
         try {
           const update = await ReviewsModel.update({review}, {where: {id: req.params.id, userId: req.user.id}});
           res.status(200).json({
        message: "success", update
    });
         } catch (err) {
           res.status(500).json({ error: err });
         }
       })

   router.delete("/delete/:id", validateJWT, async (req, res) => {
         const userId = req.user.id;
         const reviewId = req.params.id;
       
         try {
           const query = {
             where: {
               id: reviewId,
               userId: userId
             }
           };
       
           await ReviewsModel.destroy(query);
           res.status(200).json({ message: "Review has been deleted" });
         } catch (err) {
           res.status(500).json({ error: err });
         }
       });

    module.exports = router;