package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Frete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreteRespository extends JpaRepository<Frete, Long> {
}
