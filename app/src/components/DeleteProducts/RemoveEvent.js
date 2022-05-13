import React, { useState } from 'react';
import { Portal } from 'react-portal';
import './RemoveEvent.css';

function RemoveEvent({ open, onClose, deleteItem }) {
	if (!open) {
		return null;
	}

	//Delete product and refresh padge
	function deleteProduct() {
		try {
			fetch(`http://localhost:3000/itemList/${deleteItem}`, {
				method: 'DELETE',
			})
				.then(response => {
					window.location.reload();
				});
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Portal>
				<div className='remove_overlay'></div>
				<div className="d-grid gap-2 col-6 mx-auto">
					<div className='remove_styles text-center'>
						<p className='fs-2'>Do you really want delete your product?</p>
						<div className="d-grid gap-2 col-6 mx-auto">
							<button className="mt-2 d-block btn btn-danger" type="submit" onClick={deleteProduct}>confirm</button>
							<button className="mt-2 d-block btn btn-primary" onClick={onClose}>cancel</button>
						</div>
					</div>
				</div>
			</Portal>
		</>
	);
}

export default RemoveEvent;