import ChessProject from "../Components/ChessProject/ChessProject";
import ChessModel from "../Logic/chess/ChessModel";
import Layout from "./layouts/Layout";

export default function Project_Chess() {
	let chessModel: ChessModel = new ChessModel();

	return (
		<Layout>
			<ChessProject model={chessModel} />
		</Layout>
	);
}
