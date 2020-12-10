const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '3b86e73356aa4777a44393120ee57dff'
});

const handleAPICall = (req, res) => {
	app.models.predict('d02b4508df58432fbb84e800597b8959', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json("Unable to work with API"))
};

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db('users').where({id})
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json("Unable to get entries."));
}

module.exports = {
	handleImage: handleImage,
	handleAPICall: handleAPICall
}