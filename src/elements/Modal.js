import React, {useState, useEffect} from 'react';
import styles from './Modal.module.scss'

const Modal = ( props ) => {

	const [showModal, setShowModal] = useState( !!props.show );

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
						<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
							egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
							egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

							Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
							egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

						</p>
					</div>

					<div className={styles.modalFooter}>
						<button onClick={closeBtnHandle}>Cancel</button>
						<button>Save</button>
					</div>

				</div>

			</div>
		</>
	)

}

export default Modal