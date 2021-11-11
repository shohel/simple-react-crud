import React, {useEffect, useState} from 'react';
import {useListContext} from '../ListContext';
import styles from './TableFilter.module.scss';
import {remotePost} from '../utils/remoteRequest';

const TableFilter = () => {
	const [searchTerm, setSearchTerm] = useState( '' );
	const [timerID, setTimerID] = useState( '' );
	const {listState, listDispatch} = useListContext();

	const inputSearchHandler = e => {
		setSearchTerm( e.target.value.trim() );
	}

	useEffect( () => {
		clearTimeout( timerID );

		setTimerID( setTimeout( () => {
			listDispatch( {type: 'search', playload: {search_term: searchTerm}} );
		}, 500 ) );

	}, [searchTerm] );


	return (
		<div className={styles.filterWrap}>

			<div className={styles.activeTextWrap}>
				<p>Active ({listState.total})</p>
			</div>

			<div className={'search-form-wrap'}>
				<div className={styles.inputGroup}>
					<input type="text" placeholder="Search..." onKeyUp={e => inputSearchHandler( e )}/>
					<button type="search-button">🔍</button>
				</div>
			</div>
		</div>
	);
}

export default TableFilter;