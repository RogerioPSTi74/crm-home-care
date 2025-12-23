// src/main.js - CÃ“DIGO COMPLETO ATUALIZADO
import './style.css';
import { initModals, openModalContaReceber, openModalContaPagar } from './components/Modal.js';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { Dashboard } from './components/Dashboard.js';

// Estado da aplicaÃ§Ã£o
let currentPage = 'dashboard';

// Renderizar aplicaÃ§Ã£o
function renderApp() {
  return `
    <div class="app-container">
      <!-- Sidebar -->
      <div class="sidebar hidden md:block">
        ${Sidebar()}
      </div>
      
      <!-- ConteÃºdo principal -->
      <div class="flex-1 flex flex-col min-h-screen">
        <!-- Header -->
        ${Header()}
        
        <!-- ConteÃºdo dinÃ¢mico -->
        <main class="flex-1 p-4 md:p-6 overflow-auto">
          <div id="page-content">
            ${Dashboard()}
          </div>
        </main>
      </div>
    </div>
    
    <!-- Overlay para mobile -->
    <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"></div>
    
    <!-- Container para modais -->
    <div id="modals-container"></div>
  `;
}

// Carregar pÃ¡gina dinamicamente
async function loadPage(page) {
  const content = document.getElementById('page-content');
  currentPage = page;
  
  // Adicionar loading
  content.innerHTML = `
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  `;
  
  try {
    switch(page) {
      case 'dashboard':
        content.innerHTML = Dashboard();
        break;
        
      case 'clientes':
        const { Clientes } = await import('./components/Clientes.js');
        content.innerHTML = Clientes();
        break;
        
      case 'profissionais':
        const { Profissionais } = await import('./components/Profissionais.js');
        content.innerHTML = Profissionais();
        break;
        
      case 'financeiro':
  const { Financeiro } = await import('./components/Financeiro.js');
  content.innerHTML = Financeiro();
  
  // Inicializar eventos do financeiro
  setTimeout(() => {
    const script = document.createElement('script');
    script.textContent = \
      document.getElementById('btn-nova-conta-receber')?.addEventListener('click', function() {
        if (window.openModalContaReceber) {
          window.openModalContaReceber();
        } else {
          alert('Nova receita - Funcionalidade completa em desenvolvimento');
        }
      });
      
      document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', function() {
        if (window.openModalContaPagar) {
          window.openModalContaPagar();
        } else {
          alert('Nova despesa - Funcionalidade completa em desenvolvimento');
        }
      });
    \;
    document.head.appendChild(script);
  }, 100);
  break;
        
      case 'agenda':
        const { Calendario } = await import('./components/Calendario.js');
        content.innerHTML = Calendario();
        
        // Inicializar eventos do calendÃ¡rio
        setTimeout(() => {
          const script = document.createElement('script');
          script.textContent = `
            document.getElementById('prev-month')?.addEventListener('click', function() {
              alert('MÃªs anterior - em desenvolvimento');
            });
            
            document.getElementById('next-month')?.addEventListener('click', function() {
              alert('PrÃ³ximo mÃªs - em desenvolvimento');
            });
            
            document.querySelectorAll('[data-dia]').forEach(celula => {
              celula.addEventListener('click', function() {
                const dia = this.getAttribute('data-dia');
                const mes = this.getAttribute('data-mes');
                if (mes === 'atual') {
                  alert('Dia ' + dia + ' selecionado - funcionalidade completa em desenvolvimento');
                }
              });
            });
          `;
          document.head.appendChild(script);
        }, 100);
        break;
        
      case 'relatorios':
        content.innerHTML = `
          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">RelatÃ³rios</h2>
            <p class="text-gray-600">MÃ³dulo em desenvolvimento...</p>
          </div>
        `;
        break;
        
      default:
        content.innerHTML = `
          <div class="card p-6">
            <h2 class="text-xl font-bold text-red-600">PÃ¡gina nÃ£o encontrada</h2>
            <p class="text-gray-600">A pÃ¡gina solicitada nÃ£o existe.</p>
          </div>
        `;
    }
    
    // Inicializar eventos da pÃ¡gina carregada
    initializePageEvents();
    
  } catch (error) {
    console.error('Erro ao carregar pÃ¡gina:', error);
    content.innerHTML = `
      <div class="card p-6">
        <h2 class="text-xl font-bold text-red-600">Erro ao carregar pÃ¡gina</h2>
        <p class="text-gray-600">${error.message}</p>
        <button onclick="loadPage('dashboard')" class="mt-4 btn btn-primary">
          Voltar para Dashboard
        </button>
      </div>
    `;
  }
}

