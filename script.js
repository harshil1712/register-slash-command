#!/usr/bin/env node

const inquirer = require('inquirer');
const axios = require('axios');

const URL = 'https://discord.com/api/v8/applications';

const nameRegex = /^[\w-]{1,32}$/;

let ans = {};

console.log('🤖 Welcome to register-slash-command 🤖');

console.log(
	'Please enter the following details to register your slash command'
);

inquirer
	.prompt([
		{
			type: 'list',
			name: 'guildOrGlobal',
			message: 'Please select the scope of the slash command',
			choices: [
				{
					value: 'guild',
					name: 'Guild (The command will only be available within the guild that you specified)',
				},
				{
					value: 'global',
					name: "Global (The command will be available on all your app's guilds)",
				},
			],
		},
		{
			type: 'input',
			name: 'commandName',
			message: 'Enter the command name',
			validate: (text) =>
				nameRegex.test(text)
					? true
					: "The name can't contain any special characters",
		},
		{
			type: 'input',
			name: 'commandDescription',
			message: 'Enter a description for the command',
		},
		// To Do: Allow user to select option for Bot Token and Client Credentials
		// {
		// 	type: 'list',
		// 	name: 'auth',
		// 	message: 'Please select the authentication method',
		// 	choices: [
		// 		{
		// 			value: 'botToken',
		// 			name: 'Bot Token',
		// 		},
		// 		{
		// 			value: 'clientCreds',
		// 			name: "Client Credentials",
		// 		},
		// 	],
		// },
		{
			type: 'password',
			name: 'botToken',
			message: 'Enter the bot token',
		},
		{
			type: 'input',
			name: 'applicationId',
			message: 'Enter the Application ID',
		},
	])
	.then((answers) => {
		const {
			botToken,
			commandName,
			commandDescription,
			applicationId,
			guildOrGlobal,
		} = answers;

		let headers = {
			Authorization: `Bot ${botToken}`,
			'Content-Type': 'application/json',
		};

		let body = {
			name: `${commandName}`,
			description: `${commandDescription}`,
		};

		if (guildOrGlobal === 'guild') {
			inquirer
				.prompt([
					{
						type: 'input',
						name: 'guildId',
						message: 'Enter the Guild ID',
					},
				])
				.then((text) => {
					const { guildId } = text;
					ans = { guildId, ...ans };

					return registerForGuild(headers, body, applicationId, guildId);
				})
				.then((res) => {
					res.err
						? console.log('‼️ Your slash command was not registered ‼️')
						: console.log(
								'✨ Your slash command was successfully registered ✨'
						  );
				});
		} else {
			registerForGlobal(headers, body, applicationId).then((res) => {
				res.err
					? console.log('‼️ Your slash command was not registered ‼️')
					: console.log('✨ Your slash command was successfully registered ✨');
			});
		}
	});

const registerForGuild = async (header, body, applicationId, guildId) => {
	const apiCall = `${URL}/${applicationId}/guilds/${guildId}/commands`;
	const data = JSON.stringify(body);
	const config = {
		method: 'post',
		url: apiCall,
		headers: header,
		data: data,
	};
	let err = false;
	return axios(config)
		.then(({ data }) => {
			data.err = err;
			return data;
		})
		.catch((error) => {
			err = true;
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
			return { err };
		});
};

const registerForGlobal = async (header, body, applicationId) => {
	const apiCall = `${URL}/${applicationId}/commands`;
	const data = JSON.stringify(body);
	const config = {
		method: 'post',
		url: apiCall,
		headers: header,
		data: data,
	};
	let err = false;
	return axios(config)
		.then(({ data }) => {
			data.err = err;
			return data;
		})
		.catch((error) => {
			err = true;
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
			return { err };
		});
};
