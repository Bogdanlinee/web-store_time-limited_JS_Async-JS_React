import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList";
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className="main">
			<Header />
			<div className='flex-container'>
				<div className='container'>
					<ProductList />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;