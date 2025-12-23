// src/components/Relatorios.js
export function Relatorios() {
  return `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Relatórios</h1>
      <div class="card p-6">
        <h2 class="text-lg font-semibold mb-4">Módulo em Desenvolvimento</h2>
        <p class="text-gray-600 mb-4">Esta funcionalidade estará disponível em breve.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-blue-50 rounded-lg">
            <h3 class="font-medium text-blue-800">📊 Relatórios Financeiros</h3>
            <p class="text-sm text-blue-600">Em breve: Análise de receitas e despesas</p>
          </div>
          <div class="p-4 bg-green-50 rounded-lg">
            <h3 class="font-medium text-green-800">👥 Relatórios de Clientes</h3>
            <p class="text-sm text-green-600">Em breve: Estatísticas e acompanhamento</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
