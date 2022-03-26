module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: { 
            type: Sequelize.STRING(50),
            defaultValue: "Firstname"
        },
        lastname: { 
            type: Sequelize.STRING(50),
            defaultValue: "Lastname"
        },
        email: {
            type: Sequelize.STRING(100),
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
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return Users;
};
