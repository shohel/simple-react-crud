import React, {useState, useEffect} from 'react';
import {useListContext} from '../ListContext';
import TableFilter from './TableFilter'
import TableAction from './TableAction';
import {makeTextPlural} from '../utils/PluralText';
import styles from './Table.module.scss';


const Table = () => {
	const {listState, listDispatch} = useListContext();

	const perPage = 5;
	const totalPages = Math.ceil(listState.length / perPage );
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastList = currentPage * perPage;
	const indexOfFirstList = indexOfLastList - perPage;
	const currentLists = listState.slice(indexOfFirstList, indexOfLastList);

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
			return list.id === listID;
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

			{listState.length ?

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
							{currentLists.map( ( list, index ) => {
								return <tr key={list.id}>
									<td>
										<input type="checkbox" checked={list.is_checked} onChange={e => {
											toggleSelect( list.id )
										}}/>
									</td>
									<td> {list.name} </td>
									<td className={'status-col'}>
										<p>{list.status}
											<br/>
											{list.date}
										</p>
									</td>
									<td>
										<a href="#" onClick={e => { editRow( list.id, e ) }}> Edit </a>
										<span className={'action-divider'}>|</span>
										<a href="#" onClick={e => { rowDelete( index, e ) }}> Delete </a>
									</td>
								</tr>
							} )}
						</tbody>
					</table>

					<div className={'pagination'}>
						<div className={'pagination-info'}>
							Showing results {indexOfFirstList + 1} - {indexOfLastList} out of { makeTextPlural( listState.length, 'list', 'lists', true ) }
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
					<h3>There is no available lists to show</h3>
				</div>
			}

			<TableAction/>
		</>
	);
}

export default Table;