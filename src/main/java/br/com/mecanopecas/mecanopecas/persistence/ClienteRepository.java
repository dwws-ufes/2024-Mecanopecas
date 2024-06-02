package br.com.mecanopecas.mecanopecas.persistence;

import br.com.mecanopecas.mecanopecas.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
