package br.com.mecanopecas.mecanopecas.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String cpfCnpj;

    private String nome;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    private List<Orcamento> orcamentos;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_nascimento")
    private Date dataNascimento;

    private boolean ativo;

    public Long getId() {
        return id;
    }

    public String getCpfCnpj() { return cpfCnpj;}
    public void setCpfCnpj(String cpfCnpj) { this.cpfCnpj = cpfCnpj; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public List<Orcamento> getOrcamentos() { return orcamentos; }
    public void setOrcamentos(List<Orcamento> orcamentos) { this.orcamentos = orcamentos; }

    public Date getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
}
