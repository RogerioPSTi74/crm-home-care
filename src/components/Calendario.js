// src/components/Calendario.js
export function Calendario() {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  
  // Nomes dos meses
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  // Nomes dos dias
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Gerar dias do mês
  function gerarDiasDoMes(ano, mes) {
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    
    // Dias do mês anterior para completar a primeira semana
    const primeiroDiaSemana = primeiroDia.getDay(); // 0 = Domingo
    const dias = [];
    
    // Dias do mês anterior (se necessário)
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      dias.push({
        dia: ultimoDiaMesAnterior - i,
        mes: 'anterior',
        hoje: false,
        eventos: []
      });
    }
    
    // Dias do mês atual
    const diaAtual = hoje.getDate();
    for (let i = 1; i <= diasNoMes; i++) {
      const temEventos = Math.random() > 0.7; // Simulação
      dias.push({
        dia: i,
        mes: 'atual',
        hoje: i === diaAtual && mes === mesAtual && ano === anoAtual,
        eventos: temEventos ? [
          { titulo: 'Consulta', cor: 'blue' },
          { titulo: 'Visita', cor: 'green' }
        ] : []
      });
    }
    
    // Dias do próximo mês (se necessário)
    const totalCelulas = 42; // 6 semanas * 7 dias
    const diasRestantes = totalCelulas - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({
        dia: i,
        mes: 'proximo',
        hoje: false,
        eventos: []
      });
    }
    
    return dias;
  }
  
  const dias = gerarDiasDoMes(anoAtual, mesAtual);
  
  // Eventos do dia (exemplo)
  const eventosDoDia = [
    { hora: '09:00', titulo: 'Consulta - Dra. Silva', paciente: 'Maria Santos', tipo: 'consulta' },
    { hora: '11:00', titulo: 'Visita - Enf. Roberto', paciente: 'João Pereira', tipo: 'visita' },
    { hora: '14:00', titulo: 'Fisioterapia', paciente: 'Ana Costa', tipo: 'terapia' },
    { hora: '16:00', titulo: 'Avaliação', paciente: 'Carlos Mendes', tipo: 'avaliacao' }
  ];
  
  return `
    <div class="calendario-container fade-in">
      <!-- Cabeçalho do calendário -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Agenda</h1>
          <p class="text-gray-600">Gerencie seus compromissos e visitas</p>
        </div>
        
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <button id="prev-month" class="p-2 rounded-lg hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div class="text-center">
              <h2 class="text-xl font-bold text-gray-800">${meses[mesAtual]} ${anoAtual}</h2>
              <p class="text-sm text-gray-500">Hoje: ${hoje.toLocaleDateString('pt-BR')}</p>
            </div>
            
            <button id="next-month" class="p-2 rounded-lg hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          
          <button class="btn btn-primary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Novo Agendamento
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Calendário -->
        <div class="lg:col-span-2">
          <div class="card p-6">
            <!-- Dias da semana -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              ${diasSemana.map(dia => `
                <div class="text-center font-medium text-gray-500 py-2">
                  ${dia}
                </div>
              `).join('')}
            </div>
            
            <!-- Dias do mês -->
            <div class="grid grid-cols-7 gap-1">
              ${dias.map((dia, index) => `
                <div class="min-h-24 p-2 border border-gray-200 rounded-lg 
                  ${dia.mes !== 'atual' ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50'} 
                  ${dia.hoje ? 'bg-blue-50 border-blue-300' : ''}
                  ${dia.eventos.length > 0 ? 'cursor-pointer' : ''}"
                  data-dia="${dia.dia}" 
                  data-mes="${dia.mes}">
                  
                  <div class="flex justify-between items-start mb-1">
                    <span class="text-sm font-medium ${dia.hoje ? 'text-blue-600' : ''}">
                      ${dia.dia}
                    </span>
                    ${dia.hoje ? `
                      <span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        Hoje
                      </span>
                    ` : ''}
                  </div>
                  
                  <!-- Eventos do dia -->
                  <div class="space-y-1 mt-2">
                    ${dia.eventos.slice(0, 2).map(evento => `
                      <div class="text-xs px-2 py-1 rounded truncate 
                        ${evento.cor === 'blue' ? 'bg-blue-100 text-blue-700' : ''}
                        ${evento.cor === 'green' ? 'bg-green-100 text-green-700' : ''}
                        ${evento.cor === 'red' ? 'bg-red-100 text-red-700' : ''}
                        ${evento.cor === 'purple' ? 'bg-purple-100 text-purple-700' : ''}">
                        ${evento.titulo}
                      </div>
                    `).join('')}
                    
                    ${dia.eventos.length > 2 ? `
                      <div class="text-xs text-gray-500 text-center">
                        +${dia.eventos.length - 2} mais
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <!-- Legenda -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <p class="text-sm font-medium text-gray-700 mb-2">Legenda:</p>
              <div class="flex flex-wrap gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-blue-500 rounded"></div>
                  <span class="text-sm text-gray-600">Consultas</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-green-500 rounded"></div>
                  <span class="text-sm text-gray-600">Visitas</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-purple-500 rounded"></div>
                  <span class="text-sm text-gray-600">Terapias</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded"></div>
                  <span class="text-sm text-gray-600">Avaliações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Lista de eventos do dia -->
        <div>
          <div class="card p-6 h-full">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Compromissos de Hoje</h2>
              <span class="text-sm text-gray-500">${hoje.toLocaleDateString('pt-BR')}</span>
            </div>
            
            ${eventosDoDia.length > 0 ? `
              <div class="space-y-3">
                ${eventosDoDia.map(evento => `
                  <div class="p-3 border-l-4 ${evento.tipo === 'consulta' ? 'border-blue-500' : ''}
                    ${evento.tipo === 'visita' ? 'border-green-500' : ''}
                    ${evento.tipo === 'terapia' ? 'border-purple-500' : ''}
                    ${evento.tipo === 'avaliacao' ? 'border-red-500' : ''}
                    bg-gray-50 rounded-r-lg">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="font-medium">${evento.titulo}</p>
                        <p class="text-sm text-gray-600">${evento.paciente}</p>
                      </div>
                      <span class="text-sm font-medium text-gray-700">${evento.hora}</span>
                    </div>
                    <div class="mt-2 flex gap-2">
                      <button class="text-xs px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">
                        Detalhes
                      </button>
                      <button class="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                        Confirmar
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-center py-8">
                <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span class="text-2xl">📅</span>
                </div>
                <p class="text-gray-500">Nenhum compromisso para hoje</p>
              </div>
            `}
            
            <!-- Próximos dias -->
            <div class="mt-8">
              <h3 class="font-medium text-gray-700 mb-3">Próximos 7 dias</h3>
              <div class="space-y-2">
                ${['Amanhã - 3 compromissos', 'Quinta-feira - 2 compromissos', 
                   'Sexta-feira - 4 compromissos', 'Sábado - 1 compromisso']
                  .map(item => `
                    <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span class="text-sm">${item}</span>
                      <button class="text-xs text-blue-600 hover:text-blue-700">
                        Ver
                      </button>
                    </div>
                  `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Lista completa de eventos -->
      <div class="mt-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold mb-4">Todos os Compromissos</h2>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Paciente</th>
                  <th>Profissional</th>
                  <th>Tipo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>23/12/2024</td>
                  <td>09:00</td>
                  <td class="font-medium">Maria Silva</td>
                  <td>Dra. Carla Santos</td>
                  <td><span class="badge badge-blue">Consulta</span></td>
                  <td><span class="badge badge-success">Confirmado</span></td>
                  <td>
                    <button class="p-1 text-blue-600 hover:text-blue-700">Editar</button>
                  </td>
                </tr>
                <tr>
                  <td>23/12/2024</td>
                  <td>14:00</td>
                  <td class="font-medium">João Pereira</td>
                  <td>Enf. Roberto Lima</td>
                  <td><span class="badge badge-green">Visita</span></td>
                  <td><span class="badge badge-warning">Pendente</span></td>
                  <td>
                    <button class="p-1 text-blue-600 hover:text-blue-700">Editar</button>
                  </td>
                </tr>
                <tr>
                  <td>24/12/2024</td>
                  <td>10:00</td>
                  <td class="font-medium">Ana Costa</td>
                  <td>Fisio. Mariana</td>
                  <td><span class="badge badge-purple">Terapia</span></td>
                  <td><span class="badge badge-success">Confirmado</span></td>
                  <td>
                    <button class="p-1 text-blue-600 hover:text-blue-700">Editar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Função para inicializar eventos do calendário
export function initCalendario() {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        // Navegação entre meses
        document.getElementById('prev-month')?.addEventListener('click', function() {
          alert('Mês anterior - funcionalidade em desenvolvimento');
        });
        
        document.getElementById('next-month')?.addEventListener('click', function() {
          alert('Próximo mês - funcionalidade em desenvolvimento');
        });
        
        // Clicar em um dia
        document.querySelectorAll('[data-dia]').forEach(celula => {
          celula.addEventListener('click', function() {
            const dia = this.getAttribute('data-dia');
            const mes = this.getAttribute('data-mes');
            if (mes === 'atual') {
              alert('Dia ' + dia + ' selecionado');
            }
          });
        });
      });
    </script>
  `;
}