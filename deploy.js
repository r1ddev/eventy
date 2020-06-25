const Deployer = require('ssh-deploy-release');

const options = {
	localPath: './build',
	host: '116.203.213.27',
	username: 'root',
	password: 'root',
	privateKeyFile: '/home/zdsgf/.ssh/riddev_pk',
	deployPath: '/var/www/html/front/',
};

const deployer = new Deployer(options);
deployer.deployRelease(() => {
	console.log('Ok!')
});