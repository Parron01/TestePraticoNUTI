package com.projetoNuti.adapters.controllers;

import com.projetoNuti.adapters.dtos.ConsultaRequestDTO;
import com.projetoNuti.adapters.dtos.ConsultaResponseDTO;
import com.projetoNuti.adapters.services.ConsultaService;
import com.projetoNuti.domain.Consulta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    public ResponseEntity<Consulta> criarConsulta(@RequestBody ConsultaRequestDTO consultaRequestDTO) {
        Consulta novaConsulta = consultaService.salvarConsulta(consultaRequestDTO);
        return ResponseEntity.ok(novaConsulta);
    }

    @GetMapping
    public ResponseEntity<List<ConsultaResponseDTO>> buscarTodasConsultas() {
        List<ConsultaResponseDTO> consultas = consultaService.buscarTodasConsultas();
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consulta> getConsultaById(@PathVariable Long id) {
        Consulta consulta = consultaService.getConsultaById(id);
        return ResponseEntity.ok(consulta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long id) {
        consultaService.deleteConsultaById(id);
        return ResponseEntity.noContent().build();
    }
}
