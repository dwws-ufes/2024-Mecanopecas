package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import br.com.mecanopecas.mecanopecas.model.Endereco;

@Entity
@Table(name = "entregas")
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String recebedor;

    @Column(name = "responsavel_entrega")
    private String responsavelEntrega;

    @Column(name = "tipo_entrega")
    private int tipoEntrega;

    @OneToOne
    @JoinColumn(name = "orcamento_id")
    private Orcamento orcamento;

    public Long getId() {
        return id;
    }

    public String getRecebedor() {
        return recebedor;
    }
    public void setRecebedor(String recebedor) {
        this.recebedor = recebedor;
    }

    public String getResponsavelEntrega() {
        return responsavelEntrega;
    }
    public void setResponsavelEntrega(String responsavelEntrega) {
        this.responsavelEntrega = responsavelEntrega;
    }

    public int getTipoEntrega() {
        return tipoEntrega;
    }
    public void setTipoEntrega(int tipoEntrega) {
        this.tipoEntrega = tipoEntrega;
    }
}
