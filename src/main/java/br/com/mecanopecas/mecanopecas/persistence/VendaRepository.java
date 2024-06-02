package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