// Inicializar eventos da pÃ¡gina
function initializePageEvents() {
  // Eventos especÃ­ficos por pÃ¡gina
  if (currentPage === 'dashboard') {
    // Eventos do dashboard
    console.log('Eventos do dashboard inicializados');
  } else if (currentPage === 'agenda') {
    // Eventos especÃ­ficos da agenda podem ser adicionados aqui
    console.log('Eventos da agenda inicializados');
  }
}

// Inicializar aplicaÃ§Ã£o
function initApp() {
  // Renderizar estrutura principal
  document.getElementById('app').innerHTML = renderApp();
  
  // Inicializar modais
  initModals();
  
  // Eventos de navegaÃ§Ã£o
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.currentTarget.getAttribute('data-page');
      loadPage(page);
      
      // Fechar sidebar no mobile
      document.getElementById('sidebar-overlay')?.classList.add('hidden');
      document.querySelector('.sidebar')?.classList.add('hidden');
      
      // Atualizar item ativo no menu
      document.querySelectorAll('[data-page]').forEach(item => {
        item.classList.remove('bg-blue-500/20', 'border-blue-400', 'text-white');
        item.classList.add('text-gray-300', 'hover:text-white', 'hover:bg-white/10');
      });
      
      e.currentTarget.classList.add('bg-blue-500/20', 'border-blue-400', 'text-white');
      e.currentTarget.classList.remove('text-gray-300', 'hover:text-white', 'hover:bg-white/10');
    });
  });
  
  // BotÃµes de aÃ§Ã£o rÃ¡pida
  document.getElementById('btn-nova-conta-receber')?.addEventListener('click', openModalContaReceber);
  document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', openModalContaPagar);
  
  // Toggle sidebar mobile
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    sidebar?.classList.toggle('hidden');
    overlay?.classList.toggle('hidden');
    
    if (!sidebar?.classList.contains('hidden')) {
      sidebar.style.transform = 'translateX(0)';
    }
  });
  
  // Fechar sidebar ao clicar no overlay
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.add('hidden');
    document.getElementById('sidebar-overlay')?.classList.add('hidden');
  });
  
  // Adicionar modais ao DOM
  const modalsContainer = document.getElementById('modals-container');
  if (modalsContainer) {
    modalsContainer.innerHTML = `
      <!-- Modal Conta a Receber -->
      <div id="modalContaReceber" class="modal hidden">
        <div class="modal-content w-full max-w-2xl">
          <div class="modal-header">
            <div class="modal-title flex items-center gap-2">
              <span>ðŸ“¥</span>
              <span>Nova Conta a Receber</span>
            </div>
            <span class="close-modal cursor-pointer text-2xl hover:text-gray-700">&times;</span>
          </div>
          <div class="modal-body">
            <p>Modal de conta a receber funcionando!</p>
            <div class="mt-6 flex gap-3 justify-end">
              <button class="btn btn-secondary close-modal">Cancelar</button>
              <button class="btn btn-success">Salvar</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Conta a Pagar -->
      <div id="modalContaPagar" class="modal hidden">
        <div class="modal-content w-full max-w-2xl">
          <div class="modal-header">
            <div class="modal-title flex items-center gap-2">
              <span>ðŸ“¤</span>
              <span>Nova Conta a Pagar</span>
            </div>
            <span class="close-modal cursor-pointer text-2xl hover:text-gray-700">&times;</span>
          </div>
          <div class="modal-body">
            <p>Modal de conta a pagar funcionando!</p>
            <div class="mt-6 flex gap-3 justify-end">
              <button class="btn btn-secondary close-modal">Cancelar</button>
              <button class="btn btn-danger">Salvar</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal Detalhes Cliente -->
      <div id="modalDetalhesCliente" class="modal hidden">
        <div class="modal-content w-full max-w-2xl">
          <div class="modal-header">
            <div class="modal-title flex items-center gap-2">
              <span>ðŸ‘¥</span>
              <span>Detalhes do Cliente</span>
            </div>
            <span class="close-modal cursor-pointer text-2xl hover:text-gray-700">&times;</span>
          </div>
          <div class="modal-body">
            <p>Detalhes do cliente em desenvolvimento...</p>
            <div class="mt-6 flex gap-3 justify-end">
              <button class="btn btn-secondary close-modal">Fechar</button>
              <button class="btn btn-primary">Editar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  console.log('ðŸš€ CRM Home Care inicializado com sucesso!');
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Hot reload para desenvolvimento
if (import.meta.hot) {
  import.meta.hot.accept();
}

// Exportar funÃ§Ãµes para uso global
window.loadPage = loadPage;
window.currentPage = currentPage;
