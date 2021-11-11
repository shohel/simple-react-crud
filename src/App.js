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

	const [listState, listDispatch] = useReducer( reducer, {search_term: ''} );

	/**
	 * As we will perform an API request, so useEffect should fire only once
	 * If it would class, we would call it within componentDidMount() method...
	 */

	useEffect( () => {
		paginationCache = [];
		listState.current_page = 1;

	}, [listState.search_term] );


	useEffect( () => {

		let currentPage = parseInt( listState.current_page );
		let search_term = listState.search_term;

		if ( paginationCache[currentPage] ) {
			listDispatch( {type: 'UPDATE', playload: paginationCache[currentPage]} );
		} else {
			remotePost( _rdlist_object.rest_routes.get_lists, {current_page: currentPage, search_term: search_term} ).
				then( response => {
					response = {...response, search_term: search_term}

					if ( currentPage ) {
						paginationCache[currentPage] = response;
					}

					listDispatch( {type: 'UPDATE', playload: response} );
				} );
		}

	}, [listState.current_page, listState.search_term] );

	const template = (
		<ListContext.Provider value={{listState, listDispatch}}>
			<>

				<Header/>
				{!!listState.success ?
					<Table/>
					: <p>Waiting for the API response</p>
				}
			</>
		</ListContext.Provider>
	);

	return template;
}

export default AppWrap;