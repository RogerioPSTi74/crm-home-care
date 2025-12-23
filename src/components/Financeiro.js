// src/components/Financeiro.js
export function Financeiro() {
  // Dados de exemplo para demonstração
  const contasReceber = [
    { id: 1, cliente: 'Maria Silva', descricao: 'Consulta Dezembro', valor: 450.00, vencimento: '25/12/2024', status: 'pendente' },
    { id: 2, cliente: 'João Pereira', descricao: 'Visita Domiciliar', valor: 320.00, vencimento: '28/12/2024', status: 'pendente' },
    { id: 3, cliente: 'Ana Costa', descricao: 'Fisioterapia', valor: 280.00, vencimento: '20/12/2024', status: 'pago' },
  ];

  const contasPagar = [
    { id: 1, fornecedor: 'Enf. Roberto', descricao: 'Pagamento plantões', valor: 1800.00, vencimento: '30/12/2024', status: 'pendente' },
    { id: 2, fornecedor: 'Dra. Carla', descricao: 'Honorários', valor: 2500.00, vencimento: '05/01/2025', status: 'pendente' },
    { id: 3, fornecedor: 'FarmaMed', descricao: 'Medicamentos', valor: 650.00, vencimento: '15/12/2024', status: 'pago' },
  ];

  // Cálculos
  const totalReceber = contasReceber.reduce((sum, conta) => sum + conta.valor, 0);
  const totalPagar = contasPagar.reduce((sum, conta) => sum + conta.valor, 0);
  const saldo = totalReceber - totalPagar;
  const recebido = contasReceber.filter(c => c.status === 'pago').reduce((sum, c) => sum + c.valor, 0);
  const pago = contasPagar.filter(c => c.status === 'pago').reduce((sum, c) => sum + c.valor, 0);

  return `
    <div class="financeiro-container fade-in">
      <!-- Cabeçalho -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Financeiro</h1>
          <p class="text-gray-600">Gestão de contas a pagar e receber</p>
        </div>
        
        <div class="flex gap-3">
          <button id="btn-nova-conta-receber" class="btn btn-success flex items-center gap-2">
            <span>📥</span>
            Nova Receita
          </button>
          <button id="btn-nova-conta-pagar" class="btn btn-danger flex items-center gap-2">
            <span>📤</span>
            Nova Despesa
          </button>
        </div>
      </div>
      
      <!-- Cards de Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Saldo -->
        <div class="card p-6 border-t-4 ${saldo >= 0 ? 'border-green-500' : 'border-red-500'}">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Saldo Disponível</p>
              <p class="text-3xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
                R$ ${saldo.toFixed(2)}
              </p>
            </div>
            <div class="w-12 h-12 ${saldo >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center">
              <span class="text-2xl ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
                ${saldo >= 0 ? '💰' : '💸'}
              </span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}">
              ${saldo >= 0 ? '✅ Positivo' : '⚠️ Negativo'}
            </span>
          </div>
        </div>
        
        <!-- A Receber -->
        <div class="card p-6 border-t-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">A Receber</p>
              <p class="text-3xl font-bold text-gray-800">R$ ${totalReceber.toFixed(2)}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-blue-600">📥</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-blue-600">
              ${contasReceber.filter(c => c.status === 'pendente').length} pendentes
            </span>
          </div>
        </div>
        
        <!-- A Pagar -->
        <div class="card p-6 border-t-4 border-red-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">A Pagar</p>
              <p class="text-3xl font-bold text-gray-800">R$ ${totalPagar.toFixed(2)}</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-red-600">📤</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-red-600">
              ${contasPagar.filter(c => c.status === 'pendente').length} pendentes
            </span>
          </div>
        </div>
        
        <!-- Fluxo de Caixa -->
        <div class="card p-6 border-t-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Fluxo Mensal</p>
              <p class="text-3xl font-bold text-gray-800">R$ ${(recebido - pago).toFixed(2)}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-purple-600">📈</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-purple-600">
              Recebido: R$ ${recebido.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Gráfico e Tabelas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Gráfico -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold mb-4">Fluxo Financeiro (Últimos 6 meses)</h2>
          <div class="h-64 flex items-end gap-2">
            ${[12000, 15000, 14000, 18000, 22000, 25000].map((receita, index) => {
              const despesa = receita * 0.65; // Simulação
              const maxVal = 30000;
              const receitaHeight = (receita / maxVal) * 100;
              const despesaHeight = (despesa / maxVal) * 100;
              
              return `
                <div class="flex-1 flex flex-col items-center">
                  <div class="flex items-end w-full gap-1" style="height: 100%;">
                    <div 
                      class="w-1/2 bg-gradient-to-t from-green-500 to-green-400 rounded-t" 
                      style="height: ${receitaHeight}%;"
                      title="Receita: R$ ${receita.toLocaleString('pt-BR')}"
                    ></div>
                    <div 
                      class="w-1/2 bg-gradient-to-t from-red-500 to-red-400 rounded-t" 
                      style="height: ${despesaHeight}%;"
                      title="Despesa: R$ ${despesa.toLocaleString('pt-BR')}"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500 mt-2">${['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][index]}</span>
                </div>
              `;
            }).join('')}
          </div>
          <div class="flex gap-4 mt-6">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-green-500 rounded"></div>
              <span class="text-sm">Receitas</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-500 rounded"></div>
              <span class="text-sm">Despesas</span>
            </div>
          </div>
        </div>
        
        <!-- Próximos Vencimentos -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Próximos Vencimentos</h2>
            <button class="text-sm text-blue-600 hover:text-blue-700">Ver todos</button>
          </div>
          <div class="space-y-3">
            ${[...contasReceber, ...contasPagar]
              .filter(conta => conta.status === 'pendente')
              .sort((a, b) => new Date(a.vencimento.split('/').reverse().join('-')) - new Date(b.vencimento.split('/').reverse().join('-')))
              .slice(0, 4)
              .map(conta => `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p class="font-medium">${conta.cliente || conta.fornecedor}</p>
                    <p class="text-sm text-gray-500">${conta.descricao}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold ${'cliente' in conta ? 'text-green-600' : 'text-red-600'}">
                      ${'cliente' in conta ? '+' : '-'} R$ ${conta.valor.toFixed(2)}
                    </p>
                    <p class="text-xs text-gray-500">Vence: ${conta.vencimento}</p>
                  </div>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Tabelas de Contas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Contas a Receber -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Contas a Receber</h2>
            <span class="text-sm text-gray-500">${contasReceber.length} registros</span>
          </div>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${contasReceber.map(conta => `
                  <tr>
                    <td class="font-medium">${conta.cliente}</td>
                    <td class="font-bold text-green-600">R$ ${conta.valor.toFixed(2)}</td>
                    <td>${conta.vencimento}</td>
                    <td>
                      <span class="badge ${conta.status === 'pago' ? 'badge-success' : 'badge-warning'}">
                        ${conta.status === 'pago' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Contas a Pagar -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Contas a Pagar</h2>
            <span class="text-sm text-gray-500">${contasPagar.length} registros</span>
          </div>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Fornecedor</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${contasPagar.map(conta => `
                  <tr>
                    <td class="font-medium">${conta.fornecedor}</td>
                    <td class="font-bold text-red-600">R$ ${conta.valor.toFixed(2)}</td>
                    <td>${conta.vencimento}</td>
                    <td>
                      <span class="badge ${conta.status === 'pago' ? 'badge-success' : 'badge-warning'}">
                        ${conta.status === 'pago' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Ações Rápidas -->
      <div class="card p-6 mt-6">
        <h2 class="text-lg font-semibold mb-4">Ações Rápidas</h2>
        <div class="flex flex-wrap gap-4">
          <button class="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
            📋 Gerar Relatório Mensal
          </button>
          <button class="px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100">
            💰 Registrar Pagamento
          </button>
          <button class="px-4 py-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100">
            📊 Análise de Custos
          </button>
          <button class="px-4 py-2 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100">
            ⚠️ Vencimentos Críticos
          </button>
        </div>
      </div>
    </div>
  `;
}

// Função para inicializar eventos do Financeiro
export function initFinanceiro() {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Botão Nova Receita
        document.getElementById('btn-nova-conta-receber')?.addEventListener('click', function() {
          if (window.openModalContaReceber) {
            window.openModalContaReceber();
          } else {
            alert('Modal de conta a receber - Funcionalidade completa em desenvolvimento');
          }
        });
        
        // Botão Nova Despesa
        document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', function() {
          if (window.openModalContaPagar) {
            window.openModalContaPagar();
          } else {
            alert('Modal de conta a pagar - Funcionalidade completa em desenvolvimento');
          }
        });
        
        // Adicionar eventos nas linhas das tabelas
        document.querySelectorAll('.table tbody tr').forEach(row => {
          row.addEventListener('click', function() {
            const cliente = this.cells[0]?.textContent;
            const valor = this.cells[1]?.textContent;
            alert('Detalhes: ' + cliente + ' - ' + valor);
          });
        });
      });
    </script>
  `;
}