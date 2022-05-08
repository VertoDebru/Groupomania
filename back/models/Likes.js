module.exports = (sequelize, Sequelize) => {
    const Likes = sequelize.define("likes", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        articleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Likes;
};
