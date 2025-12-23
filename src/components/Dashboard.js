export function Dashboard() {
  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="fade-in">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600">${hoje.charAt(0).toUpperCase() + hoje.slice(1)}</p>
      </div>
      
      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Clientes</p>
              <p class="text-3xl font-bold text-gray-800">24</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-blue-600">👥</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600">↑ 12% este mês</span>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">Profissionais</p>
              <p class="text-3xl font-bold text-gray-800">18</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-green-600">👨‍⚕️</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-green-600">↑ 8% este mês</span>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">A Receber</p>
              <p class="text-3xl font-bold text-gray-800">R$ 45.280</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-purple-600">💰</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-red-600">3 vencidos</span>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm">A Pagar</p>
              <p class="text-3xl font-bold text-gray-800">R$ 28.450</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl text-red-600">💸</span>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-sm text-yellow-600">5 esta semana</span>
          </div>
        </div>
      </div>
      
      <!-- Gráfico e Agenda -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Gráfico -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold mb-4">Atendimentos Mensais</h2>
          <div class="h-64 flex items-end gap-2">
            ${[40, 60, 80, 65, 90, 120, 100, 85, 110, 95, 130, 150]
              .map((height, i) => `
                <div class="flex-1 flex flex-col items-center">
                  <div 
                    class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" 
                    style="height: ${height}px;"
                  ></div>
                  <span class="text-xs text-gray-500 mt-2">${['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][i]}</span>
                </div>
              `).join('')}
          </div>
        </div>
        
        <!-- Agenda -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Agenda Hoje</h2>
            <button class="text-sm text-blue-600 hover:text-blue-700">Ver todas</button>
          </div>
          <div class="space-y-3">
            ${['09:00 - Dra. Silva - Consulta', '11:00 - Enf. Roberto - Curativo', 
                '14:00 - Fisio. Carla - Sessão', '16:00 - Dr. Mendes - Avaliação']
              .map(item => `
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div class="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div class="flex-1">
                    <p class="font-medium">${item.split(' - ')[1]}</p>
                    <p class="text-sm text-gray-500">${item.split(' - ')[2]} • ${item.split(' - ')[0]}</p>
                  </div>
                  <button class="p-2 hover:bg-gray-200 rounded">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                    </svg>
                  </button>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Tabela de atividades recentes -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold mb-4">Atividades Recentes</h2>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Profissional</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="font-medium">Maria Silva</td>
                <td>Fisioterapia</td>
                <td>Dra. Carla Santos</td>
                <td>20/12/2024</td>
                <td><span class="badge badge-success">Concluído</span></td>
              </tr>
              <tr>
                <td class="font-medium">João Pereira</td>
                <td>Enfermagem</td>
                <td>Enf. Roberto Lima</td>
                <td>19/12/2024</td>
                <td><span class="badge badge-warning">Pendente</span></td>
              </tr>
              <tr>
                <td class="font-medium">Ana Costa</td>
                <td>Consulta Médica</td>
                <td>Dr. Marcelo Mendes</td>
                <td>18/12/2024</td>
                <td><span class="badge badge-success">Concluído</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}