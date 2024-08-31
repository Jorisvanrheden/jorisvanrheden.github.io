import ProjectList from "../frontend/youtube/ProjectList";
import { ProjectDataEntries } from "../resources/ProjectData";
import Layout from "./layouts/Layout";

export default function Project_Overview() {
	return (
		<Layout>
			<ProjectList entries={ProjectDataEntries} />
		</Layout>
	);
}
