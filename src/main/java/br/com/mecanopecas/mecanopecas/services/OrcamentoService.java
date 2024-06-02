package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.*;
import br.com.mecanopecas.mecanopecas.persistence.*;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoPecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.OrcamentoMapper;
import br.com.mecanopecas.mecanopecas.util.mappers.VendaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;
    private final OrcamentoPecaRepository orcamentoPecaRepository;
    private final VendaRepository vendaRepository;
    private final PecaRepository pecaRepository;
    private final VendedorRepository vendedorRepository;
    private final GerenteRepository gerenteRepository;
    private final ClienteRepository clienteRepository;

    @Autowired
    public OrcamentoService(OrcamentoRepository orcamentoRepository, OrcamentoPecaRepository orcamentoPecaRepository, VendaRepository vendaRepository, PecaRepository pecaRepository, VendedorRepository vendedorRepository, GerenteRepository gerenteRepository, ClienteRepository clienteRepository) {
        this.orcamentoRepository = orcamentoRepository;
        this.orcamentoPecaRepository = orcamentoPecaRepository;
        this.vendaRepository = vendaRepository;
        this.pecaRepository = pecaRepository;
        this.vendedorRepository = vendedorRepository;
        this.gerenteRepository = gerenteRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<OrcamentoResponseDTO> getAllOrcamentos() {
        List<Orcamento> orcamentos = orcamentoRepository.findAll();

        return OrcamentoMapper.toDtoList(orcamentos);
    }

    public OrcamentoDetailResponseDTO getOrcamentoById(Long id) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado."));

        return OrcamentoMapper.toDtoDetail(orcamento);
    }

    public OrcamentoResponseDTO createOrcamento(Long vendedorId, OrcamentoRequestDTO orcamentoRequestDTO) {
        if (orcamentoRepository.existsByCodigo(orcamentoRequestDTO.codigo())) {
            throw new BadRequestException("Já existe um orçamento com o mesmo código.");
        }

        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new NotFoundException("Vendedor não encontrado."));

        if(!vendedor.isAtivo())
            throw new NotFoundException("O vendedor informado está inativo.");

        Cliente cliente = clienteRepository.findById(orcamentoRequestDTO.clienteId())
                .orElseThrow(() -> new NotFoundException("Cliente não encontrado."));

        if(!cliente.isAtivo())
            throw new NotFoundException("O cliente informado está inativo.");

        Orcamento orcamento = new Orcamento();

        orcamento.setVendedor(vendedor);
        orcamento.setCliente(cliente);
        orcamento.setCodigo(orcamentoRequestDTO.codigo());
        orcamento.setDataExpiracao(orcamentoRequestDTO.dataExpiracao());

        Orcamento savedOrcamento = orcamentoRepository.save(orcamento);
        return OrcamentoMapper.toDto(savedOrcamento);
    }

    public OrcamentoDetailResponseDTO addOrcamentoPeca(Long id, OrcamentoPecaRequestDTO orcamentoPecaRequestDTO) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado."));

        if (orcamento.getVenda() != null) {
            throw new BadRequestException("Este orçamento já possui uma venda associada e não pode ser modificado.");
        }

        LocalDateTime dataAtual = LocalDateTime.now();
        if (orcamento.getDataExpiracao().isBefore(dataAtual)) {
            throw new BadRequestException("Este orçamento está expirado e não pode ser modificado.");
        }

        Peca peca = pecaRepository.findById(orcamentoPecaRequestDTO.pecaId())
                .orElseThrow(() -> new NotFoundException("Peca não encontrada."));

        if(!peca.isAtivo())
            throw new NotFoundException("A peca informada está inativa.");

        boolean exists = orcamento.getOrcamentoPecas().stream()
                .anyMatch(orcamentoPeca -> orcamentoPeca.getPeca().getId().equals(peca.getId()));

        if (exists)
            throw new BadRequestException("A peça já está associada ao orçamento.");


        OrcamentoPeca orcamentoPeca = new OrcamentoPeca();
        orcamentoPeca.setOrcamento(orcamento);
        orcamentoPeca.setPeca(peca);
        orcamentoPeca.setQuantidade(orcamentoPecaRequestDTO.quantidade());

        OrcamentoPeca savedOrcamentoPeca = orcamentoPecaRepository.save(orcamentoPeca);
        orcamento.getOrcamentoPecas().add(savedOrcamentoPeca);

        return OrcamentoMapper.toDtoDetail(orcamento);
    }

    public OrcamentoDetailResponseDTO removeOrcamentoPeca(Long id, Long orcamentoPecaId) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado."));

        if(orcamento.getOrcamentoPecas().stream().noneMatch(orcamentoPeca -> Objects.equals(orcamentoPeca.getId(), orcamentoPecaId)))
        {
            throw new NotFoundException("O OrcamentoPeca informado não faz parte deste orcamento.");
        }

        OrcamentoPeca orcamentoPeca = orcamentoPecaRepository.findById(orcamentoPecaId)
                .orElseThrow(() -> new NotFoundException("OrcamentoPeca não encontrado."));

        if (orcamento.getVenda() != null) {
            throw new BadRequestException("Este orçamento já possui uma venda associada e não pode ser modificado.");
        }

        LocalDateTime dataAtual = LocalDateTime.now();
        if (orcamento.getDataExpiracao().isBefore(dataAtual)) {
            throw new BadRequestException("Este orçamento está expirado e não pode ser modificado.");
        }

        orcamento.getOrcamentoPecas().remove(orcamentoPeca);
        orcamentoPecaRepository.delete(orcamentoPeca);

        return OrcamentoMapper.toDtoDetail(orcamento);
    }

    public OrcamentoDetailResponseDTO applyDescontoOrcamento(Long id, Long gerenteId, double percentualDesconto) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado."));

        if (orcamento.getVenda() != null) {
            throw new BadRequestException("Este orçamento já possui uma venda associada e não pode ser modificado.");
        }

        LocalDateTime dataAtual = LocalDateTime.now();
        if (orcamento.getDataExpiracao().isBefore(dataAtual)) {
            throw new BadRequestException("Este orçamento está expirado e não pode ser modificado.");
        }

        Gerente gerente = gerenteRepository.findById(gerenteId)
                .orElseThrow(() -> new NotFoundException("Gerente não encontrado."));

        if (percentualDesconto > gerente.getPercentualMaxDesconto()) {
            throw new BadRequestException("O desconto fornecido excede o máximo permitido para este gerente.");
        }

        orcamento.setPercentualDesconto(percentualDesconto);
        Orcamento updatedOrcamento = orcamentoRepository.save(orcamento);

        return OrcamentoMapper.toDtoDetail(updatedOrcamento);
    }

    public VendaResponseDTO createVenda(Long orcamentoId) {
        Orcamento orcamento = orcamentoRepository.findById(orcamentoId)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado."));

        if (orcamento.getVenda() != null) {
            throw new BadRequestException("Este orçamento já possui uma venda associada e não pode ser modificado.");
        }

        LocalDateTime dataAtual = LocalDateTime.now();
        if (orcamento.getDataExpiracao().isBefore(dataAtual)) {
            throw new BadRequestException("Este orçamento está expirado e não pode ser modificado.");
        }

        Venda venda = new Venda();
        venda.setOrcamento(orcamento);
        venda.setValorFinal(orcamento.getValorTotal());

        List<OrcamentoPeca> orcamentoPecas = orcamento.getOrcamentoPecas();
        for (OrcamentoPeca orcamentoPeca : orcamentoPecas) {
            Peca peca = orcamentoPeca.getPeca();
            int quantidadeVendida = orcamentoPeca.getQuantidade();
            int quantidadeEmEstoque = peca.getQtdEstoque();
            int novoEstoque = quantidadeEmEstoque - quantidadeVendida;
            if (novoEstoque < 0) {
                throw new BadRequestException("Estoque insuficiente para a Peça '" + peca.getNome() + "'. Quantidade solicitada no orçamento: " + quantidadeVendida + ". Quantidade em estoque: " + quantidadeEmEstoque);
            }
            peca.setQtdEstoque(novoEstoque);
            pecaRepository.save(peca);
        }

        vendaRepository.save(venda);

        return VendaMapper.toDto(venda);
    }
}
