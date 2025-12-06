import React, { useState, useEffect, useRef } from 'react';
import { Project, StatMetric, ViewState, UserProfile, UserRole, SiteContent, BlogPost, Attachment, NewsEvent, ContactSubmission, RegistrationSubmission, TrainingSubmission, FormDefinition, FormField, GenericSubmission, NavItemConfig, NavSubItemConfig, PageContent, Alumni } from '../types';
import { Button, Card, Input, TextArea, Modal, Badge, RichTextEditor, Select } from '../components/UI';
import { CHART_DATA, NEWS_CATEGORIES } from '../constants';
import { generateProjectDescription, suggestProjectTitle } from '../services/geminiService';
import { hasPermission } from '../utils/permissions';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  Plus, 
  Sparkles, 
  Trash2, 
  Edit2, 
  Save,
  Users,
  BookOpen,
  MessageSquare,
  LayoutTemplate,
  FileSpreadsheet,
  ArrowUp,
  ArrowDown,
  Share2,
  Menu,
  Eye,
  EyeOff,
  CornerDownRight,
  X,
  Palette,
  Image as ImageIcon,
  Type,
  Video,
  MapPin,
  Globe,
  Clock,
  Tag,
  AlertCircle
} from 'lucide-react';

// --- Interfaces ---



interface ProjectsListProps {
  projects: Project[];
  userProfile: UserProfile;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

interface BlogManagerProps {
  blogs: BlogPost[];
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  userProfile: UserProfile;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

interface NewsManagerProps {
  news: NewsEvent[];
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  userProfile: UserProfile;
  onEdit: (news: NewsEvent) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

interface ContentManagementProps {
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  userProfile: UserProfile;
}

interface FormsManagerProps {
  forms: FormDefinition[];
  setForms: React.Dispatch<React.SetStateAction<FormDefinition[]>>;
  genericSubmissions: GenericSubmission[];
  contactSubmissions: ContactSubmission[];
  registrationSubmissions: RegistrationSubmission[];
  trainingSubmissions: TrainingSubmission[];
  userProfile: UserProfile;
}

interface SettingsViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onAutoCreatePage: (title: string, slug: string) => string;
}

interface PagesManagerProps {
  pages: PageContent[];
  setPages: React.Dispatch<React.SetStateAction<PageContent[]>>;
  userProfile: UserProfile;
}

interface AlumniManagerProps {
  alumni: Alumni[];
  setAlumni: React.Dispatch<React.SetStateAction<Alumni[]>>;
  userProfile: UserProfile;
}

interface AdminProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  news: NewsEvent[];
  setNews: React.Dispatch<React.SetStateAction<NewsEvent[]>>;
  blogCategories: string[];
  setBlogCategories: React.Dispatch<React.SetStateAction<string[]>>;
  newsCategories?: string[];
  setNewsCategories?: React.Dispatch<React.SetStateAction<string[]>>;
  currentView: ViewState;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  contactSubmissions: ContactSubmission[];
  setContactSubmissions: React.Dispatch<React.SetStateAction<ContactSubmission[]>>;
  registrationSubmissions: RegistrationSubmission[];
  setRegistrationSubmissions: React.Dispatch<React.SetStateAction<RegistrationSubmission[]>>;
  trainingSubmissions: TrainingSubmission[];
  setTrainingSubmissions: React.Dispatch<React.SetStateAction<TrainingSubmission[]>>;
  forms: FormDefinition[];
  setForms: React.Dispatch<React.SetStateAction<FormDefinition[]>>;
  genericSubmissions: GenericSubmission[];
  setGenericSubmissions: React.Dispatch<React.SetStateAction<GenericSubmission[]>>;
  pages: PageContent[];
  setPages: React.Dispatch<React.SetStateAction<PageContent[]>>;
  alumni: Alumni[];
  setAlumni: React.Dispatch<React.SetStateAction<Alumni[]>>;
  onAutoCreatePage: (title: string, slug: string) => string;
  onNavigate?: (view: ViewState, sectionId?: string, pageId?: string) => void;
}

interface AdminDashboardInternalProps extends AdminProps {
  siteContent: SiteContent;
}

// --- Reusable Helper Components ---

const CategoryManager: React.FC<{
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  title?: string;
}> = ({ categories, setCategories, title = "Categories" }) => {
  const [newCat, setNewCat] = useState("");

  const handleAdd = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat("");
    }
  };

  const handleDelete = (cat: string) => {
    if (confirm(`Delete category "${cat}"?`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  return (
    <Card className="p-4 h-full">
      <h3 className="font-bold text-gray-900 mb-3">{title}</h3>
      <div className="flex gap-2 mb-4">
        <Input 
          value={newCat} 
          onChange={e => setNewCat(e.target.value)} 
          placeholder="New Category" 
          className="h-9 text-sm"
        />
        <Button size="sm" onClick={handleAdd} icon={<Plus className="w-3 h-3"/>}>Add</Button>
      </div>
      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        {categories.map(cat => (
          <div key={cat} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm border border-gray-100">
            <span>{cat}</span>
            <button onClick={() => handleDelete(cat)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-3 h-3"/>
            </button>
          </div>
        ))}
        {categories.length === 0 && <div className="text-xs text-gray-400 italic text-center">No categories defined.</div>}
      </div>
    </Card>
  );
};

// --- Sub-Views Implementation ---

interface DashboardOverviewProps {
  siteContent: SiteContent;
  contactSubmissions: ContactSubmission[];
  projects: Project[];
  blogs: BlogPost[];
  trainingSubmissions: TrainingSubmission[];
  userProfile: UserProfile;
  onNavigate?: (view: ViewState) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ siteContent, contactSubmissions, projects, blogs, trainingSubmissions, userProfile, onNavigate }) => {
  const newContactsCount = contactSubmissions.filter(s => s.status === 'New').length;
  const totalProjectsCount = projects.length;
  const publishedBlogsCount = blogs.filter(b => b.status === 'Published').length;
  const newTrainingCount = trainingSubmissions.filter(s => s.status === 'New').length;
  
  const isAdmin = userProfile.role === 'Admin';
  const isEditor = userProfile.role === 'Editor';
  const isStudent = userProfile.role === 'Student';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome, {userProfile.name}!</h2>
        <p className="text-blue-100">Role: {userProfile.role} | {userProfile.email}</p>
      </div>
      
      {/* Analytics Cards */}
      {(isAdmin || isEditor) && (
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Operational Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <Card className="p-6 flex items-center justify-between border-l-4 border-blue-500">
              <div><p className="text-sm font-medium text-gray-500 mb-1">New Inquiries</p><h4 className="text-2xl font-bold text-gray-900">{newContactsCount}</h4></div>
              <div className="p-3 rounded-full bg-blue-50 text-blue-600"><MessageSquare className="w-6 h-6" /></div>
           </Card>
           <Card className="p-6 flex items-center justify-between border-l-4 border-orange-500">
              <div><p className="text-sm font-medium text-gray-500 mb-1">Total Projects</p><h4 className="text-2xl font-bold text-gray-900">{totalProjectsCount}</h4></div>
              <div className="p-3 rounded-full bg-orange-50 text-orange-600"><LayoutTemplate className="w-6 h-6" /></div>
           </Card>
           <Card className="p-6 flex items-center justify-between border-l-4 border-green-500">
              <div><p className="text-sm font-medium text-gray-500 mb-1">Published Blogs</p><h4 className="text-2xl font-bold text-gray-900">{publishedBlogsCount}</h4></div>
              <div className="p-3 rounded-full bg-green-50 text-green-600"><BookOpen className="w-6 h-6" /></div>
           </Card>
           <Card className="p-6 flex items-center justify-between border-l-4 border-purple-500">
              <div><p className="text-sm font-medium text-gray-500 mb-1">New Registrations</p><h4 className="text-2xl font-bold text-gray-900">{newTrainingCount}</h4></div>
              <div className="p-3 rounded-full bg-purple-50 text-purple-600"><Users className="w-6 h-6" /></div>
           </Card>
        </div>
      </div>
      )}
      
      {isStudent && (
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-2">Available Forms</h4>
              <p className="text-sm text-gray-600">Access training registration and inquiry forms</p>
              <Button size="sm" className="mt-4" onClick={() => onNavigate?.(ViewState.ADMIN_FORMS)}>View Forms</Button>
            </Card>
            <Card className="p-6">
              <h4 className="font-bold text-gray-900 mb-2">Projects</h4>
              <p className="text-sm text-gray-600">Browse {totalProjectsCount} research projects</p>
              <Button size="sm" className="mt-4" onClick={() => onNavigate?.(ViewState.ADMIN_PROJECTS)}>View Projects</Button>
            </Card>
          </div>
        </div>
      )}

      {/* Public Metrics */}
      {(isAdmin || isEditor) && (
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Public Site Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.stats.map((stat, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
                {stat.change && <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.change}</span>}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </Card>
          ))}
        </div>
      </div>
      )}

      {/* Charts */}
      {isAdmin && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Website Traffic</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Research</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb"/>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="active" fill="#0f766e" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      )}
    </div>
  );
};

