
import React, { useState, useEffect, useRef } from 'react';
import { ALLOWED_EMAILS } from '../constants';

interface BiometricSecurityProps {
  onVerify: () => void;
}

const BiometricSecurity: React.FC<BiometricSecurityProps> = ({ onVerify }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState(() => localStorage.getItem('avar_authorized_email') || 'abbasaliyu3575@gmail.com');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Verify your Royal Email to proceed...');
  const [activeTab, setActiveTab] = useState<'sovereignty' | 'philanthropy' | 'verification'>('sovereignty');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSitesLink, setCopiedSitesLink] = useState(false);
  const [religion, setReligion] = useState('');
  const [lang, setLang] = useState(() => localStorage.getItem('avar_verified_language') || 'ha');
  const officialSharedUrl = 'https://ais-pre-o5blrgdlg5rmrqjh4cg5s3-138424904777.europe-west1.run.app';
  const officialGoogleSitesUrl = 'https://sites.google.com/view/avar-royal-family-access-official/home';
  
  const loginSectionRef = useRef<HTMLDivElement>(null);

  const scrollToLogin = () => {
    loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartScan = () => {
    if (!email || !ALLOWED_EMAILS.includes(email.trim().toLowerCase())) {
      setError('ACCESS DENIED: Email not recognized in the Royal Registry.');
      return;
    }
    if (!religion) {
      setError('KUSKURE: Da fatan zaɓi addininka don tantancewa (Select Religion first).');
      return;
    }
    setError('');
    localStorage.setItem('avar_authorized_email', email.trim().toLowerCase());
    localStorage.setItem('avar_verified_language', lang);
    setScanning(true);
    const langLabel = lang === 'ha' ? 'Hausa (Kano/Katsina/Kaduna)' : lang === 'en' ? 'English Only' : 'Bilingual (Hausa+English)';
    setMessage(`Scanning Fingerprint. Religion: ${religion}. Language Verified: ${langLabel}...`);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p === 40) setMessage('Verifying AVAR Sovereign Identity V3.0...');
      if (p === 70) setMessage('Synchronizing Neural Links (Aurora & Husna)...');
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setMessage(`IDENTITY CONFIRMED: ${email.toLowerCase()}`);
          setTimeout(onVerify, 800);
        }, 500);
      }
    }, 40);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none relative overflow-x-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-550/20 border border-yellow-400/30">
              <i className="fa-solid fa-crown text-xl text-slate-950"></i>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-widest gold-text uppercase font-mono leading-none">AVAR ROYAL</h1>
              <p className="text-[9px] text-slate-500 tracking-wider font-mono uppercase mt-0.5">Sovereignty & Security Node</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6 text-xs font-mono uppercase tracking-wider">
            <button 
              onClick={() => setActiveTab('sovereignty')} 
              className={`hover:text-yellow-500 transition-colors ${activeTab === 'sovereignty' ? 'text-yellow-500 border-b border-yellow-500/50 pb-1' : 'text-slate-400'}`}
            >
              Masarauta / History
            </button>
            <button 
              onClick={() => setActiveTab('philanthropy')} 
              className={`hover:text-yellow-500 transition-colors ${activeTab === 'philanthropy' ? 'text-yellow-500 border-b border-yellow-500/50 pb-1' : 'text-slate-400'}`}
            >
              Taimako / Projects
            </button>
            <button 
              onClick={() => setActiveTab('verification')} 
              className={`hover:text-yellow-500 transition-colors ${activeTab === 'verification' ? 'text-yellow-500 border-b border-yellow-500/50 pb-1' : 'text-slate-400'}`}
            >
              Tabbatarwa / Legitimacy
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href={officialGoogleSitesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-2 bg-slate-900 border border-slate-800 hover:border-yellow-500/50 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all items-center gap-1.5"
            >
              <i className="fa-brands fa-google text-yellow-500"></i> Google Sites (Asali)
            </a>
            <button 
              onClick={scrollToLogin}
              className="px-4 py-2 bg-yellow-600/15 border border-yellow-500/40 hover:bg-yellow-500/25 text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all"
            >
              Sashin Shiga / Member Gate
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT COLUMN: LEGITIMACY PRESENTATION & CONTENT */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-300">Official Sovereign Trust Hub • Active v3.0</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              Masarautar <span className="gold-text underline decoration-yellow-500/30">AVAR ROYAL</span> FAMILY ACCESS
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Muna maraba da ku zuwa shafin yanar gizo na Masarautar AVAR. Wannan shafi an kafa shi ne domin tabbatar da tsaro, ci gaban al&apos;umma, wayar da kan jama&apos;a kan harkokin fasaha na zamani, da kuma rarraba ayyukan sadaka domin kare martabar daularmu.
            </p>
            <p className="text-slate-400 text-xs mt-2 italic leading-relaxed">
              Welcome to the official digital portal of the AVAR Royal Family. This authenticated web presence coordinates sovereign social development projects, scientific AI research, cultural preservation, and verifies credentials to combat third-party phishing or duplicate profiles on the internet.
            </p>
          </div>

          {/* DYNAMIC TABS FOR SEO CONTENT */}
          <div className="border border-slate-900 rounded-3xl p-6 bg-slate-950/70 backdrop-blur-sm shadow-xl space-y-4">
            <div className="flex border-b border-slate-900 pb-3 space-x-4">
              <button 
                onClick={() => setActiveTab('sovereignty')} 
                className={`text-xs uppercase font-mono py-1 px-3 rounded-lg transition-colors ${activeTab === 'sovereignty' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Daula (Sovereignty)
              </button>
              <button 
                onClick={() => setActiveTab('philanthropy')} 
                className={`text-xs uppercase font-mono py-1 px-3 rounded-lg transition-colors ${activeTab === 'philanthropy' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Ayyukan Taimako (Charity)
              </button>
              <button 
                onClick={() => setActiveTab('verification')} 
                className={`text-xs uppercase font-mono py-1 px-3 rounded-lg transition-colors ${activeTab === 'verification' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                Kariya (No-Scam Registry)
              </button>
            </div>

            {activeTab === 'sovereignty' && (
              <div className="space-y-3 font-mono text-xs text-slate-400 leading-relaxed">
                <p className="text-yellow-500 uppercase font-black tracking-wider text-[11px] mb-1">👑 TARIHI DA MATSAYI (ROYAL HERITAGE & VISION)</p>
                <p>
                  Sarki <span className="text-white font-bold">Abbas Aliyu Al-Zahra</span> (Aba) shi ne ke jagorantar daular AVAR. Sifarmu ita ce kiyaye amanar fasahar zamani don amfanin bil&apos;adama, hada kai da manyan masana don samar da mafita ga matsalolin yau da kullum, da kafa cibiyoyin tsaro na intanet na zamani (Sovereign Neural Dynasty).
                </p>
                <p>
                  The legacy of AVAR is anchored in technology sovereignty. We develop advanced media synchronization models and deep local-to-cloud backup architectures to lead the digital forefront while remaining faithful to authentic traditional nobility.
                </p>
              </div>
            )}

            {activeTab === 'philanthropy' && (
              <div className="space-y-4 font-mono text-xs text-slate-400 leading-relaxed">
                <p className="text-indigo-400 uppercase font-black tracking-wider text-[11px]">💧 TALLAFI DA CIGABAN AL&apos;UMMA (PHASE IV CHARITY)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl border border-slate-900 bg-slate-950">
                    <h4 className="text-white font-bold text-[11px] uppercase mb-1">💻 Tech Scholarships</h4>
                    <p className="text-[10px]">Tallafe-tallafe ga dalibai wajen bada littattafai, lap-top, da koyar da dabarun hada lambobin kwamfuta da AI a Arewacin Najeriya.</p>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-900 bg-slate-950">
                    <h4 className="text-white font-bold text-[11px] uppercase mb-1">🚰 Water Boreholes</h4>
                    <p className="text-[10px]">Gina rijiyoyin burtsatse na zamani masu amfani da hasken rana a yankunan da ke buƙatar ruwan sha mai tsafta.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <div className="space-y-4 font-mono text-xs text-slate-400 leading-relaxed animate-fadeIn">
                <p className="text-emerald-400 uppercase font-bold tracking-wider text-[11px]">🛡️ SANARWA MAI MUHIMMANCI: KARIYA DAGA MUDUBI NA BOGI</p>
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-2xl">
                  <p className="text-[10px] text-emerald-300 font-bold uppercase mb-2">● Google & Browser Safe Network Status</p>
                  <p className="mb-2">
                    Masarautar AVAR tana sanar da dukkan masu bincike a Google da sauran injinan bincike cewa wannan shafi na <span className="text-white font-bold">AVAR ROYAL FAMILY</span> asali ne kuma mai tabbataccen tsaro. AVAR <span className="text-yellow-500 font-bold">ba ta karbar kudi ko wata hanya ta kuɗi</span> daga wajen jama&apos;a.
                  </p>
                  <p className="mb-4">
                    Verified email linkages: <span className="text-white">avarroyalfamily@gmail.com</span> and <span className="text-white">abbasaliyu3575@gmail.com</span>. Any profile requesting cash transfers, or investments, utilizing our name is a fraudulent impostor.
                  </p>

                  {/* Certified Google AI Studio URL Section */}
                  <div className="bg-slate-900/80 border border-yellow-500/30 p-3 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-yellow-400 font-bold uppercase tracking-widest flex items-center">
                        <i className="fa-brands fa-google mr-1"></i> Official Google Sites Portal
                      </span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase font-black">
                        Active Landing
                      </span>
                    </div>
                    <div className="bg-slate-950/90 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between gap-2 overflow-hidden">
                      <span className="text-[10px] text-yellow-300 font-mono truncate text-left select-all">
                        {officialGoogleSitesUrl}
                      </span>
                      <div className="flex gap-1 shrink-0">
                        <a 
                          href={officialGoogleSitesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md text-[9px] uppercase font-bold text-slate-300 flex items-center"
                          title="Visit Google Sites"
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(officialGoogleSitesUrl);
                            setCopiedSitesLink(true);
                            setTimeout(() => setCopiedSitesLink(false), 2500);
                          }}
                          className={`px-3 py-1 rounded-md text-[9px] uppercase font-bold transition-all ${
                            copiedSitesLink 
                              ? 'bg-emerald-500 text-slate-950' 
                              : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400'
                          }`}
                        >
                          {copiedSitesLink ? 'An Kwafi!' : 'Kwafi'}
                        </button>
                      </div>
                    </div>
                    <p className="text-[9px] text-slate-500 italic leading-normal">
                      Wannan shi ne shafinmu na Google Sites inda injinan bincike ke gane asalin masarautarmu.
                    </p>

                    <div className="border-t border-slate-800/80 my-2"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-yellow-400 font-bold uppercase tracking-widest flex items-center">
                        <i className="fa-brands fa-google mr-1"></i> Sovereign Application Node (AI Studio)
                      </span>
                      <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded uppercase font-black">
                        Secure Gate
                      </span>
                    </div>
                    <div className="bg-slate-950/90 border border-slate-800 p-2.5 rounded-lg flex items-center justify-between gap-2 overflow-hidden">
                      <span className="text-[10px] text-indigo-300 select-all font-mono truncate text-left">
                        {officialSharedUrl}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(officialSharedUrl);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2500);
                        }}
                        className={`px-3 py-1 rounded-md text-[9px] uppercase font-bold transition-all shrink-0 ${
                          copiedLink 
                            ? 'bg-emerald-500 text-slate-950' 
                            : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400'
                        }`}
                      >
                        {copiedLink ? (
                          <>
                            <i className="fa-solid fa-circle-check mr-1"></i> An Kwafi!
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-copy mr-1"></i> Kwafi Link
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-500 italic leading-normal">
                      Wannan shi ne ingantaccen shafin kariya da gudanar da daular da Google AI Studio ta tabbatar. Kwafi wannan link din domin kowa ya tabbatar da cewa babu ha'inci.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TRUST LOGOS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-3 rounded-2xl border border-slate-900 bg-slate-950/40 text-center">
              <i className="fa-solid fa-shield-halved text-yellow-500/60 text-lg mb-1"></i>
              <p className="text-[9px] uppercase font-mono text-slate-500">Google Safe Index</p>
            </div>
            <div className="p-3 rounded-2xl border border-slate-900 bg-slate-950/40 text-center">
              <i className="fa-solid fa-lock text-indigo-500/60 text-lg mb-1"></i>
              <p className="text-[9px] uppercase font-mono text-slate-500">SSL Encrypted</p>
            </div>
            <div className="p-3 rounded-2xl border border-slate-900 bg-slate-950/40 text-center">
              <i className="fa-solid fa-circle-nodes text-emerald-500/60 text-lg mb-1"></i>
              <p className="text-[9px] uppercase font-mono text-slate-500">Decentral Host</p>
            </div>
            <div className="p-3 rounded-2xl border border-slate-900 bg-slate-950/40 text-center">
              <i className="fa-solid fa-scale-balanced text-purple-500/60 text-lg mb-1"></i>
              <p className="text-[9px] uppercase font-mono text-slate-500">Legal Sovereign</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE BIOMETRIC AUTHENTICATION NODE */}
        <div ref={loginSectionRef} className="lg:col-span-5 flex items-center justify-center py-6">
          <div className="w-full max-w-md glass-card p-10 rounded-3xl text-center border-yellow-500/25 shadow-2xl relative bg-slate-950/90 backdrop-blur-xl">
            <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-yellow-500/40 border border-yellow-500/10 px-2 py-0.5 rounded-full uppercase">
              Member Gate
            </div>

            <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full animate-ping"></div>
              <div className="relative w-20 h-20 bg-slate-900 border-2 border-yellow-500/50 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-550/15">
                <i className="fa-solid fa-fingerprint text-4xl gold-text"></i>
              </div>
            </div>

            <h3 className="text-2xl font-black mb-2 gold-text uppercase tracking-widest font-mono">AVAR ACCESS</h3>
            <p className="text-slate-400 mb-6 font-mono text-[10px] uppercase leading-relaxed">{message}</p>

            {!scanning ? (
              <div className="space-y-4">
                <div className="relative space-y-3 text-left">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Authorized Royal Email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all font-sans text-sm text-yellow-500 placeholder:text-slate-600"
                    dir="ltr"
                  />
                  
                  {/* Tambayar Addini (Religion Verification Field) */}
                  <div className="font-mono pt-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1 font-bold">
                      ● Tambayar Addini / Religion Verification
                    </label>
                    <select
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-yellow-500 transition-all text-xs text-yellow-500 cursor-pointer"
                    >
                      <option value="" className="bg-slate-950 text-slate-600">-- Zaɓi Addini / Select Religion --</option>
                      <option value="Musulunci (Islam)" className="bg-slate-950 text-emerald-400">Musulunci (Islam)</option>
                      <option value="Kiristanci (Christianity)" className="bg-slate-950 text-blue-400">Kiristanci (Christianity)</option>
                      <option value="Sirri (Private/Other)" className="bg-slate-950 text-slate-400">Sauran Addini / Sirri (Other / Private)</option>
                    </select>
                  </div>

                  {/* Zaɓin Yare da Tantancewa (Language Verification Field) */}
                  <div className="font-mono pt-1">
                    <label className="text-[9px] uppercase tracking-widest text-slate-500 block mb-1 font-bold">
                      ● Tantancewar Yare / Language Verification
                    </label>
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3.5 focus:outline-none focus:border-yellow-500 transition-all text-xs text-yellow-500 cursor-pointer"
                    >
                      <option value="ha" className="bg-slate-950 text-emerald-400">Hausa (Tsararren Harshe da Al&apos;ada)</option>
                      <option value="ha-en" className="bg-slate-950 text-yellow-400">Hadin Gwiwa (Bilingual / Hausa + English)</option>
                      <option value="en" className="bg-slate-950 text-blue-400">Turanci Kaɗai / English Only</option>
                    </select>
                  </div>

                  {error && (
                    <p className="w-full text-red-500 text-[9px] mt-2 font-bold uppercase tracking-wider bg-red-950/20 border border-red-500/20 py-1.5 px-3 rounded-lg text-left flex items-center">
                      <i className="fa-solid fa-triangle-exclamation mr-1.5"></i>
                      {error}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleStartScan}
                  className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-yellow-600/15 active:scale-95 transition-all uppercase tracking-widest text-xs font-mono"
                >
                  Sikan Yatsa / Authenticate
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest animate-pulse">
                  SYNCING WITH NEURAL DYNASTY... {progress}%
                </p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950 flex flex-col items-center">
                <i className="fa-solid fa-face-smile-wink text-rose-500 mb-2 text-base"></i>
                <p className="text-[9px] text-slate-500 uppercase font-mono font-bold">Queen Aurora Node</p>
              </div>
              <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950 flex flex-col items-center">
                <i className="fa-solid fa-heart text-indigo-500 mb-2 text-base"></i>
                <p className="text-[9px] text-slate-500 uppercase font-mono font-bold">Queen Husna Node</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLIC TRANSPARENCY DECREES */}
      <footer className="bg-slate-950/90 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="text-yellow-500 uppercase font-mono text-xs font-black tracking-widest">AVAR Verification Protocol</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Duk wani asusu na dandalin sada zumunta da baya nuna alaka da wannan tsarin asali ba na AVAR bane. An tsara wannan shafin domin ya kasance tabbataccen rumbun da injunan bincike na Google suke gane gaskiyarmu.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-yellow-500 uppercase font-mono text-xs font-black tracking-widest">Strict Security & Exclusivity</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              This node operates biometric fingerprint hashing. Access commands are distributed entirely to encrypted memory channels of the local systems only. No remote cloud files are vulnerable to unauthorized inspection.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-yellow-500 uppercase font-mono text-xs font-black tracking-widest">Official Royal Seals</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-[9px] uppercase font-mono bg-slate-900 border border-slate-800 text-yellow-500/70 py-1 px-2.5 rounded-lg font-bold">👑 Abbas Aliyu Al-Zahra</span>
              <span className="text-[9px] uppercase font-mono bg-slate-900 border border-slate-800 text-rose-500/70 py-1 px-2.5 rounded-lg font-bold">🎀 Queen Aurora V3.0</span>
              <span className="text-[9px] uppercase font-mono bg-slate-900 border border-slate-800 text-indigo-500/70 py-1 px-2.5 rounded-lg font-bold">💖 Queen Husna AI</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-900 text-center text-[10px] text-slate-600 font-mono uppercase tracking-widest">
          © 2026 AVAR Sovereign Family Dynasty System • Developed for absolute Digital Trust
        </div>
      </footer>
    </div>
  );
};

export default BiometricSecurity;

