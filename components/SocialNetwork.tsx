
import React, { useState, useEffect } from 'react';
import { AVAR_SOCIAL_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const SocialNetwork: React.FC = () => {
  const [points, setPoints] = useState<number>(() => {
    const saved = localStorage.getItem('avar_sovereign_points');
    return saved ? parseInt(saved, 10) : 2500;
  });

  const [sharedPlatforms, setSharedPlatforms] = useState<string[]>(() => {
    const saved = localStorage.getItem('avar_shared_platforms');
    return saved ? JSON.parse(saved) : [];
  });

  const [showStatusHelp, setShowStatusHelp] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedIconNotice, setCopiedIconNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'networks' | 'shareToEarn' | 'qrVerification' | 'royalIcon' | 'installApp'>('networks');

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setPoints(prev => prev + 1000); // Bonas na musamman don girka manhajar!
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      alert("Hanyar DIRECT DOWNLOAD tana jiran goyon bayan browser taka ko kuma an rigaya an girka manhajar akan wannan na'urar.\n\nIdan kana amfani da Google Chrome a Android ko PC:\n1. Latsa ɗige guda uku (...) a saman kora na Chrome.\n2. Zaɓi 'Install App' ko 'Add to Home screen' don sauke Application ɗin kai tsaye!");
    }
  };

  useEffect(() => {
    localStorage.setItem('avar_sovereign_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('avar_shared_platforms', JSON.stringify(sharedPlatforms));
  }, [sharedPlatforms]);

  const verifiedAppUrl = 'https://ais-pre-o5blrgdlg5rmrqjh4cg5s3-138424904777.europe-west1.run.app';
  const officialSitesUrl = 'https://sites.google.com/view/avar-royal-family-access-official/home';

  const defaultShareMessage = `Harkokin Masarautar AVAR ROYAL FAMILY asali ne kuma tabbatacce. Shiga rumbun tsaro na kariya domin kiyaye kanka daga damfara ko profiles na bogi:\n📱 App Link: ${verifiedAppUrl}\n🌐 Google Sites: ${officialSitesUrl}`;

  const copyShareTemplate = () => {
    navigator.clipboard.writeText(defaultShareMessage);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2500);
  };

  const handleShareClick = (platformName: string, shareUrl: string) => {
    // Open the official share intent
    window.open(shareUrl, '_blank');

    // If they haven't shared to this platform yet, reward points!
    if (!sharedPlatforms.includes(platformName)) {
      setSharedPlatforms(prev => [...prev, platformName]);
      setPoints(prev => prev + 500);
    } else {
      // Small bonus for subsequent shares
      setPoints(prev => prev + 50);
    }
  };

  // Calculate Ambassador title based on points
  const getAmbassadorTitle = (pts: number) => {
    if (pts < 3000) return { title: 'Junior Scout', hausa: 'Matashin Mai Kariya', icon: 'fa-user-clock', color: 'text-slate-400', badge: 'bg-slate-500/10 border-slate-500/30' };
    if (pts < 4500) return { title: 'Sovereign Defender', hausa: 'Kariyar Daula', icon: 'fa-shield', color: 'text-indigo-400', badge: 'bg-indigo-500/10 border-indigo-500/30' };
    if (pts < 6000) return { title: 'Royal Ambassador', hausa: 'Jakadan Sarauta', icon: 'fa-medal', color: 'text-pink-400', badge: 'bg-pink-500/10 border-pink-500/30' };
    return { title: 'Grand Dynasty Protector', hausa: 'Babban Mai Tsaron Masarauta 👑', icon: 'fa-crown', color: 'text-yellow-400', badge: 'bg-yellow-500/10 border-yellow-500/30 font-black' };
  };

  const rank = getAmbassadorTitle(points);

  return (
    <div className="glass-card p-6 md:p-10 rounded-[3.5rem] border-slate-800 bg-[#0a0f18] relative overflow-hidden group">
      {/* Decorative Aurora Backgrounds */}
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-600/15 transition-all duration-1000"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-600/15 transition-all duration-1000"></div>

      <div className="relative z-10 space-y-8">
        {/* Head Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-900 pb-5 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black gold-text uppercase tracking-tight">
              AVAR ROYAL GLOBAL NETWORK
            </h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">
              Synchronized Sovereignty • Built for absolute digital trust
            </p>
          </div>

          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800/80 gap-1 shrink-0">
            <button
              onClick={() => setActiveTab('networks')}
              className={`px-4 py-2 rounded-xl text-[10px] uppercase font-mono font-bold transition-all ${
                activeTab === 'networks' 
                  ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-circle-nodes mr-1.5 text-[8px]"></i> Social Handles
            </button>
            <button
              onClick={() => setActiveTab('shareToEarn')}
              className={`px-4 py-2 rounded-xl text-[10px] uppercase font-mono font-bold transition-all ${
                activeTab === 'shareToEarn' 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-gift mr-1.5 text-[8px]"></i> Share to Earn
            </button>
            <button
              onClick={() => setActiveTab('qrVerification')}
              className={`px-4 py-2 rounded-xl text-[10px] uppercase font-mono font-bold transition-all ${
                activeTab === 'qrVerification' 
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-qrcode mr-1.5 text-[8px]"></i> Verification QR Code
            </button>
            <button
              onClick={() => setActiveTab('royalIcon')}
              className={`px-4 py-2 rounded-xl text-[10px] uppercase font-mono font-bold transition-all ${
                activeTab === 'royalIcon' 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="fa-solid fa-crown mr-1.5 text-[8px]"></i> Royal Icon (Asali)
            </button>
            <button
              onClick={() => setActiveTab('installApp')}
              className={`px-4 py-2 rounded-xl text-[10px] uppercase font-mono font-bold transition-all ${
                activeTab === 'installApp' 
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                  : 'text-yellow-500/60 hover:text-yellow-400 font-extrabold animate-pulse'
              }`}
            >
              <i className="fa-solid fa-mobile-screen-button mr-1.5 text-[8px]"></i> Sauke App (Install App)
            </button>
          </div>
        </div>

        {/* Tab 1: SOCIAL NETWORK GRID */}
        {activeTab === 'networks' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {AVAR_SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-5 rounded-2xl border border-slate-900 hover:border-indigo-500/40 hover:bg-slate-950/90 transition-all flex flex-col items-center justify-center text-center space-y-3 group/item relative overflow-hidden"
                  id={`social-link-${link.platform.toLowerCase()}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-2xl ${link.color} shadow-lg border border-slate-900 group-hover/item:border-slate-800 transition-colors`}>
                    <i className={link.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{link.platform}</h4>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate max-w-[120px]">{link.handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-9 h-9 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20 text-yellow-500">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-white uppercase font-mono">Verified Social Handle Seal</h5>
                  <p className="text-[9px] text-slate-500 leading-normal">Our unified handles across all networks are matching exactly <span className="text-yellow-500 font-bold">@avarroyalfamily</span>.</p>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-mono">STATUS: 100% UNIQUE</p>
            </div>
          </motion.div>
        )}

        {/* Tab 2: SHARE TO EARN REWARDS SYSTEM */}
        {activeTab === 'shareToEarn' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left: Score Card / Level display */}
            <div className="lg:col-span-5 bg-slate-950/90 border border-slate-900 p-6 rounded-3xl space-y-6 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[8px] font-mono tracking-wider border border-slate-800 px-2 py-0.5 rounded-full uppercase text-slate-500">
                Avar Rewards V1.0
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest">Points Balances (Maki)</span>
                <div className="text-4xl font-black font-mono text-yellow-500 tracking-tight flex items-center justify-center gap-1.5 animate-pulse">
                  <i className="fa-solid fa-coins text-2xl text-yellow-400"></i>
                  {points.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wide leading-relaxed">
                  Ku tallata ingantaccen shafin kariya domin samun lada na sarauta!
                </p>
              </div>

              <div className="h-px bg-slate-900 border-dashed"></div>

              {/* Rank display */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">Present Rank & Privilege</span>
                <div className={`text-md uppercase font-mono font-black tracking-tight ${rank.color} flex items-center justify-center gap-2`}>
                  <i className={`fa-solid ${rank.icon}`}></i>
                  {rank.title}
                </div>
                <p className="text-[10px] text-indigo-300 font-bold italic font-mono">{rank.hausa}</p>
              </div>

              {/* Progress bar to next level */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-mono font-bold text-slate-500">
                  <span>Progress to Master Level</span>
                  <span>{points} / 6000 Pts</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (points / 6000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right: Sharing channels with tasks */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-950/40 border border-slate-900 p-5 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                    <i className="fa-solid fa-tasks mr-2 text-indigo-500"></i> Share Tasks (Ayyukan Yadawa)
                  </h3>
                  <span className="text-[9px] bg-slate-900 text-yellow-500 font-mono px-2 py-0.5 rounded border border-slate-800 font-bold">
                    +500 points per track
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { 
                      name: 'WhatsApp Status', 
                      icon: 'fa-brands fa-whatsapp', 
                      desc: 'Yada shafin kariya a WhatsApp status dinku domin kare abokan ku.', 
                      color: 'bg-emerald-600/15 border-emerald-500/20 text-emerald-400', 
                      actionUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(defaultShareMessage)}` 
                    },
                    { 
                      name: 'Facebook Share', 
                      icon: 'fa-brands fa-facebook', 
                      desc: 'Rubuta asalin shafin a wallafav din ku na kashin kai a Facebook.', 
                      color: 'bg-blue-600/15 border-blue-500/20 text-blue-400', 
                      actionUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(officialSitesUrl)}` 
                    },
                    { 
                      name: 'Telegram Groups', 
                      icon: 'fa-brands fa-telegram', 
                      desc: 'Tura asalin hanyar a dukkan channels da groups domin yaye shakku.', 
                      color: 'bg-sky-600/15 border-sky-500/20 text-sky-400', 
                      actionUrl: `https://telegram.me/share/url?url=${encodeURIComponent(officialSitesUrl)}&text=${encodeURIComponent('Official trust directory of the AVAR Royal Family.')}` 
                    },
                    { 
                      name: 'Twitter (X) Post', 
                      icon: 'fa-brands fa-x-twitter', 
                      desc: 'Yi murna da babban matsayin AVAR Royal a gaban kowa.', 
                      color: 'bg-slate-800/40 border-slate-700 text-slate-300', 
                      actionUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(defaultShareMessage)}` 
                    }
                  ].map((plat, i) => {
                    const hasShared = sharedPlatforms.includes(plat.name);
                    return (
                      <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-slate-950 p-3 rounded-2xl border border-slate-900 hover:border-slate-805 gap-3 transition-colors">
                        <div className="flex items-center space-x-3 text-center sm:text-left">
                          <div className={`w-10 h-10 rounded-xl ${plat.color} border flex items-center justify-center text-lg`}>
                            <i className={plat.icon}></i>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white uppercase">{plat.name}</h4>
                            <p className="text-[10px] text-slate-500 leading-normal max-w-sm mt-0.5">{plat.desc}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleShareClick(plat.name, plat.actionUrl)}
                          className={`w-full sm:w-auto px-4 py-2 text-[10px] uppercase font-mono font-black tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                            hasShared 
                              ? 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400' 
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15'
                          }`}
                        >
                          {hasShared ? (
                            <>
                              <i className="fa-solid fa-circle-check"></i> Shared (+500)
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-share-nodes"></i> Raba (Share)
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status copy custom tool */}
              <div className="bg-slate-950 p-4 border border-slate-900 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-yellow-500 uppercase font-mono font-bold tracking-wider">Verifiable Copypasta Text</span>
                  <button 
                    onClick={copyShareTemplate} 
                    className={`px-3 py-1 rounded-lg text-[9px] uppercase font-bold transition-all ${
                      copiedTemplate 
                        ? 'bg-emerald-500 text-slate-950' 
                        : 'bg-slate-900 border border-slate-805 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    {copiedTemplate ? 'Copied!' : 'Copy Template'}
                  </button>
                </div>
                <div className="bg-slate-950/80 border border-slate-900 p-3 rounded-xl">
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-mono select-all select-none text-left italic">
                    {defaultShareMessage}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: QR CODE GENERATOR & EMBED SEAL */}
        {activeTab === 'qrVerification' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left Column: Descriptions and verify rules */}
            <div className="md:col-span-7 space-y-5 text-left font-mono">
              <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[10px] rounded-full uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Certified Verification Node v1.02</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-bold text-white uppercase">AVAR Sovereign QR Directory</h4>
                <p className="text-slate-400 text-xs leading-relaxed leading-normal">
                  Domin saukaka bincike da kuma tabbatar da ingancin daula a kafafen sada zumunta ga dukkan injinan bincike na Google ko kuma mutanen gari, mun samar da wannan babban QR code na kariya.
                </p>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-slate-500 text-[11px] leading-relaxed space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">1.</span>
                    <span>Haskaka kyamarar wayar salula akan asalin code din don shiga shafin.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">2.</span>
                    <span>Zaka iya saka wannan QR code a dukkan hotunan banners na AVAR Domin kare lafiyar mutane.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">3.</span>
                    <span>Injinan bincike na Google suna gane asalin kyakkyawar alkawarin kariya ta wannan code din.</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a 
                  href={officialSitesUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-[10px] text-white uppercase font-bold rounded-xl transition-all"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square mr-1 text-slate-500"></i> Open Page
                </a>
                <button 
                  onClick={() => {
                    const svgElement = document.getElementById('sovereign-qr-svg');
                    if (svgElement) {
                      const svgString = new XMLSerializer().serializeToString(svgElement);
                      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                      const urlCreator = window.URL || window.webkitURL;
                      const blobURL = urlCreator.createObjectURL(svgBlob);
                      const image = new Image();
                      image.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = 500;
                        canvas.height = 500;
                        const context = canvas.getContext('2d');
                        if (context) {
                          context.fillStyle = '#020617';
                          context.fillRect(0, 0, 500, 500);
                          context.drawImage(image, 25, 25, 450, 450);
                          const png = canvas.toDataURL('image/png');
                          const downloadLink = document.createElement('a');
                          downloadLink.href = png;
                          downloadLink.download = 'AVAR_ROYAL_VERIFIED_QR.png';
                          downloadLink.click();
                        }
                      };
                      image.src = blobURL;
                    }
                  }}
                  className="px-4 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-slate-950 text-[10px] uppercase font-black rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-download"></i> Sauke QR Code (Download PNG)
                </button>
              </div>
            </div>

            {/* Right Column: High Tech Glowing QR Code Display */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-6 bg-slate-950 border-2 border-yellow-500/20 rounded-[2.5rem] shadow-2xl overflow-hidden group/qr">
                {/* Scanner Glowing Line Overlay */}
                <div className="absolute left-0 right-0 h-[3px] bg-yellow-500 shadow-[0_0_15px_#eab308] bottom-0 animate-pulse top-0 pointer-events-none origin-bottom opacity-80" style={{
                  animation: 'scannerLine 3.2s infinite ease-in-out'
                }}></div>

                {/* Simulated Custom CSS for scanner line */}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes scannerLine {
                    0% { top: 10px; }
                    50% { top: 290px; }
                    100% { top: 10px; }
                  }
                `}} />

                {/* SVG QR Code representation containing AVAR Royal Info */}
                <svg 
                  id="sovereign-qr-svg" 
                  viewBox="0 0 100 100" 
                  className="w-64 h-64 bg-slate-950 rounded-2xl p-2 select-none border border-slate-900 transition-transform duration-300 transform group-hover/qr:scale-105"
                >
                  {/* Position Finder Top-Left */}
                  <rect x="5" y="5" width="22" height="22" className="fill-slate-900" rx="4" />
                  <rect x="8" y="8" width="16" height="16" className="fill-yellow-500" rx="2" />
                  <rect x="11" y="11" width="10" height="10" className="fill-slate-950" rx="1" />
                  <rect x="13" y="13" width="6" height="6" className="fill-yellow-500" rx="0.5" />

                  {/* Position Finder Top-Right */}
                  <rect x="73" y="5" width="22" height="22" className="fill-slate-900" rx="4" />
                  <rect x="76" y="8" width="16" height="16" className="fill-yellow-500" rx="2" />
                  <rect x="79" y="11" width="10" height="10" className="fill-slate-950" rx="1" />
                  <rect x="81" y="13" width="6" height="6" className="fill-yellow-500" rx="0.5" />

                  {/* Position Finder Bottom-Left */}
                  <rect x="5" y="73" width="22" height="22" className="fill-slate-900" rx="4" />
                  <rect x="8" y="76" width="16" height="16" className="fill-yellow-500" rx="2" />
                  <rect x="11" y="79" width="10" height="10" className="fill-slate-950" rx="1" />
                  <rect x="13" y="81" width="6" height="6" className="fill-yellow-500" rx="0.5" />

                  {/* Random QR matrix mock dots */}
                  {/* Row 1 */}
                  <rect x="33" y="6" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="42" y="6" width="4" height="4" className="fill-yellow-500/80" rx="1" />
                  <rect x="50" y="8" width="4" height="4" className="fill-indigo-400/80" rx="1" />
                  <rect x="62" y="5" width="4" height="4" className="fill-yellow-500" rx="1" />
                  {/* Row 2 */}
                  <rect x="33" y="15" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="42" y="15" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="58" y="14" width="4" height="4" className="fill-yellow-500/60" rx="1" />
                  <rect x="64" y="16" width="4" height="4" className="fill-indigo-400" rx="1" />
                  {/* Row 3 */}
                  <rect x="5" y="32" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="14" y="33" width="4" height="4" className="fill-indigo-400/90" rx="1" />
                  <rect x="23" y="31" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="33" y="34" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="42" y="32" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="54" y="33" width="4" height="4" className="fill-indigo-400/70" rx="1" />
                  <rect x="68" y="32" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="80" y="34" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="90" y="32" width="4" height="4" className="fill-yellow-500" rx="1" />
                  {/* Row 4 */}
                  <rect x="5" y="42" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="18" y="42" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="30" y="44" width="4" height="4" className="fill-indigo-300/80" rx="1" />
                  <rect x="38" y="42" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="46" y="45" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="58" y="42" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="70" y="44" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="84" y="42" width="4" height="4" className="fill-yellow-500" rx="1" />
                  {/* Row 5 */}
                  <rect x="10" y="52" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="22" y="55" width="4" height="4" className="fill-indigo-400/90" rx="1" />
                  <rect x="34" y="52" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="46" y="54" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="54" y="52" width="4" height="4" className="fill-yellow-500/80" rx="1" />
                  <rect x="66" y="54" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="78" y="52" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="86" y="55" width="4" height="4" className="fill-indigo-300" rx="1" />
                  {/* Row 6 */}
                  <rect x="33" y="62" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="44" y="65" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="52" y="62" width="4" height="4" className="fill-indigo-300/80" rx="1" />
                  <rect x="62" y="64" width="4" height="4" className="fill-yellow-500/60" rx="1" />
                  {/* Row 7 */}
                  <rect x="33" y="74" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="42" y="72" width="4" height="4" className="fill-indigo-400/75" rx="1" />
                  <rect x="50" y="75" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="62" y="73" width="4" height="4" className="fill-indigo-300" rx="1" />
                  {/* Row 8 */}
                  <rect x="33" y="84" width="4" height="4" className="fill-indigo-400" rx="1" />
                  <rect x="45" y="82" width="4" height="4" className="fill-yellow-500/70" rx="1" />
                  <rect x="54" y="85" width="4" height="4" className="fill-indigo-300" rx="1" />
                  <rect x="64" y="82" width="4" height="4" className="fill-yellow-500" rx="1" />
                  {/* Row 9 */}
                  <rect x="30" y="90" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="42" y="91" width="4" height="4" className="fill-indigo-400/80" rx="1" />
                  <rect x="52" y="90" width="4" height="4" className="fill-yellow-500" rx="1" />
                  <rect x="66" y="91" width="4" height="4" className="fill-indigo-300" rx="1" />

                  {/* Center Majestic AVAR Emblem Box to authenticate scan */}
                  <rect x="36" y="36" width="28" height="28" className="fill-slate-950 stroke-yellow-500/80" strokeWidth="1.5" rx="5" />
                  {/* Miniature Crown path in center */}
                  <path d="M 43,45 L 43,51 L 57,51 L 57,45 L 53.5,47.5 L 50,44.5 L 46.5,47.5 Z" className="fill-yellow-500" />
                  {/* Star dot in crown */}
                  <circle cx="50" cy="41" r="1" className="fill-yellow-400 animate-pulse" />
                </svg>
              </div>
              <p className="text-[10px] text-yellow-500/80 font-mono mt-3 uppercase tracking-widest text-center">
                <i className="fa-solid fa-crown mr-1"></i> AVAR OFFICIAL SEAL
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 4: ROYAL ICON DOWNLOADER */}
        {activeTab === 'royalIcon' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
          >
            {/* Left Column: Guidelines & description */}
            <div className="md:col-span-7 space-y-5 text-left font-mono text-slate-300">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/40 border border-blue-500/20 text-blue-400 text-[10px] rounded-full uppercase">
                <i className="fa-solid fa-microchip text-[8px] animate-pulse"></i>
                <span>AVAR AI Neural Badge v2.0</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-md font-bold text-white uppercase">Asalin Garkuwar Masarauta (Original Royal Emblem Icon)</h4>
                <p className="text-xs leading-normal">
                  Sarki Abbas Aliyu Al-Zahra (Aba) ya samar da wannan asalin lamba na dukkan jakadunmu. Idan mutum ya saukar (Download) da wannan garkuwa, zai ga:
                </p>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-900 text-[11px] leading-relaxed space-y-2 text-slate-400">
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">● Launin Sarauta:</span>
                    <span>Hadin fitaccen launin <strong className="text-yellow-400">Royal Blue and Gold</strong> don nuna rumbun iko da kariya.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">● Kambin Zinare (Crown):</span>
                    <span>Tambarin kambin masarautar <strong>AVAR ROYAL FAMILY ACCESS</strong> a tsakiya.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">● Layukan Circuit/Fasaha:</span>
                    <span>Layukan fasahar sadarwa na lantarki na siffar <strong>Artificial Intelligence Links</strong> na gaske don nuna karfin tsaro.</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button 
                  onClick={() => {
                    const svgElement = document.getElementById('royal-brand-svg');
                    if (svgElement) {
                      const svgString = new XMLSerializer().serializeToString(svgElement);
                      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                      const urlCreator = window.URL || window.webkitURL;
                      const blobURL = urlCreator.createObjectURL(svgBlob);
                      const image = new Image();
                      image.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = 512;
                        canvas.height = 512;
                        const context = canvas.getContext('2d');
                        if (context) {
                          context.drawImage(image, 0, 0, 512, 512);
                          const png = canvas.toDataURL('image/png');
                          const downloadLink = document.createElement('a');
                          downloadLink.href = png;
                          downloadLink.download = 'AVAR_ROYAL_FAMILY_ACCESS_ICON.png';
                          downloadLink.click();
                        }
                      };
                      image.src = blobURL;
                    }
                  }}
                  className="px-5 py-3 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white text-[10px] uppercase font-black rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/15"
                >
                  <i className="fa-solid fa-file-arrow-down animate-bounce"></i> Sauke Asalin Icon din Masarauta (Download PNG)
                </button>
              </div>
            </div>

            {/* Right Display: Live Interactive SVG Icon preview */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-3 bg-slate-950 border border-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden group/ri">
                {/* SVG Visual definition */}
                <svg 
                  id="royal-brand-svg"
                  viewBox="0 0 512 512"
                  className="w-64 h-64 bg-[#01142F] rounded-3xl select-none"
                >
                  <rect width="512" height="512" fill="#01142F" />

                  {/* Tech Lines Network pattern (Circuit lines) */}
                  <g opacity="0.3">
                    <circle cx="256" cy="256" r="220" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4,6" />
                    <circle cx="256" cy="256" r="170" fill="none" stroke="#60a5fa" strokeWidth="1" />
                    <circle cx="256" cy="256" r="100" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="10,10" />

                    <line x1="50" y1="256" x2="462" y2="256" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="256" y1="50" x2="256" y2="462" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="110" y1="110" x2="402" y2="402" stroke="#facc15" strokeWidth="1" />
                    <line x1="402" y1="110" x2="110" y2="402" stroke="#facc15" strokeWidth="1" />

                    <circle cx="256" cy="50" r="5" fill="#facc15" />
                    <circle cx="256" cy="462" r="5" fill="#facc15" />
                    <circle cx="50" cy="256" r="5" fill="#60a5fa" />
                    <circle cx="462" cy="256" r="5" fill="#60a5fa" />
                    <circle cx="110" cy="110" r="4" fill="#60a5fa" />
                    <circle cx="402" cy="402" r="4" fill="#60a5fa" />
                    <circle cx="402" cy="110" r="4" fill="#facc15" />
                    <circle cx="110" cy="402" r="4" fill="#facc15" />
                  </g>

                  {/* Inner Glowing Badge Border */}
                  <rect x="20" y="20" width="472" height="472" rx="40" fill="none" stroke="#facc15" strokeWidth="4" opacity="0.8" />
                  <rect x="28" y="28" width="456" height="456" rx="32" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.4" />

                  {/* Golden Crown */}
                  <g transform="translate(156, 120)">
                    <path d="M 20,110 L 20,140 L 180,140 L 180,110 L 145,125 L 100,95 L 55,125 Z" fill="#b45309" opacity="0.3" />
                    <path d="M 25,100 L 25,135 L 175,135 L 175,100 L 140,118 L 100,90 L 60,118 Z" fill="url(#goldGrad)" stroke="#fef08a" strokeWidth="2" strokeLinejoin="miter" />
                    <circle cx="100" cy="130" r="4" fill="#3b82f6" />
                    <circle cx="62" cy="130" r="3" fill="#ef4444" />
                    <circle cx="138" cy="130" r="3" fill="#ef4444" />
                    <circle cx="100" cy="85" r="5" fill="#facc15" />
                    <circle cx="25" cy="95" r="3.5" fill="#facc15" />
                    <circle cx="175" cy="95" r="3.5" fill="#facc15" />
                  </g>

                  {/* Typography inside launcher icon */}
                  <text 
                    x="256" 
                    y="360" 
                    textAnchor="middle" 
                    fill="#ffffff" 
                    fontFamily="sans-serif" 
                    fontWeight="900" 
                    fontSize="26" 
                    letterSpacing="4"
                  >
                    AVAR ROYAL FAMILY
                  </text>
                  <text 
                    x="256" 
                    y="400" 
                    textAnchor="middle" 
                    fill="#facc15" 
                    fontFamily="sans-serif" 
                    fontWeight="800" 
                    fontSize="18" 
                    letterSpacing="8"
                  >
                    ACCESS COORE
                  </text>

                  {/* Subtext highlighting artificial intelligence */}
                  <text 
                    x="256" 
                    y="440" 
                    textAnchor="middle" 
                    fill="#60a5fa" 
                    fontFamily="monospace" 
                    fontWeight="bold" 
                    fontSize="12" 
                    letterSpacing="3"
                    opacity="0.8"
                  >
                    ● ARTIFICIAL INTELLIGENCE SECURITY ●
                  </text>

                  {/* Definitions of gradients */}
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-[10px] text-blue-400 font-mono mt-3 uppercase tracking-widest text-center">
                <i className="fa-solid fa-cloud-arrow-down mr-1"></i> HIGH QUALITY 512PX PNG ICON
              </p>
            </div>
          </motion.div>
        )}

        {/* Tab 5: DIRECT PWA DOWNLOAD & INSTALLER */}
        {activeTab === 'installApp' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-left"
          >
            <div className="p-6 rounded-[2rem] bg-indigo-950/20 border border-indigo-500/20 sovereign-glow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] rounded-full uppercase font-mono font-bold">
                    <i className="fa-solid fa-bolt animate-bounce"></i>
                    <span>Tabbataccen System na PWA (Progressive Web App)</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white font-mono">
                    SAUKE AYYUKAN MASARAUTAN AVAR KAN WAYA (Chrome Direct Download)
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-normal">
                    Maimakon amfani da Google Play Store ko App Store na baje kolin kasuwanci, mun samar muku da damar sauke wannan manhaja ta masarauta kai tsaye ta hanyar Google Chrome don kare tsaro.
                  </p>
                </div>
                <button
                  onClick={triggerInstall}
                  className="px-6 py-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 hover:from-yellow-400 hover:to-amber-400 text-slate-950 text-xs uppercase font-black rounded-2xl transition-all shadow-xl shadow-yellow-500/10 flex items-center gap-2 active:scale-95 shrink-0"
                >
                  <i className="fa-solid fa-download text-sm"></i> Sauke Manhajar Kai Tsaye (Download/Install App)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-left">
              {/* Android Chrome */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <i className="fa-brands fa-android text-lg"></i>
                </div>
                <h4 className="text-xs uppercase font-bold text-white tracking-widest">1. Ga Masu Amfani da Android (Chrome)</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Bayan ka latsa madannin <strong className="text-yellow-400">"Sauke Manhajar"</strong> na sama, Google Chrome zai tambayeka ko kana son karawa wayarka wannan app.
                </p>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/50 text-[10px] text-slate-500 leading-relaxed">
                  <strong className="text-emerald-400">Note:</strong> Hakan zai sa manhajar ta zauna a fuskar wayarka a matsayin asalin Application tare da icon din Masarauta na asali.
                </div>
              </div>

              {/* iOS Safari */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <i className="fa-brands fa-apple text-lg"></i>
                </div>
                <h4 className="text-xs uppercase font-bold text-white tracking-widest">2. Ga Masu Amfani da iPhone (Safari)</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Masu amfani da iPhone na Safari ba sa ganin "Install" kai tsaye. Amma za su iya yin hakan cikin sauki:
                </p>
                <ol className="text-[10px] text-slate-400 space-y-1.5 list-decimal list-inside bg-slate-900/40 p-3 rounded-lg border border-slate-800/40">
                  <li>Danna madannin <strong className="text-blue-400">Share</strong> a kasan Safari.</li>
                  <li>Sallama sannan ka zaɓi <strong className="text-yellow-500">Add to Home Screen</strong>.</li>
                  <li>Danna <strong className="text-white">Add</strong> don girka shi.</li>
                </ol>
              </div>

              {/* PC / Laptop */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <i className="fa-solid fa-laptop text-lg"></i>
                </div>
                <h4 className="text-xs uppercase font-bold text-white tracking-widest">3. Ga Masu Kwamfuta (Chrome/Edge)</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Idan kana gudanarwa a Kwamfuta, Chrome zai nuna muku wata alama ta daban a saman kora na adireshin bincike (Address Bar). 
                </p>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/50 text-[10px] text-slate-500 leading-relaxed">
                  Za ka iya danna wannan karamin gunki domin girka standalone Desktop App na Masarautar don saurin gani.
                </div>
              </div>
            </div>

            {/* Loyalty Point Booster */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/10 text-emerald-400 text-center text-xs">
              <i className="fa-solid fa-circle-check mr-2 animate-pulse"></i> Idan ka sauke ka kuma girka manhajar, za ka samu karin <strong className="text-white">+1,000 Sovereign Loyalty Points</strong> don karrama hidimarka!
            </div>
          </motion.div>
        )}

        {/* Footer info bars */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
              Anti-Scam Verified Status: SECURE SYSTEM
            </span>
          </div>
          <div className="flex space-x-6 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            <span>© AVAR Royal Global Network Hub</span>
            <span>Unbreakable Core Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialNetwork;

