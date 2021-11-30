const router = require("express").Router();
const {
    UserModel
} = require("../models");
const {
    UniqueConstraintError
} = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
const {
    AccessControl,
    Permission
} = require("accesscontrol");
const validateJWT = require("../middleware/validate-jwt");

/*Register a new User*/
router.post("/register", async (req, res) => {
    let {
        firstName,
        lastName,
        email,
        password,
        role
    } = req.body.user;
    try {
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            role,
        });

        let token = jwt.sign({
            id: User.id
        }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token,
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
});


/*Login a user */
router.post("/login", async (req, res) => {
    let {
        email,
        password
    } = req.body.user;
    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(
                password,
                loginUser.password
            );
            if (passwordComparison) {
                let token = jwt.sign({
                    id: loginUser.id
                }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email / password",
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect email / password",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in",
        });
    }
});



//Access Controlled Endpoints
const ac = new AccessControl();

ac.grant("admin").readAny("getUsers").deleteAny("delete");
ac.grant("user")

/*Get all users */
/*locked behind admin */
router.get("/getUsers", validateJWT, async (req, res) => {
    const Permission = ac.can(req.user.role).readAny("getUsers")
    if (Permission.granted) {
        try {
            const user = await models.UserModel.findAll();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({
                error: err
            });
        }
    } else {
        res.status(403).json({
            message: "Not an Admin."
        })
    }
});


/*Delete users*/
/*locked behind admin*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const Permission = ac.can(req.user.role).deleteAny('delete')
    if (Permission.granted) {
        const userId = req.params.id
        try {
            const query = {
                where: {
                    id: userId
                },
            };
            await models.UserModel.destroy(query);
            res.status(200).json({
                message: "User has successfully been deleted",
            });
        } catch (err) {
            res.status(500).json({
                message: "Error: User has not been deleted",
            })
        }
    } else {
        res.status(403).json({
            message: "Not an Admin"
        });
    }
});


module.exports = router;