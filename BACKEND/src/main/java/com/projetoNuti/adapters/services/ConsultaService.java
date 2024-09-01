package com.projetoNuti.adapters.services;

import com.projetoNuti.adapters.repositories.ConsultaRepository;
import com.projetoNuti.adapters.repositories.ContratoRepository;
import com.projetoNuti.domain.Consulta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    @Transactional
    public Consulta salvarConsulta(Consulta consulta) {
        return consultaRepository.save(consulta);
    }

    @Transactional
    public void deletarConsultaPorNome(String nomeConsulta) {
        Optional<Consulta> consulta = consultaRepository.findByNomeConsulta(nomeConsulta);
        consulta.ifPresent(consultaRepository::delete);
    }

    public List<Consulta> buscarTodasConsultas() {
        return consultaRepository.findAll();
    }

    public Optional<Consulta> buscarConsultaCompletaPorNome(String nomeConsulta) {
        return consultaRepository.findByNomeConsulta(nomeConsulta);
    }
}
