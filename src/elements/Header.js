import React, {useState, useEffect} from 'react';
import Modal from './Modal';
import styles from './Header.module.scss';
import { useListContext } from '../ListContext';

function Header() {

	const [showModal, setShowModal] = useState( false );
	const {listState, listDispatch} = useListContext();

	const addNewList = ( e ) => {
		setShowModal( !showModal );
	}

	const handleModalClose = () => {
		setShowModal( !showModal );
	}

	const importHandler = e => {
		const inputFileElement = document.createElement( 'input' )
		inputFileElement.setAttribute( 'type', 'file' )
		//inputFileElement.setAttribute( 'multiple', 'true' )
		inputFileElement.setAttribute( 'accept', '.json' )

		inputFileElement.addEventListener(
			'change',
			( e ) => {

				let reader = new FileReader();
				reader.onload = ( e ) => {
					listDispatch( {type: 'upload_json', playload: {json_data: JSON.parse( e.target.result )}} );
				};
				reader.readAsText( e.target.files[0] );
			},
			false,
		)
		inputFileElement.click()
	};

	const handleExport = e => {
		e.preventDefault();

		let a = document.createElement( "a" );
		let file = new Blob( [JSON.stringify( listState )], {type: 'text/plain'} );
		a.href = URL.createObjectURL( file );
		a.download = 'lists.json';
		a.click();
	}

	const element = (
		<div className={styles.list_header}>
			<h2>Lists</h2>
			<button type="button" className={'button-primary'} onClick={addNewList}>Add New</button>
			<button type="button" onClick={importHandler}>Import</button>
			<button type="button" onClick={handleExport}>Export All ({listState.length})</button>
			{ showModal && <Modal show={true} handle_close={handleModalClose} /> }
		</div>
	);

	return element;
}

export default Header;