const ProjectsList: React.FC<ProjectsListProps & { siteContent: SiteContent }> = ({ projects, userProfile, onEdit, onDelete, onAdd, siteContent }) => {
  const canCreate = hasPermission('projects.create', userProfile.role, siteContent);
  const canEdit = hasPermission('projects.edit', userProfile.role, siteContent);
  const canDelete = hasPermission('projects.delete', userProfile.role, siteContent);
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-bold text-gray-900">Research Projects</h2><p className="text-sm text-gray-500">Manage ongoing and completed research.</p></div>
        {canCreate && <Button onClick={onAdd} icon={<Plus className="w-4 h-4"/>}>Add Project</Button>}
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
              <tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Category</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Date</th><th className="px-6 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[300px] truncate">{p.title}</td>
                  <td className="px-6 py-4"><Badge color="blue">{p.category}</Badge></td>
                  <td className="px-6 py-4"><Badge color={p.status === 'Ongoing' ? 'green' : p.status === 'Completed' ? 'gray' : 'yellow'}>{p.status}</Badge></td>
                  <td className="px-6 py-4 text-gray-500">{p.date}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {canEdit && <button onClick={() => onEdit(p)} className="text-blue-500 hover:text-blue-700"><Edit2 className="w-4 h-4"/></button>}
                    {canDelete && <button onClick={() => onDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>}
                  </td>
                </tr>
              ))}
              {projects.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No projects found.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const BlogManager: React.FC<BlogManagerProps & { siteContent: SiteContent }> = ({ blogs, userProfile, onEdit, onDelete, onAdd, categories, setCategories, siteContent }) => {
   const canCreate = hasPermission('blogs.create', userProfile.role, siteContent);
   const canEdit = hasPermission('blogs.edit', userProfile.role, siteContent);
   const canDelete = hasPermission('blogs.delete', userProfile.role, siteContent);
   const [showCats, setShowCats] = useState(false);

   return (
    <div className="flex gap-6 h-full animate-in fade-in">
       <div className="flex-1 space-y-6">
         <div className="flex justify-between items-center">
            <div><h2 className="text-xl font-bold text-gray-900">Blog Management</h2><p className="text-sm text-gray-500">Manage articles and publications.</p></div>
            <div className="flex gap-2">{canEdit && <Button variant="outline" onClick={() => setShowCats(!showCats)} icon={<Type className="w-4 h-4"/>}>{showCats ? 'Hide Categories' : 'Manage Categories'}</Button>}{canCreate && <Button onClick={onAdd} icon={<Plus className="w-4 h-4"/>}>Write Article</Button>}</div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
               <Card key={blog.id} className="flex flex-col h-full group hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-100 relative overflow-hidden">
                    <img src={blog.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Blog"/>
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded bg-white/90 ${blog.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}`}>{blog.status}</span>
                    {blog.isFeatured && (
                      <span className="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded bg-orange-500 text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3"/> Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                     <div className="mb-2">
                       <Badge color="blue" className="mr-2">{blog.category}</Badge>
                       <span className="text-xs text-gray-400">{blog.readTime || '3 min read'}</span>
                     </div>
                     <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{blog.title}</h3>
                     <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                       <span className="text-xs text-gray-400">{blog.date}</span>
                       <div className="flex gap-2">
                         {canEdit && (
                           <button onClick={() => onEdit(blog)} className="p-1 hover:bg-gray-100 rounded text-blue-600">
                             <Edit2 className="w-4 h-4"/>
                           </button>
                         )}
                         {canDelete && (
                           <button onClick={() => onDelete(blog.id)} className="p-1 hover:bg-gray-100 rounded text-red-600">
                             <Trash2 className="w-4 h-4"/>
                           </button>
                         )}
                       </div>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
       </div>
       {showCats && <div className="w-72 shrink-0 animate-in slide-in-from-right"><CategoryManager categories={categories} setCategories={setCategories} title="Blog Categories" /></div>}
    </div>
   );
};

const NewsManager: React.FC<NewsManagerProps & { siteContent: SiteContent }> = ({ news, userProfile, onEdit, onDelete, onAdd, categories, setCategories, siteContent }) => {
   const canCreate = hasPermission('news.create', userProfile.role, siteContent);
   const canEdit = hasPermission('news.edit', userProfile.role, siteContent);
   const canDelete = hasPermission('news.delete', userProfile.role, siteContent);
   const [showCats, setShowCats] = useState(false);

   return (
    <div className="flex gap-6 h-full animate-in fade-in">
       <div className="flex-1 space-y-6">
           <div className="flex justify-between items-center">
              <div><h2 className="text-xl font-bold text-gray-900">News & Events</h2><p className="text-sm text-gray-500">Manage announcements.</p></div>
              <div className="flex gap-2">{canEdit && <Button variant="outline" onClick={() => setShowCats(!showCats)} icon={<Type className="w-4 h-4"/>}>{showCats ? 'Hide Categories' : 'Manage Categories'}</Button>}{canCreate && <Button onClick={onAdd} icon={<Plus className="w-4 h-4"/>}>Add News</Button>}</div>
           </div>
           <div className="space-y-4">
              {news.map(item => (
                 <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex gap-4 items-start hover:border-blue-300 transition-colors">
                     <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative border border-gray-100">
                       {item.imageUrl ? (
                         <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.title}/>
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-300">
                           <ImageIcon className="w-8 h-8"/>
                         </div>
                       )}
                       {item.isFeatured && (
                         <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white text-[9px] text-center py-0.5 font-bold uppercase">
                           Featured
                         </div>
                       )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge color="gray">{item.category || 'General'}</Badge>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base mb-1 truncate">{item.title}</h3>
                        <div className="text-sm text-gray-500 mb-2 line-clamp-2">{item.content.replace(/<[^>]*>?/gm, '')}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {item.date}</span>
                          {item.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {item.location}</span>}
                          {item.videoUrl && <span className="flex items-center gap-1 text-blue-500"><Video className="w-3 h-3"/> Video Attached</span>}
                        </div>
                     </div>
                     {(canEdit || canDelete) && (
                       <div className="flex flex-col gap-2 border-l pl-4 border-gray-100">
                         {canEdit && (
                           <button onClick={() => onEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                             <Edit2 className="w-4 h-4"/>
                           </button>
                         )}
                         {canDelete && (
                           <button onClick={() => onDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100">
                             <Trash2 className="w-4 h-4"/>
                           </button>
                         )}
                       </div>
                     )}
                 </div>
              ))}
           </div>
       </div>
       {showCats && <div className="w-72 shrink-0 animate-in slide-in-from-right"><CategoryManager categories={categories} setCategories={setCategories} title="News Categories" /></div>}
    </div>
   );
};

const FormsManager: React.FC<FormsManagerProps> = ({ forms, setForms, genericSubmissions, contactSubmissions, registrationSubmissions, trainingSubmissions, userProfile }) => {
    const canEdit = userProfile.role === 'Admin' || userProfile.role === 'Editor';
    const [activeFormId, setActiveFormId] = useState<string>(forms.length > 0 ? forms[0].id : '');
    const [viewMode, setViewMode] = useState<'Submissions' | 'Settings'>('Submissions');
    const [editingForm, setEditingForm] = useState<FormDefinition | null>(null);
    const [newField, setNewField] = useState<Partial<FormField>>({ type: 'text', required: true, width: 'full' });
    const [viewData, setViewData] = useState<any | null>(null);
    const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
    const [newFormName, setNewFormName] = useState({ title: '', description: '' });

    const activeForm = forms.find(f => f.id === activeFormId);

    useEffect(() => {
      if (activeForm) {
        setEditingForm(JSON.parse(JSON.stringify(activeForm)));
      }
    }, [activeFormId, forms]);

    const getSubmissionsForActiveForm = () => {
      if (!activeForm) return [];
      const generic = genericSubmissions.filter(s => s.formId === activeForm.id);
      let legacy: any[] = [];
      if (activeForm.name === 'contact') legacy = contactSubmissions;
      else if (activeForm.name === 'registration') legacy = registrationSubmissions;
      else if (activeForm.name === 'training') legacy = trainingSubmissions;

      const legacyTransformed = legacy.map(item => {
        const { id, date, status, ...data } = item;
        return { id, formId: activeForm.id, date, status, data } as GenericSubmission;
      });

      return [...legacyTransformed, ...generic].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const currentSubmissions = getSubmissionsForActiveForm();

    const handleCreateForm = () => {
      if (!newFormName.title) return;
      const id = `form_${Date.now()}`;
      const newForm: FormDefinition = {
        id,
        name: id,
        title: newFormName.title,
        description: newFormName.description,
        fields: []
      };
      setForms([...forms, newForm]);
      setActiveFormId(id);
      setViewMode('Settings');
      setIsAddFormModalOpen(false);
      setNewFormName({ title: '', description: '' });
    };

    const handleSaveFormStructure = () => {
      if (!editingForm) return;
      setForms(prev => prev.map(f => f.id === editingForm.id ? editingForm : f));
      alert("Form structure saved successfully!");
    };

    const handleAddField = () => {
      if (!editingForm || !newField.label) return;
      const field: FormField = {
        id: `fld_${Date.now()}`,
        label: newField.label,
        type: newField.type || 'text',
        required: !!newField.required,
        options: newField.options ? (newField.options as any).split(',').map((s: string) => s.trim()) : undefined,
        placeholder: newField.placeholder,
        width: newField.width || 'full'
      };
      setEditingForm({ ...editingForm, fields: [...editingForm.fields, field] });
      setNewField({ type: 'text', required: true, label: '', options: [], placeholder: '', width: 'full' });
    };

    const handleDeleteField = (fieldId: string) => {
      if (!editingForm) return;
      setEditingForm({ ...editingForm, fields: editingForm.fields.filter(f => f.id !== fieldId) });
    };

    const moveField = (index: number, direction: 'up' | 'down') => {
      if (!editingForm) return;
      const newFields = [...editingForm.fields];
      if (direction === 'up') {
        if (index === 0) return;
        [newFields[index - 1], newFields[index]] = [newFields[index], newFields[index - 1]];
      } else {
        if (index === newFields.length - 1) return;
        [newFields[index + 1], newFields[index]] = [newFields[index], newFields[index + 1]];
      }
      setEditingForm({ ...editingForm, fields: newFields });
    };

    const handleDeleteForm = () => {
      if (!activeForm || activeForm.isSystem) return;
      if (confirm(`Are you sure you want to delete form "${activeForm.title}"? This action cannot be undone.`)) {
        setForms(prev => prev.filter(f => f.id !== activeForm.id));
        if (forms.length > 1) setActiveFormId(forms[0].id);
        else setActiveFormId('');
      }
    };

    const exportToExcel = () => {
      if (currentSubmissions.length === 0) { alert("No data to export."); return; }
      const flatData = currentSubmissions.map(sub => ({ id: sub.id, date: sub.date, status: sub.status, ...sub.data }));
      const headers = Object.keys(flatData[0]);
      const csvContent = [
        headers.join(','),
        ...flatData.map(row => headers.map(fieldName => `"${String((row as any)[fieldName] || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${activeForm?.title}_submissions_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    };

    const handleShareForm = () => {
      if (!activeForm) return;
      const url = `${window.location.origin}/#form/${activeForm.id}`;
      navigator.clipboard.writeText(url).then(() => { alert("Public form link copied to clipboard!\n" + url); });
    };

    return (
      <div className="space-y-6 animate-in fade-in">
         <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Forms & Inquiries</h2>
              <p className="text-sm text-gray-500">Manage forms, customize fields, and view submissions.</p>
            </div>
            {canEdit && (
              <Button onClick={() => setIsAddFormModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2"/> Add New Form
              </Button>
            )}
         </div>
         {/* Form Tabs */}
         <div className="border-b border-gray-200 flex gap-6 overflow-x-auto pb-1">
            {forms.map(form => (
              <button 
                key={form.id}
                onClick={() => { setActiveFormId(form.id); setViewMode('Submissions'); }}
                className={`pb-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeFormId === form.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {form.title}
              </button>
            ))}
         </div>
         {/* Sub-toolbar */}
         <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
            <div className="flex gap-2">
               <button 
                 onClick={() => setViewMode('Submissions')}
                 className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${viewMode === 'Submissions' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
               >
                 Submissions
               </button>
               <button 
                 onClick={() => setViewMode('Settings')}
                 className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${viewMode === 'Settings' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:bg-gray-200'}`}
               >
                 Form Settings & Fields
               </button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" icon={<Share2 className="w-3 h-3"/>} onClick={handleShareForm}>Share Link</Button>
              {viewMode === 'Submissions' && <Button size="sm" variant="outline" icon={<FileSpreadsheet className="w-3 h-3"/>} onClick={exportToExcel}>Export CSV</Button>}
            </div>
         </div>
         
         {viewMode === 'Submissions' && activeForm && (
            <Card className="overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                     <tr>
                       <th className="px-6 py-3 w-32">Date</th>
                       <th className="px-6 py-3 w-32">Status</th>
                       {activeForm.fields.slice(0, 3).map(f => (<th key={f.id} className="px-6 py-3">{f.label}</th>))}
                       <th className="px-6 py-3 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {currentSubmissions.map(sub => (
                        <tr key={sub.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setViewData(sub)}>
                          <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{sub.date}</td>
                          <td className="px-6 py-4"><Badge color={sub.status === 'New' || sub.status === 'Pending' ? 'green' : 'gray'}>{sub.status}</Badge></td>
                          {activeForm.fields.slice(0, 3).map(f => (<td key={f.id} className="px-6 py-4 max-w-xs truncate">{typeof sub.data[f.id] === 'object' ? JSON.stringify(sub.data[f.id]) : sub.data[f.id]}</td>))}
                          <td className="px-6 py-4 text-right"><Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setViewData(sub); }}>View</Button></td>
                        </tr>
                      ))}
                      {currentSubmissions.length === 0 && <tr><td colSpan={10} className="p-8 text-center text-gray-500">No submissions found.</td></tr>}
                   </tbody>
                 </table>
               </div>
            </Card>
         )}
         {viewMode === 'Settings' && editingForm && canEdit && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4 h-fit">
                 <h3 className="font-bold text-gray-900 border-b pb-2">General Configuration</h3>
                 <Input label="Form Title" value={editingForm.title} onChange={e => setEditingForm({...editingForm, title: e.target.value})}/>
                 <TextArea label="Description" value={editingForm.description || ''} onChange={e => setEditingForm({...editingForm, description: e.target.value})}/>
                 <Input label="Submit Button Text" value={editingForm.submitButtonText || 'Submit'} onChange={e => setEditingForm({...editingForm, submitButtonText: e.target.value})}/>
                 <div className="pt-4 border-t flex flex-col gap-2">
                    <Button onClick={handleSaveFormStructure} icon={<Save className="w-4 h-4"/>}>Save Changes</Button>
                    {!editingForm.isSystem && <Button variant="danger" onClick={handleDeleteForm} icon={<Trash2 className="w-4 h-4"/>}>Delete Form</Button>}
                 </div>
              </Card>
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h3 className="font-bold text-gray-900 border-b pb-2 mb-4">Form Fields & Layout</h3>
                  <div className="space-y-3 mb-6">
                    {editingForm.fields.map((field, idx) => (
                       <div key={field.id} className="flex flex-col md:flex-row items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group">
                          <div className="flex md:flex-col gap-1">
                             <button onClick={() => moveField(idx, 'up')} className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30" disabled={idx === 0}><ArrowUp className="w-3 h-3"/></button>
                             <button onClick={() => moveField(idx, 'down')} className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30" disabled={idx === editingForm.fields.length - 1}><ArrowDown className="w-3 h-3"/></button>
                          </div>
                          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-3">
                             <input className="bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-sm font-medium w-full" value={field.label} onChange={(e) => { const newFields = [...editingForm.fields]; newFields[idx].label = e.target.value; setEditingForm({...editingForm, fields: newFields}); }} placeholder="Field Label"/>
                             <div className="text-xs text-gray-500 flex items-center bg-white px-2 rounded border border-gray-200 h-8">Type: <span className="font-semibold ml-1">{field.type}</span></div>
                             <select className="bg-white border border-gray-200 text-xs rounded px-2 h-8 focus:outline-none focus:ring-1 focus:ring-blue-500" value={field.width || 'full'} onChange={(e) => { const newFields = [...editingForm.fields]; newFields[idx].width = e.target.value as any; setEditingForm({...editingForm, fields: newFields}); }}><option value="full">Full Width</option><option value="half">1/2 Width</option><option value="third">1/3 Width</option></select>
                             <div className="flex items-center gap-2"><input type="checkbox" checked={field.required} onChange={(e) => { const newFields = [...editingForm.fields]; newFields[idx].required = e.target.checked; setEditingForm({...editingForm, fields: newFields}); }}/><label className="text-xs text-gray-600">Required</label></div>
                          </div>
                          <button onClick={() => handleDeleteField(field.id)} className="text-gray-400 hover:text-red-500 p-2 md:p-1 rounded self-end md:self-center"><Trash2 className="w-4 h-4"/></button>
                       </div>
                    ))}
                    {editingForm.fields.length === 0 && <div className="text-gray-400 text-center py-4 italic">No fields added yet.</div>}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                     <h4 className="text-sm font-bold text-blue-900 mb-3">Add New Field</h4>
                     <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
                        <div className="md:col-span-2"><Input placeholder="Field Label (e.g. Age)" value={newField.label} onChange={e => setNewField({...newField, label: e.target.value})}/></div>
                        <Select value={newField.type} onChange={e => setNewField({...newField, type: e.target.value as any})} options={['text', 'email', 'textarea', 'number', 'select', 'date', 'tel']}/>
                        <Select value={newField.width || 'full'} onChange={e => setNewField({...newField, width: e.target.value as any})} options={[{ label: 'Full Width', value: 'full' }, { label: '1/2 Width', value: 'half' }, { label: '1/3 Width', value: 'third' }]}/>
                        <div className="flex items-center justify-center"><label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"><input type="checkbox" checked={newField.required} onChange={e => setNewField({...newField, required: e.target.checked})}/> Required</label></div>
                     </div>
                     {newField.type === 'select' && <div className="mb-3"><Input placeholder="Options (comma separated, e.g. Red, Blue, Green)" value={typeof newField.options === 'string' ? newField.options : ''} onChange={e => setNewField({...newField, options: e.target.value as any})}/></div>}
                     <Button size="sm" onClick={handleAddField} disabled={!newField.label} icon={<Plus className="w-4 h-4"/>}>Add Field</Button>
                  </div>
                </Card>
              </div>
           </div>
         )}
         {/* Modals for Forms */}
         <Modal isOpen={isAddFormModalOpen} onClose={() => setIsAddFormModalOpen(false)} title="Create New Form">
            <div className="space-y-4">
               <Input label="Form Title" placeholder="e.g. Student Survey" value={newFormName.title} onChange={e => setNewFormName({...newFormName, title: e.target.value})}/>
               <TextArea label="Description" placeholder="Purpose of this form..." value={newFormName.description} onChange={e => setNewFormName({...newFormName, description: e.target.value})}/>
               <div className="flex justify-end pt-4 gap-2"><Button variant="ghost" onClick={() => setIsAddFormModalOpen(false)}>Cancel</Button><Button onClick={handleCreateForm} disabled={!newFormName.title}>Create Form</Button></div>
            </div>
         </Modal>
         <Modal isOpen={!!viewData} onClose={() => setViewData(null)} title="Submission Details">
           <div className="space-y-4">
             {viewData && (
                <>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded mb-4"><span className="text-sm text-gray-500">Submitted on: <strong>{viewData.date}</strong></span><Badge>{viewData.status}</Badge></div>
                  {activeForm?.fields.map(field => (<div key={field.id} className="border-b border-gray-100 pb-2 last:border-0"><span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{field.label}</span><div className="text-sm text-gray-900 break-words whitespace-pre-wrap">{String(viewData.data?.[field.id] || viewData[field.id] || '-')}</div></div>))}
                  {Object.keys(viewData.data || viewData).map(key => { if (['id', 'formId', 'date', 'status', 'data'].includes(key)) return null; if (activeForm?.fields.find(f => f.id === key)) return null; return (<div key={key} className="border-b border-gray-100 pb-2 last:border-0"><span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{key}</span><div className="text-sm text-gray-900 break-words whitespace-pre-wrap">{String(viewData[key] || '-')}</div></div>); })}
                </>
             )}
             <div className="flex justify-end pt-4"><Button variant="ghost" onClick={() => setViewData(null)}>Close</Button></div>
           </div>
         </Modal>
      </div>
    );
};

const AlumniManager: React.FC<AlumniManagerProps & { siteContent: SiteContent }> = ({ alumni, setAlumni, userProfile, siteContent }) => {
   const canCreate = hasPermission('alumni.create', userProfile.role, siteContent);
   const canEdit = hasPermission('alumni.edit', userProfile.role, siteContent);
   const canDelete = hasPermission('alumni.delete', userProfile.role, siteContent);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
   const [formData, setFormData] = useState<Partial<Alumni>>({});
   
   const handleEdit = (alum: Alumni) => { setEditingAlumni(alum); setFormData(alum); setIsModalOpen(true); };
   const handleDelete = (id: string) => { if (confirm("Delete alumni?")) setAlumni(prev => prev.filter(a => a.id !== id)); };
   const handleAdd = () => { setEditingAlumni(null); setFormData({ status: 'Published' }); setIsModalOpen(true); };
   const handleSave = () => {
     if (!formData.name || !formData.batch || !formData.degree) return;
     if (editingAlumni) {
       setAlumni(prev => prev.map(a => a.id === editingAlumni.id ? { ...a, ...formData } as Alumni : a));
     } else {
       const newAlumni: Alumni = { id: `a_${Date.now()}`, imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg', ...formData as any };
       setAlumni(prev => [...prev, newAlumni]);
     }
     setIsModalOpen(false);
   };

   return (
       <div className="space-y-6 animate-in fade-in">
           <div className="flex justify-between items-center"><div><h2 className="text-xl font-bold text-gray-900">Alumni Management</h2><p className="text-sm text-gray-500">Manage alumni profiles and achievements.</p></div>{canCreate && <Button onClick={handleAdd} icon={<Plus className="w-4 h-4"/>}>Add Alumni</Button>}</div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumni.map(alum => (
                 <Card key={alum.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                       <img src={alum.imageUrl} alt={alum.name} className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                       <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{alum.name}</h3>
                          <p className="text-sm text-gray-500">Batch: {alum.batch}</p>
                          <Badge color={alum.status === 'Published' ? 'green' : 'yellow'} className="mt-1">{alum.status}</Badge>
                       </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                       <p className="font-medium text-gray-700">{alum.degree}</p>
                       {alum.currentPosition && <p>{alum.currentPosition}{alum.company && ` at ${alum.company}`}</p>}
                       {alum.location && <p className="text-xs text-gray-400">{alum.location}</p>}
                    </div>
                    {(canEdit || canDelete) && (
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        {canEdit && (
                          <button className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded text-sm" onClick={() => handleEdit(alum)}>
                            <Edit2 className="w-4 h-4 inline mr-1"/>Edit
                          </button>
                        )}
                        {canDelete && (
                          <button className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded text-sm" onClick={() => handleDelete(alum.id)}>
                            <Trash2 className="w-4 h-4 inline mr-1"/>Delete
                          </button>
                        )}
                      </div>
                    )}
                 </Card>
              ))}
              {alumni.length === 0 && <div className="col-span-full text-center text-gray-500 py-12">No alumni records found.</div>}
           </div>
           <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAlumni ? "Edit Alumni" : "Add Alumni"}>
              <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <Input label="Full Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <Input label="Batch Year" value={formData.batch || ''} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="2020" required />
                 </div>
                 <Input label="Degree/Certificate" value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="Certificate in Ornamental Fish Culture" required />
                 <div className="grid grid-cols-2 gap-4">
                    <Input label="Current Position" value={formData.currentPosition || ''} onChange={e => setFormData({...formData, currentPosition: e.target.value})} placeholder="Aquarium Technician" />
                    <Input label="Company" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company Name" />
                 </div>
                 <Input label="Location" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, State" />
                 <div className="grid grid-cols-2 gap-4">
                    <Input label="Email" type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <Input label="Phone" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
                 </div>
                 <Input label="LinkedIn URL" value={formData.linkedIn || ''} onChange={e => setFormData({...formData, linkedIn: e.target.value})} placeholder="https://linkedin.com/in/username" />
                 <Input label="Photo URL" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." />
                 <TextArea label="Achievements" value={formData.achievements || ''} onChange={e => setFormData({...formData, achievements: e.target.value})} rows={3} placeholder="Notable achievements and contributions..." />
                 <Select label="Status" value={formData.status || 'Published'} onChange={e => setFormData({...formData, status: e.target.value as any})} options={['Published', 'Draft']} />
                 <div className="pt-4 flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button onClick={handleSave} disabled={!formData.name || !formData.batch || !formData.degree}>Save</Button></div>
              </div>
           </Modal>
       </div>
   );
};

const PagesManager: React.FC<PagesManagerProps & { siteContent: SiteContent }> = ({ pages, setPages, userProfile, siteContent }) => {
   const canCreate = hasPermission('pages.create', userProfile.role, siteContent);
   const canEdit = hasPermission('pages.edit', userProfile.role, siteContent);
   const canDelete = hasPermission('pages.delete', userProfile.role, siteContent);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingPage, setEditingPage] = useState<PageContent | null>(null);
   const [formData, setFormData] = useState<Partial<PageContent>>({});
   const handleEdit = (page: PageContent) => { setEditingPage(page); setFormData(page); setIsModalOpen(true); };
   const handleDelete = (id: string) => { if (confirm("Delete page?")) setPages(prev => prev.filter(p => p.id !== id)); };
   const handleSave = () => { if (!formData.title || !formData.content) return; const timestamp = new Date().toISOString().split('T')[0]; if (editingPage) setPages(prev => prev.map(p => p.id === editingPage.id ? { ...p, ...formData, lastUpdated: timestamp } as PageContent : p)); else { const newPage: PageContent = { id: `page_${Date.now()}`, slug: formData.title!.toLowerCase().replace(/ /g, '-'), lastUpdated: timestamp, status: 'Published', ...formData as any }; setPages(prev => [...prev, newPage]); } setIsModalOpen(false); };

   return (
       <div className="space-y-6 animate-in fade-in">
           <div className="flex justify-between items-center"><div><h2 className="text-xl font-bold text-gray-900">Custom Pages</h2><p className="text-sm text-gray-500">Manage content for dynamic pages.</p></div>{canCreate && <Button onClick={() => { setEditingPage(null); setFormData({ status: 'Published' }); setIsModalOpen(true); }} icon={<Plus className="w-4 h-4"/>}>Create Page</Button>}</div>
           <Card className="overflow-hidden"><table className="w-full text-sm text-left"><thead className="bg-gray-50 text-gray-500 font-medium border-b"><tr><th className="px-6 py-3">Title</th><th className="px-6 py-3">Slug</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Last Updated</th><th className="px-6 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{pages.map(page => (<tr key={page.id} className="hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">{page.title}</td><td className="px-6 py-4 text-gray-500 font-mono text-xs">{page.slug}</td><td className="px-6 py-4"><Badge color={page.status === 'Published' ? 'green' : 'yellow'}>{page.status}</Badge></td><td className="px-6 py-4 text-gray-500 text-right">{page.lastUpdated}</td><td className="px-6 py-4 text-right">{(canEdit || canDelete) && (<div className="flex justify-end gap-2">{canEdit && <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEdit(page)}><Edit2 className="w-4 h-4"/></button>}{canDelete && <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(page.id)}><Trash2 className="w-4 h-4"/></button>}</div>)}</td></tr>))}{pages.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-gray-500">No custom pages found.</td></tr>}</tbody></table></Card>
           <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPage ? "Edit Page" : "New Page"}><div className="space-y-4"><Input label="Page Title" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})}/><Input label="URL Slug" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})}/><Select label="Status" value={formData.status || 'Published'} onChange={e => setFormData({...formData, status: e.target.value as any})} options={['Published', 'Draft']}/><div><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><RichTextEditor value={formData.content || ''} onChange={val => setFormData({...formData, content: val})} /></div><div className="pt-4 flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button onClick={handleSave}>Save Page</Button></div></div></Modal>
       </div>
   );
};

