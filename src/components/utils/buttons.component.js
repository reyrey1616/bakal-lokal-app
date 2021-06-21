import { Button } from "native-base";
import styled from "styled-components";
import { Text } from "react-native";
const PrimaryButton = styled(Button)`
	background: ${(props) => props.theme.colors.brand.orange};
`;

const SecondaryButton = styled(Button)`
	background: transparent;
	color: ${(props) => props.theme.colors.brand.orange};
	border: 1px solid ${(props) => props.theme.colors.brand.orange};
`;

const PrimaryButtonText = styled(Text)`
	color: #ffffff;
`;

const SecondaryButtonText = styled(Text)`
	color: ${(props) => props.theme.colors.brand.orange} !important;
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
