import ChessModel from "../backend/chess/ChessModel";
import ChessProject from "../frontend/chess/ChessBoard";
import Layout from "./layouts/Layout";

export default function Project_Chess() {
	let chessModel: ChessModel = new ChessModel();

	return (
		<Layout>
			<ChessProject model={chessModel} />
		</Layout>
	);
}
