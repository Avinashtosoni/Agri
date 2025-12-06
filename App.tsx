
import React, { useState, useEffect } from 'react';
import { ViewState, Project, UserProfile, SiteContent, BlogPost, NewsEvent, ContactSubmission, RegistrationSubmission, TrainingSubmission, FormDefinition, GenericSubmission, PageContent, AnimationConfig, Alumni } from './types';
import { MOCK_PROJECTS, DEFAULT_SITE_CONTENT, BLOG_POSTS, BLOG_CATEGORIES, MOCK_NEWS, MOCK_CONTACT_SUBMISSIONS, MOCK_REGISTRATIONS, MOCK_TRAINING_SUBMISSIONS, DEFAULT_FORMS, MOCK_PAGES, ALUMNI_LIST } from './constants';
import { PublicHeader, Footer, AdminLayout } from './components/Layout';
import { PublicHome } from './pages/Public';
import { AdminDashboard } from './pages/Admin';
import { Button, Input, Card } from './components/UI';
import { Lock, AlertCircle } from 'lucide-react';

const SiteAnimations: React.FC<{ config?: AnimationConfig }> = ({ config }) => {
  if (!config) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {config.showFish && (
        <>
          {/* Fish 1 */}
          <div
            className="absolute bottom-20 left-0 fish-swim-left opacity-60"
            style={{
              animationDuration: config.fishSpeed === 'slow' ? '60s' : config.fishSpeed === 'fast' ? '20s' : '35s'
            }}
          >
             {/* SVG for Fish */}
             <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M58 32C58 32 48 20 32 20C16 20 10 32 10 32C10 32 16 44 32 44C48 44 58 32 58 32Z" fill="#FF7F27" fillOpacity="0.6"/>
               <path d="M10 32L2 24V40L10 32Z" fill="#FF7F27" fillOpacity="0.6"/>
               <circle cx="46" cy="28" r="2" fill="white"/>
             </svg>
          </div>
          {/* Fish 2 - Swimming right, lower */}
          <div
             className="absolute bottom-40 left-0 fish-swim-right opacity-40"
             style={{
               animationDuration: config.fishSpeed === 'slow' ? '70s' : config.fishSpeed === 'fast' ? '25s' : '45s'
             }}
          >
             <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M58 32C58 32 48 20 32 20C16 20 10 32 10 32C10 32 16 44 32 44C48 44 58 32 58 32Z" fill="#3b1e54" fillOpacity="0.6"/>
               <path d="M10 32L2 24V40L10 32Z" fill="#3b1e54" fillOpacity="0.6"/>
             </svg>
          </div>
        </>
      )}

      {config.showBubbles && (
        <>
           {[...Array(15)].map((_, i) => (
             <div
               key={i}
               className="absolute bottom-[-20px] rounded-full bg-blue-200 border border-blue-300 opacity-30 bubble-rise"
               style={{
                 width: `${Math.random() * 20 + 10}px`,
                 height: `${Math.random() * 20 + 10}px`,
                 left: `${Math.random() * 100}%`,
                 animationDuration: `${Math.random() * 10 + 10}s`, // 10-20s rise time
                 animationDelay: `${Math.random() * 10}s`
               }}
             />
           ))}
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.PUBLIC_HOME);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  
  // Blog State
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [blogCategories, setBlogCategories] = useState<string[]>(BLOG_CATEGORIES);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // News State
  const [news, setNews] = useState<NewsEvent[]>(MOCK_NEWS);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  // Forms State
  const [forms, setForms] = useState<FormDefinition[]>(DEFAULT_FORMS);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(MOCK_CONTACT_SUBMISSIONS);
  const [registrationSubmissions, setRegistrationSubmissions] = useState<RegistrationSubmission[]>(MOCK_REGISTRATIONS);
  const [trainingSubmissions, setTrainingSubmissions] = useState<TrainingSubmission[]>(MOCK_TRAINING_SUBMISSIONS);
  const [genericSubmissions, setGenericSubmissions] = useState<GenericSubmission[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  // Pages State
  const [pages, setPages] = useState<PageContent[]>(MOCK_PAGES);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  // Alumni State
  const [alumni, setAlumni] = useState<Alumni[]>(ALUMNI_LIST);
  const [selectedAlumniId, setSelectedAlumniId] = useState<string | null>(null);

  // Initial Mock Users
  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: 'usr_admin01',
      name: 'Admin User',
      email: 'admin@aquaagri.com',
      role: 'Admin',
      avatar: ''
    },
    {
      id: 'usr_edit01',
      name: 'Dr. Editor',
      email: 'editor@aquaagri.com',
      role: 'Editor',
      avatar: ''
    },
    {
      id: 'usr_view01',
      name: 'Guest Viewer',
      email: 'viewer@aquaagri.com',
      role: 'Viewer',
      avatar: ''
    },
    {
      id: 'usr_student01',
      name: 'John Student',
      email: 'student@aquaagri.com',
      role: 'Student',
      avatar: ''
    }
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>(users[0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Basic Hash Router implementation for SPA behavior without backend
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'projects') setCurrentView(ViewState.PUBLIC_PROJECTS);
      else if (hash === 'contact') setCurrentView(ViewState.PUBLIC_CONTACT);
      else if (hash === 'admin') setCurrentView(ViewState.ADMIN_LOGIN);
      else if (hash === 'dashboard') setCurrentView(ViewState.ADMIN_DASHBOARD);
      else if (hash === 'content') setCurrentView(ViewState.ADMIN_CONTENT);
      else if (hash === 'blogs') setCurrentView(ViewState.ADMIN_BLOGS);
      else if (hash === 'news') setCurrentView(ViewState.ADMIN_NEWS);
      else if (hash === 'forms') setCurrentView(ViewState.ADMIN_FORMS);
      else if (hash === 'pages') setCurrentView(ViewState.ADMIN_PAGES);
      else if (hash === 'alumni') setCurrentView(ViewState.ADMIN_ALUMNI);
      else if (hash === 'alumni-public') setCurrentView(ViewState.PUBLIC_ALUMNI);
      else if (hash === 'settings') setCurrentView(ViewState.ADMIN_SETTINGS);
      else if (hash === 'blog-list') setCurrentView(ViewState.PUBLIC_BLOG_LIST);
      else if (hash.startsWith('blog/')) {
        const id = hash.split('/')[1];
        setSelectedBlogId(id);
        setCurrentView(ViewState.PUBLIC_BLOG_DETAIL);
      }
      else if (hash.startsWith('news/')) {
        const id = hash.split('/')[1];
        setSelectedNewsId(id);
        setCurrentView(ViewState.PUBLIC_NEWS_DETAIL);
      }
      else if (hash.startsWith('form/')) {
        const id = hash.split('/')[1];
        setSelectedFormId(id);
        setCurrentView(ViewState.PUBLIC_FORM);
      }
      else if (hash.startsWith('page/')) {
        // Handle page by ID or Slug
        const param = hash.split('/')[1];
        // Try to find by ID first, then slug
        const page = pages.find(p => p.id === param || p.slug === param);
        if (page) {
          setSelectedPageId(page.id);
          setCurrentView(ViewState.PUBLIC_DYNAMIC_PAGE);
        } else {
          setCurrentView(ViewState.PUBLIC_HOME); // or 404
        }
      }
      else setCurrentView(ViewState.PUBLIC_HOME);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger once on load
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pages]); // Add pages dependency so routing works if pages change

  const navigateTo = (view: ViewState, sectionId?: string, pageId?: string) => {
    // Check if it's a dynamic page
    if (view === ViewState.PUBLIC_DYNAMIC_PAGE && pageId) {
        window.location.hash = `#page/${pageId}`;
        return;
    }

    setCurrentView(view);
    
    // If there is a sectionId, we try to scroll to it
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id);
    navigateTo(ViewState.PUBLIC_BLOG_DETAIL);
  };

  const handleSelectNews = (id: string) => {
    setSelectedNewsId(id);
    navigateTo(ViewState.PUBLIC_NEWS_DETAIL);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo(ViewState.PUBLIC_HOME);
  };

  // --- Handlers ---
  const handleContactSubmit = (data: any) => { /*...*/ }; // kept simple for brevity as logic is in handleGenericSubmit
  const handleRegistrationSubmit = (data: any) => { /*...*/ };
  const handleTrainingSubmit = (data: any) => { /*...*/ };

  const handleGenericSubmit = (formId: string, data: any) => {
    // ... (same as before)
    const form = forms.find(f => f.id === formId);
    if (!form) return;

    const newSubmission: GenericSubmission = {
      id: `sub_${Date.now()}`,
      formId,
      data,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setGenericSubmissions(prev => [newSubmission, ...prev]);
    
    // Legacy mapping if needed
    if (form.name === 'contact') {
        setContactSubmissions(prev => [{id: newSubmission.id, name: data.name, email: data.email, subject: data.subject, message: data.message, date: newSubmission.date, status: 'New'}, ...prev]);
    }
  };

  // Auto Create Page Handler used by Admin Settings
  const handleAutoCreatePage = (title: string, slug: string) => {
      const newPage: PageContent = {
          id: `page_${Date.now()}`,
          title: title,
          slug: slug,
          content: `<h1>${title}</h1><p>Content coming soon...</p>`,
          lastUpdated: new Date().toISOString().split('T')[0],
          status: 'Published'
      };
      setPages(prev => [...prev, newPage]);
      return newPage.id;
  };

  // --- Mock Login Page ---
  const LoginPage = () => {
    // ... (same as before)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      setTimeout(() => {
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
          if (password.length > 0) {
             setUserProfile(foundUser);
             setIsAuthenticated(true);
             setLoading(false);
             navigateTo(ViewState.ADMIN_DASHBOARD);
             return;
          }
        }
        setLoading(false);
        setError('Invalid email or password');
      }, 800); 
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">A</div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to manage projects and research data.</p>
          </div>
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center"><AlertCircle className="w-4 h-4 mr-2" />{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Email Address" type="email" placeholder="admin@aquaagri.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full" isLoading={loading}><Lock className="w-4 h-4 mr-2" /> Sign In</Button>
          </form>
          <div className="mt-6 text-center text-xs text-gray-400">
             <div className="mb-2">Test Accounts:</div>
             <div>admin@aquaagri.com (Admin)</div>
             <div>editor@aquaagri.com (Editor)</div>
             <div>viewer@aquaagri.com (Viewer)</div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-400 border-t pt-4">
            <button onClick={() => navigateTo(ViewState.PUBLIC_HOME)} className="hover:text-blue-600 underline">Back to Public Site</button>
          </div>
        </Card>
      </div>
    );
  };

  // --- Render Logic ---
  const isPublic = [
    ViewState.PUBLIC_HOME, 
    ViewState.PUBLIC_PROJECTS,
    ViewState.PUBLIC_BLOG_LIST,
    ViewState.PUBLIC_BLOG_DETAIL,
    ViewState.PUBLIC_NEWS_DETAIL,
    ViewState.PUBLIC_CONTACT,
    ViewState.PUBLIC_FORM,
    ViewState.PUBLIC_DYNAMIC_PAGE,
    ViewState.PUBLIC_ALUMNI
  ].includes(currentView);

  const isAdminLogin = currentView === ViewState.ADMIN_LOGIN;
  const isAdmin = [
    ViewState.ADMIN_DASHBOARD, 
    ViewState.ADMIN_PROJECTS, 
    ViewState.ADMIN_NEWS,
    ViewState.ADMIN_CONTENT, 
    ViewState.ADMIN_BLOGS,
    ViewState.ADMIN_SETTINGS,
    ViewState.ADMIN_FORMS,
    ViewState.ADMIN_PAGES,
    ViewState.ADMIN_ALUMNI
  ].includes(currentView);

  if (isAdminLogin) return <LoginPage />;

  if (isAdmin) {
    return (
      <AdminLayout 
        onNavigate={navigateTo} 
        currentView={currentView}
        onLogout={handleLogout}
        userProfile={userProfile}
      >
        <AdminDashboard 
          projects={projects} 
          setProjects={setProjects}
          blogs={blogs}
          setBlogs={setBlogs}
          news={news}
          setNews={setNews}
          blogCategories={blogCategories}
          setBlogCategories={setBlogCategories}
          currentView={currentView}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          users={users}
          setUsers={setUsers}
          siteContent={siteContent}
          setSiteContent={setSiteContent}
          contactSubmissions={contactSubmissions}
          setContactSubmissions={setContactSubmissions}
          registrationSubmissions={registrationSubmissions}
          setRegistrationSubmissions={setRegistrationSubmissions}
          trainingSubmissions={trainingSubmissions}
          setTrainingSubmissions={setTrainingSubmissions}
          forms={forms}
          setForms={setForms}
          genericSubmissions={genericSubmissions}
          setGenericSubmissions={setGenericSubmissions}
          pages={pages}
          setPages={setPages}
          alumni={alumni}
          setAlumni={setAlumni}
          onAutoCreatePage={handleAutoCreatePage}
          onNavigate={navigateTo}
        />
      </AdminLayout>
    );
  }

  // Public View
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Site Animations - Overlay but pointer-events-none */}
      <SiteAnimations config={siteContent.animationConfig} />
      
      <PublicHeader 
        onNavigate={navigateTo} 
        currentView={currentView} 
        siteContent={siteContent}
      />
      <main className="flex-grow z-0">
        <PublicHome 
          view={
            currentView === ViewState.PUBLIC_PROJECTS ? 'PROJECTS' : 
            currentView === ViewState.PUBLIC_BLOG_LIST ? 'BLOG_LIST' :
            currentView === ViewState.PUBLIC_BLOG_DETAIL ? 'BLOG_DETAIL' :
            currentView === ViewState.PUBLIC_NEWS_DETAIL ? 'NEWS_DETAIL' :
            currentView === ViewState.PUBLIC_CONTACT ? 'CONTACT' :
            currentView === ViewState.PUBLIC_FORM ? 'PUBLIC_FORM' :
            currentView === ViewState.PUBLIC_DYNAMIC_PAGE ? 'DYNAMIC_PAGE' :
            currentView === ViewState.PUBLIC_ALUMNI ? 'ALUMNI' :
            'HOME'
          }
          projects={projects}
          blogs={blogs}
          news={news}
          blogCategories={blogCategories}
          selectedBlogId={selectedBlogId}
          selectedNewsId={selectedNewsId}
          selectedFormId={selectedFormId}
          selectedPageId={selectedPageId}
          pages={pages}
          alumni={alumni}
          selectedAlumniId={selectedAlumniId}
          onSelectAlumni={(id: string) => setSelectedAlumniId(id)}
          onSelectBlog={handleSelectBlog}
          onSelectNews={handleSelectNews}
          onNavigate={(v: any, s?: string) => {
             // Mapping simple string to enum for public nav helper
             if (v === 'PUBLIC_PROJECTS') navigateTo(ViewState.PUBLIC_PROJECTS, s);
             else if (v === 'PUBLIC_BLOG_LIST') navigateTo(ViewState.PUBLIC_BLOG_LIST, s);
             else if (v === 'PUBLIC_CONTACT') navigateTo(ViewState.PUBLIC_CONTACT, s);
             else if (v === 'PUBLIC_HOME') navigateTo(ViewState.PUBLIC_HOME, s);
             else navigateTo(ViewState.PUBLIC_HOME, s);
          }}
          siteContent={siteContent}
          forms={forms}
          onGenericSubmit={handleGenericSubmit}
        />
      </main>
      <Footer 
        onNavigate={navigateTo} 
        contactInfo={siteContent.contactInfo}
        footerConfig={siteContent.footer}
        onOpenRegistration={() => {
          // Trigger handled internally in PublicHome based on state or other logic
        }} 
      />
    </div>
  );
};

export default App;
