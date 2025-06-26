<template>
  <!-- Container full screen com background já tratado no body -->
  <div style="position: relative; width: 100vw; height: 100vh; overflow: hidden;">
    <!-- Card do dashboard centralizado em tela inteira -->
    <div class="dashboard-card-full">
      <!-- Cabeçalho: título, busca e exportação -->
      <div class="dashboard-header-full">
        <h3>Leads Cadastrados</h3>
        <div style="display: flex; gap: 12px;">
          <input
            v-model="search"
            @input="fetchLeads"
            type="text"
            placeholder="Buscar por nome ou e-mail"
            class="dashboard-input-full"
          />
          <button @click="exportCsv" class="export-btn-full">
            Exportar CSV
          </button>
        </div>
      </div>

      <!-- Lista de leads como cards internos -->
      <ul class="dashboard-list-full">
        <li v-for="lead in leads" :key="lead.id" class="lead-item-full">
          <div>
            <p class="lead-name-full">{{ lead.nome }}</p>
            <p class="lead-email-full">{{ lead.email }}</p>
          </div>
          <button @click="deleteLead(lead.id)" class="lead-delete-full">
            Excluir
          </button>
        </li>
      </ul>

      <div v-if="leads.length === 0" class="empty-msg-full">
        Nenhum lead encontrado.
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../services/api';
export default {
  name: 'AdminDashboard',
  data() {
    return {
      leads: [],
      search: ''
    };
  },
  async created() {
    await this.fetchLeads();
  },
  methods: {
    async fetchLeads() {
      const res = await api.get('/leads', { params: { search: this.search } });
      this.leads = res.data;
    },
    async deleteLead(id) {
      if (confirm('Deseja realmente excluir este lead?')) {
        await api.delete(`/leads/${id}`);
        this.fetchLeads();
      }
    },
    exportCsv() {
      if (!this.leads.length) return;
      // Monta CSV
      const header = ['Nome', 'Email'];
      const rows = this.leads.map(l => [l.nome, l.email]);
      const csvContent = [header, ...rows]
        .map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
        .join('\r\n');
      // Cria blob e dispara download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'leads.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
/* Card full screen semitransparente */
.dashboard-card-full {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 800px;
  height: 90vh;
  background: rgba(0, 0, 0, 0.3);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}
.dashboard-header-full {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}
.dashboard-header-full h3 {
  color: #fff;
  font-size: 1.75rem;
  font-weight: 600;
}
.dashboard-input-full {
  padding: 14px;
  background: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
.export-btn-full {
  padding: 12px 16px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.export-btn-full:hover {
  background: #e65500;
}
.dashboard-list-full {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.lead-item-full {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lead-name-full {
  color: #333;
  font-weight: 500;
}
.lead-email-full {
  color: #555;
  font-size: 0.875rem;
}
.lead-delete-full {
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.lead-delete-full:hover {
  background: #ff7875;
}
.empty-msg-full {
  margin-top: 24px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
}
</style>
