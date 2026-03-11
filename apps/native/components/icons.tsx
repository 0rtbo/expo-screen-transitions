import {
	IconArrowsShuffle,
	IconBell,
	IconCompass,
	IconHome,
	IconLayoutBottombar,
	IconMessage,
	IconMeteorFilled,
	IconPlus,
	IconSettings,
	IconSquare,
	IconUser,
	IconWorld,
} from "@tabler/icons-react-native";
import { withUniwind } from "uniwind";

const icons = {
	"arrows-shuffle": withUniwind(IconArrowsShuffle),
	bell: withUniwind(IconBell),
	compass: withUniwind(IconCompass),
	home: withUniwind(IconHome),
	"layout-bottombar": withUniwind(IconLayoutBottombar),
	message: withUniwind(IconMessage),
	"meteor-filled": withUniwind(IconMeteorFilled),
	plus: withUniwind(IconPlus),
	settings: withUniwind(IconSettings),
	square: withUniwind(IconSquare),
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
