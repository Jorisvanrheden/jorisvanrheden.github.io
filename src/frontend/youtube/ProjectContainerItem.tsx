import YoutubeProjectData from "../../resources/YoutubeProjects";
import YoutubeEmbed from "../youtube/YoutubeEmbed";
import "./ProjectContainerItem.css";

import { logEvent } from "firebase/analytics";
import { analytics } from "../../firebase"; // Adjust the path to where you export 'analytics'

interface Props {
	entry: YoutubeProjectData;
}

export default function ProjectContainerItem(props: Props) {
	const handleDownloadClick = () => {
		console.log("logging download event");
		logEvent(analytics, "notification_received");
	};

	return (
		<div className="projectcontainer-container">
			<div className="projectcontainer-item">
				{/* Square
                Video top 
                bottom row has the download button */}
				<div className="projectcontainer-item-video">
					<YoutubeEmbed
						description={props.entry.description}
						url={props.entry.url}
					/>
				</div>
				<div className="projectcontainer-item-description">
					{props.entry.description}

					{props.entry.location && (
						<a
							href={props.entry.location}
							download
							onClick={handleDownloadClick}>
							<img className="projectcontainer-item-logo" src="pdf.png"></img>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
