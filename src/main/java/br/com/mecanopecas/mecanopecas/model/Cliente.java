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

    private String cpf;

    private String nome;

    @Column(name = "tipo_cliente")
    private int tipoCliente;

    @ManyToOne
    private Empresa empresa;

    @OneToOne
    private Endereco endereco;

    @OneToMany(mappedBy = "cliente")
    private List<Orcamento> orcamentos;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_nascimento")
    private Date dataNascimento;

    public Long getId() { return id; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public int getTipoCliente() { return tipoCliente; }
    public void setTipoCliente(int tipoCliente) { this.tipoCliente = tipoCliente; }

    public Empresa getEmpresa() { return empresa; }
    public void setEmpresa(Empresa empresa) { this.empresa = empresa; }

    public Endereco getEndereco() { return endereco; }
    public void setEndereco(Endereco endereco) { this.endereco = endereco; }

    public Date getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }
}
