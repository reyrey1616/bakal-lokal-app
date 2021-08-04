import distance from "@turf/distance";

const calculateDistance = (to) => {
	const from = [122.5598794, 10.7177168]; //lng, lat
	return distance(from, to);
};

export default calculateDistance;
