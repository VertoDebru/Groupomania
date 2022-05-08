module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        id: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: { 
            type: Sequelize.STRING(50),
            defaultValue: "Utilisateur"
        },
        lastname: { 
            type: Sequelize.STRING(50),
            defaultValue: "Inconnu"
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
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "none"
        },
        isDelete: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })

    return Users;
};
