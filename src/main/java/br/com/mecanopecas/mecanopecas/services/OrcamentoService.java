package br.com.mecanopecas.mecanopecas.services;

import br.com.mecanopecas.mecanopecas.model.Orcamento;
import br.com.mecanopecas.mecanopecas.model.OrcamentoPeca;
import br.com.mecanopecas.mecanopecas.model.Peca;
import br.com.mecanopecas.mecanopecas.model.Venda;
import br.com.mecanopecas.mecanopecas.persistence.OrcamentoPecaRepository;
import br.com.mecanopecas.mecanopecas.persistence.OrcamentoRepository;
import br.com.mecanopecas.mecanopecas.persistence.PecaRepository;
import br.com.mecanopecas.mecanopecas.persistence.VendaRepository;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoPecaRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.request.OrcamentoRequestDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoDetailResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.OrcamentoResponseDTO;
import br.com.mecanopecas.mecanopecas.util.dtos.response.VendaResponseDTO;
import br.com.mecanopecas.mecanopecas.util.exceptions.BadRequestException;
import br.com.mecanopecas.mecanopecas.util.exceptions.NotFoundException;
import br.com.mecanopecas.mecanopecas.util.mappers.OrcamentoMapper;
import br.com.mecanopecas.mecanopecas.util.mappers.VendaMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;
    private final OrcamentoPecaRepository orcamentoPecaRepository;
    private final VendaRepository vendaRepository;
    private final PecaRepository pecaRepository;

    @Autowired
    public OrcamentoService(OrcamentoRepository orcamentoRepository, OrcamentoPecaRepository orcamentoPecaRepository, VendaRepository vendaRepository, PecaRepository pecaRepository) {
        this.orcamentoRepository = orcamentoRepository;
        this.orcamentoPecaRepository = orcamentoPecaRepository;
        this.vendaRepository = vendaRepository;
        this.pecaRepository = pecaRepository;
    }

    public List<OrcamentoResponseDTO> getAllOrcamentos() {
        List<Orcamento> orcamentos = orcamentoRepository.findAll();

        return OrcamentoMapper.toDtoList(orcamentos);
    }

    public OrcamentoDetailResponseDTO getOrcamentoById(Long id) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado"));

        return OrcamentoMapper.toDtoDetail(orcamento);
    }

    public OrcamentoResponseDTO createOrcamento(OrcamentoRequestDTO orcamentoRequestDTO) {
        Orcamento orcamento = new Orcamento();

        BeanUtils.copyProperties(orcamentoRequestDTO, orcamento);

        Orcamento savedOrcamento = orcamentoRepository.save(orcamento);
        return OrcamentoMapper.toDto(savedOrcamento);
    }

    public OrcamentoDetailResponseDTO createOrcamentoPeca(Long id, OrcamentoPecaRequestDTO orcamentoPecaRequestDTO) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado"));

        OrcamentoPeca orcamentoPeca = new OrcamentoPeca();
        BeanUtils.copyProperties(orcamentoPecaRequestDTO, orcamentoPeca);
        orcamentoPeca.setOrcamento(orcamento);

        OrcamentoPeca savedOrcamentoPeca = orcamentoPecaRepository.save(orcamentoPeca);
        return OrcamentoMapper.toDtoDetail(orcamento);
    }

    public OrcamentoDetailResponseDTO applyDescontoOrcamento(Long id, double desconto) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado"));

        orcamento.setPercentualDesconto(desconto);
        Orcamento updatedOrcamento = orcamentoRepository.save(orcamento);

        return OrcamentoMapper.toDtoDetail(updatedOrcamento);
    }

    public VendaResponseDTO createVenda(Long orcamentoId) {
        Orcamento orcamento = orcamentoRepository.findById(orcamentoId)
                .orElseThrow(() -> new NotFoundException("Orcamento não encontrado"));

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
