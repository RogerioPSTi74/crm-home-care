// src/main.js - VERSÃO CORRIGIDA E FUNCIONAL
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
        
      // Em src/main.js, dentro do switch case 'clientes':
case 'clientes':
  const { Clientes } = await import('./components/Clientes.js');
  content.innerHTML = Clientes();
  
  // Inicializar eventos do modal de clientes
  setTimeout(() => {
    const btnNovoCliente = document.getElementById('btn-novo-cliente');
    const modalCliente = document.getElementById('modal-novo-cliente');
    const formCliente = document.getElementById('form-novo-cliente');
    
    if (btnNovoCliente && modalCliente) {
      btnNovoCliente.addEventListener('click', () => {
        modalCliente.classList.remove('hidden');
        modalCliente.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    }
    
    // Fechar modal quando clicar no X ou fora
    document.querySelectorAll('[data-modal="novo-cliente"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (modalCliente) {
          modalCliente.classList.remove('flex');
          modalCliente.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    if (modalCliente) {
      modalCliente.addEventListener('click', (e) => {
        if (e.target === modalCliente) {
          modalCliente.classList.remove('flex');
          modalCliente.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Enviar formulário
    if (formCliente) {
      formCliente.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('cliente-nome').value;
        alert('Cliente "' + nome + '" cadastrado com sucesso! (Funcionalidade em desenvolvimento)');
        
        // Fechar modal e limpar formulário
        modalCliente.classList.remove('flex');
        modalCliente.classList.add('hidden');
        document.body.style.overflow = '';
        formCliente.reset();
      });
    }
  }, 100);
  break;
        
      case 'profissionais':
        const { Profissionais } = await import('./components/Profissionais.js');
        content.innerHTML = Profissionais();
        break;
        
      case 'financeiro':
        const { Financeiro } = await import('./components/Financeiro.js');
        content.innerHTML = Financeiro();
        
        // Inicializar eventos do financeiro - FORMATO CORRETO
        setTimeout(() => {
          const script = document.createElement('script');
          script.textContent = `
            document.getElementById('btn-nova-conta-receber')?.addEventListener('click', function() {
              if (window.openModalContaReceber) {
                window.openModalContaReceber();
              } else {
                alert('Nova receita - Em desenvolvimento');
              }
            });
            
            document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', function() {
              if (window.openModalContaPagar) {
                window.openModalContaPagar();
              } else {
                alert('Nova despesa - Em desenvolvimento');
              }
            });
          `;
          document.head.appendChild(script);
        }, 100);
        break;
        
      case 'agenda':
        const { Calendario } = await import('./components/Calendario.js');
        content.innerHTML = Calendario();
        
        // Inicializar eventos do calendário - FORMATO CORRETO
        setTimeout(() => {
          const script = document.createElement('script');
          script.textContent = `
            document.getElementById('prev-month')?.addEventListener('click', function() {
              alert('Mês anterior - Em desenvolvimento');
            });
            
            document.getElementById('next-month')?.addEventListener('click', function() {
              alert('Próximo mês - Em desenvolvimento');
            });
          `;
          document.head.appendChild(script);
        }, 100);
        break;
        
      case 'relatorios':
        const { Relatorios } = await import('./components/Relatorios.js');
        content.innerHTML = Relatorios();
        break;
        
      default:
        content.innerHTML = '<div class="card p-6"><h2 class="text-xl font-bold text-red-600">Página não encontrada</h2></div>';
    }
    
    // Inicializar eventos da página carregada
    initializePageEvents();
    
  } catch (error) {
    console.error('Erro ao carregar página:', error);
    content.innerHTML = `
      <div class="card p-6">
        <h2 class="text-xl font-bold text-red-600">Erro ao carregar página</h2>
        <p class="text-gray-600">${error.message}</p>
      </div>
    `;
  }
}

// Inicializar eventos da página
function initializePageEvents() {
  // Eventos específicos por página
  if (currentPage === 'dashboard') {
    console.log('Eventos do dashboard inicializados');
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
    });
  });
  
  // Botões de ação rápida
  document.getElementById('btn-nova-conta-receber')?.addEventListener('click', openModalContaReceber);
  document.getElementById('btn-nova-conta-pagar')?.addEventListener('click', openModalContaPagar);
  
  // Toggle sidebar mobile
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('hidden');
    document.getElementById('sidebar-overlay')?.classList.toggle('hidden');
  });
  
  // Fechar sidebar ao clicar no overlay
  document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.add('hidden');
    document.getElementById('sidebar-overlay')?.classList.add('hidden');
  });
  
  console.log('🚀 CRM Home Care inicializado com sucesso!');
}

// Iniciar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


