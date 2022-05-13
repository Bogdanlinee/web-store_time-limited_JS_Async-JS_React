import React, { useState } from 'react';
import { Portal } from 'react-portal';
import './AddEvent.css';

function AddEvent({ open, onClose }) {
	if (!open) {
		return null;
	}

	function confirm(event) {
		event.preventDefault();
		//Product data
		let formData = event.target.children;

		//Add red border to unfilled inputs
		for (let i of event.target.elements) {
			if (i.classList.contains('addProductCancel') || i.classList.contains('addProductConfirm')) {
			}
			else {
				if (i.value == "") {
					i.classList.add('red');
					return false;
				}
				else if (i.value != "") {
					i.classList.remove('red');
				}
			}
		}

		let idForAdd;

		//Want to know last poduct`s id
		try {
			fetch('http://localhost:3000/itemList')
				.then(response => {
					return response.json();
				})
				.then(response => {
					idForAdd = response.length + 1;

					//Add product backend function call
					addProduct();
				})
		}
		catch (err) {
			console.log(err)
		}


		// Add product backend function
		function addProduct() {

			//Variable for ID
			let min = Math.ceil(0);
			let max = Math.floor(99999);
			let random = Math.floor(Math.random() * (max - min + 1)) + min;

			try {
				fetch('http://localhost:3000/itemList', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						//Forming unique id
						"id": idForAdd + random,
						"imageUrl": formData.imageUrl.value,
						"name": formData.name.value,
						"count": formData.count.value,
						"size": {
							"width": formData.width.value,
							"height": formData.height.value
						},
						"weight": formData.weight.value,
						"comments": ["CommentModel", "CommentModel"]
					})
				})
					.then(response => {
						window.location.reload()
					})
			}
			catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<>
			<Portal>
				<div className='add_overlay'></div>
				<div className='add_styles'>
					<form className="newProductWindow" onSubmit={confirm}>
						<input className='form-control form-control-sm' name="imageUrl" type="text" placeholder="image url" />
						<input className='form-control form-control-sm mt-2' name="name" type="text" placeholder="product name" />
						<input className='form-control form-control-sm mt-2' name="count" type="number" placeholder="quantity" />
						<input className='form-control form-control-sm mt-2' name="width" type="number" placeholder="width" />
						<input className='form-control form-control-sm mt-2' name="height" type="number" placeholder="height" />
						<input className='form-control form-control-sm mt-2' name="weight" type="number" placeholder="weight" />

						<div className="d-grid gap-2 col-6 mx-auto">
							<button className="addProductCancel mt-2 d-block btn btn-primary" type='submit' onSubmit={confirm}>confirm</button>
							<button className="addProductCancel mt-2 d-block btn btn-danger" onClick={onClose}>cancel</button>
						</div>
					</form>
				</div>
			</Portal>
		</>
	);
}

export default AddEvent;