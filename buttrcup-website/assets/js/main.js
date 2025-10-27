
(function(){
  // Mobile nav
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Cookie Banner
  const banner = document.getElementById('cookieBanner');
  const accept = document.getElementById('cookieAccept');
  const decline = document.getElementById('cookieDecline');
  try {
    if (banner) {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) banner.hidden = false;
      function hide() { banner.hidden = true; }
      if (accept) accept.addEventListener('click', ()=>{ localStorage.setItem('cookieConsent','accepted'); hide(); /* loadAnalytics() */ });
      if (decline) decline.addEventListener('click', ()=>{ localStorage.setItem('cookieConsent','declined'); hide(); });
    }
  } catch(e){}

  // Simple cart using localStorage
  function getCart(){ try{ return JSON.parse(localStorage.getItem('cart')||'{}'); }catch(e){return {};} }
  function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
  function updateCount(){
    const c = getCart();
    const count = Object.values(c).reduce((a,b)=>a + (b.qty||0), 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = count;
  }
  function addToCart(sku, name, price){
    const c = getCart();
    if (!c[sku]) c[sku] = {sku, name, price, qty:0};
    c[sku].qty += 1;
    saveCart(c); updateCount();
  }
  function removeFromCart(sku){
    const c = getCart();
    delete c[sku];
    saveCart(c); updateCount();
  }
  window.__cartApi = {getCart, saveCart, updateCount, addToCart, removeFromCart};

  // Wire "Add to cart" buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const sku = btn.getAttribute('data-sku');
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      addToCart(sku, name, price);
      btn.textContent = 'Hinzugefügt ✓';
      setTimeout(()=>btn.textContent='In den Warenkorb', 1500);
    });
  });

  // Render cart if on cart page
  const cartTable = document.getElementById('cart-table-body');
  if (cartTable){
    function render(){
      const c = getCart();
      cartTable.innerHTML = '';
      let total = 0;
      Object.values(c).forEach(item=>{
        const tr = document.createElement('tr');
        const line = item.price * item.qty;
        total += line;
        tr.innerHTML = '<td>'+ item.name +'</td>' +
                       '<td>CHF '+ item.price.toFixed(2) +'</td>' +
                       '<td><button class="qty-btn" data-op="dec" data-sku="'+item.sku+'">–</button> '+ item.qty +' <button class="qty-btn" data-op="inc" data-sku="'+item.sku+'">+</button></td>' +
                       '<td>CHF '+ line.toFixed(2) +'</td>' +
                       '<td><button class="btn-outline" data-op="rm" data-sku="'+item.sku+'">Entfernen</button></td>';
        cartTable.appendChild(tr);
      });
      document.getElementById('cart-total').textContent = 'CHF ' + total.toFixed(2);
      updateCount();
    }
    render();
    document.addEventListener('click', (e)=>{
      const btn = e.target.closest('.qty-btn, .btn-outline');
      if (!btn) return;
      const op = btn.getAttribute('data-op');
      const sku = btn.getAttribute('data-sku');
      const c = getCart();
      if (op==='inc'){ if (!c[sku]) return; c[sku].qty += 1; }
      if (op==='dec'){ if (!c[sku]) return; c[sku].qty = Math.max(0, c[sku].qty - 1); if (c[sku].qty===0) delete c[sku]; }
      if (op==='rm'){ delete c[sku]; }
      saveCart(c);
      // re-render
      const event = new Event('renderCart'); document.dispatchEvent(event);
    });
    document.addEventListener('renderCart', ()=>{ 
      // re-render simple
      const rows = Array.from(cartTable.querySelectorAll('tr'));
      rows.forEach(r => r.remove());
      const c = getCart();
      let total = 0;
      Object.values(c).forEach(item=>{
        const tr = document.createElement('tr');
        const line = item.price * item.qty;
        total += line;
        tr.innerHTML = '<td>'+ item.name +'</td>' +
                       '<td>CHF '+ item.price.toFixed(2) +'</td>' +
                       '<td><button class="qty-btn" data-op="dec" data-sku="'+item.sku+'">–</button> '+ item.qty +' <button class="qty-btn" data-op="inc" data-sku="'+item.sku+'">+</button></td>' +
                       '<td>CHF '+ line.toFixed(2) +'</td>' +
                       '<td><button class="btn-outline" data-op="rm" data-sku="'+item.sku+'">Entfernen</button></td>';
        cartTable.appendChild(tr);
      });
      document.getElementById('cart-total').textContent = 'CHF ' + total.toFixed(2);
      updateCount();
    });
    document.getElementById('checkout-mail').addEventListener('click', (e)=>{
      e.preventDefault();
      const c = getCart();
      const items = Object.values(c);
      if (!items.length){ alert('Warenkorb ist leer.'); return; }
      const lines = items.map(i => `${i.qty}× ${i.name} (SKU ${i.sku}) — CHF ${(i.price*i.qty).toFixed(2)}`);
      const body = encodeURIComponent('Hallo ButtrCup Team,%0D%0A%0D%0Ahier meine Bestellung:%0D%0A' + lines.join('%0D%0A') + '%0D%0A%0D%0ARechnungs-/Lieferadresse:%0D%0A%0D%0A' + '%0D%0ADanke!');
      window.location.href = 'mailto:info@buttrcup.com?subject=Bestellung&body=' + body;
    });
  }

  updateCount();
})();
