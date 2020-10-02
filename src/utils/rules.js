export default class Rules {
	static isModerator (range) {
		return range == 8;
	}

	static isGuest (range) {
		return range == 7;
	}

	getCurrentRoute () {
		return window.location.pathname.substring(1)
	}

	getCurrentPageRules (userRule) {
		let currentRoute = this.getCurrentRoute();

		return userRule.filter(rule => {
			return new RegExp(`^${rule.route}$`).test(currentRoute)
		})
	}

	isModeratorHere (userRule) {
		let rules = this.getCurrentPageRules(userRule)
		return rules.filter(rule => Rules.isModerator(rule.range_type)).length > 0
	}
}