// Exibe os itens do carrinho e total
        function renderCheckoutItens() {
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const checkoutItens = document.getElementById('checkoutItens');
            const checkoutTotal = document.getElementById('checkoutTotal');
            let total = 0;
            checkoutItens.innerHTML = '';
            if (carrinho.length === 0) {
                checkoutItens.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio.</div>';
                checkoutTotal.textContent = '';
                document.querySelector('.checkout-btn').disabled = true;
                return;
            }
            carrinho.forEach(item => {
                total += item.price;
                const div = document.createElement('div');
                div.className = 'checkout-item';
                div.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div style="flex:1;">
                        <div style="font-size:0.95rem;">${item.title}</div>
                        <div style="color:#2ecc71;">R$ ${item.price.toFixed(2)}</div>
                    </div>
                `;
                checkoutItens.appendChild(div);
            });
            checkoutTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
            document.querySelector('.checkout-btn').disabled = false;
        }

        renderCheckoutItens();

        // Finalização do pedido
        document.getElementById('checkoutForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode enviar os dados para o backend se desejar
            localStorage.removeItem('carrinho');
            renderCheckoutItens();
            document.getElementById('successMsg').style.display = 'block';
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);
        });