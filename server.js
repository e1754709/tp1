const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const request = require("request")
const {PORT} = require("./config.js")
const {API_KEY} = require("./config.js")
const clashApi = require('clash-of-clans-api')
const { StatusCodeError } = require('request-promise-core/errors');


app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

app.get("/*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"))
})

let client = clashApi({
  token: API_KEY
});


// Get player info function
async function getPlayerInfo(rawTag) {
try {
	//Get the player info
	const tag = rawTag.slice(1)
	const playerInfo = await client.playerByTag(rawTag.slice(0));

	if (!playerInfo) {
	throw new Error('Player information not found');
	}
	
	const newData = JSON.stringify(playerInfo);
	const filePath = path.join(__dirname, 'frontend', 'static', 'js', 'data', 'member', tag + '.json');
	fs.writeFile(filePath, newData, (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Player info file created successfully!');
	}
	});
} catch (error) {
	if (error instanceof StatusCodeError && error.statusCode === 404) {
	console.error('Player information not found with the provided tag');
	} else {
	console.error(error);
	}
}
}

// Get clan by tag function

async function getClanByTag(tag) {
try {
	//Variables
	let clanByTag = await client.clanByTag(tag)
	let nomClan = clanByTag.name
	let newData = JSON.stringify(clanByTag)

	//Paths
	const clanPath = path.join(__dirname, 'frontend', 'static', 'js', 'data', 'Paradarkside');
	const playersPath = path.join(__dirname, 'frontend', 'static', 'js', 'data','member');

	//Create folder for clan
	fs.mkdir(playersPath, { recursive: true }, (err) => {
		if (err) {
			console.error(err);
		} else {
			//Create clan file in clan folder
			fs.mkdir(clanPath, (err) =>{
			if(err){
				console.error(err);
			}
			else{
				const filePath = path.join(clanPath, nomClan + '.json');
				fs.writeFile(filePath, newData, (err) => {
				if (err) {
					console.error(err);
				} else {
					console.log('File created and data written successfully!');
				}
				})
			}
			});
		}
	});
	
	const members = clanByTag.memberList;
	for (const member of members) {
		await getPlayerInfo(member.tag);
	}

} catch (error) {
	console.error(error)
}
}

//Execution de la function pour le clan
getClanByTag('#POOPVVCL')

app.listen(PORT || 4001,() => {
	console.log("Vous ètes sur le port :", PORT);
})




