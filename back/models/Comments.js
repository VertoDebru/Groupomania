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
        comment: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        postDate: {
            type: Sequelize.DATE
        }
    })

    return Comments;
};
