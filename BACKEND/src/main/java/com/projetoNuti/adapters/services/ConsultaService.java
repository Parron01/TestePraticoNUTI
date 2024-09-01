package com.projetoNuti.adapters.services;

import com.projetoNuti.adapters.dtos.ConsultaRequestDTO;
import com.projetoNuti.adapters.dtos.ConsultaResponseDTO;
import com.projetoNuti.adapters.repositories.ConsultaRepository;
import com.projetoNuti.domain.Consulta;
import com.projetoNuti.domain.Contrato;
import com.projetoNuti.infra.exceptions.ConsultaNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConsultaService {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Transactional
    public Consulta salvarConsulta(ConsultaRequestDTO consultaRequestDTO) {
        Consulta consulta = new Consulta();
        consulta.setNomeConsulta(consultaRequestDTO.getNomeConsulta());
        consulta.setCnpj(consultaRequestDTO.getCnpj());
        consulta.setRazaoSocial(consultaRequestDTO.getRazaoSocial());
        consulta.setPoder(consultaRequestDTO.getPoder());
        consulta.setEsfera(consultaRequestDTO.getEsfera());

        List<Contrato> contratos = consultaRequestDTO.getContratos().stream().map(dto -> {
            Contrato contrato = new Contrato();
            contrato.setDataVigenciaInicial(dto.getDataVigenciaInicial());
            contrato.setDataVigenciaFinal(dto.getDataVigenciaFinal());
            contrato.setRazaoSocialFornecedor(dto.getRazaoSocialFornecedor());
            contrato.setObjetoContrato(dto.getObjeto());
            contrato.setValorInicial(dto.getValorInicial());
            contrato.setConsulta(consulta);
            return contrato;
        }).collect(Collectors.toList());

        consulta.setContratos(contratos);

        return consultaRepository.save(consulta);
    }

    public void deleteConsultaById(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new ConsultaNotFoundException(id);
        }
        consultaRepository.deleteById(id);
    }

    public List<ConsultaResponseDTO> buscarTodasConsultas() {
        List<Consulta> consultas = consultaRepository.findAll();
        return consultas.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public Consulta getConsultaById(Long id) {
        return consultaRepository.findById(id)
                .orElseThrow(() -> new ConsultaNotFoundException(id));
    }

    private ConsultaResponseDTO convertToResponseDTO(Consulta consulta) {
        ConsultaResponseDTO responseDTO = new ConsultaResponseDTO();
        responseDTO.setId(consulta.getId());
        responseDTO.setNomeConsulta(consulta.getNomeConsulta());
        responseDTO.setCnpj(consulta.getCnpj());
        responseDTO.setRazaoSocial(consulta.getRazaoSocial());
        responseDTO.setPoderId(consulta.getPoder());
        responseDTO.setEsferaId(consulta.getEsfera());
        return responseDTO;
    }
}
