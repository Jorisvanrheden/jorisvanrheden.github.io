import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import Footer from "../../Components/Footer/Footer";
import "./Layout.css"; // Import layout-specific styles

const Layout = ({ children }) => {
	return (
		<div className="container">
			<div id="nav">
				<NavigationBar />
			</div>
			<div id="main">{children}</div>
			<div id="footer">
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
