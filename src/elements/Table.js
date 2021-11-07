import React, {useState, useEffect} from 'react';
import {useFlowContext} from '../FlowContext';
import TableFilter from './TableFilter'
import TableAction from './TableAction';
import {makeTextPlural} from '../utils/PluralText';

const Table = () => {
	const {flowState, flowDispatch} = useFlowContext();

	const perPage = 5;
	const totalPages = Math.ceil(flowState.length / perPage );
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastFlow = currentPage * perPage;
	const indexOfFirstFlow = indexOfLastFlow - perPage;
	const currentFlows = flowState.slice(indexOfFirstFlow, indexOfLastFlow);

	const pageNumbers = [];
	for ( let page_i = 1; page_i <= totalPages; page_i++ ){
		pageNumbers.push(page_i);
	}

	const handlePreviousClick = e => {
		if ( currentPage > 1 ) {
			setCurrentPage( currentPage - 1 );
		}

		return;
	}

	const handleNextClick = e => {
		if ( currentPage < totalPages ) {
			setCurrentPage( currentPage + 1 );
		}
		return;
	}

	const toggleSelect = ( flow_id ) => {
		flowDispatch( {type: 'toggle_select', playload: {select_id: flow_id}} )
	}

	const toggleSelectAll = ( e ) => {
		flowDispatch( {type: 'toggle_all', checked: e.target.checked} );
	}

	const rowDelete = ( flow_index, e ) => {
		e.preventDefault();
		flowDispatch( {type: 'delete_row', playload: {flow_index: flow_index}} );
	}

	const editRow = ( flow_index, e ) => {
		e.preventDefault();

		let oldFlowName = flowState[flow_index].name;
		let flowName = prompt( "Enter the flow name", oldFlowName );

		if ( !flowName || !flowName.length ) {
			return;
		}

		flowDispatch( {type: 'update_flow_name', playload: {flow_index: flow_index, new_name: flowName}} );
	}

	return (
		<>
			<TableFilter/>
			<TableAction/>

			{flowState.length ?

				<>
					<table>
						<thead>
							<tr>
								<th>
									<input type="checkbox" onChange={e => {
										toggleSelectAll( e )
									}}/>
								</th>
								<th>Name</th>
								<th>Status</th>
								<th>
									<strong>Actions</strong>
								</th>
							</tr>
						</thead>

						<tbody>
							{currentFlows.map( ( flow, index ) => {
								return <tr key={flow.id}>
									<td>
										<input type="checkbox" checked={flow.is_checked} onChange={e => {
											toggleSelect( flow.id )
										}}/>
									</td>
									<td> {flow.name} </td>
									<td className={'status-col'}>
										<p>{flow.status}
											<br/>
											{flow.date}
										</p>
									</td>
									<td>
										<a href="#" onClick={e => {
											editRow( index, e )
										}}>Edit
										</a>
										<span className={'action-divider'}>|</span>
										<a href="#" onClick={e => {
											rowDelete( index, e )
										}}>Delete
										</a>
									</td>
								</tr>
							} )}
						</tbody>
					</table>

					<div className={'pagination'}>
						<div className={'pagination-info'}>
							Showing results {indexOfFirstFlow + 1} - {indexOfLastFlow} out of { makeTextPlural( flowState.length, 'flow', 'flows', true ) }
						</div>
						<div className={'links'}>
							<button onClick={ handlePreviousClick }> Prev </button>

							{ pageNumbers.map( ( page, pageIndex ) => {
								return <button className={ ( currentPage === page ) ? 'active' : '' } key={pageIndex} onClick={ e => { setCurrentPage(page) } } >{page}</button>
							} ) }
							<button onClick={ handleNextClick } > Next </button>

						</div>
					</div>
				</>
				:
				<div className={'nodata-jumbotron'}>
					<h3>There is no available flows to show</h3>
				</div>
			}

			<TableAction/>
		</>
	);
}

export default Table;