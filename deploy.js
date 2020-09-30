const Deployer = require('ssh-deploy-release');

let isWin = process.argv.filter(a => a == "-win").length > 0
let privateKey = isWin ? "K:\\key\\riddev_pk" : "/home/zdsgf/.ssh/riddev_pk"

const options = {
	localPath: './build',
	host: '116.203.213.27',
	username: 'root',
	password: 'root',
	privateKeyFile: privateKey,
	deployPath: '/var/www/html/front/',
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
	console.log('Ok!')
});