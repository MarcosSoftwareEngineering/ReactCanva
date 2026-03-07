import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, ShieldCheck, Truck, 
  ChevronDown, Star, ArrowRight, Instagram, Mail, X, Trash2, PlayCircle, Quote,
  Gift, Clock, Shield, MapPin, 
  CreditCard, CheckCircle, QrCode, Settings, ChevronLeft, ChevronRight
} from 'lucide-react';

// ==========================================
// MOCK DATA INICIAL (7 QUADROS)
// ==========================================
const PRODUTOS_INICIAIS = [
  { 
    id: 1, nome: "Abstrato em Ouro Metálico", preco: 890.00, estoque: 5, 
    imagem: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Mais Vendido" 
  },
  { 
    id: 2, nome: "Minimalismo Geométrico", preco: 650.00, estoque: 12, 
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Lançamento" 
  },
  { 
    id: 3, nome: "Textura Escandinava", preco: 1200.00, estoque: 2, 
    imagem: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Premium" 
  },
  { 
    id: 4, nome: "Pinceladas Noturnas", preco: 780.00, estoque: 8, 
    imagem: "https://images.unsplash.com/photo-1578301978693-85fa9c03fa75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c03fa75?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579762715459-5a068c289fda?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "" 
  },
  { 
    id: 5, nome: "Botânica em Aquarela", preco: 450.00, estoque: 15, 
    imagem: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1490204732731-e4078513511b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Novo" 
  },
  { 
    id: 6, nome: "Oceano Profundo", preco: 950.00, estoque: 3, 
    imagem: "https://images.unsplash.com/photo-1518998053401-b2643194a2cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    imagens: [
      "https://images.unsplash.com/photo-1518998053401-b2643194a2cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    ],
    tag: "Exclusivo" 
  },
  { 
    id: 7, nome: "Aurora de Cobre", preco: 1050.00, estoque: 4, 
    imagem: "https://images.unsplash.com/photo-1508898578281-774ac4893c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
    tag: "Destaque" 
  }
];

