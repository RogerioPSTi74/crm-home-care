// src/components/Modal.js
// Funções para gerenciar modais

// Exportar initModals (a função que está faltando)
export function initModals() {
    console.log('🔧 Modais inicializados');
    
    // Adicionar event listeners para fechar modais
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.classList.contains('flex')) {
                    closeModal(modal.id);
                }
            });
        }
    });
}

// Funções auxiliares
export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Funções específicas para modais existentes
export function openModalContaReceber() {
    openModal('modalContaReceber');
}

export function fecharModalContaReceber() {
    closeModal('modalContaReceber');
}

export function openModalContaPagar() {
    openModal('modalContaPagar');
}

export function fecharModalContaPagar() {
    closeModal('modalContaPagar');
}

export function openModalDetalhesCliente(clienteId) {
    openModal('modalDetalhesCliente');
    // Aqui você carregaria os detalhes do cliente
}

export function fecharModalDetalhesCliente() {
    closeModal('modalDetalhesCliente');
}

// Funções de salvar (exemplo)
export function salvarContaReceber() {
    alert('Função salvarContaReceber chamada');
    // Implementar lógica real aqui
}

export function salvarContaPagar() {
    alert('Função salvarContaPagar chamada');
    // Implementar lógica real aqui
}

export function editarClienteDetalhes() {
    alert('Função editarClienteDetalhes chamada');
}