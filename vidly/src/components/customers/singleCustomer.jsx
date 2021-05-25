import React from 'react';
import {Link} from 'react-router-dom';

const img = {
    width:'100px',
    height:'100px',
    borderRadius:'50%',
    objectFit: 'cover',
    marginRight:'1.5rem'
}


const Customer = ({imageBase64, name, phone, isGold, _id}) => {
    console.log(imageBase64)
    return (
        <div style={{display:'flex',marginBottom:'2rem', borderBottom: '1px solid black'}}>
            
            {imageBase64 && <img style={img} className="img-fluid" src={require(`../../utils/images/${imageBase64}`).default}/> }
            <div>
                <Link to={`/customers/${_id}`}>{name}</Link>
                <p>{phone}</p>
                <p>Is Gold: {isGold ? 'yes' : 'no'}</p>
            </div>
        </div>
    )
}

export default Customer;