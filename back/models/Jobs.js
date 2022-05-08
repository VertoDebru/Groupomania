module.exports = (sequelize, Sequelize) => {
    const Jobs = sequelize.define("jobs", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        jobs: {
            type: Sequelize.STRING(100),
            allowNull: false
        }
    })

    return Jobs;
};
