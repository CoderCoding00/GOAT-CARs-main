const User = require('./User');
const Car = require('./Car');
const Merchandise = require('./Merchandise')
const Forum = require('./Forum');
const Auction = require('./Auction');
const Comment = require('./Comment');

User.hasMany(Forum, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Forum.belongsTo(User, {
    foreignKey: 'user_id'
});

// // All the cars a user has (Inventory of all cars a user has)
User.hasMany(Car, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// // Car belongs to User, as a seller (Inventory of cars for sale)
Car.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Auction, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Auction.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


Forum.hasMany(Comment, {
    foreignKey: 'forum_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Forum, {
    foreignKey: 'forum_id'
});


Car.hasOne(Auction, {
    foreignKey: 'car_id',
    onDelete: 'CASCADE'
})

Auction.belongsTo(Car, {
    foreignKey: 'car_id',
});

module.exports = { User, Forum, Auction , Car, Merchandise, Comment};




