module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define("articles", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        article: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        postDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })

    return Articles;
};
