const Deployer = require('ssh-deploy-release');
 
const options = {
    localPath: './build',
    host: '116.203.213.27',
    username: 'root',
	password: 'root',
	privateKeyFile: 'K:\\key\\riddev.ppk',
	deployPath: '/var/www/html/front/',
	currentReleaseLink: 'app'
};
 
const deployer = new Deployer(options);
deployer.deployRelease(() => {
    console.log('Ok!')
});