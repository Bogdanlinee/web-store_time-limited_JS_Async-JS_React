import React from 'react';
import { useState } from 'react';
import "./Header.css";
import AddEvent from './AddEvent'

function Header() {
	//Visible modal window
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="bg-secondary p-3 mb-3">
				<div className='text-center'>
					<p className='fs-2 fw-bold text-light'>Press the button below and add your product</p>
					<button className='btn btn-primary fs-4' onClick={() => setIsOpen(true)}>add product</button>
					<AddEvent open={isOpen} onClose={() => setIsOpen(false)} />
				</div>
			</div>
		</>
	);
}

export default Header;