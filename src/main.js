// src/main.js - CÓDIGO COMPLETO ATUALIZADO
import './style.css';
import { initModals, openModalContaReceber, openModalContaPagar } from './components/Modal.js';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { Dashboard } from './components/Dashboard.js';

// Estado da aplicação
let currentPage = 'dashboard';

// Renderizar aplicação
function renderApp() {
  return `
    <div class="app-container">
      <!-- Sidebar -->
      <div class="sidebar hidden md:block">
        ${Sidebar()}
      </div>
      
      <!-- Conteúdo principal -->
      <div class="flex-1 flex flex-col min-h-screen">
        <!-- Header -->
        ${Header()}
        
        <!-- Conteúdo dinâmico -->
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

// Carregar página dinamicamente
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
        content.innerHTML = `
          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Financeiro</h2>
            <p class="text-gray-600">Módulo em desenvolvimento...</p>
          </div>
        `;
        break;
        
      case 'agenda':
        const { Calendario } = await import('./components/Calendario.js');
        content.innerHTML = Calendario();
        
        // Inicializar eventos do calendário
        setTimeout(() => {
          const script = document.createElement('script');
          script.textContent = `
            document.getElementById('prev-month')?.addEventListener('click', function() {
              alert('Mês anterior - em desenvolvimento');
            });
            
            document.getElementById('next-month')?.addEventListener('click', function() {
              alert('Próximo mês - em desenvolvimento');
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
            <h2 class="text-xl font-bold mb-4">Relatórios</h2>
            <p class="text-gray-600">Módulo em desenvolvimento...</p>
          </div>
        `;
        break;
        
      default:
        content.innerHTML = `
          <div class="card p-6">
            <h2 class="text-xl font-bold text-red-600">Página não encontrada</h2>
            <p class="text-gray-600">A página solicitada não existe.</p>
          </div>
        `;
    }
    
    // Inicializar eventos da página carregada
    initializePageEvents();
    
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    content.innerHTML = `
      <div class="card p-6">
        <h2 class="text-xl font-bold text-red-600">Erro ao carregar página</h2>
        <p class="text-gray-600">${error.message}</p>
        <button onclick="loadPage('dashboard')" class="mt-4 btn btn-primary">
          Voltar para Dashboard
        </button>
      </div>
    `;
  }
}

// Inicializar eventos da página
function initializePageEvents() {
  // Eventos específicos por página
  if (currentPage === 'dashboard') {
    // Eventos do dashboard
    console.log('Eventos do dashboard inicializados');
  } else if (currentPage === 'agenda') {
    // Eventos específicos da agenda podem ser adicionados aqui
    console.log('Eventos da agenda inicializados');
  }
}

// Inicializar aplicação
function initApp() {
  // Renderizar estrutura principal
  document.getElementById('app').innerHTML = renderApp();
  
  // Inicializar modais
  initModals();
  
  // Eventos de navegação
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
  
  // Botões de ação rápida
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
              <span>📥</span>
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
              <span>📤</span>
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
              <span>👥</span>
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
  
  console.log('🚀 CRM Home Care inicializado com sucesso!');
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

// Exportar funções para uso global
window.loadPage = loadPage;
window.currentPage = currentPage;