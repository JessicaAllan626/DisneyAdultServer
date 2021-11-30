const UserModel = require('./user');
const DrinksModel = require('./drinks');
const ReviewModel = require('./review');

UserModel.hasMany(DrinksModel);
UserModel.hasMany(ReviewModel);

CampsiteModel.belongsTo(UserModel);
EateryModel.belongsTo(UserModel);


module.exports = {
    dbConnection: this.dbConnection,
    
    UserModel,
    DrinksModel,
    ReviewModel
    
};