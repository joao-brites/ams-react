# AMS SHOP

O projeto consistiu na implementação de uma loja no âmbito da formação em React da AMS. Em seguida, apresenta-se um resumo do trabalho realizado:

**Arquitetura e Estrutura**

- Implementação de uma aplicação React moderna com TypeScript;
- Organização modular do código separando componentes, hooks, e lógica de estado;
- Sistema de roteamento para navegação entre páginas;
- Gestão de estado global através de stores personalizadas com persistência local.

**Funcionalidades Principais**

- Listagem de produtos com paginação;
- Sistema de carrinho completo (adicionar, remover, ajustar quantidade);
- Indicadores de stock e estado do produto;
- Página de checkout com resumo da compra:
- Persistência do carrinho entre sessões.

**Componentes Desenvolvidos**

1. Interface Principal
    - Header com navegação e acesso ao carrinho;
    - Lista de produtos com cards informativos;
    - Sistema de paginação para navegar entre produtos.

2. Gestão do Carrinho
    - Visualização detalhada dos itens no carrinho;
    - Controlos de quantidade com validação de stock;
    - Cálculo automático de totais;
    - Persistência dos dados do carrinho.

3. Experiência do Utilizador
    - Feedback visual para produtos com baixo stock;
    - Interface responsiva e adaptável;
    - Transições suaves e feedback de interações;
    - Tratamento de erros e estados de carregamento.

Esta implementação demonstra a aplicação prática de conceitos fundamentais do React, incluindo:
- Componentes funcionais e hooks;
- Gestão de estado local e global;
- Tipagem com TypeScript;
- Integração com APIs externas;
- Roteamento e navegação;
- Persistência de dados.

## Estrutura de Ficheiros
**Componentes de UI**
- `CartItem.tsx` - Componente que renderiza cada item individual no carrinho, com controlos de quantidade;
- `Header.tsx` - Barra de navegação superior com logo e botão do carrinho;
- `ProductCard.tsx` - Card que mostra as informações de cada produto na lista;
- `ProductList.tsx` - Página principal que mostra a grid de produtos com paginação.

**Configuração e Roteamento**
- `app.tsx` - Ponto de entrada da aplicação, configura o MantineProvider e determina qual app renderizar;
- `ShopRouter.tsx` - Configuração das rotas da aplicação e layout básico com ErrorBoundary;
- `theme.ts` - Configuração do tema Mantine com estilos padrão.

**Lógica de Estado e Dados**
- `useCart.ts` - Hook que providencia acesso ao estado do carrinho e suas operações;
- `useProducts.ts` - Hook para carregar e paginar produtos da API;
- `cartStore.ts` - Implementação da store do carrinho com persistência em localStorage;
- `createStore.ts` - Classe base genérica para criação de stores com sistema de subscribers;
- `api.ts` - Funções para fazer requisições à API de produtos.

**Tipos TypeScript**
- `cart.ts` - Interfaces para o carrinho e seus itens;
- `product.ts` - Interface para o tipo Product;
- `index.ts` - Arquivo barrel que exporta todos os tipos.

**Páginas**
- `Checkout.tsx` - Página de checkout que mostra o carrinho e total;
- `ProductList.tsx` - Página principal com a lista de produtos.
