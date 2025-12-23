export function Sidebar() {
  return `
    <aside class="sidebar p-6">
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <span class="text-white text-2xl">🏥</span>
          </div>
          <div>
            <h2 class="text-lg font-bold text-white">Home Care Pro</h2>
            <p class="text-blue-200 text-sm">Versão 1.0</p>
          </div>
        </div>
        
        <nav>
          <ul class="space-y-1">
            <li>
              <a href="#dashboard" data-page="dashboard" class="flex items-center gap-3 px-4 py-3 text-white bg-blue-500/20 rounded-lg border-l-4 border-blue-400">
                <span class="text-xl">📊</span>
                <span class="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#clientes" data-page="clientes" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="text-xl">👥</span>
                <span>Clientes</span>
              </a>
            </li>
            <li>
              <a href="#profissionais" data-page="profissionais" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="text-xl">👨‍⚕️</span>
                <span>Profissionais</span>
              </a>
            </li>
            <li>
              <a href="#financeiro" data-page="financeiro" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="text-xl">💰</span>
                <span>Financeiro</span>
              </a>
            </li>
            <li>
              <a href="#agenda" data-page="agenda" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="text-xl">📅</span>
                <span>Agenda</span>
              </a>
            </li>
            <li>
              <a href="#relatorios" data-page="relatorios" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="text-xl">📈</span>
                <span>Relatórios</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div class="mt-auto">
        <div class="p-4 bg-white/10 rounded-lg mb-4">
          <p class="text-sm text-blue-200 mb-2">Ações Rápidas</p>
          <div class="space-y-2">
            <button id="btn-nova-conta-receber" class="w-full flex items-center justify-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm transition-colors">
              <span>📥</span>
              <span>Conta a Receber</span>
            </button>
            <button id="btn-nova-conta-pagar" class="w-full flex items-center justify-center gap-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors">
              <span>📤</span>
              <span>Conta a Pagar</span>
            </button>
          </div>
        </div>
        
        <div class="pt-4 border-t border-white/20">
          <a href="#configuracoes" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <span class="text-xl">⚙️</span>
            <span>Configurações</span>
          </a>
        </div>
      </div>
    </aside>
  `;
}