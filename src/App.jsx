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
  {
    id: 1,
    nome: "Abstrato em Ouro Metálico",
    preco: 890.00,
    estoque: 5,
    imagem: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Mais Vendido"
  },
  {
    id: 2,
    nome: "Minimalismo Geométrico",
    preco: 650.00,
    estoque: 12,
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Lançamento"
  },
  {
    id: 3,
    nome: "Textura Escandinava",
    preco: 1200.00,
    estoque: 2,
    imagem: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Premium"
  }
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

// Funções Auxiliares
const formatarPreco = (valor) => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatarParcela = (valor) => `12x de ${(Number(valor || 0) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;

// ==========================================
// FUNÇÃO DE ROLAGEM ÂNCORA
// ==========================================
const rolarParaProdutos = () => {
  document.getElementById('sessao-produtos')?.scrollIntoView({ behavior: 'smooth' });
};

// ==========================================
// SUBCOMPONENTES DA LOJA
// ==========================================
const Header = ({ qtdCarrinho, abrirCarrinho }) => (
  <header className="lp-header">
    <div className="lp-container header-content">
      <h1 className="logo">Lumina<span>Art</span></h1>
      <div className="header-actions">
        <button className="btn-outline" onClick={rolarParaProdutos}>Ver Coleção</button>
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
      <section className="showcase-section lp-container">
        <div className="showcase-grid">
          <div className="showcase-content">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>
              Mais do que decoração, <br/><span style={{ color: 'var(--primary-gold)' }}>uma experiência.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', fontSize: '18px' }}>
              Nossas obras são pensadas para se tornarem o centro das atenções do seu ambiente. 
            </p>
            <ul style={{ listStyle: 'none', marginBottom: '32px', color: 'var(--text-light)' }}>
              <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><ShieldCheck size={24} color="var(--primary-gold)" /> Design exclusivo e autoral</li>
              <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}><Truck size={24} color="var(--primary-gold)" /> Envio garantido e rastreado</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Star size={24} color="var(--primary-gold)" /> Acabamento artesanal feito à mão</li>
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
    <section className="offer-section lp-container">
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
            <li><Truck size={24} color="var(--primary-gold)" className="flex-shrink-0"/><div><strong>Frete Expresso Grátis</strong><span>Enviamos para todo o Brasil sem custo.</span></div></li>
            <li><Gift size={24} color="var(--primary-gold)" className="flex-shrink-0"/><div><strong>Kit Instalação <span style={{textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '12px'}}>R$ 149,00</span> (Grátis)</strong><span>Gabarito e buchas de alta fixação.</span></div></li>
            <li><Shield size={24} color="var(--primary-gold)" className="flex-shrink-0"/><div><strong>Garantia de 30 Dias</strong><span>Se não combinar, devolvemos seu dinheiro.</span></div></li>
          </ul>
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
        <p style={{textAlign: 'center', color: 'var(--text-muted)'}}>Nenhum produto cadastrado no momento.</p>
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
                <p style={{fontSize: '12px', color: produto.estoque > 0 ? '#10b981' : '#ef4444', marginBottom: '16px'}}>
                  {produto.estoque > 0 ? `${produto.estoque} em estoque` : 'Esgotado'}
                </p>
                <button 
                  className="btn-buy" 
                  onClick={() => adicionarAoCarrinho(produto)}
                  disabled={produto.estoque <= 0}
                  style={{ opacity: produto.estoque <= 0 ? 0.5 : 1, cursor: produto.estoque <= 0 ? 'not-allowed' : 'pointer'}}
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
        <h2 className="section-title" style={{marginBottom: '16px'}}>Aprovado por quem exige o melhor</h2>
        <div className="trust-badge-header">
          <div className="stars" style={{justifyContent: 'center'}}><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/><Star size={24} fill="#d4af37" color="#d4af37"/></div>
          <p>Classificação <strong>4.9/5</strong> baseada em +500 clientes.</p>
        </div>
      </div>
      <div className="testimonials-grid">
        {DEPOIMENTOS.map(depoimento => (
          <div key={depoimento.id} className="testimonial-card">
            <Quote size={32} color="rgba(212, 175, 55, 0.2)" className="quote-icon" />
            <div className="stars" style={{marginBottom: '16px'}}><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/><Star size={14} fill="#d4af37" color="#d4af37"/></div>
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
    <section className="faq-section lp-container">
      <h2 className="section-title">Dúvidas Frequentes</h2>
      <div className="faq-list">
        {FAQS.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question"><h4>{faq.pergunta}</h4><ChevronDown size={20} className="faq-icon" /></div>
            <div className="faq-answer"><p>{faq.resposta}</p></div>
          </div>
        ))}
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
    <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <p>&copy; 2026 Lumina Art. Todos os direitos reservados.</p>
      <button 
        onClick={() => setModoVisualizacao('admin')}
        style={{background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px'}}
      >
        <Settings size={14} /> Área do Administrador
      </button>
    </div>
  </footer>
);

// ==========================================
// COMPONENTE DA ÁREA DO ADMINISTRADOR
// ==========================================
const AdminPanel = ({ produtos, setProdutos, setModoVisualizacao }) => {
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', estoque: '', tag: '' });
  
  const [imagemPreview, setImagemPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processarImagem(file);
    } else {
      alert("Por favor, envie apenas arquivos de imagem (JPG, PNG).");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processarImagem(file);
    }
  };

  const processarImagem = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const adicionarProduto = (e) => {
    e.preventDefault();
    const produtoFormatado = {
      id: Date.now(), 
      nome: novoProduto.nome,
      preco: parseFloat(novoProduto.preco) || 0,
      estoque: parseInt(novoProduto.estoque, 10) || 0,
      imagem: imagemPreview || "https://images.unsplash.com/photo-1573830255403-162e032ed9b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      tag: novoProduto.tag
    };
    
    setProdutos([...produtos, produtoFormatado]);
    
    setNovoProduto({ nome: '', preco: '', estoque: '', tag: '' }); 
    setImagemPreview(null);
  };

  const removerProduto = (id) => {
    if(window.confirm('Tem certeza que deseja apagar este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-container animate-fade">
      <div className="admin-header">
        <h2>Painel de Controle <span>| Gerenciamento de Obras</span></h2>
        <button className="btn-outline" onClick={() => setModoVisualizacao('loja')}>
          <ArrowRight size={18} /> Voltar para a Loja
        </button>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3><Plus size={20}/> Cadastrar Novo Produto</h3>
          <form className="admin-form" onSubmit={adicionarProduto}>
            <div className="form-group">
              <label>Nome da Obra</label>
              <input type="text" name="nome" value={novoProduto.nome} onChange={handleInputChange} required placeholder="Ex: Tela Abstrata Azul" />
            </div>
            
            <div style={{display: 'flex', gap: '16px'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Preço (R$)</label>
                <input type="number" step="0.01" name="preco" value={novoProduto.preco} onChange={handleInputChange} required placeholder="0.00" />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Qtd. Estoque</label>
                <input type="number" name="estoque" value={novoProduto.estoque} onChange={handleInputChange} required placeholder="0" min="0" />
              </div>
            </div>

            <div className="form-group">
              <label>Imagem do Quadro</label>
              <div 
                className={`dropzone ${isDragging ? 'dragging' : ''} ${imagemPreview ? 'has-image' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileSelect} 
                  className="file-input"
                  title="Clique ou arraste a imagem"
                />
                
                {imagemPreview ? (
                  <div className="preview-container">
                    <img src={imagemPreview} alt="Preview" className="image-preview" />
                    <div className="change-image-btn"><ImageIcon size={16}/> Trocar Imagem</div>
                  </div>
                ) : (
                  <div className="drop-content">
                    <UploadCloud size={40} color="var(--primary-gold)" style={{marginBottom: '12px'}}/>
                    <p style={{color: 'var(--text-light)', fontWeight: 'bold'}}>Arraste a foto do quadro aqui</p>
                    <p style={{color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px'}}>ou clique para procurar no computador</p>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Tag em Destaque (Opcional)</label>
              <input type="text" name="tag" value={novoProduto.tag} onChange={handleInputChange} placeholder="Ex: Lançamento, Esgotando..." />
            </div>

            <button type="submit" className="btn-primary-large" style={{width: '100%', padding: '12px', fontSize: '16px', marginTop: '16px'}}>
              Cadastrar Produto
            </button>
          </form>
        </div>

        <div className="admin-card">
          <h3>Lista de Produtos Ativos ({produtos.length})</h3>
          <div className="admin-product-list">
            {produtos.length === 0 ? (
              <p style={{color: 'var(--text-muted)'}}>Nenhum produto cadastrado.</p>
            ) : (
              produtos.map(produto => (
                <div key={produto.id} className="admin-product-item">
                  <img src={produto.imagem} alt={produto.nome} />
                  <div className="admin-product-info">
                    <strong>{produto.nome}</strong>
                    <div style={{display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px'}}>
                      <span>{formatarPreco(produto.preco)}</span>
                      <span>Estoque: {produto.estoque} un.</span>
                    </div>
                  </div>
                  <button className="btn-remove-item" onClick={() => removerProduto(produto.id)} title="Apagar Produto">
                    <Trash2 size={20} color="#ef4444" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// COMPONENTE PRINCIPAL (Orquestrador)
// ==========================================
export default function LandingPageQuadros() {
  const [modoVisualizacao, setModoVisualizacao] = useState('loja'); 
  const [produtos, setProdutos] = useState(() => {
    const produtosSalvos = localStorage.getItem('lumina_produtos');
    if (produtosSalvos) {
      return JSON.parse(produtosSalvos);
    }
    return PRODUTOS_INICIAIS; 
  });

  useEffect(() => {
    localStorage.setItem('lumina_produtos', JSON.stringify(produtos));
  }, [produtos]);

  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); 
  const [formData, setFormData] = useState({ nome: '', email: '', endereco: '' });
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  const [isProcessing, setIsProcessing] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    if (produto.estoque <= 0) return; 

    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        if(existe.qtde >= produto.estoque) {
          alert("Você atingiu o limite de estoque deste produto.");
          return prev;
        }
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

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const totalCarrinho = carrinho.reduce((acc, item) => acc + (item.preco * item.qtde), 0);
  const quantidadeItens = carrinho.reduce((acc, item) => acc + item.qtde, 0);

  const irParaPagamento = (e) => { e.preventDefault(); setCheckoutStep(2); };

  const processarPagamento = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3);
      
      setProdutos(prevProdutos => 
        prevProdutos.map(prod => {
          const itemComprado = carrinho.find(c => c.id === prod.id);
          if(itemComprado) {
            return { ...prod, estoque: prod.estoque - itemComprado.qtde };
          }
          return prod;
        })
      );

    }, 2500);
  };

  return (
    <div className="landing-page-wrapper">
      
      {modoVisualizacao === 'admin' ? (
        <AdminPanel 
          produtos={produtos} 
          setProdutos={setProdutos} 
          setModoVisualizacao={setModoVisualizacao} 
        />
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

      {isCartOpen && modoVisualizacao === 'loja' && (
        <div className="cart-overlay" onClick={fecharCarrinho}>
          <div className="cart-sidebar" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>
                {checkoutStep === 0 && `Seu Carrinho (${quantidadeItens})`}
                {checkoutStep === 1 && 'Dados de Envio'}
                {checkoutStep === 2 && 'Pagamento Seguro'}
                {checkoutStep === 3 && 'Pedido Confirmado'}
              </h2>
              <button className="btn-close-cart" onClick={fecharCarrinho}><X size={24} color="#f3f4f6" /></button>
            </div>

            <div className="cart-body">
              {carrinho.length === 0 && checkoutStep !== 3 ? (
                <div className="cart-empty">
                  <ShoppingCart size={48} color="#4b5563" />
                  <p>Seu carrinho está vazio.</p>
                  <button className="btn-outline" style={{marginTop: '16px'}} onClick={fecharCarrinho}>Continuar Comprando</button>
                </div>
              ) : checkoutStep === 0 ? (
                <div className="cart-items-list">
                  {carrinho.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.imagem} alt={item.nome} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4>{item.nome}</h4>
                        <p className="cart-item-price">{formatarPreco(item.preco)}</p>
                        <p className="cart-item-qty">Qtd: {item.qtde}</p>
                      </div>
                      <button className="btn-remove-item" onClick={() => removerDoCarrinho(item.id)}>
                        <Trash2 size={18} color="#ef4444" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : checkoutStep === 1 ? (
                <form id="shippingForm" className="checkout-form" onSubmit={irParaPagamento}>
                  <p className="form-helper-text">Para onde devemos enviar sua obra de arte?</p>
                  <div className="form-group"><label>Nome Completo</label><div className="input-wrapper"><User size={18} className="input-icon" /><input type="text" name="nome" required value={formData.nome} onChange={handleInputChange} /></div></div>
                  <div className="form-group"><label>E-mail</label><div className="input-wrapper"><Mail size={18} className="input-icon" /><input type="email" name="email" required value={formData.email} onChange={handleInputChange} /></div></div>
                  <div className="form-group"><label>Endereço de Entrega</label><div className="input-wrapper"><MapPin size={18} className="input-icon" /><textarea name="endereco" required rows="3" value={formData.endereco} onChange={handleInputChange}></textarea></div></div>
                </form>
              ) : checkoutStep === 2 ? (
                <form id="paymentForm" className="checkout-form" onSubmit={processarPagamento}>
                  <p className="form-helper-text" style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981'}}><ShieldCheck size={16} /> Ambiente seguro e criptografado.</p>
                  <div className="payment-method-selector">
                    <div className={`pm-option ${metodoPagamento === 'cartao' ? 'active' : ''}`} onClick={() => setMetodoPagamento('cartao')}><CreditCard size={20} /> Cartão de Crédito</div>
                    <div className={`pm-option ${metodoPagamento === 'pix' ? 'active' : ''}`} onClick={() => setMetodoPagamento('pix')}><QrCode size={20} /> Pix</div>
                  </div>
                  {metodoPagamento === 'cartao' && (
                    <div className="credit-card-fields animate-fade">
                      <div className="form-group"><label>Número do Cartão</label><input type="text" className="mock-input" required maxLength="19" /></div>
                      <div className="form-group"><label>Nome no Cartão</label><input type="text" className="mock-input" required /></div>
                      <div style={{display: 'flex', gap: '16px'}}>
                        <div className="form-group" style={{flex: 1}}><label>Validade</label><input type="text" className="mock-input" required maxLength="5" /></div>
                        <div className="form-group" style={{flex: 1}}><label>CVV</label><input type="text" className="mock-input" required maxLength="4" /></div>
                      </div>
                    </div>
                  )}
                  {metodoPagamento === 'pix' && (
                    <div className="pix-fields animate-fade" style={{textAlign: 'center', padding: '24px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px dashed var(--primary-gold)'}}>
                      <QrCode size={64} color="var(--primary-gold)" style={{margin: '0 auto 16px'}} />
                      <p style={{fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px'}}>Gere o código no seu app bancário.</p>
                    </div>
                  )}
                </form>
              ) : (
                <div className="success-screen animate-fade">
                  <CheckCircle size={64} color="#10b981" style={{marginBottom: '24px'}} />
                  <h3 style={{fontSize: '24px', color: 'var(--text-light)', marginBottom: '8px'}}>Pagamento Aprovado!</h3>
                  <p style={{color: 'var(--text-muted)', textAlign: 'center', marginBottom: '24px'}}>Obrigado, {formData.nome.split(' ')[0]}!</p>
                  <div className="receipt-box"><p>Enviamos o recibo para:</p><strong>{formData.email}</strong></div>
                </div>
              )}
            </div>

            {carrinho.length > 0 && checkoutStep !== 3 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{metodoPagamento === 'pix' && checkoutStep === 2 ? formatarPreco(totalCarrinho * 0.95) : formatarPreco(totalCarrinho)}</span>
                </div>
                {checkoutStep === 0 && <button className="btn-primary-large" style={{width: '100%'}} onClick={() => setCheckoutStep(1)}>Avançar para Entrega</button>}
                {checkoutStep === 1 && <div style={{display: 'flex', gap: '12px'}}><button type="button" className="btn-outline" style={{flex: 1}} onClick={() => setCheckoutStep(0)}>Voltar</button><button type="submit" form="shippingForm" className="btn-primary-large" style={{flex: 2}}>Ir para Pagamento</button></div>}
                {checkoutStep === 2 && <div style={{display: 'flex', gap: '12px'}}><button type="button" className="btn-outline" style={{flex: 1}} onClick={() => setCheckoutStep(1)} disabled={isProcessing}>Voltar</button><button type="submit" form="paymentForm" className="btn-primary-large" style={{flex: 2}} disabled={isProcessing}>{isProcessing ? <><Loader2 size={20} className="spin" /> Processando...</> : 'Finalizar Compra'}</button></div>}
              </div>
            )}
            {checkoutStep === 3 && <div className="cart-footer"><button className="btn-primary-large" style={{width: '100%'}} onClick={fecharCarrinho}>Voltar para a Loja</button></div>}
          </div>
        </div>
      )}
      
      {/* CSS INJETADO */}
      <style dangerouslySetInnerHTML={{__html: `
        :root { --primary-gold: #d4af37; --primary-gold-hover: #b5952f; --dark-bg: #0f1115; --darker-bg: #0a0b0e; --card-bg: #1a1d24; --text-light: #f3f4f6; --text-muted: #9ca3af; }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        html { scroll-behavior: smooth; } /* Permite a rolagem suave nativa do navegador */
        .landing-page-wrapper { background-color: var(--dark-bg); color: var(--text-light); min-height: 100vh; width: 100%; overflow-x: hidden; }
        .lp-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        /* CSS Base da Loja */
        .lp-header { background-color: rgba(10, 11, 14, 0.9); backdrop-filter: blur(10px); position: fixed; top: 0; width: 100%; z-index: 100; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .header-content { display: flex; justify-content: space-between; align-items: center; height: 70px; }
        .logo { font-size: 24px; font-weight: 800; letter-spacing: 1px; } .logo span { color: var(--primary-gold); }
        .header-actions { display: flex; align-items: center; gap: 24px; }
        .btn-outline { background: transparent; border: 1px solid var(--primary-gold); color: var(--primary-gold); padding: 8px 20px; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;}
        .btn-outline:hover { background: var(--primary-gold); color: var(--dark-bg); }
        .cart-icon-wrapper { position: relative; cursor: pointer; display: flex; align-items: center; }
        .cart-badge { position: absolute; top: -8px; right: -10px; background-color: var(--primary-gold); color: var(--darker-bg); font-size: 11px; font-weight: bold; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; border-radius: 50%; }

        .hero-section { padding: 160px 0 100px; background: linear-gradient(180deg, var(--darker-bg) 0%, var(--dark-bg) 100%); text-align: center; }
        .hero-content { max-width: 800px; display: flex; flex-direction: column; align-items: center; margin: 0 auto;}
        .badge-exclusive { background: rgba(212, 175, 55, 0.1); color: var(--primary-gold); border: 1px solid var(--primary-gold); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
        .hero-title { font-size: clamp(36px, 5vw, 56px); line-height: 1.1; margin-bottom: 24px; font-weight: 800; }
        .hero-subtitle { font-size: clamp(16px, 2vw, 20px); color: var(--text-muted); margin-bottom: 40px; line-height: 1.5; max-width: 600px; }
        .btn-primary-large { background-color: var(--primary-gold); color: var(--darker-bg); border: none; padding: 18px 40px; font-size: 18px; font-weight: bold; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 12px; transition: transform 0.2s, background-color 0.3s; box-shadow: 0 10px 25px rgba(212, 175, 55, 0.2); }
        .btn-primary-large:hover:not(:disabled) { background-color: var(--primary-gold-hover); transform: translateY(-3px); }
        .btn-primary-large:disabled { opacity: 0.7; cursor: not-allowed; }
        .safe-checkout { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 14px; color: var(--text-muted); }

        .showcase-section { padding: 80px 0; } .showcase-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; } .showcase-media-wrapper { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); cursor: pointer; } .showcase-image { width: 100%; height: auto; display: block; object-fit: cover; aspect-ratio: 4/3; transition: transform 0.5s; } .showcase-media-wrapper:hover .showcase-image { transform: scale(1.02); } .play-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; transition: background 0.3s; z-index: 10; } .play-overlay:hover { background: rgba(0,0,0,0.5); } .play-overlay svg { transition: transform 0.3s; } .play-overlay:hover svg { transform: scale(1.1); }
        .video-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.9); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s; } .btn-close-video { position: absolute; top: 24px; right: 24px; background: transparent; border: none; cursor: pointer; z-index: 10000; transition: transform 0.2s; } .btn-close-video:hover { transform: scale(1.1); } .video-modal-content { width: 90%; max-width: 1000px; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); animation: zoomIn 0.3s ease-out; } .real-video-player { width: 100%; height: 100%; object-fit: cover; outline: none; }

        .offer-section { padding: 40px 24px 80px; } .offer-card { background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, var(--card-bg) 100%); border: 1px solid var(--primary-gold); border-radius: 12px; padding: 48px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 48px; align-items: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3); } .offer-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(212, 175, 55, 0.2); color: var(--primary-gold); padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; margin-bottom: 24px; } .offer-title { font-size: 32px; font-weight: bold; line-height: 1.2; margin-bottom: 16px; color: var(--text-light); } .offer-desc { color: var(--text-muted); font-size: 16px; line-height: 1.5; margin-bottom: 32px; } .countdown-timer { display: flex; align-items: center; gap: 12px; } .countdown-box { background: var(--darker-bg); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px; } .countdown-num { display: block; font-size: 28px; font-weight: bold; color: var(--primary-gold); } .countdown-label { display: block; font-size: 12px; color: var(--text-muted); text-transform: uppercase; margin-top: 4px; } .countdown-separator { font-size: 28px; font-weight: bold; color: var(--text-muted); } .offer-benefits-list { list-style: none; display: flex; flex-direction: column; gap: 24px; } .offer-benefits-list li { display: flex; gap: 16px; align-items: flex-start; } .offer-benefits-list strong { display: block; font-size: 18px; margin-bottom: 4px; color: var(--text-light); } .offer-benefits-list span { color: var(--text-muted); font-size: 15px; line-height: 1.4; }

        .gallery-section { padding: 80px 0; background-color: var(--darker-bg); border-top: 1px solid rgba(255,255,255,0.05); scroll-margin-top: 80px; } /* scroll-margin ajuda a não esconder o título atrás do menu fixo */
        .section-title { text-align: center; font-size: 32px; margin-bottom: 48px; font-weight: 700; } .products-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; } .product-card { background: var(--card-bg); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); } .product-image-wrapper { position: relative; height: 350px; overflow: hidden; } .product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; } .product-card:hover .product-image { transform: scale(1.05); } .product-tag { position: absolute; top: 16px; left: 16px; background: var(--primary-gold); color: var(--darker-bg); padding: 4px 12px; font-size: 12px; font-weight: bold; border-radius: 4px; z-index: 10; } .product-info { padding: 24px; } .stars { display: flex; gap: 2px; margin-bottom: 12px; } .product-name { font-size: 20px; margin-bottom: 8px; } .product-price { font-size: 24px; font-weight: bold; color: var(--primary-gold); margin-bottom: 4px; } .product-installments { font-size: 14px; color: var(--text-muted); margin-bottom: 12px; } .btn-buy { width: 100%; background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; padding: 14px; font-size: 16px; font-weight: bold; border-radius: 4px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 8px; transition: all 0.3s; } .btn-buy:hover:not(:disabled) { background: var(--primary-gold); border-color: var(--primary-gold); color: var(--darker-bg); }

        .testimonials-section { padding: 80px 0; background-color: var(--dark-bg); } .testimonials-header { text-align: center; margin-bottom: 48px; } .trust-badge-header p { color: var(--text-muted); font-size: 16px; margin-top: 8px; } .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; } .testimonial-card { background: var(--card-bg); padding: 32px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); position: relative; } .quote-icon { position: absolute; top: 24px; right: 24px; } .testimonial-text { color: var(--text-light); font-size: 16px; line-height: 1.6; font-style: italic; margin-bottom: 24px; } .testimonial-author { display: flex; align-items: center; gap: 16px; } .author-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-gold); } .author-name { font-size: 16px; font-weight: bold; color: var(--text-light); margin-bottom: 4px; } .author-role { font-size: 13px; color: var(--primary-gold); }

        .faq-section { padding: 80px 24px; max-width: 800px; margin: 0 auto;} .faq-item { background: var(--card-bg); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 16px; overflow: hidden; cursor: pointer; transition: border-color 0.3s; } .faq-item:hover { border-color: rgba(212, 175, 55, 0.3); } .faq-question { padding: 24px; display: flex; justify-content: space-between; align-items: center; } .faq-question h4 { font-size: 18px; font-weight: 500; } .faq-icon { color: var(--primary-gold); transition: transform 0.3s; } .faq-item.active .faq-icon { transform: rotate(180deg); } .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out, padding 0.3s ease; padding: 0 24px; color: var(--text-muted); line-height: 1.6; } .faq-item.active .faq-answer { max-height: 200px; padding: 0 24px 24px; }
        .lp-footer { background: var(--darker-bg); border-top: 1px solid rgba(255,255,255,0.05); padding: 60px 0 20px; } .footer-content { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 40px; margin-bottom: 40px; } .footer-brand p { color: var(--text-muted); margin-top: 12px; } .footer-links { display: flex; gap: 24px; } .footer-links a { color: var(--text-light); text-decoration: none; display: flex; align-items: center; gap: 8px; transition: color 0.2s; } .footer-links a:hover { color: var(--primary-gold); } .footer-bottom { text-align: center; color: var(--text-muted); font-size: 14px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }

        /* CARRINHO - Glassmorphism */
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background-color: rgba(0,0,0,0.5); backdrop-filter: blur(3px); z-index: 999; display: flex; justify-content: flex-end; animation: fadeIn 0.3s; }
        .cart-sidebar { width: 100%; max-width: 420px; height: 100vh; background-color: rgba(15, 17, 21, 0.65); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-left: 1px solid rgba(255,255,255,0.1); box-shadow: -10px 0 40px rgba(0,0,0,0.5); display: flex; flex-direction: column; animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .cart-header { display: flex; justify-content: space-between; align-items: center; padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); background: transparent; }
        .cart-header h2 { font-size: 18px; color: var(--primary-gold); }
        .btn-close-cart { background: transparent; border: none; cursor: pointer; transition: transform 0.2s; display: flex; align-items: center;} .btn-close-cart:hover { transform: scale(1.1); }
        .cart-body { flex: 1; overflow-y: auto; padding: 24px; }
        .cart-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); gap: 16px; }
        .cart-items-list { display: flex; flex-direction: column; gap: 16px; }
        .cart-item { display: flex; align-items: center; gap: 16px; background-color: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .cart-item-img { width: 70px; height: 70px; object-fit: cover; border-radius: 4px; }
        .cart-item-info { flex: 1; }
        .cart-item-info h4 { font-size: 14px; margin-bottom: 4px; }
        .cart-item-price { color: var(--primary-gold); font-weight: bold; font-size: 14px; margin-bottom: 4px;}
        .cart-item-qty { font-size: 12px; color: var(--text-muted); }
        .btn-remove-item { background: transparent; border: none; cursor: pointer; padding: 8px; transition: opacity 0.2s; display: flex; align-items: center;} .btn-remove-item:hover { opacity: 0.7; }
        .cart-footer { padding: 24px; border-top: 1px solid rgba(255,255,255,0.05); background-color: transparent; }
        .cart-total { display: flex; justify-content: space-between; align-items: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; }

        .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;}
        .form-group label { font-size: 13px; font-weight: 600; color: var(--text-light); }
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 14px; color: var(--text-muted); }
        .input-wrapper input, .input-wrapper textarea, .mock-input, .admin-form input { width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 6px; font-size: 14px; transition: all 0.3s; outline: none; resize: none; }
        .input-wrapper input, .input-wrapper textarea { padding: 14px 14px 14px 40px; }
        .mock-input, .admin-form input { padding: 14px; }
        .input-wrapper input:focus, .input-wrapper textarea:focus, .mock-input:focus, .admin-form input:focus { border-color: var(--primary-gold); box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1); background: rgba(0,0,0,0.4); }
        
        .payment-method-selector { display: flex; gap: 12px; margin-bottom: 8px; }
        .pm-option { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; cursor: pointer; transition: all 0.2s; color: var(--text-muted); font-size: 13px; font-weight: 600; }
        .pm-option.active { border-color: var(--primary-gold); color: var(--primary-gold); background: rgba(212, 175, 55, 0.05); }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .animate-fade { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

        /* ==========================================
           ESTILOS EXCLUSIVOS DA ÁREA ADMIN
        ========================================== */
        .admin-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; min-height: 100vh; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .admin-header h2 { font-size: 24px; display: flex; align-items: center; gap: 8px; }
        .admin-header h2 span { color: var(--primary-gold); font-weight: 400; font-size: 18px; }
        
        .admin-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 32px; }
        .admin-card { background: var(--card-bg); padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .admin-card h3 { font-size: 18px; margin-bottom: 24px; color: var(--primary-gold); display: flex; align-items: center; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px;}
        
        /* Estilos do Drag & Drop */
        .dropzone { border: 2px dashed rgba(255,255,255,0.2); border-radius: 8px; padding: 32px 16px; text-align: center; background: rgba(0,0,0,0.2); cursor: pointer; transition: all 0.3s ease; position: relative; min-height: 150px; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .dropzone:hover { border-color: rgba(212, 175, 55, 0.5); background: rgba(212, 175, 55, 0.02); }
        .dropzone.dragging { border-color: var(--primary-gold); background: rgba(212, 175, 55, 0.05); transform: scale(1.02); }
        .dropzone.has-image { padding: 8px; border-style: solid; }
        .file-input { position: absolute; width: 100%; height: 100%; top: 0; left: 0; opacity: 0; cursor: pointer; z-index: 10; }
        
        .preview-container { position: relative; width: 100%; height: 200px; display: flex; justify-content: center; align-items: center; border-radius: 6px; overflow: hidden; background: #000; }
        .image-preview { max-width: 100%; max-height: 100%; object-fit: contain; }
        .change-image-btn { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px; display: flex; align-items: center; gap: 6px; z-index: 20; pointer-events: none;}

        .admin-product-list { display: flex; flex-direction: column; gap: 16px; max-height: 600px; overflow-y: auto; padding-right: 8px;}
        .admin-product-list::-webkit-scrollbar { width: 6px; }
        .admin-product-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        
        .admin-product-item { display: flex; align-items: center; gap: 16px; background: var(--darker-bg); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.02); transition: transform 0.2s;}
        .admin-product-item:hover { transform: translateX(4px); border-color: rgba(255,255,255,0.1); }
        .admin-product-item img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
        .admin-product-info { flex: 1; }

        @media (max-width: 992px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}} />
    </div>
  );
}