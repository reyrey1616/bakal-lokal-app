export const addItem = (item, itemToAdd) => {
	let existing = item.find((i) => i._id === itemToAdd._id);
	existing = item.find((i) => i._id === itemToAdd._id);

	if (existing) {
		return [...item];
	}

	return [itemToAdd, ...item];
};

export const updateItem = (item, itemToAdd) => {
	return addItem(removeItem(item, itemToAdd), itemToAdd);
};

export const removeItem = (item, itemToRemove) => {
	const existing = item.find((i) => i._id === itemToRemove._id);

	if (existing) {
		return item.filter((i) => i._id !== itemToRemove._id);
	}

	return [...item];
};

export const findById = (items, id) => {
	return items.find((i) => i._id === id);
};

export const createReducer = (initialState, handlers) => {
	return function (state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		} else {
			return state;
		}
	};
};

export const updateState = (oldObject, newValues) => {
	return Object.assign({}, oldObject, newValues);
};

const asyncStoreSave = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch (e) {
		Alert.alert("Failed to save the data to the async storage");
	}
};

const asyncStoreRemove = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		Alert.alert("Failed to remove the data to the async storage");
	}
};
