import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Painel from './views/Painel';

export default function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exat element={<Painel/>} />
            </Routes>
        </BrowserRouter>
    );
}