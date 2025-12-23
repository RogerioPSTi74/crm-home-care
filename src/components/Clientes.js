export function Clientes() {
  return `
    <div class="fade-in">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Clientes</h1>
          <p class="text-gray-600">Gerencie seus pacientes</p>
        </div>
        <button class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Novo Cliente
        </button>
      </div>
      
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
            <tbody>
              <tr>
                <td class="font-medium">Maria Silva</td>
                <td>(11) 99999-9999</td>
                <td><span class="badge badge-success">Particular</span></td>
                <td>20/12/2024</td>
                <td>
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded">Editar</button>
                </td>
              </tr>
              <tr>
                <td class="font-medium">João Pereira</td>
                <td>(11) 98888-8888</td>
                <td><span class="badge badge-warning">Unimed</span></td>
                <td>19/12/2024</td>
                <td>
                  <button class="p-2 text-blue-600 hover:bg-blue-50 rounded">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}