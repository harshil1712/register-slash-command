# Register Slash Command

Register your Discord [slash command](https://discord.com/developers/docs/interactions/slash-commands) with this interactive CLI.

## Getting Started 🚀

### Prerequisites

- This CLI tool is built with Node.js. [Install Node.js](https://nodejs.org) to get started
- A [Discord application](https://discord.com/developers/applications) with the **applications.command** scope.

### Execute

Run the following command:

```sh
npx register-slash-command
```

Or install the package globally:

```sh
npm install -g register-slash-command

// or

yarn global add register-slash-command
```

You will be prompted to:

1. Select the scope for the slash command
	- Guild: The command will only be available within the guild that you specified
	- Global: The command will be available on all your app's guilds

2. Enter a name for the slash command
	- Make sure it starts with a lower-case letter and the name doesn't contain any special characters

3. Enter a description for the command
4. Enter the bot token
	- You can get your bot toke from the Discord Developer Portal
5. Enter the Application ID
	- You can get the Application ID from the Discord Developer Portal
6. Enter the Guild ID
	- If you're registering the slash command for a Guild, you will be prompted to enter the Guild ID

## To Do 💡

- [ ] Add functionality that allows user to select an option for Authentication: Bot Token and Client Credentials
- [ ] Add functionality to allow user to add sub-groups and sub-commands
- [ ] Add the functionality to delete and update slash commands

## Contribute ✨

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) to learn more.
