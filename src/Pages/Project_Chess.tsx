import ChessProject from "../Components/ChessProject/ChessProject"
import ChessModel from "../Logic/Chess/ChessModel"
import Layout from "./layouts/Layout";

export default function Project_Chess()
{  
  let chessModel:ChessModel = new ChessModel();

  return (
    <Layout>
      <ChessProject model={chessModel} />
    </Layout>
  );  
}