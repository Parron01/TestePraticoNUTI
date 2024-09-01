package com.projetoNuti.adapters.repositories;

import com.projetoNuti.domain.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    // Aqui você pode adicionar consultas personalizadas, se necessário
}