const DEPOIMENTOS = [
  { id: 1, nome: "Carolina Mendes", papel: "Arquiteta de Interiores", texto: "Os quadros da Lumina Art elevaram o nível dos meus projetos. A qualidade da impressão é impecável.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 2, nome: "Roberto Almeida", papel: "Cliente Verificado", texto: "Comprei o 'Minimalismo Geométrico' para meu escritório e superou todas as expectativas. Recomendo muito!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
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
          <ShoppingCart size={24} color="#2D2B2A" />
          {qtdCarrinho > 0 && <span className="cart-badge">{qtdCarrinho}</span>}
        </div>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="hero-section">
    <div className="hero-bg-image"></div>
    <div className="hero-overlay"></div>
    
    <div className="lp-container hero-content">
      <div className="badge-exclusive">
        Edição Limitada
      </div>
      <h2 className="hero-title">A Arte que Transforma o Seu Ambiente</h2>
      <p className="hero-subtitle">
        Quadros decorativos em canvas com qualidade de museu e acabamento premium para lares sofisticados.
      </p>
      <div className="hero-cta-group">
        <button className="btn-primary-large" onClick={rolarParaProdutos}>
          Garantir Meu Quadro <ArrowRight size={20} />
        </button>
        <p className="safe-checkout">
          <ShieldCheck size={16} /> Compra 100% Segura
        </p>
      </div>
    </div>
  </section>
);

const ShowcaseMedia = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <div className="showcase-container">
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
              <li><ShieldCheck size={24} color="#C05A46" className="shrink-0" /> Design exclusivo e autoral</li>
              <li><Truck size={24} color="#C05A46" className="shrink-0" /> Envio garantido e rastreado</li>
              <li><Star size={24} color="#C05A46" className="shrink-0" /> Acabamento artesanal feito à mão</li>
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
    </div>
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
        
        {/* === CARD COM BORDA BRILHANTE (GLOW EMITIDO) === */}
        <div className="glow-wrapper offer-card-margin">
          <div className="glow-inner offer-card-inner">
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
                <li><Truck size={24} color="#C05A46" className="shrink-0"/><div><strong>Frete Expresso Grátis</strong><span>Enviamos para todo o Brasil sem custo.</span></div></li>
                <li><Gift size={24} color="#C05A46" className="shrink-0"/><div><strong>Kit Instalação <span className="line-through">R$ 149,00</span> (Grátis)</strong><span>Gabarito e buchas de alta fixação.</span></div></li>
                <li><Shield size={24} color="#C05A46" className="shrink-0"/><div><strong>Garantia de 30 Dias</strong><span>Se não combinar, devolvemos seu dinheiro.</span></div></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const CardImageSlider = ({ produto }) => {
  const imagensLista = produto.imagens || [produto.imagem];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % imagensLista.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? imagensLista.length - 1 : prev - 1));
  };

  return (
    <div className="product-image-wrapper">
      {produto.tag && <span className="product-tag">{produto.tag}</span>}
      <img src={imagensLista[currentIndex]} alt={produto.nome} className="product-image" loading="lazy" draggable="false" />
      
      {imagensLista.length > 1 && (
        <div className="slider-controls">
          <div className="inner-slider-dots">
            {imagensLista.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductGallery = ({ produtos, adicionarAoCarrinho }) => {
  const carouselRef = useRef(null);
  
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 344; 
      carouselRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section id="sessao-produtos" className="gallery-section">
      <div className="carousel-outer-container">
        <h2 className="section-title">Obras Mais Desejadas</h2>
        
        {produtos.length === 0 ? (
          <p className="text-center text-muted">Nenhum produto cadastrado no momento.</p>
        ) : (
          <div className="carousel-wrapper">
            <button className="carousel-btn prev-btn" onClick={() => scroll('left')}>
              <ChevronLeft size={24} />
            </button>

            <div className="products-slider" ref={carouselRef}>
              {produtos.map(produto => (
                <div key={produto.id} className="product-card glow-wrapper">
                  <div className="glow-inner card-inner-flex">
                    <CardImageSlider produto={produto} />
                    <div className="product-info">
                      <div className="stars">
                        <Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/><Star size={16} fill="#C05A46" color="#C05A46"/>
                      </div>
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
                </div>
              ))}
            </div>

            <button className="carousel-btn next-btn" onClick={() => scroll('right')}>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ==========================================
// NOVO CARROSSEL DE DEPOIMENTOS (1 CARD + AUTO-PLAY 2 SEG)
// ==========================================
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loop Infinito a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPOIMENTOS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % DEPOIMENTOS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? DEPOIMENTOS.length - 1 : prevIndex - 1));
  };

  const depoimentoAtual = DEPOIMENTOS[currentIndex];

  return (
    <section className="testimonials-section">
      <div className="lp-container">
        <div className="testimonials-header">
          <h2 className="section-title">Aprovado por quem exige o melhor</h2>
          <div className="trust-badge-header">
            <div className="stars justify-center">
              <Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/><Star size={24} fill="#C05A46" color="#C05A46"/>
            </div>
            <p>Classificação <strong>4.9/5</strong> baseada em +500 clientes.</p>
          </div>
        </div>
        
        {/* Envoltório do Carrossel de Depoimentos */}
        <div className="carousel-wrapper testimonial-carousel-container">
          
          {/* Botão Voltar */}
          <button className="carousel-btn prev-btn force-flex" onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </button>

          {/* O Card Único que muda de dados */}
          <div className="testimonial-single-wrapper">
            <div className="testimonial-card glow-wrapper">
              <div className="glow-inner testimonial-inner">
                <Quote size={32} color="rgba(192, 90, 70, 0.1)" className="quote-icon" />
                <div className="stars mb-4">
                  <Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/><Star size={14} fill="#C05A46" color="#C05A46"/>
                </div>
                <p className="testimonial-text">"{depoimentoAtual.texto}"</p>
                <div className="testimonial-author">
                  <img src={depoimentoAtual.avatar} alt={depoimentoAtual.nome} className="author-avatar" />
                  <div>
                    <h4 className="author-name">{depoimentoAtual.nome}</h4>
                    <p className="author-role">{depoimentoAtual.papel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botão Avançar */}
          <button className="carousel-btn next-btn force-flex" onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </button>

        </div>
      </div>
    </section>
  );
};

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
        <div className="main-content-wrapper">
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
        </div>
      )}

      {/* CARRINHO MODAL */}
      {isCartOpen && modoVisualizacao === 'loja' && (
        <div className="cart-overlay" onClick={fecharCarrinho}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>
                {checkoutStep === 0 ? `Seu Carrinho (${quantidadeItens})` : 
                 checkoutStep === 1 ? 'Pagamento Seguro' : 'Pedido Confirmado'}
              </h2>
              <button className="btn-close-cart" onClick={fecharCarrinho}><X size={24} color="#2D2B2A" /></button>
            </div>
            
            <div className="cart-body">
              {checkoutStep === 0 && (
                carrinho.length === 0 ? (
                  <div className="cart-empty">
                    <ShoppingCart size={48} color="#858078" />
                    <p style={{marginTop: '16px', color: 'var(--text-muted)'}}>Seu carrinho está vazio.</p>
                  </div>
                ) : (
                  <div className="cart-items-list">
                    {carrinho.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={(item.imagens && item.imagens.length > 0) ? item.imagens[0] : item.imagem} alt={item.nome} className="cart-item-img" />
                        <div className="cart-item-info">
                          <h4>{item.nome}</h4>
                          <p className="cart-item-price">{formatarPreco(item.preco)}</p>
                          <p className="cart-item-qty">Qtd: {item.qtde}</p>
                        </div>
                        <button className="btn-remove-item" onClick={() => removerDoCarrinho(item.id)}><Trash2 size={18} color="#C05A46" /></button>
                      </div>
                    ))}
                  </div>
                )
              )}

              {checkoutStep === 1 && (
                <div className="checkout-simulation">
                  <p className="checkout-total-display">Total a pagar: <strong>{formatarPreco(totalCarrinho)}</strong></p>
                  
                  <div className="payment-methods">
                    <label className="payment-method-card">
                      <input type="radio" name="payment" defaultChecked />
                      <div className="payment-method-content">
                        <QrCode size={24} color="var(--terracota)" />
                        <div><strong>Pix</strong><span>Aprovação imediata (5% de desconto)</span></div>
                      </div>
                    </label>

                    <label className="payment-method-card">
                      <input type="radio" name="payment" />
                      <div className="payment-method-content">
                        <CreditCard size={24} color="var(--terracota)" />
                        <div><strong>Cartão de Crédito</strong><span>Até 12x sem juros</span></div>
                      </div>
                    </label>
                  </div>

                  <div className="fake-form">
                    <input type="text" placeholder="Nome Impresso no Cartão" className="fake-input" />
                    <input type="text" placeholder="Número do Cartão" className="fake-input" />
                    <div style={{display: 'flex', gap: '10px'}}>
                      <input type="text" placeholder="Validade (MM/AA)" className="fake-input" />
                      <input type="text" placeholder="CVV" className="fake-input" />
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="checkout-success">
                  <CheckCircle size={64} color="#5b6b4e" />
                  <h3>Pagamento Aprovado!</h3>
                  <p>Seu pedido foi confirmado e já está sendo preparado para o envio.</p>
                  <p className="order-number">Pedido: #LM-{Math.floor(Math.random() * 10000)}</p>
                </div>
              )}
            </div>

            <div className="cart-footer">
              {checkoutStep === 0 && carrinho.length > 0 && (
                <div className="cart-footer-actions">
                  <div className="cart-total"><span>Total:</span><span>{formatarPreco(totalCarrinho)}</span></div>
                  <button className="btn-primary-large w-100" onClick={() => setCheckoutStep(1)}>Finalizar Compra Segura</button>
                </div>
              )}
              
              {checkoutStep === 1 && (
                <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                  <button className="btn-primary-large w-100" onClick={() => setCheckoutStep(2)}><ShieldCheck size={20} /> Confirmar Pagamento</button>
                  <button className="btn-outline w-100" onClick={() => setCheckoutStep(0)}>Voltar ao Carrinho</button>
                </div>
              )}

              {checkoutStep === 2 && (
                <button className="btn-primary-large w-100" onClick={fecharCarrinho}>Continuar Navegando</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CSS BLINDADO E ESTRUTURADO                                                */}
      {/* ========================================================================= */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 1. RESET E VARIÁVEIS BASE */
        #root { max-width: 100% !important; width: 100% !important; margin: 0 !important; padding: 0 !important; display: block !important; text-align: left !important; }
        :root { --terracota: #c05a46; --terracota-hover: #a34a38; --olive: #5b6b4e; --beige-bg: #f4f0ea; --ivory-bg: #faf9f6; --text-dark: #2d2b2a; --text-muted: #858078; --border-light: rgba(45, 43, 42, 0.1); }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        html, body { overflow-x: hidden; width: 100%; max-width: 100vw; background-color: var(--beige-bg); scroll-behavior: smooth; }
        .landing-page-wrapper { color: var(--text-dark); width: 100%; overflow-x: hidden; display: block; }
        .lp-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

        .text-center { text-align: center; } .text-muted { color: var(--text-muted); } .justify-center { justify-content: center; } .mb-4 { margin-bottom: 16px; } .shrink-0 { flex-shrink: 0; } .w-100 { width: 100%; } .gold-text { color: var(--terracota); } .line-through { text-decoration: line-through; font-size: 12px; color: var(--text-muted); }

        /* 2. DEFINIÇÃO DAS ANIMAÇÕES (Vibração e Cores) */
        @keyframes moverCoresGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes vibrarSutil {
          0% { transform: translate(0, 0); }
          25% { transform: translate(0.3px, 0.3px); }
          50% { transform: translate(-0.3px, -0.3px); }
          75% { transform: translate(0.3px, -0.3px); }
          100% { transform: translate(0, 0); }
        }

        /* 3. ESTILO DOS BOTÕES */
        .btn-primary-large {
          background: linear-gradient(270deg, var(--terracota), #df57df, #e1c070, var(--terracota));
          background-size: 400% 400%; color: #FFF; border: none; padding: 18px 40px; font-size: 18px; font-weight: bold; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          animation: moverCoresGradient 8s ease infinite, vibrarSutil 0.8s ease-in-out infinite; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary-large:hover:not(:disabled) { transform: scale(1.03) translateY(-2px); box-shadow: 0 8px 25px rgba(192, 90, 70, 0.4); }
        .btn-primary-large:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }

        .btn-outline { background: transparent; border: 1px solid var(--terracota); color: var(--terracota); padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; animation: vibrarSutil 1.2s ease-in-out infinite; transition: all 0.3s ease; }
        .btn-outline:hover { background: var(--terracota); color: #fff; }

        .btn-buy { margin-top: auto; width: 100%; background: #fff; border: 1px solid var(--terracota); color: var(--terracota); padding: 14px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; animation: vibrarSutil 1s ease-in-out infinite; transition: all 0.3s; }
        .btn-buy:hover:not(:disabled) { background: linear-gradient(270deg, var(--terracota), #df57df, #e1c070, var(--terracota)); background-size: 400% 400%; border-color: transparent; color: #FFF; animation: moverCoresGradient 4s ease infinite, vibrarSutil 0.4s ease-in-out infinite; }
        .btn-buy:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }


        /* 4. HEADER & HERO VISUALS */
        .lp-header { background: rgba(250, 249, 246, 0.95); backdrop-filter: blur(10px); position: fixed; top: 0; width: 100%; z-index: 100; border-bottom: 1px solid var(--border-light); }
        .header-content { display: flex; justify-content: space-between; align-items: center; height: 70px; }
        .logo { font-size: clamp(20px, 5vw, 26px); font-weight: 800; color: var(--text-dark); } .logo span { color: var(--terracota); }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .cart-icon-wrapper { position: relative; cursor: pointer; display: flex; align-items: center; }
        .cart-badge { position: absolute; top: -8px; right: -10px; background: var(--terracota); color: #FFF; font-size: 11px; font-weight: bold; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }

        @keyframes panBackground { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        .hero-section { position: relative; padding: clamp(120px, 15vh, 180px) 0 clamp(60px, 10vh, 100px); text-align: center; background: var(--text-dark); overflow: hidden; }
        .hero-bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat; animation: panBackground 20s ease-in-out infinite; z-index: 0; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to bottom, rgba(45,43,42,0.4), rgba(45,43,42,0.8)); z-index: 1; }
        .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
        .badge-exclusive { background: rgba(192, 90, 70, 0.1); color: var(--terracota); border: 1px solid var(--terracota); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; color: #FFF; }
        .hero-title { font-size: clamp(32px, 8vw, 56px); line-height: 1.1; margin-bottom: 24px; font-weight: 800; max-width: 900px; color: #FFF; }
        .hero-subtitle { font-size: clamp(16px, 4vw, 20px); color: rgba(255,255,255,0.8); margin-bottom: 40px; line-height: 1.5; max-width: 600px; }
        .safe-checkout { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 14px; color: rgba(255,255,255,0.6); }

        /* SHOWCASE */
        .showcase-section { padding: clamp(50px, 8vh, 100px) 0; background: var(--ivory-bg); border-top: 1px solid var(--border-light); }
        .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); align-items: center; }
        .showcase-title { font-size: clamp(32px, 6vw, 42px); margin-bottom: 24px; line-height: 1.2; color: var(--text-dark); }
        .showcase-description { font-size: 18px; color: var(--text-muted); line-height: 1.6; margin-bottom: 32px; }
        .benefits-list { display: flex; flex-direction: column; gap: 20px; list-style: none; }
        .benefits-list li { display: flex; align-items: center; gap: 16px; font-size: 16px; font-weight: 500; color: var(--text-dark); }
        .showcase-media-wrapper { border-radius: 12px; overflow: hidden; position: relative; cursor: pointer; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .showcase-image { width: 100%; display: block; object-fit: cover; }
        .play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; }

        /* ==========================================
           5. BORDAS MÁGICAS COM BRILHO (GLOW)
        ========================================== */
        .offer-section { padding: 50px 0; background: var(--beige-bg); }

        @keyframes animarBordaBrilhante {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glow-wrapper { position: relative; padding: 1.5px; border-radius: 18px; z-index: 1; display: flex; flex-direction: column; }
        .offer-card-margin { margin: 10px; }

        .glow-wrapper::before, .glow-wrapper::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 18px;
          background: linear-gradient(90deg, var(--terracota), #df57df, #e1c070, var(--terracota));
          background-size: 300% 300%; animation: moverCoresGradient 6s linear infinite; z-index: -2;
        }

        .glow-wrapper::after { filter: blur(12px); opacity: 0.7; }
        .glow-wrapper:hover::after { opacity: 1; filter: blur(16px); } 

        .glow-inner { background: #FFF; border-radius: 16.5px; position: relative; z-index: 1; }
        .card-inner-flex { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        .offer-card-inner { padding: clamp(30px, 5vw, 48px); display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: center; }
        .offer-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(192, 90, 70, 0.1); color: var(--terracota); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 20px; }
        .offer-title { font-size: clamp(28px, 5vw, 36px); font-weight: bold; line-height: 1.2; margin-bottom: 16px; color: var(--text-dark); }
        .offer-desc { color: var(--text-muted); margin-bottom: 30px; line-height: 1.5; }
        .countdown-timer { display: flex; gap: 12px; align-items: center; }
        .countdown-box { background: var(--ivory-bg); border: 1px solid var(--border-light); border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px; }
        .countdown-num { display: block; font-size: 28px; font-weight: bold; color: var(--terracota); }
        .countdown-label { display: block; font-size: 12px; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; }
        .countdown-separator { font-size: 28px; font-weight: bold; color: var(--text-muted); }
        .offer-benefits-list { display: flex; flex-direction: column; gap: 24px; list-style: none; }
        .offer-benefits-list li { display: flex; gap: 16px; }
        .offer-benefits-list strong { display: block; font-size: 18px; margin-bottom: 4px; color: var(--text-dark); }
        .offer-benefits-list span { color: var(--text-muted); font-size: 15px; }

        /* ==========================================
           PRODUTOS E CARROSSEL HORIZONTAL
        ========================================== */
        .gallery-section { padding: 80px 0; background: var(--ivory-bg); overflow: hidden; }
        .carousel-outer-container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        .section-title { text-align: center; font-size: clamp(28px, 6vw, 36px); margin-bottom: 40px; font-weight: 800; color: var(--text-dark); }
        .carousel-wrapper { position: relative; width: 100%; display: flex; align-items: center; justify-content: center; }
        
        .carousel-btn { position: absolute; z-index: 10; background: #FFF; border: 1px solid var(--border-light); border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--terracota); box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: 0.3s; }
        .carousel-btn:hover { background: var(--terracota); color: #FFF; border-color: var(--terracota); transform: scale(1.1); }
        .carousel-btn.prev-btn { left: 0px; } .carousel-btn.next-btn { right: 0px; }

        .products-slider { display: flex; gap: 28px; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; padding: 15px 10px 45px 10px; width: 100%; align-items: stretch; justify-content: center; -webkit-overflow-scrolling: touch; }
        .products-slider::-webkit-scrollbar { height: 10px; display: block; }
        .products-slider::-webkit-scrollbar-track { background: rgba(45, 43, 42, 0.05); border-radius: 10px; margin: 0 40px; }
        .products-slider::-webkit-scrollbar-thumb { background: var(--terracota); border-radius: 10px; cursor: pointer; }
        .products-slider::-webkit-scrollbar-thumb:hover { background: var(--terracota-hover); }
        
        .product-card { flex: 0 0 auto; width: 320px; scroll-snap-align: start; transition: transform 0.3s ease; }
        .product-card:hover { transform: translateY(-5px); }

        .product-image-wrapper { position: relative; height: 350px; overflow: hidden; flex-shrink: 0; cursor: pointer; }
        .product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
        .glow-border-card:hover .product-image { transform: scale(1.05); }
        .product-tag { position: absolute; top: 16px; left: 16px; background: var(--olive); color: #FFF; padding: 4px 12px; font-size: 12px; font-weight: bold; border-radius: 6px; z-index: 10; }
        
        .inner-slider-dots { position: absolute; bottom: 12px; left: 0; width: 100%; display: flex; justify-content: center; gap: 5px; z-index: 20;}
        .inner-slider-dots .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); transition: 0.3s; cursor: pointer; }
        .inner-slider-dots .dot.active { background: #FFF; transform: scale(1.3); }

        .product-info { padding: 30px; flex: 1; display: flex; flex-direction: column; }
        .stars { display: flex; gap: 2px; margin-bottom: 12px; }
        .product-name { font-size: 20px; margin-bottom: 8px; color: var(--text-dark); font-weight: 600; }
        .product-price { font-size: 24px; font-weight: bold; color: var(--terracota); margin-bottom: 4px; }
        .product-installments { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; }
        .estoque-texto { font-size: 13px; margin-bottom: 16px; }
        .em-estoque { color: var(--olive); } .esgotado { color: var(--terracota); }

        /* ==========================================
           NOVO: DEPOIMENTOS EM CARROSSEL
        ========================================== */
        .testimonials-section { padding: 80px 0; background: var(--beige-bg); }
        .testimonials-header p { text-align: center; color: var(--text-muted); margin-top: 10px; }
        
        .testimonial-carousel-container { max-width: 800px; margin: 40px auto 0; position: relative; padding: 0 60px; }
        .testimonial-single-wrapper { width: 100%; max-width: 600px; margin: 0 auto; padding: 15px 0;}
        
        .testimonial-inner { padding: 30px; position: relative; display: flex; flex-direction: column; text-align: left; } 
        .quote-icon { position: absolute; top: 20px; right: 20px; opacity: 0.1; }
        .testimonial-text { color: var(--text-dark); font-size: 16px; line-height: 1.6; font-style: italic; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .author-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--terracota); }
        .author-name { font-size: 16px; font-weight: bold; margin-bottom: 4px; color: var(--text-dark); }
        .author-role { font-size: 13px; color: var(--terracota); }
        
        .force-flex { display: flex !important; }

        /* FAQ & FOOTER */
        .faq-section { padding: 80px 0; background: var(--ivory-bg); border-top: 1px solid var(--border-light); }
        .faq-container { max-width: 800px; margin: 0 auto; }
        .faq-item { background: #FFF; border: 1px solid var(--border-light); border-radius: 8px; margin-bottom: 16px; overflow: hidden; cursor: pointer; transition: 0.3s; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .faq-question { padding: 24px; display: flex; justify-content: space-between; align-items: center; }
        .faq-question h4 { font-size: 18px; font-weight: 500; color: var(--text-dark); }
        .faq-icon { color: var(--terracota); transition: transform 0.3s; }
        .faq-item.active .faq-icon { transform: rotate(180deg); }
        .faq-answer { max-height: 0; padding: 0 24px; color: var(--text-muted); line-height: 1.6; transition: all 0.3s ease-out; }
        .faq-item.active .faq-answer { max-height: 200px; padding: 0 24px 24px; }

        .lp-footer { background: var(--olive); padding: 60px 0 20px; color: #FFF; }
        .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 40px; margin-bottom: 40px; }
        .footer-brand h2 { color: #FFF; } .footer-brand span { color: var(--beige-bg); } .footer-brand p { color: rgba(255,255,255,0.7); margin-top: 8px; }
        .footer-links { display: flex; gap: 24px; } .footer-links a { color: #FFF; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; } .footer-links a:hover { color: var(--terracota); }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 14px; flex-wrap: wrap; gap: 16px;}
        .admin-btn-link { background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; display: flex; align-items: center; gap: 8px; }

        /* CART MODAL */
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 999; display: flex; justify-content: flex-end; }
        .cart-sidebar { width: 100%; max-width: 450px; background: var(--ivory-bg); height: 100%; display: flex; flex-direction: column; border-left: 1px solid var(--border-light); box-shadow: -10px 0 30px rgba(0,0,0,0.1); }
        .cart-header { padding: 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); }
        .cart-header h2 { color: var(--text-dark); font-size: 20px; } .btn-close-cart { background: none; border: none; cursor: pointer; color: var(--text-dark); }
        .cart-body { padding: 24px; flex-grow: 1; overflow-y: auto; }
        .cart-item { display: flex; gap: 16px; background: #FFF; padding: 12px; border-radius: 8px; margin-bottom: 16px; align-items: center; border: 1px solid var(--border-light); }
        .cart-item-img { width: 70px; height: 70px; border-radius: 6px; object-fit: cover; } .cart-item-info { flex-grow: 1; } .cart-item-info h4 { font-size: 14px; margin-bottom: 4px; color: var(--text-dark); } .cart-item-price { color: var(--terracota); font-weight: bold; margin-bottom: 4px;} .cart-item-qty { font-size: 12px; color: var(--text-muted); } .btn-remove-item { background: none; border: none; padding: 8px; cursor: pointer; }
        
        .cart-footer { padding: 24px; border-top: 1px solid var(--border-light); background: #FFF; }
        .cart-total { display: flex; justify-content: space-between; font-size: 22px; font-weight: bold; margin-bottom: 24px; color: var(--text-dark); }
        .checkout-total-display { font-size: 18px; margin-bottom: 24px; text-align: center; background: rgba(192, 90, 70, 0.05); padding: 12px; border-radius: 8px; border: 1px dashed var(--terracota); color: var(--text-dark); }
        .payment-methods { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; } .payment-method-card { background: #FFF; border: 1px solid var(--border-light); border-radius: 8px; padding: 16px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.2s; } .payment-method-card:hover { border-color: var(--olive); } .payment-method-card input[type="radio"] { accent-color: var(--terracota); width: 18px; height: 18px; cursor: pointer; } .payment-method-content { display: flex; align-items: center; gap: 16px; } .payment-method-content strong { display: block; font-size: 15px; margin-bottom: 4px; color: var(--text-dark); } .payment-method-content span { display: block; font-size: 12px; color: var(--text-muted); }
        .fake-form { display: flex; flex-direction: column; gap: 12px; } .fake-input { width: 100%; padding: 12px 16px; background: #FFF; border: 1px solid var(--border-light); border-radius: 6px; color: var(--text-dark); font-size: 14px; outline: none; transition: 0.3s; } .fake-input:focus { border-color: var(--olive); box-shadow: 0 0 0 3px rgba(91, 107, 78, 0.1); }
        .checkout-success { text-align: center; padding: 40px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; } .checkout-success h3 { font-size: 24px; color: var(--olive); } .checkout-success p { color: var(--text-muted); line-height: 1.5; } .order-number { background: var(--beige-bg); padding: 8px 16px; border-radius: 20px; font-weight: bold; color: var(--text-dark) !important; margin-top: 16px; }

        /* RESPONSIVIDADE MOBILE */
        @media (max-width: 1024px) {
          .showcase-grid { grid-template-columns: 1fr; text-align: center; } .showcase-title { text-align: center; } .benefits-list { align-items: center; } .benefits-list li { text-align: left; } .showcase-media-wrapper { order: -1; max-width: 700px; margin: 0 auto; } .offer-card-inner { grid-template-columns: 1fr; text-align: center; } .offer-benefits-list { align-items: center; } .offer-benefits-list li { text-align: left; } .countdown-timer { justify-content: center; }
        }

        @media (max-width: 768px) {
          .header-btn-desk { display: none; } .countdown-box { min-width: 70px; padding: 10px; } .countdown-num { font-size: 22px; } .footer-content { flex-direction: column; text-align: center; justify-content: center; } .footer-bottom { flex-direction: column; justify-content: center; } .carousel-outer-container { padding: 0 10px; } 
          
          /* No celular, tira os botões do carrossel da galeria */
          .carousel-btn { display: none; } 
          .force-flex { display: flex !important; } /* Mas força aparecer no carrossel de depoimentos */
          .testimonial-carousel-container { padding: 0; }

          .products-slider { justify-content: flex-start; } 
          .products-slider::-webkit-scrollbar { display: block; height: 6px; } .products-slider::-webkit-scrollbar-track { margin: 0 10px; }
        }

        @media (max-width: 480px) {
          .countdown-timer { flex-wrap: wrap; } .product-image-wrapper { height: 250px; } .product-card { min-width: 280px; width: 280px;}
        }
      `}} />
    </div>
  );
}
