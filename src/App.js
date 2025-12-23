// src/App.js
export function App() {
    return `
        <div class="min-h-screen bg-gray-50">
            <div class="container mx-auto px-4 py-8">
                <h1 class="text-3xl font-bold text-blue-600 mb-6">
                    🏥 CRM Home Care
                </h1>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">Clientes</h2>
                        <p class="text-gray-600">Gerencie seus pacientes</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">Profissionais</h2>
                        <p class="text-gray-600">Controle sua equipe</p>
                    </div>
                    
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h2 class="text-xl font-semibold mb-2">Financeiro</h2>
                        <p class="text-gray-600">Contas a pagar/receber</p>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <h2 class="text-xl font-semibold mb-4">Dashboard</h2>
                    <p class="text-gray-600">Sistema inicializado com sucesso!</p>
                </div>
            </div>
        </div>
    `;
}