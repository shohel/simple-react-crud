import React from 'react';
import styles from '../dynamicFormBuilder.module.scss';


const RenderField = props => {

	return (

		<>
			{
				props.fields.map( field => {
					switch ( field.fieldType ) {
						case 'text' :
							return <TextField key={field.ID} field={field} />;
							break
					}
				} )
			}
		</>

	)
}


const TextField = ( props ) => {
	const {field: {fieldTitle, fieldName, isRequired}} = props;

	return (
		<div className={styles.formGroup}>
			<label> {fieldTitle} </label>
			<input type="text" className={styles.formControl}/>

		</div>
	)
}




export default RenderField;