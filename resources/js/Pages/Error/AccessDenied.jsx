import React from 'react';

const AccessDenied = () => {
    return (
        <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
            <h1 className="display-4 text-danger">Access Denied</h1>
            <p className="lead">You do not have permission to view this page.</p>
            <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/'}
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default AccessDenied;
