// src/components/Clientes.js
export function Clientes() {
  return `
    <div class="fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
          <p class="text-gray-600">Gerencie seus pacientes</p>
        </div>
        <button id="btn-novo-cliente" class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Cliente
        </button>
      </div>
      
      <!-- Modal de Novo Cliente (inicialmente escondido) -->
      <div id="modal-novo-cliente" class="modal hidden">
        <div class="modal-content w-full max-w-2xl">
          <div class="modal-header">
            <div class="modal-title">👤 Novo Cliente</div>
            <span class="close-modal" data-modal="novo-cliente">&times;</span>
          </div>
          <div class="modal-body">
            <form id="form-novo-cliente">
              <div class="form-grid">
                <div class="form-group">
                  <label for="cliente-nome">Nome Completo *</label>
                  <input type="text" id="cliente-nome" required placeholder="Nome do cliente">
                </div>
                <div class="form-group">
                  <label for="cliente-telefone">Telefone</label>
                  <input type="tel" id="cliente-telefone" placeholder="(11) 99999-9999">
                </div>
                <div class="form-group">
                  <label for="cliente-email">Email</label>
                  <input type="email" id="cliente-email" placeholder="cliente@email.com">
                </div>
                <div class="form-group">
                  <label for="cliente-cpf">CPF</label>
                  <input type="text" id="cliente-cpf" placeholder="000.000.000-00">
                </div>
                <div class="form-group">
                  <label for="cliente-endereco">Endereço</label>
                  <input type="text" id="cliente-endereco" placeholder="Rua, número, bairro">
                </div>
                <div class="form-group">
                  <label for="cliente-plano">Plano de Saúde</label>
                  <input type="text" id="cliente-plano" placeholder="Plano ou particular">
                </div>
                <div class="form-group col-span-2">
                  <label for="cliente-observacoes">Observações</label>
                  <textarea id="cliente-observacoes" rows="3" placeholder="Informações adicionais..."></textarea>
                </div>
              </div>
              <div class="flex gap-3 justify-end mt-6">
                <button type="button" class="btn btn-secondary close-modal" data-modal="novo-cliente">Cancelar</button>
                <button type="submit" class="btn btn-success">💾 Salvar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Lista de Clientes -->
      <div class="card p-6">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Plano</th>
                <th>Última Visita</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="clientes-lista">
              <!-- Clientes serão carregados aqui -->
              <tr>
                <td colspan="5" class="text-center py-8 text-gray-500">
                  Nenhum cliente cadastrado. Clique em "Novo Cliente" para começar.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Função para inicializar eventos (mantida para compatibilidade)
export function initClientes() {
  return '';
}