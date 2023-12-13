import $api from "../http/$api";

export default class Service {
	static getProfiles =  (offset, count) => {
		return $api.get(`/users?offset=${offset}&count=${count}`);
	};
}
