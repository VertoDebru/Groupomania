module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define("comments", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        articleId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        authorId: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postDate: {
            type: Sequelize.DATE
        }
    })

    return Comments;
};
