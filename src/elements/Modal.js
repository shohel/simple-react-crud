import React, {useState, useEffect} from 'react';
import styles from './Modal.module.scss'
import {remotePost} from '../utils/remoteRequest';
import {useListContext} from '../ListContext';

const Modal = ( props ) => {

	const {listState, listDispatch} = useListContext();
	const [showModal, setShowModal] = useState( !!props.show );
	const [data, setData] = useState( {list_title: '', description: ''} );

	const closeBtnHandle = e => {
		if ( props.handle_close ) {
			props.handle_close();
		}
		setShowModal( false );
	}

	const handleKeyUp = e => {
		if ( 'Escape' === e.key ) {
			closeBtnHandle();
		}
	}

	useEffect( () => {
		document.addEventListener( 'keydown', handleKeyUp );

		return () => document.removeEventListener( "keydown", handleKeyUp );
	} );

	const handleTitle = e => {
		setData( {...data, list_title: e.target.value} );
	}

	const handleDescription = e => {
		setData( {...data, description: e.target.value} );
	}

	const handleSave = e => {

		remotePost( _rdlist_object.rest_routes.create_list, {...data} ).
			then( response => {
				listDispatch( {type: 'UPDATE', playload: response} );
				closeBtnHandle();
			} );
	}

	return (
		<>
			<div className={styles.modal + ' ' + (
				showModal ? styles.show : ''
			)} style={{
				display: (
					showModal
				) ? 'block' : 'none'
			}}>

				<div className={styles.modalContent}>

					<div className={styles.modalHeader}>
						<h4>Modal</h4>
						<button onClick={closeBtnHandle}>X</button>
					</div>

					<div className={styles.modalBody}>
						<div className={styles.formGroup}>
							<label> {_rdlist_object.form.title} </label>
							<input type="text" className={styles.formControl} defaultValue={data.list_title}  onKeyDown={handleTitle}/>
						</div>

						<div className={styles.formGroup}>
							<label> {_rdlist_object.form.description} </label>
							<textarea className={styles.formControl}
							          onKeyDown={handleDescription} defaultValue={data.description}></textarea>
						</div>
					</div>

					<div className={styles.modalFooter}>
						<button onClick={closeBtnHandle}> {_rdlist_object.form.cancel} </button>
						<button className={'button-primary'} onClick={handleSave}> {_rdlist_object.form.save} </button>
					</div>

				</div>

			</div>
		</>
	)

}

export default Modal