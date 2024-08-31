import "./Dropdown.css";
import DropdownItem from "./DropdownItem/DropdownItem";
import DropdownHeader from "./DropdownHeader/DropdownHeader";

import YoutubeProjectData from "../../resources/YoutubeProjects";

interface Props {
	entries: Array<YoutubeProjectData>;
	activeIndex: number;

	setIndex: (index: number) => void;
}

export default function Dropdown(props: Props) {
	function getSelectedStatus(index: number) {
		return index === props.activeIndex;
	}

	return (
		<div className="dropdown-body">
			<DropdownHeader />
			{props.entries.map((item: YoutubeProjectData, index) => (
				<DropdownItem
					title={item.description}
					selected={getSelectedStatus(index)}
					index={index}
					setIndex={props.setIndex}
				/>
			))}
		</div>
	);
}