const ContentManagementView: React.FC<ContentManagementProps> = ({ siteContent, setSiteContent, userProfile }) => {
  const canEdit = userProfile.role === 'Admin' || userProfile.role === 'Editor';
  const hasWriteAccess = canEdit;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = () => { setIsConfirmOpen(true); };

  const handleConfirmSave = () => {
      setIsConfirmOpen(false);
      setIsSaving(true);
      setTimeout(() => {
          setIsSaving(false);
          alert("Website content configuration has been saved successfully.");
      }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
       <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-900">Website Content</h2>{hasWriteAccess && <Button onClick={handleSaveClick} icon={<Save className="w-4 h-4"/>} isLoading={isSaving}>Save Changes</Button>}</div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card className="p-6 space-y-4">
           <h3 className="font-bold border-b pb-2">Header Configuration</h3>
           <Input label="Site Title" value={siteContent.header.title} onChange={e => hasWriteAccess && setSiteContent({...siteContent, header: {...siteContent.header, title: e.target.value}})} disabled={!hasWriteAccess} />
           <Input label="Subtitle" value={siteContent.header.subtitle} onChange={e => hasWriteAccess && setSiteContent({...siteContent, header: {...siteContent.header, subtitle: e.target.value}})} disabled={!hasWriteAccess} />
           <Input label="Hindi Name" value={siteContent.header.hindiName} onChange={e => hasWriteAccess && setSiteContent({...siteContent, header: {...siteContent.header, hindiName: e.target.value}})} disabled={!hasWriteAccess} />
           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Type</label>
                <div className="flex items-center gap-4 mt-2">
                   <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={!siteContent.header.showLogoImage} onChange={() => hasWriteAccess && setSiteContent({...siteContent, header: {...siteContent.header, showLogoImage: false}})} disabled={!hasWriteAccess} /><span className="text-sm">Text</span></label>
                   <label className="flex items-center gap-2 cursor-pointer"><input type="radio" checked={siteContent.header.showLogoImage} onChange={() => hasWriteAccess && setSiteContent({...siteContent, header: {...siteContent.header, showLogoImage: true}})} disabled={!hasWriteAccess} /><span className="text-sm">Image</span></label>
                </div>
             </div>
           </div>
         </Card>

         {/* President's Message Config */}
         <Card className="p-6 space-y-4">
           <h3 className="font-bold border-b pb-2">President's Message</h3>
           <Input label="Title" value={siteContent.presidentMessage.title} onChange={e => hasWriteAccess && setSiteContent({...siteContent, presidentMessage: {...siteContent.presidentMessage, title: e.target.value}})} disabled={!hasWriteAccess} />
           <TextArea label="Message Text" value={siteContent.presidentMessage.text} onChange={e => hasWriteAccess && setSiteContent({...siteContent, presidentMessage: {...siteContent.presidentMessage, text: e.target.value}})} rows={4} disabled={!hasWriteAccess} />
           <Input label="Image URL" value={siteContent.presidentMessage.imageUrl} onChange={e => hasWriteAccess && setSiteContent({...siteContent, presidentMessage: {...siteContent.presidentMessage, imageUrl: e.target.value}})} disabled={!hasWriteAccess} placeholder="https://..." icon={<ImageIcon className="w-4 h-4 text-gray-400"/>} />
           <Input label="Button Text" value={siteContent.presidentMessage.buttonText} onChange={e => hasWriteAccess && setSiteContent({...siteContent, presidentMessage: {...siteContent.presidentMessage, buttonText: e.target.value}})} disabled={!hasWriteAccess} />
           <Input label="Mission Diagram/Image URL" value={siteContent.presidentMessage.missionImageUrl || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, presidentMessage: {...siteContent.presidentMessage, missionImageUrl: e.target.value}})} disabled={!hasWriteAccess} placeholder="Optional: Replace CSS diagram with image" icon={<ImageIcon className="w-4 h-4 text-gray-400"/>} />
         </Card>

         <Card className="p-6 space-y-4">
           <h3 className="font-bold border-b pb-2">Announcements</h3>
           <TextArea label="Ticker Text" value={siteContent.tickerText} onChange={e => hasWriteAccess && setSiteContent({...siteContent, tickerText: e.target.value})} rows={3} disabled={!hasWriteAccess} />
         </Card>

         <Card className="p-6 space-y-4">
           <h3 className="font-bold border-b pb-2">WhatsApp Button</h3>
           <div className="flex items-center gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={siteContent.whatsappConfig?.enabled ?? true} onChange={(e) => hasWriteAccess && setSiteContent({...siteContent, whatsappConfig: {...(siteContent.whatsappConfig || {phoneNumber: ''}), enabled: e.target.checked}})} disabled={!hasWriteAccess} /><span className="text-sm font-medium text-gray-700">Enable Floating Button</span></label></div>
           <Input label="WhatsApp Number" value={siteContent.whatsappConfig?.phoneNumber || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, whatsappConfig: {...(siteContent.whatsappConfig || {enabled: true}), phoneNumber: e.target.value}})} disabled={!hasWriteAccess} placeholder="e.g. 919876543210" />
         </Card>

         <Card className="p-6 space-y-4 lg:col-span-2">
           <h3 className="font-bold border-b pb-2">Contact Information</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Phone 1" value={siteContent.contactInfo.phone1} onChange={e => hasWriteAccess && setSiteContent({...siteContent, contactInfo: {...siteContent.contactInfo, phone1: e.target.value}})} disabled={!hasWriteAccess} />
              <Input label="Phone 2" value={siteContent.contactInfo.phone2} onChange={e => hasWriteAccess && setSiteContent({...siteContent, contactInfo: {...siteContent.contactInfo, phone2: e.target.value}})} disabled={!hasWriteAccess} />
              <Input label="Email" value={siteContent.contactInfo.email} onChange={e => hasWriteAccess && setSiteContent({...siteContent, contactInfo: {...siteContent.contactInfo, email: e.target.value}})} disabled={!hasWriteAccess} />
              <Input label="Address" value={siteContent.contactInfo.address} onChange={e => hasWriteAccess && setSiteContent({...siteContent, contactInfo: {...siteContent.contactInfo, address: e.target.value}})} disabled={!hasWriteAccess} />
           </div>
         </Card>

         <Card className="p-6 space-y-4 lg:col-span-2">
           <h3 className="font-bold border-b pb-2">Footer Configuration</h3>
           <div className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">About Text (Footer Intro)</label>
                 <TextArea value={siteContent.footer?.aboutText || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: { ...siteContent.footer, aboutText: e.target.value }})} rows={3} disabled={!hasWriteAccess} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">Social Links</h4>
                    <Input label="Facebook URL" value={siteContent.footer?.socialLinks.facebook || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, socialLinks: {...siteContent.footer.socialLinks, facebook: e.target.value}}})} disabled={!hasWriteAccess} />
                    <Input label="Instagram URL" value={siteContent.footer?.socialLinks.instagram || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, socialLinks: {...siteContent.footer.socialLinks, instagram: e.target.value}}})} disabled={!hasWriteAccess} />
                    <Input label="Twitter URL" value={siteContent.footer?.socialLinks.twitter || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, socialLinks: {...siteContent.footer.socialLinks, twitter: e.target.value}}})} disabled={!hasWriteAccess} />
                    <Input label="YouTube URL" value={siteContent.footer?.socialLinks.youtube || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, socialLinks: {...siteContent.footer.socialLinks, youtube: e.target.value}}})} disabled={!hasWriteAccess} />
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">Matsyagram Center</h4>
                    <Input label="Title" value={siteContent.footer?.matsyagram.title || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, matsyagram: {...siteContent.footer.matsyagram, title: e.target.value}}})} disabled={!hasWriteAccess} />
                    <Input label="Phone" value={siteContent.footer?.matsyagram.phone || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, matsyagram: {...siteContent.footer.matsyagram, phone: e.target.value}}})} disabled={!hasWriteAccess} />
                    <TextArea label="Address" value={siteContent.footer?.matsyagram.address || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, matsyagram: {...siteContent.footer.matsyagram, address: e.target.value}}})} rows={2} disabled={!hasWriteAccess} />
                    <Input label="Map Image URL" value={siteContent.footer?.matsyagram.mapImageUrl || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, matsyagram: {...siteContent.footer.matsyagram, mapImageUrl: e.target.value}}})} disabled={!hasWriteAccess} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">Member Area</h4>
                    <Input label="Section Title" value={siteContent.footer?.memberArea.title || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, memberArea: {...siteContent.footer.memberArea, title: e.target.value}}})} disabled={!hasWriteAccess} />
                    <Input label="Description Text" value={siteContent.footer?.memberArea.text || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, memberArea: {...siteContent.footer.memberArea, text: e.target.value}}})} disabled={!hasWriteAccess} />
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-900">Footer Bottom</h4>
                    <Input label="Copyright Text" value={siteContent.footer?.copyrightText || ''} onChange={e => hasWriteAccess && setSiteContent({...siteContent, footer: {...siteContent.footer, copyrightText: e.target.value}})} disabled={!hasWriteAccess} />
                 </div>
              </div>
           </div>
         </Card>
       </div>
       <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Confirm Save"><div className="space-y-4"><p>Save changes to public site?</p><div className="flex justify-end gap-2 pt-4"><Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>Cancel</Button><Button onClick={handleConfirmSave}>Confirm</Button></div></div></Modal>
    </div>
  );
};

