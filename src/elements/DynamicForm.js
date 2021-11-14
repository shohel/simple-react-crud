import React from 'react';
import {useForm} from 'react-hook-form';


const DynamicForm = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();

	console.log( watch( 'firstName' ) )

	return (
		<input type={'text'} { ...register('first-name') } />
	);

}

export default DynamicForm;