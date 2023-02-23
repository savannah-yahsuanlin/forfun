const axios = require('axios');
const {db, Model} = require('./db')

const first10Model = async () => {
	const model = []

	try {
		for(let id = 1; id < 10; id++) {
			const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			model.push(response)
		}

		return (await Promise.all(model)).map(x => x.data)
	} catch (error) {
		throw error 
	}
}


const init = async() => {
	try {
		await db.sync({force: true})

		const models = await first10Model()
		await Promise.all(models.map(model => {
			Model.create({
				name: model.name,
				img: model.sprites.front_shiny,
			})
		}))
	} catch (error) {
		console.log(error)
	}
}

init()