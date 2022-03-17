module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { 
            type: Sequelize.STRING,
            defaultValue: "Username"
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jobId: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return Users;
};
