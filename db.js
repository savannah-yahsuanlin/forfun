const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost/funies')

const Model = db.define('model', {
	name: {
		type: Sequelize.STRING
	},
	img: {
		type: Sequelize.STRING
	}
})

module.exports = {
	db,
	Model
}