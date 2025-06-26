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

    <!-- Lado direito: area relativa -->
    <div style="position: relative; overflow: hidden;">
      <!-- Logo -->
      <img
        src="/Logo_marca.png"
        alt="Logo Viva Animali"
        class="logo"
      />

      <!-- Formulário -->
      <div class="formulario">
        <h3>TODOS OS PETSHOPS EM UM SÓ</h3>
        <h2>Impulsione já as suas vendas!</h2>
        <form @submit.prevent="submitLead">
          <input
            v-model="nome"
            type="text"
            placeholder="Seu nome"
            required
          />
          <input
            v-model="email"
            type="email"
            placeholder="Seu e-mail"
            required
          />
          <button type="submit">Quero saber mais</button>
        </form>
        <p v-if="mensagem">{{ mensagem }}</p>
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
      nome: '',
      email: '',
      mensagem: ''
    };
  },
  methods: {
    async submitLead() {
      try {
        await api.post('/leads', {
          nome: this.nome,
          email: this.email
        });
        this.mensagem = 'Obrigado! Em breve entraremos em contato.';
        this.nome = '';
        this.email = '';
      } catch {
        this.mensagem = 'Ocorreu um erro. Tente novamente.';
      }
    }
  }
};
</script>

<style>

:root {
  --logo-top: -6%;   
  --logo-right: 13%;   
  --form-top:  37%; 
  --form-right: 8%;    
}

/* Logo */
.logo {
  position: absolute;
  top: var(--logo-top);
  right: var(--logo-right);
  height: 400px;
  max-width: 100%;
  width: auto;
}

/* Card do formulário */
.formulario {
  position: absolute;
  top: var(--form-top);
  right: var(--form-right);
  max-width: 400px;
  width: 100%;
  background: rgba(0,0,0,0.3);
  padding: 24px;
  border-radius: 8px;
}
.formulario h3 {
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.525rem;
}
.formulario h2{
  color: #fff;
  font-weight: 600;
  align-self: center;
  margin-bottom: 12px;
  font-size: 1.5rem;
}
.formulario form {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.formulario input {
  flex: 1;
  padding: 12px;
  background: rgba(255,255,255,0.9);
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}
.formulario button {
  padding: 12px 24px;
  background: #ff6600;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;
}
.formulario button:hover {
  filter: brightness(0.9);
}
.formulario p {
  margin-top: 8px;
  color: #fff;
  font-weight: 500;
}


</style>