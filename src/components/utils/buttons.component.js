import { Button } from "native-base";
import styled from "styled-components";
import { Text } from "react-native";
const PrimaryButton = styled(Button)`
	background: ${(props) =>
		props.disabled
			? props.theme.colors.brand.grey
			: props.theme.colors.brand.orange};
	padding-right: 15;
	padding-left: 15;
	align-items: center;
	justify-content: center;
`;

const SecondaryButton = styled(Button)`
	background: white;
	color: ${(props) => props.theme.colors.brand.orange};
	padding-right: 15;
	padding-left: 15;
	align-items: center;
	justify-content: center;
`;

const PrimaryButtonText = styled(Text)`
	color: #ffffff;
	text-align: center;
`;

const SecondaryButtonText = styled(Text)`
	color: ${(props) => props.theme.colors.brand.orange} !important;
	text-align: center;
`;

const GreenButton = styled(Button)`
	background: ${(props) => props.theme.colors.brand.green};
`;
const GreenButtonText = styled(Text)`
	color: #ffffff;
`;

const ButtonTypes = {
	PrimaryButton,
	SecondaryButton,
	PrimaryButtonText,
	SecondaryButtonText,
};
export default ButtonTypes;
