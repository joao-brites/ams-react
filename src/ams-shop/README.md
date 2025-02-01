# AMS SHOP

## 🇵🇹 Português (Portugal)

O projeto consistiu na implementação de uma loja no âmbito da formação em React da AMS. Em seguida, apresenta-se um resumo do trabalho realizado:

### 🏗️ Arquitetura e Estrutura

- Implementação de uma aplicação React moderna com TypeScript
- Organização modular do código separando componentes, hooks e lógica de estado
- Sistema de roteamento para navegação entre páginas
- Gestão de estado global através de stores personalizadas com persistência local
- Integração com a biblioteca Mantine UI para uma interface moderna e responsiva

### ⚡ Funcionalidades Principais

- Listagem de produtos com paginação
- Sistema de carrinho completo (adicionar, remover, ajustar quantidade)
- Indicadores de stock e estado do produto
- Página de checkout com resumo da compra
- Persistência do carrinho entre sessões
- Interface adaptativa para diferentes dispositivos
- Feedback visual para interações do utilizador

### 🧱 Componentes Desenvolvidos

1. **Interface Principal**
   - Header com navegação e acesso ao carrinho
   - Lista de produtos com cards informativos
   - Sistema de paginação para navegar entre produtos

2. **Gestão do Carrinho**
   - Visualização detalhada dos itens no carrinho
   - Controlos de quantidade com validação de stock
   - Cálculo automático de totais
   - Persistência dos dados do carrinho

3. **Experiência do Utilizador**
   - Feedback visual para produtos com baixo stock
   - Interface responsiva e adaptável
   - Transições suaves e feedback de interações
   - Tratamento de erros e estados de carregamento

### 📂 Estrutura de Ficheiros

```
src/
├── components/        # Componentes reutilizáveis
├── hooks/             # Hooks personalizados
├── pages/             # Páginas da aplicação
├── services/          # Serviços e API
├── store/             # Gestão de estado
└── types/             # Tipos TypeScript
```

---

## 🇬🇧 English

This project involved implementing a shop as part of the AMS React training program. Here's a summary of the work done:

### 🏗️ Architecture and Structure

- Implementation of a modern React application with TypeScript
- Modular code organization separating components, hooks, and state logic
- Routing system for page navigation
- Global state management through custom stores with local persistence
- Integration with Mantine UI library for a modern and responsive interface

### ⚡ Main Features

- Product listing with pagination
- Complete shopping cart system (add, remove, adjust quantity)
- Stock indicators and product status
- Checkout page with purchase summary
- Cart persistence between sessions
- Adaptive interface for different devices
- Visual feedback for user interactions

### 🧱 Developed Components

1. **Main Interface**
   - Header with navigation and cart access
   - Product list with informative cards
   - Pagination system for navigating products

2. **Cart Management**
   - Detailed view of cart items
   - Quantity controls with stock validation
   - Automatic total calculations
   - Cart data persistence

3. **User Experience**
   - Visual feedback for low stock products
   - Responsive and adaptable interface
   - Smooth transitions and interaction feedback
   - Error handling and loading states

### 📂 File Structure

```
src/
├── components/        # Reusable components
├── hooks/             # Custom hooks
├── pages/             # Application pages
├── services/          # Services and API
├── store/             # State management
└── types/             # TypeScript types
```

## 🛠️ Technical Stack

- React 18
- TypeScript
- Mantine UI
- React Router
- Zustand
- Immer

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run shop

# Build for production
npm run build
```