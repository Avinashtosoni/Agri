import React, { useState } from 'react';
import { ViewState, UserProfile, UserRole, SiteContent, NavSubItemConfig, FooterConfig } from '../types';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Shield,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Edit,
  LogIn,
  UserPlus,
  BookOpen,
  ChevronDown,
  Newspaper,
  ClipboardList,
  Layers
} from 'lucide-react';
import { APP_NAME } from '../constants';

// --- Ticker Component ---
export const Ticker: React.FC<{ text?: string, backgroundColor?: string }> = ({ text, backgroundColor }) => {
  if (!text) return null;
  return (
    <div className="text-white py-1 overflow-hidden relative z-20 shadow-inner border-b border-gray-300" style={{ backgroundColor: backgroundColor || '#3b1e54' }}>
      <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] inline-block pl-[100%]">
        <span className="mx-4 text-xs md:text-sm font-medium tracking-wide">
          {text}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

// --- Public Header ---
export const PublicHeader: React.FC<{ 
  onNavigate: (view: ViewState, sectionId?: string, pageId?: string) => void;
  currentView: ViewState;
  siteContent: SiteContent;
}> = ({ onNavigate, currentView, siteContent }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { header, navItems, theme } = siteContent;

  const visibleNavItems = navItems.filter(item => item.isVisible);
  const primaryColor = theme?.primaryColor || '#FF7F27';
  const secondaryColor = theme?.secondaryColor || '#3b1e54';
  const headerBgColor = theme?.headerBackgroundColor || '#ffffff';

  return (
    <header className="w-full shadow-none font-sans relative flex flex-col">
      {/* Top White Section */}
      <div className="w-full relative" style={{ 
        backgroundColor: headerBgColor,
        backgroundImage: header.backgroundImageUrl ? `url(${header.backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {header.backgroundImageUrl && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />}
        <div className="container mx-auto px-2 py-2 md:py-4 relative z-10">
          <div className="flex items-center justify-between gap-2">
            
            {/* Left Logo - Hidden on mobile */}
            <div className="hidden md:flex items-center">
               <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-orange-500 overflow-hidden shrink-0 shadow-md">
                  {header.showLogoImage && header.logoUrl ? (
                      <img src={header.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                      <span className="text-orange-600 font-bold text-3xl">A<span className="text-green-600">AP</span></span>
                  )}
               </div>
            </div>

            {/* Center Text - Single line on mobile */}
            <div className="text-center flex-1">
               <h1 className="text-sm md:text-3xl font-bold text-orange-600 leading-tight uppercase">
                 {header.subtitle}
               </h1>
               <h2 className="hidden md:block text-xs md:text-sm font-bold text-gray-800 mt-1 uppercase tracking-wide">
                 {header.subtext}
               </h2>
               <h3 className="text-xs md:text-xl font-bold text-red-600 md:mt-1">
                 {header.hindiName}
               </h3>
            </div>

            {/* Right Logos - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="GOI" className="w-full h-full object-contain p-2 opacity-80"/>
               </div>
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                 <div className="text-[10px] text-blue-800 font-bold">ASCI</div>
               </div>
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                 <div className="text-[10px] text-blue-500 font-bold">NFDB</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div 
        className="shadow-lg relative z-30 border-t-2 border-b-2 border-blue-300" 
        style={{ background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' }}
      >
        <div className="container mx-auto px-0">
          <div className="flex justify-between items-center min-h-[40px]">
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex w-full justify-center">
              <ul className="flex items-stretch flex-wrap justify-center">
                {visibleNavItems.map((link) => (
                  <li key={link.id} className="relative group border-r border-white/20 last:border-r-0">
                    <button
                      onClick={() => onNavigate(link.view as ViewState, link.sectionId, link.pageId)}
                      className={`flex items-center gap-1 px-4 py-3 text-[11px] md:text-xs font-bold text-black hover:text-white hover:bg-black/10 transition-colors uppercase tracking-wider h-full
                        ${currentView === link.view ? 'bg-black/20 text-white' : ''}`}
                    >
                      {link.label}
                      {link.subItems && link.subItems.length > 0 && (
                        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    {link.subItems && link.subItems.length > 0 && (
                      <div 
                        className="absolute top-full left-0 w-56 bg-white shadow-xl border-t-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-50"
                        style={{ borderColor: primaryColor }}
                      >
                        <ul className="py-0">
                          {link.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate(subItem.view as ViewState, subItem.sectionId, subItem.pageId);
                                }}
                                className="block w-full text-left px-4 py-3 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-none"
                                style={{ color: 'inherit' }}
                                onMouseOver={(e) => (e.currentTarget.style.color = primaryColor)}
                                onMouseOut={(e) => (e.currentTarget.style.color = '')}
                              >
                                {subItem.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Nav Toggle */}
            <div className="lg:hidden flex justify-between w-full items-center px-4 py-2">
               <span className="text-white font-bold text-sm">MENU</span>
               <button 
                className="p-1 text-white hover:bg-white/10 rounded"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <Ticker text={siteContent.tickerText} backgroundColor={secondaryColor} />

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 absolute top-full w-full z-40 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col max-h-[80vh] overflow-y-auto">
             {visibleNavItems.map((link) => (
              <div key={link.id} className="border-b border-gray-100">
                <button
                  onClick={() => {
                    onNavigate(link.view as ViewState, link.sectionId, link.pageId);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-50 uppercase"
                >
                  {link.label}
                </button>
              </div>
            ))}
             <button
                onClick={() => {
                  onNavigate(ViewState.ADMIN_LOGIN);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 text-sm font-bold uppercase bg-blue-50 text-blue-600 border-t-2 border-blue-200"
              >
                Staff Login
              </button>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Footer ---
interface FooterProps {
  onNavigate?: (view: ViewState, sectionId?: string) => void;
  contactInfo?: {
    phone1: string;
    phone2: string;
    email: string;
    address: string;
  };
  footerConfig?: FooterConfig;
  onOpenRegistration: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, contactInfo, footerConfig, onOpenRegistration }) => {
  return (
    <footer id="footer" className="bg-gradient-to-br from-blue-900 to-blue-800 text-white relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* Logo & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
               <span className="text-lg font-bold tracking-wider text-orange-500">AquaAgri</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              {footerConfig?.aboutText || "AquaAgri Pathfinder..."}
            </p>
            <div className="flex gap-2 pt-2">
              <a href={footerConfig?.socialLinks.facebook || "#"} className="w-8 h-8 border border-gray-700 flex items-center justify-center hover:bg-blue-600 transition-colors text-gray-400 hover:text-white"><Facebook className="w-3 h-3"/></a>
              <a href={footerConfig?.socialLinks.instagram || "#"} className="w-8 h-8 border border-gray-700 flex items-center justify-center hover:bg-pink-600 transition-colors text-gray-400 hover:text-white"><Instagram className="w-3 h-3"/></a>
            </div>
          </div>

          {/* Matsyagram Map Placeholder */}
          <div className="md:col-span-1">
             <div className="w-full h-32 bg-gray-800 rounded overflow-hidden relative border border-gray-700 group">
                <img src={footerConfig?.matsyagram.mapImageUrl || "https://static-maps.yandex.ru/1.x/?lang=en-US&ll=73.68,24.58&z=10&l=map&size=300,150"} alt="Map" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 bg-black/60 p-1 text-[10px] w-full text-center text-white">View larger map</div>
             </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-base font-bold mb-4 text-white">Information</h4>
            <ul className="space-y-3 text-gray-400 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-orange-500 mt-0.5 shrink-0" />
                <span>{contactInfo?.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                <span>{contactInfo?.phone1}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                <span>{contactInfo?.phone2}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-orange-500 shrink-0" />
                <span>{contactInfo?.email}</span>
              </li>
            </ul>
          </div>

          {/* Matsyagram Info */}
          <div>
             <h4 className="text-base font-bold mb-4 text-white">{footerConfig?.matsyagram.title}</h4>
             <ul className="space-y-3 text-gray-400 text-xs">
               <li className="flex items-start gap-2">
                 <MapPin className="w-3 h-3 text-orange-500 mt-0.5 shrink-0" />
                 <span>{footerConfig?.matsyagram.address}</span>
               </li>
               <li className="flex items-center gap-2">
                 <Phone className="w-3 h-3 text-orange-500 shrink-0" />
                 <span>{footerConfig?.matsyagram.phone}</span>
               </li>
             </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-950 py-4 border-t border-blue-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
          <p>{footerConfig?.copyrightText}</p>
          <div className="flex gap-4 mt-2 md:mt-0 items-center">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button 
                onClick={() => onNavigate && onNavigate(ViewState.ADMIN_LOGIN)} 
                className="flex items-center gap-1 hover:text-orange-500 transition-colors font-medium border border-gray-700 px-2 py-1 rounded"
              >
                <LogIn className="w-3 h-3" />
                Staff Login
              </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Admin Sidebar ---
interface AdminLayoutProps {
  children: React.ReactNode;
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  onLogout: () => void;
  userProfile: UserProfile;
}

interface SidebarNavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  roles: UserRole[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onNavigate, currentView, onLogout, userProfile }) => {
  const allSidebarItems: SidebarNavItem[] = [
    { label: 'Dashboard', path: ViewState.ADMIN_DASHBOARD, icon: <LayoutDashboard className="w-5 h-5" />, roles: ['Admin', 'Editor', 'Student', 'Viewer'] },
    { label: 'Pages', path: ViewState.ADMIN_PAGES, icon: <Layers className="w-5 h-5" />, roles: ['Admin', 'Editor'] },
    { label: 'Projects', path: ViewState.ADMIN_PROJECTS, icon: <FileText className="w-5 h-5" />, roles: ['Admin', 'Editor', 'Viewer'] },
    { label: 'News & Events', path: ViewState.ADMIN_NEWS, icon: <Newspaper className="w-5 h-5" />, roles: ['Admin', 'Editor'] },
    { label: 'Blogs', path: ViewState.ADMIN_BLOGS, icon: <BookOpen className="w-5 h-5" />, roles: ['Admin', 'Editor'] },
    { label: 'Alumni', path: ViewState.ADMIN_ALUMNI, icon: <UserPlus className="w-5 h-5" />, roles: ['Admin', 'Editor'] },
    { label: 'Forms & Inquiries', path: ViewState.ADMIN_FORMS, icon: <ClipboardList className="w-5 h-5" />, roles: ['Admin', 'Editor', 'Student'] },
    { label: 'Website Content', path: ViewState.ADMIN_CONTENT, icon: <Edit className="w-5 h-5" />, roles: ['Admin', 'Editor'] },
    { label: 'Settings', path: ViewState.ADMIN_SETTINGS, icon: <Settings className="w-5 h-5" />, roles: ['Admin'] },
  ];
  
  const sidebarItems = allSidebarItems.filter(item => item.roles.includes(userProfile.role));

  const getHeaderTitle = () => {
    switch (currentView) {
      case ViewState.ADMIN_DASHBOARD: return 'Overview';
      case ViewState.ADMIN_PAGES: return 'Page Manager';
      case ViewState.ADMIN_PROJECTS: return 'Manage Projects';
      case ViewState.ADMIN_NEWS: return 'News & Events';
      case ViewState.ADMIN_BLOGS: return 'Blog Management';
      case ViewState.ADMIN_ALUMNI: return 'Alumni Management';
      case ViewState.ADMIN_CONTENT: return 'Website Content';
      case ViewState.ADMIN_SETTINGS: return 'Account Settings';
      case ViewState.ADMIN_FORMS: return 'Forms & Submissions';
      default: return 'Admin Portal';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">A</div>
          <span className="font-bold tracking-wide">{APP_NAME} Admin</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path as ViewState)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.path 
                  ? 'bg-orange-600 text-white shadow-md' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold overflow-hidden border-2 border-slate-600">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium text-white truncate">{userProfile.name}</p>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-orange-500" />
                <p className="text-xs text-orange-400 truncate">{userProfile.role}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-200 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {getHeaderTitle()}
          </h1>
          <div className="flex items-center gap-4">
             <button className="p-2 text-gray-400 hover:text-gray-600 md:hidden">
               <Menu className="w-6 h-6" />
             </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};