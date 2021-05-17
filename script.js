#!/usr/bin/env node

const inquirer = require('inquirer');

const nameRegex = /^[\w-]{1,32}$/;

let answers = {};

console.log('🤖 Welcome to register-slash-command 🤖');

console.log(
	'Please enter the following details to register your slash command'
);

// 1. Ask if it's for guild or global

// 2. Get Bot name and description

inquirer
	.prompt([
		{
			type: 'list',
			name: 'guidlOrGlobal',
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
	])
	.then((answers) => {
		answers = answers;
		console.log(answers);
	});

// 2. To Do: Get Bot options (sub commands) - name, description, required, choices

// 3. Application ID

// 4. Token
