document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const nomeUsuario = document.getElementById('usuario-logado');
    nomeUsuario.textContent = usuarioLogado.nome;

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const produtosDiv = document.getElementById('produtos');

    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert('Produto adicionado ao carrinho!');
    }

    // Consumindo API fake de produtos
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(produtos => {
            produtos.forEach(produto => {
                const div = document.createElement('div');
                div.className = 'produto';
                div.innerHTML = `
                    <img src="${produto.image}" alt="${produto.title}">
                    <h3>${produto.title}</h3>
                    <p>R$ ${produto.price.toFixed(2)}</p>
                    <button>Adicionar ao carrinho</button>
                `;
                // Evento do botão
                div.querySelector('button').addEventListener('click', () => {
                    adicionarAoCarrinho({
                        id: produto.id,
                        title: produto.title,
                        price: produto.price,
                        image: produto.image
                    });
                });
                produtosDiv.appendChild(div);
            });
        })
        .catch(() => {
            produtosDiv.innerHTML = '<p>Erro ao carregar produtos.</p>';
    });

    const btn = document.getElementById('profileBtn');
    const menu = document.getElementById('profileMenu');
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function() {
        menu.style.display = 'none';
    });
    menu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    const carrinhoBtn = document.getElementById('carrinhoBtn');
    const carrinhoMenu = document.getElementById('carrinhoMenu');
    const carrinhoFechar = document.getElementById('carrinhoFechar');
    const carrinhoItens = document.getElementById('carrinhoItens');
    const carrinhoTotal = document.getElementById('carrinhoTotal');
    const finalizarCompra = document.getElementById('finalizarCompra');

    function renderCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinhoItens.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            carrinhoItens.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio.</div>';
            carrinhoTotal.textContent = 'Total: R$ 0,00';
            finalizarCompra.disabled = true;
            return;
        }

        carrinho.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'carrinho-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div style="flex:1;">
                    <div style="font-size:0.95rem;">${item.title}</div>
                    <div style="color:#2ecc71;">R$ ${item.price.toFixed(2)}</div>
                </div>
                <button class="remover-item" data-index="${index}" style="background:none;border:none;color:#e74c3c;font-size:1.2rem;cursor:pointer;" title="Remover item">&times;</button>
            `;
            carrinhoItens.appendChild(div);
        });

        carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
        finalizarCompra.disabled = false;

        // Evento de remover item
        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'));
                carrinho.splice(idx, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderCarrinho();
            });
        });
    }

    if (carrinhoBtn && carrinhoMenu && carrinhoFechar) {
        carrinhoBtn.onclick = (e) => {
            e.stopPropagation();
            renderCarrinho();
            carrinhoMenu.classList.add('aberto');
        };
        carrinhoFechar.onclick = (e) => {
            e.stopPropagation();
            carrinhoMenu.classList.remove('aberto');
        };
        window.addEventListener('click', function(e) {
            if (carrinhoMenu.classList.contains('aberto') && !carrinhoMenu.contains(e.target) && e.target !== carrinhoBtn) {
                carrinhoMenu.classList.remove('aberto');
            }
        });
        carrinhoMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    if (finalizarCompra) {
        finalizarCompra.onclick = () => {
        window.location.href = '/checkout/checkout.html';
    };
}
});

document.addEventListener('DOMContentLoaded', function() {
    
});