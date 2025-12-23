export function Header() {
  return `
    <header class="header flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-4">
        <button id="sidebar-toggle" class="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 text-xl">🏥</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">CRM Home Care</h1>
            <p class="text-sm text-gray-500">Gestão completa de home care</p>
          </div>
        </div>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="hidden md:flex items-center gap-3">
          <div class="relative">
            <button class="p-2 rounded-lg hover:bg-gray-100">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
            </button>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </div>
          <div class="h-6 w-px bg-gray-300"></div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-medium">Administrador</p>
              <p class="text-xs text-gray-500">admin@crmhomecare.com</p>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Nova Atividade
        </button>
      </div>
    </header>
  `;
}