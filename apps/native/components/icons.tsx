import {
	IconBell,
	IconCompass,
	IconHome,
	IconMessage,
	IconMeteorFilled,
	IconSettings,
	IconUser,
	IconWorld,
} from "@tabler/icons-react-native";
import { withUniwind } from "uniwind";

const icons = {
	bell: withUniwind(IconBell),
	compass: withUniwind(IconCompass),
	home: withUniwind(IconHome),
	message: withUniwind(IconMessage),
	"meteor-filled": withUniwind(IconMeteorFilled),
	settings: withUniwind(IconSettings),
	user: withUniwind(IconUser),
	world: withUniwind(IconWorld),
} as const;

type IconName = keyof typeof icons;

type TablerIconProps = {
	name: IconName;
	size?: number;
	strokeWidth?: number;
	className?: string;
};

export function TablerIcon({
	name,
	size = 24,
	strokeWidth = 2,
	className,
}: TablerIconProps) {
	const IconComponent = icons[name];
	return (
		<IconComponent
			size={size}
			strokeWidth={strokeWidth}
			className={className}
		/>
	);
}
