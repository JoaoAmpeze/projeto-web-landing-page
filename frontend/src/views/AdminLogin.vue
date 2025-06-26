<template>
  <div
    style="
      display: grid;
      grid-template-columns: 1fr 1fr;
      height: 100vh;
    "
  >
    <!-- Lado esquerdo: foto do cachorro -->
    <div style="overflow: hidden;">
      <img
        src="/cachorro2.png"
        alt="Cachorro fofo"
        style="
          width: 180%;
          height: 100%;
          max-height: 800px;
          object-fit: cover;
        "
      />
    </div>

    <!-- Lado direito: area relativa para login -->
    <div style="position: relative; overflow: hidden;">
      <!-- Logo -->
      <img
        src="/Logo_marca.png"
        alt="Logo Viva Animali"
        class="logo"
      />

      <!-- Bloco do formulário de login -->
      <div class="formulario">
        <h3>Área Administrativa</h3>
        <form @submit.prevent="login">
          <div class="input-box">
            <input
              v-model="username"
              type="text"
              placeholder="Nome de Usuário"
              required
            />
            <i class='bx bxs-user'></i>
          </div>
          <div class="input-box">
            <input
              v-model="password"
              type="password"
              placeholder="Senha"
              required
            />
            <i class='bx bxs-lock-alt'></i>
          </div>
          <button type="submit" class="btn-primary">Logar</button>
          <p v-if="erro" class="error-msg">{{ erro }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../services/api';

export default {
  name: 'LandingPage',
  data() {
    return {
      username: '',
      password: '',
      erro: ''
    };
  },
  methods: {
    async login() {
      try {
        await api.post('/auth/login', {
          usuario: this.username,
          senha: this.password
        });
        this.$router.push('/admin/dashboard');
      } catch {
        this.erro = 'Credenciais inválidas';
      }
    }
  }
};
</script>

<style scoped>
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

.formulario {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.formulario h3 {
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
}

.input-box {
  position: relative;
  margin-bottom: 16px;
}

.input-box input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  font-size: 1rem;
  outline: none;
}

.input-box i {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #888;
}

.forgot-link {
  text-align: right;
  margin-bottom: 24px;
}

.forgot-link a {
  font-size: 0.875rem;
  color: #555;
  text-decoration: none;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: #7494ec;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #5e7ed1;
}

.error-msg {
  margin-top: 12px;
  color: #e74c3c;
  font-size: 0.875rem;
  text-align: center;
}

/* Logo styling */
.logo {
  position: absolute;
  top: -8%;
  right: 2%;
  height: 300px;
  width: auto;
}
</style>
