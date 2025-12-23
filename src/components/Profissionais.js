export function Profissionais() {
  return `
    <div class="fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Profissionais</h1>
          <p class="text-gray-600">Gerencie sua equipe de saúde</p>
        </div>
        <button class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Profissional
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${['Dra. Carla Santos', 'Enf. Roberto Lima', 'Dr. Marcelo Mendes', 
            'Fisio. Ana Costa', 'Psicóloga Juliana', 'Nutricionista Pedro']
          .map((nome, i) => `
            <div class="card p-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  ${nome.split(' ')[1]?.[0] || nome[0]}
                </div>
                <div>
                  <h3 class="font-bold text-lg">${nome}</h3>
                  <p class="text-gray-600">${['Fisioterapeuta', 'Enfermeiro', 'Médico', 
                    'Fisioterapeuta', 'Psicóloga', 'Nutricionista'][i]}</p>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-500">Plantões:</span>
                  <span class="font-medium">${[12, 8, 10, 15, 6, 9][i]}/mês</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">Status:</span>
                  <span class="badge ${i % 3 === 0 ? 'badge-success' : 'badge-warning'}">
                    ${i % 3 === 0 ? 'Ativo' : 'Férias'}
                  </span>
                </div>
              </div>
              <div class="mt-4 flex gap-2">
                <button class="flex-1 btn btn-secondary py-2">Detalhes</button>
                <button class="flex-1 btn btn-primary py-2">Agendar</button>
              </div>
            </div>
          `).join('')}
      </div>
    </div>
  `;
}