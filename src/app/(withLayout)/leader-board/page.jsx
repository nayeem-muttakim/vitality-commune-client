import React from 'react';
import PrivateRoute from '../../../components/PrivateRoute';

const LeaderBoard = () => {
    return (
        <PrivateRoute>
            <div>leader board</div>
        </PrivateRoute>
    );
};

export default LeaderBoard;