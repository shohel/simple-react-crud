import React, { createContext, useContext } from 'react';

const ListContext = createContext( {} );

export function useListContext() {
	return useContext(ListContext);
}

export default ListContext;