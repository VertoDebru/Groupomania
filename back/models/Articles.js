module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define("articles", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        authorId: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        article: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postDate: {
            type: Sequelize.DATE
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "none"
        }
    })

    return Articles;
};
