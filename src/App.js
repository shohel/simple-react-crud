import React, { useReducer, useEffect, useState } from 'react';
import {remotePost} from './utils/remoteRequest';
import Header from './elements/Header';
import Table from './elements/Table';
import reducer from './reducer';
import ListContext from './ListContext';

/**
 * We will set pagination cache within this variable.
 * A page should send one request to the backend.
 * @type {*[]}
 */

let paginationCache = [];

function AppWrap() {

	const [listState, listDispatch] = useReducer( reducer, [] );

	/**
	 * As we will perform an API request, so useEffect should fire only once
	 * If it would class, we would call it within componentDidMount() method...
	 */

	useEffect( () => {

		let currentPage = parseInt( listState.current_page );

		if ( paginationCache[currentPage] ) {
			listDispatch( {type: 'UPDATE', playload: paginationCache[currentPage]} );
		} else {
			remotePost( _rdlist_object.rest_routes.get_lists, {current_page: currentPage} ).
				then( response => {

					if ( currentPage ) {
						paginationCache[currentPage] = response;
					}

					listDispatch( {type: 'UPDATE', playload: response} );
				} );
		}

	}, [listState.current_page] );

	console.log(paginationCache);

	const template = (
		<ListContext.Provider value={{listState, listDispatch}}>
			<>
				{!!listState.total ?
					<>
						<Header />
						<Table />
					</>

					: <p>Waiting for the API response</p> }
			</>
		</ListContext.Provider>
	);

	return template;
}

export default AppWrap;