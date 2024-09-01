package com.projetoNuti.adapters.controllers;

import com.projetoNuti.adapters.services.ConsultaService;
import com.projetoNuti.domain.Consulta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @PostMapping
    public ResponseEntity<Consulta> criarConsulta(@RequestBody Consulta consulta) {
        Consulta novaConsulta = consultaService.salvarConsulta(consulta);
        return ResponseEntity.ok(novaConsulta);
    }

    @DeleteMapping("/{nomeConsulta}")
    public ResponseEntity<Void> deletarConsultaPorNome(@PathVariable String nomeConsulta) {
        consultaService.deletarConsultaPorNome(nomeConsulta);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Consulta>> buscarTodasConsultas() {
        List<Consulta> consultas = consultaService.buscarTodasConsultas();
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{nomeConsulta}")
    public ResponseEntity<Consulta> buscarConsultaCompletaPorNome(@PathVariable String nomeConsulta) {
        Optional<Consulta> consulta = consultaService.buscarConsultaCompletaPorNome(nomeConsulta);
        return consulta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