// --- Image Upload Component ---
const ImageUpload: React.FC<{
  label: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
}> = ({ label, currentUrl, onUpload, onRemove }) => {
  const [url, setUrl] = useState(currentUrl || '');
  const [preview, setPreview] = useState(currentUrl || '');

  const handleUrlSubmit = () => {
    if (url) {
      onUpload(url);
      setPreview(url);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {preview && (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="h-24 w-auto rounded border border-gray-300" />
          {onRemove && (
            <button
              onClick={() => { setPreview(''); setUrl(''); onRemove(); }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={handleUrlSubmit}>Upload</Button>
      </div>
    </div>
  );
};

// --- SettingsView ---
const SettingsView: React.FC<SettingsViewProps> = ({ userProfile, setUserProfile, siteContent, setSiteContent, onAutoCreatePage }) => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState<NavItemConfig | null>(null);
    const [newItemData, setNewItemData] = useState<Partial<NavItemConfig>>({ label: '', view: ViewState.PUBLIC_HOME, isVisible: true, subItems: [], backgroundColor: '' });
    const [autoCreatePage, setAutoCreatePage] = useState(false);
    
    const allRoles: UserRole[] = ['Admin', 'Editor', 'Student', 'Viewer'];
    const features = [
      { key: 'projects.create', name: 'Create Projects' },
      { key: 'projects.edit', name: 'Edit Projects' },
      { key: 'projects.delete', name: 'Delete Projects' },
      { key: 'blogs.create', name: 'Create Blogs' },
      { key: 'blogs.edit', name: 'Edit Blogs' },
      { key: 'blogs.delete', name: 'Delete Blogs' },
      { key: 'news.create', name: 'Create News' },
      { key: 'news.edit', name: 'Edit News' },
      { key: 'news.delete', name: 'Delete News' },
      { key: 'alumni.create', name: 'Create Alumni' },
      { key: 'alumni.edit', name: 'Edit Alumni' },
      { key: 'alumni.delete', name: 'Delete Alumni' },
      { key: 'pages.create', name: 'Create Pages' },
      { key: 'pages.edit', name: 'Edit Pages' },
      { key: 'pages.delete', name: 'Delete Pages' },
      { key: 'forms.create', name: 'Create Forms' },
      { key: 'forms.edit', name: 'Edit Forms' },
      { key: 'forms.view', name: 'View Forms' },
      { key: 'content.edit', name: 'Edit Content' },
      { key: 'settings.view', name: 'View Settings' },
      { key: 'settings.edit', name: 'Edit Settings' }
    ];
    
    const togglePermission = (feature: string, role: UserRole) => {
      const current = siteContent.accessControl?.permissions[feature] || [];
      const updated = current.includes(role) ? current.filter(r => r !== role) : [...current, role];
      setSiteContent({
        ...siteContent,
        accessControl: {
          permissions: {
            ...siteContent.accessControl?.permissions,
            [feature]: updated
          }
        }
      });
    };

    const handleEditMenuClick = (item: NavItemConfig) => { setEditingMenuItem(item); setNewItemData(item); setAutoCreatePage(false); setIsMenuModalOpen(true); };
    const handleAddMenuClick = () => { setEditingMenuItem(null); setNewItemData({ label: '', view: ViewState.PUBLIC_HOME, isVisible: true, subItems: [], backgroundColor: '' }); setAutoCreatePage(false); setIsMenuModalOpen(true); };
    const handleSaveMenuItem = () => {
        if (!newItemData.label) return;
        let finalPageId = newItemData.pageId;
        if (autoCreatePage && newItemData.label) {
           const slug = newItemData.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
           finalPageId = onAutoCreatePage(newItemData.label, slug);
           newItemData.view = ViewState.PUBLIC_DYNAMIC_PAGE;
        }
        if (editingMenuItem) {
            const updatedItems = siteContent.navItems.map(item => item.id === editingMenuItem.id ? { ...item, ...newItemData, pageId: finalPageId } as NavItemConfig : item);
            setSiteContent({ ...siteContent, navItems: updatedItems });
        } else {
            const newItem: NavItemConfig = { ...newItemData as NavItemConfig, id: `nav_${Date.now()}`, subItems: newItemData.subItems || [], pageId: finalPageId };
            setSiteContent({ ...siteContent, navItems: [...siteContent.navItems, newItem] });
        }
        setIsMenuModalOpen(false);
    };
    const handleMoveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...siteContent.navItems];
        if (direction === 'up') { if (index === 0) return; [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]; } 
        else { if (index === newItems.length - 1) return; [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]]; }
        setSiteContent({ ...siteContent, navItems: newItems });
    };
    const handleDeleteMenuItem = (id: string) => { if (confirm("Delete?")) setSiteContent({ ...siteContent, navItems: siteContent.navItems.filter(item => item.id !== id) }); };
    const handleAddSubItem = () => { setNewItemData({ ...newItemData, subItems: [...(newItemData.subItems || []), { id: `sub_${Date.now()}`, label: 'New Sub Item', view: ViewState.PUBLIC_HOME }] }); };
    const handleRemoveSubItem = (subId: string) => { setNewItemData({ ...newItemData, subItems: (newItemData.subItems || []).filter(s => s.id !== subId) }); };
    const handleSubItemChange = (subId: string, field: keyof NavSubItemConfig, value: string) => { setNewItemData({ ...newItemData, subItems: (newItemData.subItems || []).map(s => s.id === subId ? { ...s, [field]: value } : s) }); };

    return (
    <div className="space-y-6 animate-in fade-in">
       <h2 className="text-xl font-bold text-gray-900">Settings</h2>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="p-6"><h3 className="font-bold border-b pb-2 mb-4">Site Identity & Theme</h3><div className="space-y-4">
                 <Input label="Site Title" value={siteContent.header.title} onChange={e => setSiteContent({...siteContent, header: {...siteContent.header, title: e.target.value}})} />
                 <ImageUpload
                   label="Logo Image"
                   currentUrl={siteContent.header.logoUrl}
                   onUpload={(url) => setSiteContent({...siteContent, header: {...siteContent.header, logoUrl: url, showLogoImage: true}})}
                   onRemove={() => setSiteContent({...siteContent, header: {...siteContent.header, logoUrl: '', showLogoImage: false}})}
                 />
                 <ImageUpload
                   label="Header Background Image"
                   currentUrl={siteContent.header.backgroundImageUrl}
                   onUpload={(url) => setSiteContent({...siteContent, header: {...siteContent.header, backgroundImageUrl: url}})}
                   onRemove={() => setSiteContent({...siteContent, header: {...siteContent.header, backgroundImageUrl: ''}})}
                 />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Primary Color" type="color" value={siteContent.theme?.primaryColor || '#FF7F27'} onChange={e => setSiteContent({...siteContent, theme: {...(siteContent.theme || { primaryColor: '', secondaryColor: '', headerBackgroundColor: '' }), primaryColor: e.target.value}})} className="h-10 p-1 cursor-pointer"/>
                    <Input label="Ticker Color" type="color" value={siteContent.theme?.secondaryColor || '#3b1e54'} onChange={e => setSiteContent({...siteContent, theme: {...(siteContent.theme || { primaryColor: '', secondaryColor: '', headerBackgroundColor: '' }), secondaryColor: e.target.value}})} className="h-10 p-1 cursor-pointer"/>
                    <Input label="Header BG" type="color" value={siteContent.theme?.headerBackgroundColor || '#ffffff'} onChange={e => setSiteContent({...siteContent, theme: {...(siteContent.theme || { primaryColor: '', secondaryColor: '', headerBackgroundColor: '' }), headerBackgroundColor: e.target.value}})} className="h-10 p-1 cursor-pointer"/>
                 </div>
              </div></Card>
            <Card className="p-6">
              <h3 className="font-bold border-b pb-2 mb-4">Visual Effects</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Swimming Fish</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={siteContent.animationConfig?.showFish ?? true}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        animationConfig: { ...siteContent.animationConfig!, showFish: e.target.checked }
                      })}
                      className="toggle-checkbox h-5 w-5"
                    />
                    <span className="text-sm text-gray-500">{siteContent.animationConfig?.showFish ? 'On' : 'Off'}</span>
                  </div>
                </div>
                {siteContent.animationConfig?.showFish && (
                  <Select
                    label="Fish Speed"
                    value={siteContent.animationConfig?.fishSpeed || 'normal'}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      animationConfig: { ...siteContent.animationConfig!, fishSpeed: e.target.value as any }
                    })}
                    options={['slow', 'normal', 'fast']}
                  />
                )}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Rising Bubbles</label>
                  <div className="flex items-center gap-2">
                     <input
                      type="checkbox"
                      checked={siteContent.animationConfig?.showBubbles ?? true}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        animationConfig: { ...siteContent.animationConfig!, showBubbles: e.target.checked }
                      })}
                      className="toggle-checkbox h-5 w-5"
                    />
                    <span className="text-sm text-gray-500">{siteContent.animationConfig?.showBubbles ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>
            </Card>
           <Card className="p-6"><h3 className="font-bold border-b pb-2 mb-4">User Profile</h3><div className="space-y-4">
                 <Input label="Display Name" value={userProfile.name} onChange={e => setUserProfile({...userProfile, name: e.target.value})} />
                 <Input label="Email Address" value={userProfile.email} onChange={e => setUserProfile({...userProfile, email: e.target.value})} />
                 <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><div className="px-3 py-2 bg-gray-100 rounded border border-gray-200 text-gray-600 text-sm">{userProfile.role} (Cannot be changed)</div></div>
                 <div className="pt-4 flex justify-end"><Button>Save Profile</Button></div>
              </div></Card>
           <Card className="p-6 lg:col-span-2"><div className="flex justify-between items-center border-b pb-2 mb-4"><h3 className="font-bold">Navigation Menu</h3><Button size="sm" onClick={handleAddMenuClick} icon={<Plus className="w-3 h-3"/>}>Add Item</Button></div>
              <div className="space-y-2">
                  {siteContent.navItems.map((item, idx) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100 group">
                          <div className="flex items-center gap-3">
                              <div className="flex flex-col gap-0.5"><button onClick={() => handleMoveItem(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-20"><ArrowUp className="w-3 h-3"/></button><button onClick={() => handleMoveItem(idx, 'down')} disabled={idx === siteContent.navItems.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-20"><ArrowDown className="w-3 h-3"/></button></div>
                              <Menu className="w-4 h-4 text-gray-400" /><div className="flex items-center gap-2">{item.backgroundColor && <div className="w-4 h-4 rounded border border-gray-300 shadow-sm" style={{backgroundColor: item.backgroundColor}}></div>}<div><div className="font-medium text-sm text-gray-800">{item.label}</div><div className="text-xs text-gray-500 flex items-center gap-2"><span>Target: {item.view}</span>{item.subItems && item.subItems.length > 0 && (<Badge color="gray">{item.subItems.length} Sub-items</Badge>)}</div></div></div>
                          </div>
                          <div className="flex items-center gap-2"><button onClick={() => { const updated = siteContent.navItems.map(i => i.id === item.id ? {...i, isVisible: !i.isVisible} : i); setSiteContent({...siteContent, navItems: updated}); }} className="text-gray-400 hover:text-gray-600" title="Toggle Visibility">{item.isVisible ? <Eye className="w-4 h-4"/> : <EyeOff className="w-4 h-4"/>}</button><button onClick={() => handleEditMenuClick(item)} className="text-blue-500 hover:text-blue-700 p-1"><Edit2 className="w-4 h-4"/></button><button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4"/></button></div>
                      </div>
                  ))}
              </div>
           </Card>
           
           {userProfile.role === 'Admin' && (
             <Card className="p-6 lg:col-span-2">
               <h3 className="font-bold border-b pb-2 mb-4">Access Control</h3>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                   <thead className="bg-gray-50 border-b">
                     <tr>
                       <th className="px-4 py-3 text-left font-medium text-gray-700">Feature Name</th>
                       {allRoles.map(role => (
                         <th key={role} className="px-4 py-3 text-center font-medium text-gray-700">{role}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody className="divide-y">
                     {features.map(feature => (
                       <tr key={feature.key} className="hover:bg-gray-50">
                         <td className="px-4 py-3 text-gray-900">{feature.name}</td>
                         {allRoles.map(role => (
                           <td key={role} className="px-4 py-3 text-center">
                             <input
                               type="checkbox"
                               checked={siteContent.accessControl?.permissions[feature.key]?.includes(role) || false}
                               onChange={() => togglePermission(feature.key, role)}
                               className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                             />
                           </td>
                         ))}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-800">
                 <strong>Note:</strong> Changes to permissions will affect user access across the application. Admin role always has full access.
               </div>
             </Card>
           )}
       </div>
       <Modal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} title={editingMenuItem ? "Edit Menu Item" : "Add Menu Item"}>
            <div className="space-y-4">
                <Input label="Label" value={newItemData.label} onChange={e => setNewItemData({...newItemData, label: e.target.value})} placeholder="e.g. Home"/>
                <div className="grid grid-cols-2 gap-4"><Select label="Target View" value={newItemData.view} onChange={e => setNewItemData({...newItemData, view: e.target.value})} options={Object.values(ViewState)} disabled={autoCreatePage} />
                    <Input label="Background Color (Hex)" value={newItemData.backgroundColor || ''} onChange={e => setNewItemData({...newItemData, backgroundColor: e.target.value})} placeholder="#FF0000" icon={<Palette className="w-4 h-4 text-gray-400" />}/>
                </div>
                {!editingMenuItem && (<div className="bg-blue-50 p-3 rounded border border-blue-100 flex items-center gap-3"><input type="checkbox" id="auto-create-page" checked={autoCreatePage} onChange={(e) => { setAutoCreatePage(e.target.checked); if(e.target.checked) setNewItemData({...newItemData, view: ViewState.PUBLIC_DYNAMIC_PAGE}); }}/><div><label htmlFor="auto-create-page" className="text-sm font-bold text-blue-900 block">Auto-create new page</label><p className="text-xs text-blue-700">Automatically creates a new content page.</p></div></div>)}
                <div className="grid grid-cols-2 gap-4"><Input label="Section ID (Optional)" value={newItemData.sectionId || ''} onChange={e => setNewItemData({...newItemData, sectionId: e.target.value})} placeholder="e.g. contact-section"/><Input label="Link to Page ID" value={newItemData.pageId || ''} onChange={e => setNewItemData({...newItemData, pageId: e.target.value})} placeholder="page_123" disabled={autoCreatePage}/></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={newItemData.isVisible} onChange={e => setNewItemData({...newItemData, isVisible: e.target.checked})} id="menu-visible"/><label htmlFor="menu-visible" className="text-sm text-gray-700 font-medium">Visible in Menu</label></div>
                <div className="border-t pt-4 mt-2"><div className="flex justify-between items-center mb-2"><label className="text-sm font-bold text-gray-700">Sub-Items</label><button onClick={handleAddSubItem} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3"/> Add Sub-item</button></div><div className="space-y-2 max-h-40 overflow-y-auto pr-1">{newItemData.subItems?.map((sub) => (<div key={sub.id} className="flex gap-2 items-center bg-gray-50 p-2 rounded"><CornerDownRight className="w-4 h-4 text-gray-400 shrink-0" /><div className="flex-1 grid grid-cols-2 gap-2"><input className="text-xs border rounded px-2 py-1" value={sub.label} onChange={(e) => handleSubItemChange(sub.id, 'label', e.target.value)} placeholder="Label"/><select className="text-xs border rounded px-2 py-1" value={sub.view} onChange={(e) => handleSubItemChange(sub.id, 'view', e.target.value)}>{Object.values(ViewState).map(v => <option key={v} value={v}>{v}</option>)}</select></div><button onClick={() => handleRemoveSubItem(sub.id)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button></div>))}</div></div>
                <div className="flex justify-end gap-2 pt-4 border-t mt-4"><Button variant="ghost" onClick={() => setIsMenuModalOpen(false)}>Cancel</Button><Button onClick={handleSaveMenuItem} disabled={!newItemData.label}>Save Item</Button></div>
            </div>
       </Modal>
    </div>
    );
};

// ... (Main AdminDashboard Component)
export const AdminDashboard: React.FC<AdminProps> = ({ 
  projects, setProjects, 
  blogs, setBlogs, 
  news, setNews,
  blogCategories, setBlogCategories,
  newsCategories: propNewsCategories, setNewsCategories: propSetNewsCategories, 
  currentView, 
  userProfile, setUserProfile, 
  users, setUsers, 
  siteContent, setSiteContent,
  contactSubmissions, setContactSubmissions,
  registrationSubmissions, setRegistrationSubmissions,
  trainingSubmissions, setTrainingSubmissions,
  forms, setForms,
  genericSubmissions, setGenericSubmissions,
  pages, setPages,
  alumni, setAlumni,
  onAutoCreatePage,
  onNavigate
}) => {
  const [localNewsCats, setLocalNewsCats] = useState<string[]>(NEWS_CATEGORIES);
  const activeNewsCategories = propNewsCategories || localNewsCats;
  const setActiveNewsCategories = propSetNewsCategories || setLocalNewsCats;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({ title: '', category: 'Research', description: '', status: 'Upcoming', author: userProfile.name });

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({});
  const [blogTags, setBlogTags] = useState<string>('');

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [newsFormData, setNewsFormData] = useState<Partial<NewsEvent>>({});

  const canEdit = userProfile.role === 'Admin' || userProfile.role === 'Editor';

  const handleAIGenerate = async () => { if (!formData.title || !formData.category) return; setIsGenerating(true); try { const refinedTitle = await suggestProjectTitle(formData.title); const desc = await generateProjectDescription(refinedTitle, formData.category as string); setFormData(prev => ({ ...prev, title: refinedTitle, description: desc })); } finally { setIsGenerating(false); } };
  const handleEditProject = (project: Project) => { setFormData(project); setIsModalOpen(true); };
  const handleAddProject = () => { setFormData({ title: '', category: 'Research', description: '', status: 'Upcoming', author: userProfile.name }); setIsModalOpen(true); };
  const handleSaveProject = () => { if (!formData.title || !formData.description) return; if (formData.id) { setProjects(prev => prev.map(p => p.id === formData.id ? { ...p, ...formData } as Project : p)); } else { const newProject: Project = { id: Date.now().toString(), title: formData.title, category: formData.category as any, description: formData.description, status: formData.status as any, author: userProfile.name, date: new Date().toISOString().split('T')[0], imageUrl: `https://picsum.photos/800/600?random=${Date.now()}` }; setProjects(prev => [newProject, ...prev]); } setIsModalOpen(false); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setProjects(prev => prev.filter(p => p.id !== id)); };

  const handleEditBlog = (blog: BlogPost) => { setBlogFormData(blog); setBlogTags(blog.tags ? blog.tags.join(', ') : ''); setIsBlogModalOpen(true); };
  const handleAddBlog = () => { setBlogFormData({ status: 'Draft', author: userProfile.name, category: blogCategories[0] }); setBlogTags(''); setIsBlogModalOpen(true); };
  const handleSaveBlog = () => { if (!blogFormData.title || !blogFormData.content) return; const newBlog = { ...blogFormData, id: blogFormData.id || `b_${Date.now()}`, date: blogFormData.date || new Date().toISOString().split('T')[0], views: blogFormData.views || 0, comments: blogFormData.comments || [], imageUrl: blogFormData.imageUrl || 'https://picsum.photos/800/600', author: blogFormData.author || userProfile.name, status: blogFormData.status || 'Draft', tags: blogTags.split(',').map(t => t.trim()).filter(t => t), readTime: blogFormData.readTime || '5 min read' } as BlogPost; if (blogFormData.id) setBlogs(prev => prev.map(b => b.id === blogFormData.id ? newBlog : b)); else setBlogs(prev => [newBlog, ...prev]); setIsBlogModalOpen(false); setBlogFormData({}); };
  const handleDeleteBlog = (id: string) => { if(confirm("Delete?")) setBlogs(prev => prev.filter(b => b.id !== id)); };

  const handleEditNews = (newsItem: NewsEvent) => { setNewsFormData(newsItem); setIsNewsModalOpen(true); };
  const handleAddNews = () => { setNewsFormData({ status: 'Draft', category: activeNewsCategories[0] }); setIsNewsModalOpen(true); };
  const handleSaveNews = () => { if (!newsFormData.title || !newsFormData.content) return; const newNews = { ...newsFormData, id: newsFormData.id || `n_${Date.now()}`, date: newsFormData.date || new Date().toISOString().split('T')[0], status: newsFormData.status || 'Draft', imageUrl: newsFormData.imageUrl || 'https://picsum.photos/800/600', category: newsFormData.category || 'General' } as NewsEvent; if (newsFormData.id) setNews(prev => prev.map(n => n.id === newsFormData.id ? newNews : n)); else setNews(prev => [newNews, ...prev]); setIsNewsModalOpen(false); setNewsFormData({}); };
  const handleDeleteNews = (id: string) => { if(confirm("Delete?")) setNews(prev => prev.filter(n => n.id !== id)); };

  let content;
  if (currentView === ViewState.ADMIN_PROJECTS) content = <ProjectsList projects={projects} userProfile={userProfile} siteContent={siteContent} onEdit={handleEditProject} onDelete={handleDelete} onAdd={handleAddProject} />;
  else if (currentView === ViewState.ADMIN_BLOGS) content = <BlogManager blogs={blogs} categories={blogCategories} setCategories={setBlogCategories} userProfile={userProfile} siteContent={siteContent} onEdit={handleEditBlog} onDelete={handleDeleteBlog} onAdd={handleAddBlog} />;
  else if (currentView === ViewState.ADMIN_NEWS) content = <NewsManager news={news} categories={activeNewsCategories} setCategories={setActiveNewsCategories} userProfile={userProfile} siteContent={siteContent} onEdit={handleEditNews} onDelete={handleDeleteNews} onAdd={handleAddNews} />;
  else if (currentView === ViewState.ADMIN_SETTINGS) content = <SettingsView userProfile={userProfile} setUserProfile={setUserProfile} siteContent={siteContent} setSiteContent={setSiteContent} onAutoCreatePage={onAutoCreatePage} />;
  else if (currentView === ViewState.ADMIN_CONTENT) content = <ContentManagementView siteContent={siteContent} setSiteContent={setSiteContent} userProfile={userProfile} />;
  else if (currentView === ViewState.ADMIN_FORMS) content = <FormsManager forms={forms} setForms={setForms} genericSubmissions={genericSubmissions} contactSubmissions={contactSubmissions} registrationSubmissions={registrationSubmissions} trainingSubmissions={trainingSubmissions} userProfile={userProfile} />;
  else if (currentView === ViewState.ADMIN_PAGES) content = <PagesManager pages={pages} setPages={setPages} userProfile={userProfile} siteContent={siteContent} />;
  else if (currentView === ViewState.ADMIN_ALUMNI) content = <AlumniManager alumni={alumni || []} setAlumni={setAlumni} userProfile={userProfile} siteContent={siteContent} />;
  else content = <DashboardOverview siteContent={siteContent} contactSubmissions={contactSubmissions} projects={projects} blogs={blogs} trainingSubmissions={trainingSubmissions} userProfile={userProfile} onNavigate={onNavigate} />;

  return (
    <>
      {content}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={formData.id ? "Edit Research Project" : "Create New Research Project"}>
        <div className="space-y-4">
          <Input label="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} disabled={!canEdit} />
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value as any})} disabled={!canEdit}><option value="Research">Research</option><option value="Training">Training</option><option value="Workshop">Workshop</option><option value="Outreach">Outreach</option></select></div>
             <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} disabled={!canEdit}><option value="Upcoming">Upcoming</option><option value="Ongoing">Ongoing</option><option value="Completed">Completed</option></select></div>
          </div>
          <div><div className="flex justify-between items-center mb-1"><label className="block text-sm font-medium text-gray-700">Abstract / Description</label>{canEdit && <button onClick={handleAIGenerate} disabled={isGenerating || !formData.title} className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"><Sparkles className="w-3 h-3" /> {isGenerating ? 'Generating...' : 'Generate with AI'}</button>}</div><TextArea rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} disabled={!canEdit} /></div>
          <div className="pt-4 flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>{canEdit && <Button onClick={handleSaveProject} disabled={!formData.title}>Save</Button>}</div>
        </div>
      </Modal>
      <Modal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)} title={blogFormData.id ? "Edit Article" : "New Article"}>
        <div className="flex flex-col gap-6 md:flex-row">
           <div className="flex-1 space-y-4">
               <Input label="Article Title" value={blogFormData.title || ''} onChange={e => setBlogFormData({...blogFormData, title: e.target.value})} placeholder="Enter a catchy title..." />
               <div><label className="block text-sm font-medium text-gray-700 mb-1">Short Excerpt</label><TextArea rows={2} value={blogFormData.excerpt || ''} onChange={e => setBlogFormData({...blogFormData, excerpt: e.target.value})} placeholder="Summary for card view..." /></div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><RichTextEditor value={blogFormData.content || ''} onChange={val => setBlogFormData({...blogFormData, content: val})} className="h-64" /></div>
               <div className="pt-4 border-t border-gray-100"><h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><Globe className="w-4 h-4"/> SEO Settings</h4><div className="space-y-3"><Input label="Meta Title (Optional)" value={blogFormData.seoTitle || ''} onChange={e => setBlogFormData({...blogFormData, seoTitle: e.target.value})} placeholder="Title for search engines" /><TextArea label="Meta Description" value={blogFormData.seoDescription || ''} onChange={e => setBlogFormData({...blogFormData, seoDescription: e.target.value})} rows={2} placeholder="Description for search results..." /></div></div>
           </div>
           <div className="w-full md:w-80 shrink-0 space-y-5 border-l border-gray-100 pl-0 md:pl-6">
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Publishing</label><Select label="Status" value={blogFormData.status || 'Draft'} onChange={e => setBlogFormData({...blogFormData, status: e.target.value as any})} options={['Draft', 'Published']} /><div className="mt-2"><Input type="date" label="Publish Date" value={blogFormData.date || ''} onChange={e => setBlogFormData({...blogFormData, date: e.target.value})} /></div></div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Organization</label><Select label="Category" value={blogFormData.category || ''} onChange={e => setBlogFormData({...blogFormData, category: e.target.value})} options={blogCategories} /><div className="mt-2"><Input label="Tags (comma separated)" value={blogTags} onChange={e => setBlogTags(e.target.value)} placeholder="e.g. Tech, News, Tips" icon={<Tag className="w-4 h-4 text-gray-400"/>} /></div></div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Featured Image</label><Input value={blogFormData.imageUrl || ''} onChange={e => setBlogFormData({...blogFormData, imageUrl: e.target.value})} placeholder="https://..." icon={<ImageIcon className="w-4 h-4 text-gray-400"/>} />{blogFormData.imageUrl && <img src={blogFormData.imageUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded border border-gray-200" />}</div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Settings</label><div className="flex items-center gap-2"><input type="checkbox" id="feat-blog" checked={blogFormData.isFeatured || false} onChange={e => setBlogFormData({...blogFormData, isFeatured: e.target.checked})} /><label htmlFor="feat-blog" className="text-sm text-gray-700">Mark as Featured</label></div><div className="mt-2"><Input label="Read Time" value={blogFormData.readTime || ''} onChange={e => setBlogFormData({...blogFormData, readTime: e.target.value})} placeholder="e.g. 5 min" /></div></div>
           </div>
        </div>
        <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsBlogModalOpen(false)}>Cancel</Button><Button onClick={handleSaveBlog}>Save Article</Button></div>
      </Modal>
      <Modal isOpen={isNewsModalOpen} onClose={() => setIsNewsModalOpen(false)} title={newsFormData.id ? "Edit News Item" : "Add News"}>
        <div className="flex flex-col gap-6 md:flex-row">
           <div className="flex-1 space-y-4">
               <Input label="Headline" value={newsFormData.title || ''} onChange={e => setNewsFormData({...newsFormData, title: e.target.value})} placeholder="News headline..." />
               <div><label className="block text-sm font-medium text-gray-700 mb-1">Details / Content</label><RichTextEditor value={newsFormData.content || ''} onChange={val => setNewsFormData({...newsFormData, content: val})} className="h-64" /></div>
           </div>
           <div className="w-full md:w-80 shrink-0 space-y-5 border-l border-gray-100 pl-0 md:pl-6">
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Publishing</label><Select label="Status" value={newsFormData.status || 'Draft'} onChange={e => setNewsFormData({...newsFormData, status: e.target.value as any})} options={['Draft', 'Published']} /><div className="mt-2"><Input type="date" label="Date" value={newsFormData.date || ''} onChange={e => setNewsFormData({...newsFormData, date: e.target.value})} /></div></div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Classification</label><Select label="Category" value={newsFormData.category || ''} onChange={e => setNewsFormData({...newsFormData, category: e.target.value})} options={activeNewsCategories} /><div className="mt-2"><Input label="Location (Optional)" value={newsFormData.location || ''} onChange={e => setNewsFormData({...newsFormData, location: e.target.value})} icon={<MapPin className="w-4 h-4 text-gray-400"/>} /></div></div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Media & Links</label><Input label="Image URL" value={newsFormData.imageUrl || ''} onChange={e => setNewsFormData({...newsFormData, imageUrl: e.target.value})} placeholder="https://..." icon={<ImageIcon className="w-4 h-4 text-gray-400"/>} /><div className="mt-2"><Input label="Video URL (Optional)" value={newsFormData.videoUrl || ''} onChange={e => setNewsFormData({...newsFormData, videoUrl: e.target.value})} placeholder="https://youtube..." icon={<Video className="w-4 h-4 text-gray-400"/>} /></div></div>
               <div><label className="block text-sm font-bold text-gray-900 mb-2">Visibility</label><div className="flex items-center gap-2"><input type="checkbox" id="feat-news" checked={newsFormData.isFeatured || false} onChange={e => setNewsFormData({...newsFormData, isFeatured: e.target.checked})} /><label htmlFor="feat-news" className="text-sm text-gray-700">Pin to Top / Feature</label></div></div>
           </div>
        </div>
        <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end gap-2"><Button variant="ghost" onClick={() => setIsNewsModalOpen(false)}>Cancel</Button><Button onClick={handleSaveNews}>Save News</Button></div>
      </Modal>
    </>
  );
};