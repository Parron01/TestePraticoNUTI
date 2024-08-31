import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import Contratos from "./pages/Contratos";
import HistoricoConsultas from "./pages/HistoricoConsultas";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<DefaultLayout />}>
                <Route path="/contratos" element={<Contratos />} />
                <Route path="/historico-consultas" element={<HistoricoConsultas />} />
            </Route>
        </Routes>
    );
}