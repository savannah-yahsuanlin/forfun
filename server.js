const express = require('express');
const { Model } = require('./db');

const app = express();

app.get('/', async (req, res) => {
	const models = await Model.findAll()

	res.send(`
		<html>
			<body>
				<ul>
				 ${models.map(model => 
						`
						<li>
							<a href="/models/${model.id}">${model.name}</a>
							<img src="${model.img}/>
						</li>
						`
					).join('')}
				</ul>
			</body>
		</html>
	`)
})



app.get('/models/:id', async (req, res, next) => {
	const id = req.params.id

	try {
		const model = await Model.findByPk(id)
		res.send(`
			<html>
				<body>
					<a href="/">Back</a>
					<h1>${model.name}</h1>
					<img src=${model.img}/>
				</body>
			</html>
		`)
	} catch (error) {
		next(error)
	}
})


app.listen(3000)