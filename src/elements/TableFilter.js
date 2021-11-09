import React, {useState} from 'react';
import {useFlowContext} from '../FlowContext';
import styles from './TableFilter.module.scss';

const TableFilter = () => {
	const [timerID, setTimerID] = useState( '' );
	const {flowState, flowDispatch} = useFlowContext();

	const inputSearchHandler = e => {
		clearTimeout( timerID );

		setTimerID( setTimeout( () => {
			flowDispatch( {type: 'search_flows', playload: {search_term: e.target.value}} );
		}, 500 ) );
	}

	return (
		<div className={ styles.filterWrap }>

			<div className={ styles.activeTextWrap }>
				<p>Active ({flowState.length})</p>
			</div>

			<div className={'search-form-wrap'}>
				<div className={ styles.inputGroup }>
					<input type="text" placeholder="Search flows" onKeyUp={e => inputSearchHandler( e )}/>
					<button type="search-button">🔍</button>
				</div>
			</div>
		</div>
	);
}

export default TableFilter;