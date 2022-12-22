import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <p>PaymentCancel</p>
            <button onClick={   () => navigate('/buyer')}>Back to home</button>
        </div>
    )
}

export default PaymentCancel;   