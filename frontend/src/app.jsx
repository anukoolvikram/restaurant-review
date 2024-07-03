import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import RestaurantDetail from './routes/RestaurantDetail';
import Update from './routes/Update';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetail />} />
                    <Route path="/restaurants/:id/update" element={<Update />} />
                </Routes>
            </Router>
            </div>
        </RestaurantsContextProvider>

    );
};

export default App;
