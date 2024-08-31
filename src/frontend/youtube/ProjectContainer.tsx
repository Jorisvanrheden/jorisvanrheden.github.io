import "./ProjectContainer.css";

import Dropdown from "../dropdown/Dropdown";
import ProjectContainerItem from "./ProjectContainerItem";

import { YoutubeProjectEntries } from "../../resources/YoutubeProjects";

import { useState } from "react";

export default function ProjectContainer() {
	const [index, setIndex] = useState(0);

	function updateIndex(index: number) {
		setIndex(index);
	}

	return (
		<div className="project-body">
			<div id="dropdown">
				<Dropdown
					entries={YoutubeProjectEntries}
					activeIndex={index}
					setIndex={updateIndex}
				/>
			</div>
			<div id="video">
				<ProjectContainerItem entry={YoutubeProjectEntries[index]} />
			</div>
		</div>
	);
}
