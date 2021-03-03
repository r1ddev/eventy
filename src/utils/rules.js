export default class Rules {
	static isModerator (range) {
		return range == 8;
	}

	static isGuest (range) {
		return range == 7;
	}

	static isSponsor (range) {
		return range == 5;
	}

	static isAdvert (range) {
		return range == 4;
	}


	getCurrentRoute () {
		return window.location.pathname.substring(1)
	}

	getCurrentPageRules (userRule) {
		let currentRoute = this.getCurrentRoute();

		return this.getOnPageRules(currentRoute, userRule)
	}

	getOnPageRules (route, userRule) {
		return userRule.filter(rule => {
			if (rule.is_regex) {
				return new RegExp(rule.route.slice(1,-1)).test(route)
			} else {
				return new RegExp(`^${rule.route}$`).test(route)
			}
		})
	}

	isModeratorHere (userRule) {
		let rules = this.getCurrentPageRules(userRule)
		return rules.filter(rule => Rules.isModerator(rule.range_type)).length > 0
	}

	isModeratorOn (page, userRule) {
		let rules = this.getOnPageRules(page, userRule)
		return rules.filter(rule => Rules.isModerator(rule.range_type)).length > 0
	}
} 