import React, {useState, useEffect} from 'react';
import {useListContext} from '../ListContext';
import TableFilter from './TableFilter'
import TableAction from './TableAction';
import {makeTextPlural} from '../utils/PluralText';
import styles from './Table.module.scss';
import {remotePost} from '../utils/remoteRequest';


const Table = () => {
	const {listState, listDispatch} = useListContext();

	const totalPages = listState.total_pages;
	const [currentPage, setCurrentPage] = useState( 1 );

	useEffect( () => {

		listDispatch( {type: 'paginate', current_page: currentPage } )

	}, [currentPage] );

	const pageNumbers = [];
	for ( let page_i = 1; page_i <= totalPages; page_i ++ ) {
		pageNumbers.push( page_i );
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

	const toggleSelect = ( list_id ) => {
		listDispatch( {type: 'toggle_select', playload: {select_id: list_id}} )
	}

	const toggleSelectAll = ( e ) => {
		listDispatch( {type: 'toggle_all', checked: e.target.checked} );
	}

	const rowDelete = ( list_index, e ) => {
		e.preventDefault();
		listDispatch( {type: 'delete_row', playload: {list_index: list_index}} );
	}

	const editRow = ( listID, e ) => {
		e.preventDefault();

		let list_index = listState.findIndex( list => {
			return list.list_ID === listID;
		} );
		let oldListName = listState[list_index].name;
		let listName = prompt( "Enter the list name", oldListName );

		if ( !listName || !listName.length ) {
			return;
		}

		listDispatch( {type: 'update_list_name', playload: {list_index: list_index, new_name: listName}} );
	}

	return (
		<>
			<TableFilter/>
			<TableAction/>

			{listState.total ?

				<>
					<table className={styles.table}>
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
							{listState.data.map( ( list, index ) => {
								return <tr key={list.list_ID}>
									<td>
										<input type="checkbox" checked={!!list.is_checked} onChange={e => {
											toggleSelect( list.list_ID )
										}}/>
									</td>
									<td> {list.list_ID} - {list.list_title} </td>
									<td className={'status-col'}>
										<p>{list.list_status}
											<br/>
											{list.created_at}
										</p>
									</td>
									<td>
										<a href="#" onClick={e => {
											editRow( list.list_ID, e )
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
							Showing results {listState.from} - {listState.to} out of {makeTextPlural( listState.total,
							'list', 'lists', true )}
						</div>
						<div className={'links'}>
							<button onClick={handlePreviousClick}>Prev</button>

							{pageNumbers.map( ( page, pageIndex ) => {
								return <button className={(
									currentPage === page
								) ? 'active' : ''} key={pageIndex} onClick={e => {
									setCurrentPage( page )
								}}>{page}</button>
							} )}
							<button onClick={handleNextClick}>Next</button>
						</div>
					</div>
				</>
				:
				<div className={'nodata-jumbotron'}>
					<h3>There is no available lists to show</h3>
				</div>
			}

			<TableAction/>
		</>
	);
}

export default Table;