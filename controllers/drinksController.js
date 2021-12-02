const Express = require('express');
const router = Express.Router();
const {DrinksModel} = require('../models');
let validateJWT = require('../middleware/validate-jwt');

router.get('/test', validateJWT, (req, res) => {
    res.send('Practice test') 
});

// Create
router.post('/create', validateJWT, async (req,res) => {
    const {name, alcohol, location, price, description} = req.body.drinks;
    const {id} = req.user;
    const drinksEntry = {
        name,
        alcohol,
        location,
        price,
        description,
        userId: id  
    }

    try{
        const newDrink = await DrinksModel.create(drinksEntry);          
        res.status(200).json(newDrink)
    } catch(err) {
        res.status(500).json({
            message: `Drink entry failed to post: ${err}`});
    }
});

// Get all drinks
// router.get("/", async (req, res) => {
//           try {
//             const drinks = await DrinksModel.findAll();
//             res.status(200).json(drinks);
//           } catch (err) {
//             res.status(500).json({ error: err });
//           }
//         });

// Get my drinks
router.get('/mine', validateJWT, async (req, res) => {
    let {id} = req.user;
    
    try {
        const userDrinks = await DrinksModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userDrinks);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


//* Update Drink Entry
router.put('/update/:id', validateJWT, async (req, res) => {
    const {name, alcohol, location, price, description} = req.body.drinks;
    const drinkId = req.params.entryId;
    const {id} = req.user;

    const query = {
        where: {
            id: drinkId,
            userId: id
        }
    };
    const updatedDrink = {
        name: name,
        alcohol: alcohol,
        location: location,
        price: price,
        description: description
    };

    try {
        const update = await DrinksModel.update(updatedDrink, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }

});


//* Delete a drink
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const drinkId = req.params.id;
    const {id} = req.user;

        const query = {
            where: {
                id: drinkId,
                userId: id
            }
        };

    try{
        await DrinksModel.destroy(query);
        res.status(200).json({message: 'Drink Deleted'});
    } catch(err) {
        res.status(500).json({error: err});
    }
})


module.exports = router;