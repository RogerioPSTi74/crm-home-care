// src/utils/toast.js

export class Toast {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.init();
  }

  init() {
    // Criar container de toasts
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `animate-slide-in p-4 rounded-lg shadow-lg max-w-sm ${
      type === 'success' ? 'bg-green-50 border-l-4 border-green-500 text-green-800' :
      type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800' :
      type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-800' :
      'bg-blue-50 border-l-4 border-blue-500 text-blue-800'
    }`;

    const icons = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="text-xl">${icons[type]}</div>
        <div class="flex-1">
          <p class="font-medium">${message}</p>
        </div>
        <button 
          onclick="this.parentElement.parentElement.remove()"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>
    `;

    this.container.appendChild(toast);

    // Auto-remover após duração
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.remove('animate-slide-in');
        toast.classList.add('animate-fade-out');
        setTimeout(() => {
          if (toast.parentNode) {
            toast.remove();
          }
        }, 300);
      }
    }, duration);

    return toast;
  }

  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  }

  warning(message, duration = 5000) {
    return this.show(message, 'warning', duration);
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }

  info(message, duration = 5000) {
    return this.show(message, 'info', duration);
  }

  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.remove();
    }
  }
}

// Instância global
let toastInstance = null;

export function getToast() {
  if (!toastInstance) {
    toastInstance = new Toast();
  }
  return toastInstance;
}

// Helper functions
export function showSuccess(message) {
  return getToast().success(message);
}

export function showWarning(message) {
  return getToast().warning(message);
}

export function showError(message) {
  return getToast().error(message);
}

export function showInfo(message) {
  return getToast().info(message);
}