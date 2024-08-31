import ProjectList from "../Components/ProjectList/ProjectList";
import { ProjectDataEntries } from "../Logic/ProjectInformation/ProjectData";
import Layout from "./layouts/Layout";

export default function Project_Overview() {
	return (
		<Layout>
			<ProjectList entries={ProjectDataEntries} />
		</Layout>
	);
}
