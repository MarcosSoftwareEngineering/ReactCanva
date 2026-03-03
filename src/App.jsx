import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, ShieldCheck, Truck, 
  ChevronDown, Star, ArrowRight, Instagram, Mail, X, Trash2, PlayCircle, Quote,
  Gift, Clock, Shield, User, MapPin, 
  CreditCard, CheckCircle, Loader2, QrCode, Plus, Settings, UploadCloud, Image as ImageIcon
} from 'lucide-react';

// ==========================================
// MOCK DATA INICIAL
// ==========================================
const PRODUTOS_INICIAIS = [
  { id: 1, nome: "Abstrato em Ouro Metálico", preco: 890.00, estoque: 5, imagem: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Mais Vendido" },
  { id: 2, nome: "Minimalismo Geométrico", preco: 650.00, estoque: 12, imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Lançamento" },
  { id: 3, nome: "Textura Escandinava", preco: 1200.00, estoque: 2, imagem: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", tag: "Premium" }
];

const DEPOIMENTOS = [
  { id: 1, nome: "Carolina Mendes", papel: "Arquiteta de Interiores", texto: "Os quadros da Lumina Art elevaram o nível dos meus projetos. A qualidade da impressão é impecável.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, nome: "Roberto Almeida", papel: "Cliente Verificado", texto: "Comprei o 'Minimalismo Geométrico' para meu escritório e superou todas as expectativas.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 3, nome: "Juliana Silva", papel: "Decoradora", texto: "A textura da tela canvas dá uma sensação de pintura original maravilhosa. Recomendo de olhos fechados.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
];

const FAQS = [
  { pergunta: "Como os quadros são embalados para não quebrar?", resposta: "Utilizamos embalagem blindada com plástico bolha de alta densidade e cantoneiras rígidas." },
  { pergunta: "A cor do quadro é exatamente como na tela?", resposta: "Sim! Nossas impressões possuem fidelidade de 99% às cores originais, calibradas com equipamentos de ponta." },
  { pergunta: "Qual é o prazo de entrega?", resposta: "Produzimos e enviamos sua obra em até 5 dias úteis. O tempo de transporte varia conforme o seu CEP." }
];

const formatarPreco = (valor) => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatarParcela = (valor) => `12x de ${(Number(valor || 0) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

const rolarParaProdutos = () => { document.getElementById('sessao-produtos')?.scrollIntoView({ behavior: 'smooth' }); };

// ==========================================
// SUBCOMPONENTES
// ==========================================
const Header = ({ qtdCarrinho, abrirCarrinho }) => (
  <header className="lp-header">
    <div className="lp-container header-content">
      <h1 className="logo">Lumina<span>Art</span></h1>
      <div className="header-actions">
        <button className="btn-outline header-btn-desk" onClick={rolarParaProdutos}>Ver Coleção</button>
        <div className="cart-icon-wrapper" onClick={abrirCarrinho}>
          <ShoppingCart size={24} color="#f3f4f6" />
          {qtdCarrinho > 0 && <span className="cart-badge">{qtdCarrinho}</span>}
        </div>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="hero-section">
    <div className="lp-container hero-content">
      <div className="badge-exclusive">Edição Limitada</div>
      <h2 className="hero-title">A Arte que Transforma o Seu Ambiente</h2>
      <p className="hero-subtitle">Quadros decorativos em canvas com qualidade de museu e acabamento premium para lares sofisticados.</p>
      <div className="hero-cta-group">
        <button className="btn-primary-large" onClick={rolarParaProdutos}>
          Garantir Meu Quadro <ArrowRight size={20} />
        </button>
        <p className="safe-checkout"><ShieldCheck size={16} /> Compra 100% Segura</p>
      </div>
    </div>
  </section>
);

const ShowcaseMedia = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <>
      <section className="showcase-section">
        <div className="lp-container showcase-grid">
          <div className="showcase-content">
            <h2 className="showcase-title">
              Mais do que decoração, <br/><span className="gold-text">uma experiência.</span>
            </h2>
            <p className="showcase-description">
              Nossas obras são pensadas para se tornarem o centro das atenções do seu ambiente. 
            </p>
            <ul className="benefits-list">
              <li><ShieldCheck size={24} color="var(--primary-gold)" className="shrink-0" /> Design exclusivo e autoral</li>
              <li><Truck size={24} color="var(--primary-gold)" className="shrink-0" /> Envio garantido e rastreado</li>
              <li><Star size={24} color="var(--primary-gold)" className="shrink-0" /> Acabamento artesanal feito à mão</li>
            </ul>
          </div>
          <div className="showcase-media-wrapper" onClick={() => setIsVideoOpen(true)}>
            <img src="https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Quadro em ambiente" className="showcase-image"/>
            <div className="play-overlay"><PlayCircle size={72} color="white" strokeWidth={1.5} /></div>
          </div>
        </div>
      </section>
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <button className="btn-close-video" onClick={() => setIsVideoOpen(false)}><X size={40} color="white" /></button>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls autoPlay className="real-video-player" />
          </div>
        </div>
      )}
    </>
  );
};

const IrresistibleOffer = () => {
  const [timeLeft, setTimeLeft] = useState(4 * 60 * 60);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };
  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section className="offer-section">
      <div className="lp-container">
        <div className="offer-card">
          <div className="offer-left">
            <div className="offer-badge"><Clock size={16} /> Oferta por Tempo Limitado</div>
            <h2 className="offer-title">Condição VIP de Lançamento</h2>
            <p className="offer-desc">Compre qualquer quadro hoje e leve um pacote de benefícios exclusivo.</p>
            <div className="countdown-timer">
              <div className="countdown-box"><span className="countdown-num">{String(hours).padStart(2, '0')}</span><span className="countdown-label">Horas</span></div><span className="countdown-separator">:</span>
              <div className="countdown-box"><span className="countdown-num">{String(minutes).padStart(2, '0')}</span><span className="countdown-label">Minutos</span></div><span className="countdown-separator">:</span>
              <div className="countdown-box"><span className="countdown-num">{String(seconds).padStart(2, '0')}</span><span className="countdown-label">Segundos</span></div>
            </div>
          </div>
          <div className="offer-right">
            <ul className="offer-benefits-list">
              <li><Truck size={24} color="var(--primary-gold)" className="shrink-0"/><div><strong>Frete Expresso Grátis</strong><span>Enviamos para todo o Brasil sem custo.</span></div></li>
              <li><Gift size={24} color="var(--primary-gold)" className="shrink-0"/><div><strong>Kit Instalação <span className="line-through">R$ 149,00</span> (Grátis)</strong><span>Gabarito e buchas de alta fixação.</span></div></li>
              <li><Shield size={24} color="var(--primary-gold)" className="shrink-0"/><div><strong>Garantia de 30 Dias</strong><span>Se não combinar, devolvemos seu dinheiro.</span></div></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductGallery = ({ produtos, adicionarAoCarrinho }) => (
  <section id="sessao-produtos" className="gallery-section">
    <div className="lp-container">
      <h2 className="section-title">Obras Mais Desejadas</h2>
      {produtos.length === 0 ? (
        <p className="text-center text-muted">Nenhum produto cadastrado no momento.</p>
      ) : (
        <div className="products-grid">
          {produtos.map(produto => (
            <div key={produto.id} className="product-card">
              <div className="product-image-wrapper">
                {produto.tag && <span className="product-tag">{produto.tag}</span>}
                <img src={produto.imagem} alt={produto.nome} className="product-image" loading="lazy" />
              </div>
              <div className="product-info">
                <div className="stars"><Star size={16} fill="#d4af37" color="#d4af37"/><Star size={16} fill="#d4af37" color="#d4af37"/><Star size={16} fill="#d4af37" color="#d4af37"/><Star size={16} fill="#d4af37" color="#d4af37"/><Star size={16} fill="#d4af37" color="#d4af37"/></div>
                <h3 className="product-name">{produto.nome}</h3>
                <p className="product-price">{formatarPreco(produto.preco)}</p>
                <p className="product-installments">{formatarParcela(produto.preco)}</p>
                <p className={`estoque-texto ${produto.estoque > 0 ? 'em-estoque' : 'esgotado'}`}>
                  {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Esgotado'}
                </p>
                <button 
                  className="btn-buy" 
                  onClick={() => adicionarAoCarrinho(produto)}
                  disabled={produto.estoque <= 0}
                >
                  <ShoppingCart size={18} /> {produto.estoque > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="testimonials-section">
    <div className="lp-container">
      <div className="testimonials-header">
        <h2 className="section-title">Aprovado por quem exige o melhor</h2>
        <div className="trust-badge-header">
          <div className="stars justify-center"><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/></div>
          <p>Classificação <strong>4.9/5</strong> baseada em +500 clientes.</p>
        </div>
      </div>
      <div className="testimonials-grid">
        {DEPOIMENTOS.map(depoimento => (
          <div key={depoimento.id} className="testimonial-card">
            <Quote size={32} color="rgba(212, 175, 55, 0.2)" className="quote-icon" />
            <div className="stars mb-4"><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/></div>
            <p className="testimonial-text">"{depoimento.texto}"</p>
            <div className="testimonial-author">
              <img src={depoimento.avatar} alt={depoimento.nome} className="author-avatar" />
              <div><h4 className="author-name">{depoimento.nome}</h4><p className="author-role">{depoimento.papel}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);
  return (
    <section className="faq-section">
      <div className="lp-container faq-container">
        <h2 className="section-title">Dúvidas Frequentes</h2>
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
              <div className="faq-question"><h4>{faq.pergunta}</h4><ChevronDown size={20} className="faq-icon" /></div>
              <div className="faq-answer"><p>{faq.resposta}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setModoVisualizacao }) => (
  <footer className="lp-footer">
    <div className="lp-container footer-content">
      <div className="footer-brand"><h2>Lumina<span>Art</span></h2><p>Elevando o padrão da decoração.</p></div>
      <div className="footer-links">
        <a href="#"><Instagram size={20} /> Instagram</a>
        <a href="#"><Mail size={20} /> Suporte</a>
      </div>
    </div>
    <div className="lp-container footer-bottom">
      <p>&copy; 2026 Lumina Art. Todos os direitos reservados.</p>
      <button className="admin-btn-link" onClick={() => setModoVisualizacao('admin')}>
        <Settings size={14} /> Área do Administrador
      </button>
    </div>
  </footer>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function LandingPageQuadros() {
  const [modoVisualizacao, setModoVisualizacao] = useState('loja'); 
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem('lumina_produtos');
    return produtosSalvos ? JSON.parse(produtosSalvos) : PRODUTOS_INICIAIS; 
  });

  useEffect(() => { localStorage.setItem('lumina_produtos', JSON.stringify(produtos)); }, [produtos]);

  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); 

  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque <= 0) return; 
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        if(existe.qtde >= produto.estoque) { alert("Limite de estoque atingido."); return prev; }
        return prev.map(item => item.id === produto.id ? { ...item, qtde: item.qtde + 1 } : item);
      }
      return [...prev, { ...produto, qtde: 1 }];
    });
    setCheckoutStep(0); 
    setIsCartOpen(true);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
    if (carrinho.length === 1) setCheckoutStep(0); 
  };

  const fecharCarrinho = () => {
    setIsCartOpen(false);
    if(checkoutStep === 3) setCarrinho([]); 
    setTimeout(() => setCheckoutStep(0), 300); 
  };

  const totalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.qtde), 0);
  const quantidadeItens = carrinho.reduce((acc, item) => acc + item.qtde, 0);

  return (
    <div className="landing-page-wrapper">
      {modoVisualizacao === 'admin' ? (
        <div className="lp-container" style={{padding: '100px 20px', textAlign: 'center'}}>
          <h2>Área Admin Restrita</h2>
          <button className="btn-primary-large" onClick={() => setModoVisualizacao('loja')}>Voltar para Loja</button>
        </div>
      ) : (
        <>
          <Header qtdCarrinho={quantidadeItens} abrirCarrinho={() => setIsCartOpen(true)} />
          <main>
            <Hero />
            <ShowcaseMedia />
            <IrresistibleOffer />
            <ProductGallery produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
            <Testimonials />
            <FAQ />
          </main>
          <Footer setModoVisualizacao={setModoVisualizacao} />
        </>
      )}

      {/* CARRINHO MODAL */}
      {isCartOpen && modoVisualizacao === 'loja' && (
        <div className="cart-overlay" onClick={fecharCarrinho}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Seu Carrinho ({quantidadeItens})</h2>
              <button className="btn-close-cart" onClick={fecharCarrinho}><X size={24} color="#f3f4f6" /></button>
            </div>
            <div className="cart-body">
              {carrinho.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingCart size={48} color="#4b5563" />
                  <p>Seu carrinho está vazio.</p>
                </div>
              ) : (
                <div className="cart-items-list">
                  {carrinho.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.imagem} alt={item.nome} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4>{item.nome}</h4>
                        <p className="cart-item-price">{formatarPreco(item.preco)}</p>
                        <p className="cart-item-qty">Qtd: {item.qtde}</p>
                      </div>
                      <button className="btn-remove-item" onClick={() => removerDoCarrinho(item.id)}><Trash2 size={18} color="#ef4444" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {carrinho.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total"><span>Total:</span><span>{formatarPreco(totalCarrinho)}</span></div>
                <button className="btn-primary-large w-100">Finalizar Compra Segura</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS 100% BLINDADO PARA MOBILE */}
      <style dangerouslySetInnerHTML={{__html: `
        :root { 
          --primary-gold: #d4af37; 
          --primary-gold-hover: #b5952f; 
          --dark-bg: #0f1115; 
          --darker-bg: #0a0b0e; 
          --card-bg: #1a1d24; 
          --text-light: #f3f4f6; 
          --text-muted: #9ca3af; 
        }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        
        /* TRAVA CONTRA VAZAMENTO LATERAL */
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; background-color: var(--dark-bg); scroll-behavior: smooth; }
        .landing-page-wrapper { color: var(--text-light); width: 100%; overflow-x: hidden; }
        
        /* O CONTAINER MÁGICO (Garante as margens) */
        .lp-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

        /* UTLITÁRIOS */
        .text-center { text-align: center; }
        .text-muted { color: var(--text-muted); }
        .justify-center { justify-content: center; }
        .mb-4 { margin-bottom: 16px; }
        .shrink-0 { flex-shrink: 0; }
        .w-100 { width: 100%; }
        .gold-text { color: var(--primary-gold); }
        .line-through { text-decoration: line-through; font-size: 12px; color: var(--text-muted); }

        /* HEADER */
        .lp-header { background: rgba(10, 11, 14, 0.95); backdrop-filter: blur(10px); position: fixed; top: 0; width: 100%; z-index: 100; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .header-content { display: flex; justify-content: space-between; align-items: center; height: 70px; }
        .logo { font-size: clamp(20px, 5vw, 26px); font-weight: 800; } .logo span { color: var(--primary-gold); }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .btn-outline { background: transparent; border: 1px solid var(--primary-gold); color: var(--primary-gold); padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .btn-outline:hover { background: var(--primary-gold); color: var(--dark-bg); }
        .cart-icon-wrapper { position: relative; cursor: pointer; display: flex; align-items: center; }
        .cart-badge { position: absolute; top: -8px; right: -10px; background: var(--primary-gold); color: var(--dark-bg); font-size: 11px; font-weight: bold; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

        /* HERO */
        .hero-section { padding: clamp(120px, 15vh, 180px) 0 clamp(60px, 10vh, 100px); text-align: center; }
        .hero-content { display: flex; flex-direction: column; align-items: center; }
        .badge-exclusive { background: rgba(212, 175, 55, 0.1); color: var(--primary-gold); border: 1px solid var(--primary-gold); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
        .hero-title { font-size: clamp(32px, 8vw, 56px); line-height: 1.1; margin-bottom: 24px; font-weight: 800; max-width: 900px; }
        .hero-subtitle { font-size: clamp(16px, 4vw, 20px); color: var(--text-muted); margin-bottom: 40px; line-height: 1.5; max-width: 600px; }
        .btn-primary-large { background: var(--primary-gold); color: var(--dark-bg); border: none; padding: 18px 40px; font-size: 18px; font-weight: bold; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: transform 0.2s; box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2); }
        .btn-primary-large:hover:not(:disabled) { transform: translateY(-3px); }
        .btn-primary-large:disabled { opacity: 0.5; cursor: not-allowed; }
        .safe-checkout { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 14px; color: var(--text-muted); }

        /* SHOWCASE (ONDE ESTAVA O ERRO DE ESPAÇAMENTO) */
        .showcase-section { padding: clamp(50px, 8vh, 100px) 0; background: var(--darker-bg); }
        .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
        .showcase-title { font-size: clamp(32px, 6vw, 42px); margin-bottom: 24px; line-height: 1.2; }
        .showcase-description { font-size: 18px; color: var(--text-muted); line-height: 1.6; margin-bottom: 32px; }
        .benefits-list { display: flex; flex-direction: column; gap: 20px; list-style: none; }
        .benefits-list li { display: flex; align-items: center; gap: 16px; font-size: 16px; font-weight: 500; }
        .showcase-media-wrapper { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; }
        .showcase-image { width: 100%; display: block; object-fit: cover; }
        .play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; }

        /* OFFER */
        .offer-section { padding: 50px 0; }
        .offer-card { background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, var(--card-bg) 100%); border: 1px solid var(--primary-gold); border-radius: 16px; padding: clamp(30px, 5vw, 48px); display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: center; }
        .offer-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(212, 175, 55, 0.2); color: var(--primary-gold); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px; }
        .offer-title { font-size: clamp(28px, 5vw, 36px); font-weight: bold; line-height: 1.2; margin-bottom: 16px; }
        .offer-desc { color: var(--text-muted); margin-bottom: 30px; line-height: 1.5; }
        .countdown-timer { display: flex; gap: 12px; align-items: center; }
        .countdown-box { background: var(--dark-bg); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px; }
        .countdown-num { display: block; font-size: 28px; font-weight: bold; color: var(--primary-gold); }
        .countdown-label { display: block; font-size: 12px; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }
        .countdown-separator { font-size: 28px; font-weight: bold; color: var(--text-muted); }
        .offer-benefits-list { display: flex; flex-direction: column; gap: 24px; list-style: none; }
        .offer-benefits-list li { display: flex; gap: 16px; }
        .offer-benefits-list strong { display: block; font-size: 18px; margin-bottom: 4px; }
        .offer-benefits-list span { color: var(--text-muted); font-size: 15px; }

        /* GALLERY */
        .gallery-section { padding: 80px 0; background: var(--darker-bg); border-top: 1px solid rgba(255,255,255,0.05); }
        .section-title { text-align: center; font-size: clamp(28px, 6vw, 36px); margin-bottom: 40px; font-weight: 800; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .product-card { background: var(--card-bg); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; }
        .product-image-wrapper { position: relative; height: 350px; overflow: hidden; }
        .product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .product-card:hover .product-image { transform: scale(1.05); }
        .product-tag { position: absolute; top: 16px; left: 16px; background: var(--primary-gold); color: var(--dark-bg); padding: 4px 12px; font-size: 12px; font-weight: bold; border-radius: 4px; z-index: 10; }
        .product-info { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .stars { display: flex; gap: 2px; margin-bottom: 12px; }
        .product-name { font-size: 20px; margin-bottom: 8px; }
        .product-price { font-size: 24px; font-weight: bold; color: var(--primary-gold); margin-bottom: 4px; }
        .product-installments { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; }
        .estoque-texto { font-size: 13px; margin-bottom: 16px; }
        .em-estoque { color: #10b981; } .esgotado { color: #ef4444; }
        .btn-buy { width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 14px; font-size: 16px; font-weight: bold; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: auto; transition: 0.3s; }
        .btn-buy:hover:not(:disabled) { background: var(--primary-gold); border-color: var(--primary-gold); color: var(--dark-bg); }

        /* TESTIMONIALS & FAQ */
        .testimonials-section, .faq-section { padding: 80px 0; }
        .testimonials-header p { text-align: center; color: var(--text-muted); margin-top: 10px; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 40px; }
        .testimonial-card { background: var(--card-bg); padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); position: relative; }
        .quote-icon { position: absolute; top: 20px; right: 20px; }
        .testimonial-text { color: var(--text-light); font-size: 16px; line-height: 1.6; font-style: italic; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .author-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-gold); }
        .author-name { font-size: 16px; font-weight: bold; margin-bottom: 4px; }
        .author-role { font-size: 13px; color: var(--primary-gold); }
        
        .faq-container { max-width: 800px; }
        .faq-item { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 16px; overflow: hidden; cursor: pointer; transition: 0.3s; }
        .faq-question { padding: 24px; display: flex; justify-content: space-between; align-items: center; }
        .faq-question h4 { font-size: 18px; font-weight: 500; }
        .faq-icon { color: var(--primary-gold); transition: transform 0.3s; }
        .faq-item.active .faq-icon { transform: rotate(180deg); }
        .faq-answer { max-height: 0; padding: 0 24px; color: var(--text-muted); line-height: 1.6; transition: all 0.3s ease-out; }
        .faq-item.active .faq-answer { max-height: 200px; padding: 0 24px 24px; }

        /* FOOTER */
        .lp-footer { background: var(--darker-bg); padding: 60px 0 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 40px; margin-bottom: 40px; }
        .footer-brand p { color: var(--text-muted); margin-top: 8px; }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { color: var(--text-light); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
        .footer-links a:hover { color: var(--primary-gold); }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); color: var(--text-muted); font-size: 14px; flex-wrap: wrap; gap: 16px;}
        .admin-btn-link { background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 8px; }

        /* CART MODAL */
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 999; display: flex; justify-content: flex-end; }
        .cart-sidebar { width: 100%; max-width: 450px; background: rgba(15, 17, 21, 0.95); height: 100%; display: flex; flex-direction: column; border-left: 1px solid rgba(255,255,255,0.1); }
        .cart-header { padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cart-header h2 { color: var(--primary-gold); font-size: 20px; }
        .btn-close-cart { background: none; border: none; cursor: pointer; }
        .cart-body { padding: 24px; flex-grow: 1; overflow-y: auto; }
        .cart-item { display: flex; gap: 16px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; margin-bottom: 16px; align-items: center; }
        .cart-item-img { width: 70px; height: 70px; border-radius: 6px; object-fit: cover; }
        .cart-item-info flex-grow: 1; }
        .cart-item-info h4 { font-size: 14px; margin-bottom: 4px; }
        .cart-item-price { color: var(--primary-gold); font-weight: bold; margin-bottom: 4px;}
        .cart-item-qty { font-size: 12px; color: var(--text-muted); }
        .btn-remove-item { background: none; border: none; padding: 8px; cursor: pointer; }
        .cart-footer { padding: 24px; border-top: 1px solid rgba(255,255,255,0.05); }
        .cart-total { display: flex; justify-content: space-between; font-size: 22px; font-weight: bold; margin-bottom: 24px; }

        /* ==========================================
           MAGIA DA RESPONSIVIDADE MOBILE AQUI
        ========================================== */

        @media (max-width: 1024px) {
          .showcase-grid { grid-template-columns: 1fr; text-align: center; }
          .showcase-title { text-align: center; }
          .benefits-list { align-items: center; }
          .benefits-list li { text-align: left; }
          .showcase-media-wrapper { order: -1; max-width: 700px; margin: 0 auto; }
          
          .offer-card { grid-template-columns: 1fr; text-align: center; }
          .offer-benefits-list { align-items: center; }
          .offer-benefits-list li { text-align: left; }
          .countdown-timer { justify-content: center; }
        }

        @media (max-width: 768px) {
          /* AQUI RESOLVE O VAZAMENTO E A FALTA DE MARGEM */
          .header-btn-desk { display: none; } /* Esconde o botão de coleção no topo */
          
          .countdown-box { min-width: 70px; padding: 10px; }
          .countdown-num { font-size: 22px; }
          
          .footer-content { flex-direction: column; text-align: center; justify-content: center; }
          .footer-bottom { flex-direction: column; justify-content: center; }
        }
        
        @media (max-width: 480px) {
          .countdown-timer { flex-wrap: wrap; }
          .product-image-wrapper { height: 250px; }
        }
      `}} />
    </div>
  );
}
