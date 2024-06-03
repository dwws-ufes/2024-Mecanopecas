package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {
    @Query("SELECT COUNT(o) > 0 FROM Orcamento o WHERE o.codigo = :codigo")
    boolean existsByCodigo(@Param("codigo") String codigo);

    List<Orcamento> findAllByDataOrcamentoBetween(LocalDateTime dataInicio, LocalDateTime dataFim);
}
