import React from 'react';
import { useState, useEffect } from 'react';
import RemoveEvent from './DeleteProducts/RemoveEvent';
import "./ProductList.css"

function ProductList() {
	const [sortSelectValue, setSortSelectValue] = useState(1);
	const [idToDelete, setIdToDelete] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [productList, setproductList] = useState([]);

	//Display products on paga
	useEffect(() => {
		try {
			fetch('http://localhost:3000/itemList')
				.then(response => {
					return response.json();
				})
				.then(response => {
					setproductList([...response].sort((a, b) => {
						let nameA = a.name.toLowerCase();
						let nameB = b.name.toLowerCase()
						if (nameA < nameB) {
							return -1;
						}

						if (nameA > nameB) {
							return 1;
						}
						return 0;
					}))
				})
		}
		catch (err) {
			console.log(err);
		}
	}, [])

	//Sort products function
	function changeSortSelect(event) {
		//Alphabet sorting
		if (event.target.value == 'alphabetAB') {
			try {
				fetch('http://localhost:3000/itemList')
					.then(response => {
						return response.json();
					})
					.then(response => {
						setproductList([...response].sort((a, b) => {
							let nameA = a.name.toLowerCase();
							let nameB = b.name.toLowerCase()
							if (nameA < nameB) {
								return -1;
							}

							if (nameA > nameB) {
								return 1;
							}
							return 0;
						}))
					})
			}
			catch (err) {
				console.log(err);
			}
		}
		//Quantity sorting
		else if (event.target.value == 'quantity') {
			try {
				fetch('http://localhost:3000/itemList')
					.then(response => {
						return response.json();
					})
					.then(response => {
						setproductList([...response].sort((a, b) => {
							return a.count - b.count
						}))
					})
			}
			catch (err) {
				console.log(err);
			}
		}
	}

	return (
		<>
			{/* Select menu */}
			<div className="row mb-3" >
				<select className="form-select" onChange={changeSortSelect}>
					<option value="alphabetAB">sort products from A to Z</option>
					<option value="quantity">sort products by quantity</option>
				</select>

				{/* Show products on page */}
				{productList.map(function (item) {
					return (
						<div className="col-sm-6 mt-3" key={item.id}>
							<div className="card bg-light ">
								<div className="card-body text-center">
									<img src={item.imageUrl} className="card-img-top" alt="..." />
									<h5 className="card-title">{item.name}</h5>
									<p className="card-text">Total stock: {item.count}</p>
									<div className='row gx-5'>
										<div className="col">
											<a href="#" className="btn btn-outline-primary">See product</a>
										</div>
										<div className="col">
											<button className="btn btn-danger" onClick={() => {
												setIsOpen(true);
												setIdToDelete(item.id);
											}}>
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
				{/* Modal window */}
				<RemoveEvent open={isOpen} deleteItem={idToDelete} onClose={() => setIsOpen(false)} />
			</div>
		</>
	);
}

export default ProductList;