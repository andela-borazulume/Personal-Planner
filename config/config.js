var env_variables = {
	firebase: {
		secretKey: process.env.FB_SECRET_KEY || "kp8hFVX6ryVm2ZpBOBCCkkwFQzWpIKl81Igo8e09"
	}
};

var config = {
	development: env_variables
};
module.exports = config;