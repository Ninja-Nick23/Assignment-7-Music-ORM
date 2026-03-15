require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME
});

const Track = sequelize.define('Track', {
  trackId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  songTitle: { type: DataTypes.STRING, allowNull: false },
  artistName: { type: DataTypes.STRING, allowNull: false },
  albumName: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER },
  releaseYear: { type: DataTypes.INTEGER }
});

// This function should ONLY run when you manually run setup.js
async function setup() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    await sequelize.sync({ force: true });
    console.log("Tables created");

    await sequelize.close();
    console.log("Connection closed");
  } catch (err) {
    console.error(err);
  }
}

// Run setup ONLY when executing: node database/setup.js
if (require.main === module) {
  setup();
}

module.exports = { sequelize, Track };
