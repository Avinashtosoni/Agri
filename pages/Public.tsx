import React, { useState, useEffect, useRef } from 'react';
import { Project, BlogPost, Alumni, SiteContent, ViewState, NewsEvent, FormDefinition, FormField, PageContent, AnimationConfig, ContactSubmission, RegistrationSubmission, TrainingSubmission } from '../types';
import { Button, Card, Badge, Input, TextArea, Modal, RichTextEditor, Select, SEO } from '../components/UI';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare,
  Share2,
  X,
  Send,
  Eye,
  Menu,
  CheckCircle,
  FileText,
  PlayCircle,
  Facebook,
  Instagram,
  ArrowLeft
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell
} from 'recharts';
import { CHART_DATA, CATEGORIES, APP_NAME, ABOUT_CARDS, ALUMNI_LIST, GALLERY_IMAGES, MOCK_PUBLICATIONS } from '../constants';

interface PublicProps {
  view: string;
  projects: Project[];
  blogs: BlogPost[];
  news: NewsEvent[];
  blogCategories: string[];
  selectedBlogId: string | null;
  selectedNewsId: string | null;
  selectedFormId: string | null;
  selectedPageId: string | null;
  pages: PageContent[];
  alumni: Alumni[];
  selectedAlumniId: string | null;
  onNavigate: (view: string, sectionId?: string) => void;
  onSelectBlog: (id: string) => void;
  onSelectNews: (id: string) => void;
  onSelectAlumni: (id: string) => void;
  siteContent: SiteContent;
  forms: FormDefinition[];
  onGenericSubmit: (formId: string, data: any) => void;
}

// --- Detail Views ---

const BlogDetailView = ({ blog, onBack }: { blog: BlogPost | undefined, onBack: () => void }) => {
  if (!blog) return <div className="p-20 text-center">Blog not found. <button onClick={onBack} className="text-blue-500 underline">Go Back</button></div>;

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Home</button>
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="h-64 md:h-96 w-full overflow-hidden relative">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
               <div className="flex items-center gap-3 mb-3 text-xs md:text-sm font-medium">
                  <span className="bg-orange-500 px-3 py-1 rounded-full">{blog.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {blog.date}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4"/> {blog.author}</span>
               </div>
               <h1 className="text-2xl md:text-4xl font-bold leading-tight">{blog.title}</h1>
            </div>
         </div>
         <div className="p-6 md:p-10">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt }} />
            
            {blog.tags && (
               <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400"/>
                  {blog.tags.map(tag => <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">#{tag}</span>)}
               </div>
            )}
         </div>
      </article>
    </div>
  );
};

const NewsDetailView = ({ newsItem, onBack }: { newsItem: NewsEvent | undefined, onBack: () => void }) => {
  if (!newsItem) return <div className="p-20 text-center">News item not found. <button onClick={onBack} className="text-blue-500 underline">Go Back</button></div>;

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Home</button>
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="h-64 md:h-80 w-full overflow-hidden relative">
             {newsItem.imageUrl ? (
                <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-full object-cover"/>
             ) : (
                <div className="w-full h-full bg-blue-50 flex items-center justify-center"><FileText className="w-20 h-20 text-blue-200"/></div>
             )}
         </div>
         <div className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 border-b border-gray-100 pb-4">
               <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-xs">{newsItem.category || 'News'}</span>
               <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {newsItem.date}</span>
               {newsItem.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {newsItem.location}</span>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{newsItem.title}</h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            
            {newsItem.videoUrl && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><PlayCircle className="w-5 h-5 text-red-600"/> Related Video</h4>
                    <a href={newsItem.videoUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{newsItem.videoUrl}</a>
                </div>
            )}
         </div>
      </article>
    </div>
  );
};

const ContactView = ({ 
  contactInfo, 
  forms, 
  onSubmit 
}: { 
  contactInfo: SiteContent['contactInfo'], 
  forms: FormDefinition[], 
  onSubmit: (formId: string, data: any) => void 
}) => {
  // Find generic contact form, or fallback to hardcoded if missing
  const contactForm = forms.find(f => f.name === 'contact');
  const [formData, setFormData] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm) {
      onSubmit(contactForm.id, formData);
      setSubmitted(true);
    }
  };

  const handleChange = (fieldId: string, value: string) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in">
        <h1 className="text-3xl md:text-4xl font-normal text-center text-gray-800 mb-12">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info & Map */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Get In Touch</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0"><MapPin className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Visit Us</h4>
                                <p className="text-gray-600 leading-relaxed">{contactInfo.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0"><Phone className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Call Us</h4>
                                <p className="text-gray-600">{contactInfo.phone1}</p>
                                <p className="text-gray-600">{contactInfo.phone2}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0"><Mail className="w-5 h-5"/></div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Email Us</h4>
                                <p className="text-gray-600">{contactInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Embedded Map (Placeholder) */}
                <div className="bg-gray-200 h-64 rounded-xl overflow-hidden relative shadow-inner border border-gray-300">
                     {/* You would typically embed a Google Map iframe here */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col">
                        <MapPin className="w-12 h-12 mb-2 text-gray-400"/>
                        <span className="text-sm font-medium">Map Location</span>
                        <span className="text-xs">{contactInfo.address}</span>
                     </div>
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.404166366849!2d73.6862563150054!3d24.58807698417942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56550a14411%3A0xdbd8c28455800a69!2sUdaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1622549481122!5m2!1sen!2sus" 
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        loading="lazy"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                     ></iframe>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
                {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4"><CheckCircle className="w-8 h-8"/></div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-600 mb-6">Thank you for contacting us. We will get back to you shortly.</p>
                        <Button onClick={() => { setSubmitted(false); setFormData({}); }} variant="outline">Send Another Message</Button>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
                        <p className="text-gray-500 mb-8 text-sm">Have a question about our training programs or services? Fill out the form below.</p>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {contactForm ? contactForm.fields.map(field => (
                                <div key={field.id}>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea 
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all min-h-[120px]"
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            value={formData[field.id] || ''}
                                        />
                                    ) : (
                                        <input 
                                            type={field.type}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            className="w-full rounded-lg border-gray-300 border p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            value={formData[field.id] || ''}
                                        />
                                    )}
                                </div>
                            )) : (
                                <div className="text-red-500 text-sm">Contact form configuration missing.</div>
                            )}
                            <Button type="submit" className="w-full bg-[#1a237e] hover:bg-blue-900 text-white py-3 rounded-lg shadow-md mt-4 font-bold uppercase tracking-wide text-sm">
                                {contactForm?.submitButtonText || 'Send Message'}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    </div>
  );
};

// --- Specific Section Components ---

const PresidentSection = ({ content }: { content: any }) => (
  <section className="bg-white py-8 md:py-16">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Image */}
        <div className="w-full md:w-1/4 relative">
           <img 
             src={content.imageUrl} 
             alt="President" 
             className="w-full h-auto rounded shadow-lg border-4 border-white"
           />
        </div>
        
        {/* Middle: Text */}
        <div className="w-full md:w-1/2">
           <h2 className="text-xl md:text-2xl font-normal text-gray-800 mb-4">{content.title}</h2>
           <p className="text-sm text-gray-600 leading-relaxed text-justify">
             {content.text}
           </p>
           <div className="mt-4">
             <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded px-6">{content.buttonText}</Button>
           </div>
        </div>

        {/* Right: Mission Diagram */}
        <div className="w-full md:w-1/4 flex justify-center items-center">
           <div className="relative w-64 h-64">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-700 flex items-center justify-center text-white text-center text-xs font-bold p-2 clip-hexagon z-10">OUR MISSION</div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 bg-white border border-green-200 rounded-full w-20 h-20 flex flex-col items-center justify-center text-[8px] text-center p-1 shadow"><span>Promotion of ornamental fish keeping hobby</span></div>
              <div className="absolute bottom-0 right-8 bg-white border border-green-200 rounded-full w-20 h-20 flex flex-col items-center justify-center text-[8px] text-center p-1 shadow"><span>Entrepreneurship development</span></div>
              <div className="absolute bottom-0 left-8 bg-white border border-green-200 rounded-full w-20 h-20 flex flex-col items-center justify-center text-[8px] text-center p-1 shadow"><span>Skill Development</span></div>
              <div className="absolute top-12 right-2 w-12 h-12 text-orange-500"><img src="https://cdn-icons-png.flaticon.com/512/3065/3065842.png" className="w-full h-full opacity-80" alt="fish"/></div>
              <div className="absolute top-12 left-2 w-12 h-12 text-orange-500 transform scale-x-[-1]"><img src="https://cdn-icons-png.flaticon.com/512/3065/3065842.png" className="w-full h-full opacity-80" alt="fish"/></div>
           </div>
           <style>{`.clip-hexagon { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }`}</style>
        </div>
      </div>
    </div>
  </section>
);

const GalleryBlogsSection = ({ blogs, onSelectBlog }: { blogs: BlogPost[], onSelectBlog: (id: string) => void }) => (
  <section className="bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left: Gallery */}
        <div className="w-full md:w-1/2">
           <h2 className="text-2xl text-center md:text-left text-gray-800 mb-6 font-normal">Gallery</h2>
           <div className="grid grid-cols-2 gap-2 h-64 overflow-hidden relative">
              <div className="col-span-1 h-full"><img src={GALLERY_IMAGES[0]} className="w-full h-full object-cover rounded-sm" alt="Gallery"/></div>
              <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
                 <img src={GALLERY_IMAGES[1]} className="w-full h-full object-cover rounded-sm" alt="Gallery"/>
                 <img src={GALLERY_IMAGES[2]} className="w-full h-full object-cover rounded-sm" alt="Gallery"/>
              </div>
              <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-1 rounded-full shadow"><ChevronLeft className="w-4 h-4"/></button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 text-white p-1 rounded-full shadow"><ChevronRight className="w-4 h-4"/></button>
           </div>
           <div className="mt-4 text-center"><Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-6 uppercase rounded-none">View All</Button></div>
        </div>

        {/* Right: Blogs */}
        <div className="w-full md:w-1/2">
           <h2 className="text-2xl text-center md:text-left text-gray-800 mb-6 font-normal">Blogs</h2>
           <div className="space-y-4">
              {blogs.slice(0, 2).map(blog => (
                <div key={blog.id} className="bg-white p-2 flex gap-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelectBlog(blog.id)}>
                   <div className="w-24 h-20 shrink-0 bg-gray-200"><img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover"/></div>
                   <div>
                      <h4 className="text-orange-500 text-sm font-medium mb-1 line-clamp-2 group-hover:underline">{blog.title}</h4>
                      <p className="text-gray-500 text-xs line-clamp-2">{blog.excerpt}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-4 text-center md:text-right"><Button size="sm" className="bg-[#1a237e] hover:bg-blue-900 text-white text-xs px-6 uppercase rounded-none" onClick={() => {}}>View All</Button></div>
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = ({ stats }: { stats: any[] }) => (
  <section className="py-12 bg-cover bg-center relative" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")', backgroundColor: '#8B5A2B' }}>
    <div className="absolute inset-0 bg-[#8B5A2B]/85"></div>
    <div className="container mx-auto px-4 relative z-10">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center group">
               <div className="text-4xl md:text-5xl font-light mb-2 opacity-90 group-hover:opacity-100 transition-opacity">{stat.value}</div>
               <div className="w-8 h-0.5 bg-orange-300 mb-2 opacity-50"></div>
               <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
            </div>
          ))}
       </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
  </section>
);

const PreRegisterStrip = () => (
  <section className="bg-[#ffdab9] py-4 border-b border-orange-200">
     <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none shadow-md">Admissions</Button>
        <p className="text-xs text-gray-700 text-center md:text-left max-w-2xl leading-relaxed">
           Interested candidates may PRE-REGISTER for admission to different training programmes. Pre-registered candidates will be informed for admission to these programmes well in advance as and when a training programme will be organised.
        </p>
     </div>
  </section>
);

const AboutGridSection = () => (
  <section id="about-cards" className="py-16 bg-blue-50/30">
    <div className="container mx-auto px-4">
       <h2 className="text-2xl text-gray-800 mb-8 font-normal">About Us</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CARDS.map((card, idx) => (
            <div key={idx} className="bg-transparent">
               <div className="h-40 overflow-hidden mb-4 border-4 border-white shadow"><img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/></div>
               <h3 className="text-lg text-gray-900 mb-2 font-medium">{card.title}</h3>
               <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-6 text-justify">{card.text}</p>
               <a href="#" className="text-xs text-blue-600 hover:underline flex items-center justify-end">Read More</a>
            </div>
          ))}
       </div>
    </div>
  </section>
);

const NewsPublicationsSection = ({ news, onSelectNews }: { news: NewsEvent[], onSelectNews: (id: string) => void }) => (
  <section className="py-12 bg-white border-t border-gray-100">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-12">
         {/* News & Events */}
         <div className="w-full md:w-1/2">
            <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
               <h2 className="text-2xl text-gray-800 font-normal">News & Events</h2>
               <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">Latest Updates</span>
            </div>
            <div className="space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
               {news.map(item => (
                 <div key={item.id} className="flex gap-4 group cursor-pointer" onClick={() => onSelectNews(item.id)}>
                    <div className="w-24 h-20 bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden relative">
                       {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="news"/> : <FileText className="w-8 h-8"/>}
                       <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase">New</div>
                    </div>
                    <div>
                       <h4 className="text-orange-500 text-sm font-medium mb-1 group-hover:underline cursor-pointer leading-tight">{item.title}</h4>
                       <p className="text-xs text-gray-500 mb-1 line-clamp-2 leading-relaxed">{item.content.replace(/<[^>]*>?/gm, '')}</p>
                       <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {item.date}</span>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-6"><Button size="sm" className="bg-[#1a237e] text-white text-xs rounded-none px-6">View All</Button></div>
         </div>

         {/* Publications */}
         <div className="w-full md:w-1/2">
            <div className="flex justify-between items-baseline mb-6 border-b border-gray-200 pb-2">
               <h2 className="text-2xl text-gray-800 font-normal">Our Publications</h2>
               <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Research Papers</span>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
               {MOCK_PUBLICATIONS.map(pub => (
                 <div key={pub.id} className="flex gap-4 group bg-gray-50 p-3 rounded hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100">
                    <div className="w-16 h-20 bg-white shrink-0 border border-gray-200 flex items-center justify-center text-gray-300 shadow-sm"><FileText className="w-8 h-8"/></div>
                    <div>
                       <h4 className="text-orange-600 text-sm font-medium mb-1 group-hover:underline cursor-pointer leading-tight">{pub.title}</h4>
                       <p className="text-xs text-gray-500 mb-1 line-clamp-2 leading-relaxed italic">{pub.content}</p>
                       <div className="flex items-center gap-2 mt-1"><span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-600">PDF</span><span className="text-[10px] text-gray-400">{pub.date}</span></div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-6"><Button size="sm" className="bg-[#1a237e] text-white text-xs rounded-none px-6">View All</Button></div>
         </div>
      </div>
    </div>
  </section>
);

const AlumniSection = ({ alumni, onSelectAlumni }: { alumni: Alumni[], onSelectAlumni: (id: string) => void }) => {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  
  return (
    <section className="py-16 bg-gray-50">
       <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl text-gray-800 font-normal">Alumni</h2>
             <div className="flex gap-1"><button className="bg-yellow-400 p-2 text-white hover:bg-yellow-500 transition-colors"><ChevronLeft className="w-4 h-4"/></button><button className="bg-yellow-400 p-2 text-white hover:bg-yellow-500 transition-colors"><ChevronRight className="w-4 h-4"/></button></div>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
             <div className="w-full md:w-1/3">
                <div className="flex flex-wrap gap-2 mb-6 text-[10px] font-bold text-white uppercase tracking-wider"><span className="bg-gray-400 px-3 py-1.5">Training</span><span className="bg-black px-3 py-1.5">Internship</span><span className="bg-gray-400 px-3 py-1.5">Entrepreneurship</span><span className="bg-black px-3 py-1.5">Research</span></div>
                <p className="text-xs text-gray-600 leading-7 text-justify border-l-4 border-orange-200 pl-4">Training is one of the main and most important activities of OFTRI. A number of training programs that include both self-finance as well as government sponsored are organized by the institute from time to time...</p>
                <div className="text-right mt-4"><a href="#alumni-public" className="text-xs font-bold text-blue-700 hover:text-orange-500 flex items-center justify-end gap-1 group">View All Alumni <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/></a></div>
             </div>
             <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-6">{alumni.filter(a => a.status === 'Published').slice(0, 4).map((alum) => (<div key={alum.id} className="text-center group cursor-pointer" onClick={() => setSelectedAlumni(alum)}><div className="h-40 bg-gray-200 mb-3 overflow-hidden border border-gray-300 relative"><img src={alum.imageUrl} alt={alum.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/><div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div></div><div className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{alum.name}</div><div className="text-xs text-gray-500 mt-1">{alum.batch}</div></div>))}</div>
          </div>
       </div>
       <Modal isOpen={!!selectedAlumni} onClose={() => setSelectedAlumni(null)} title="Alumni Profile">
          {selectedAlumni && (
            <div className="space-y-4">
              <div className="flex items-start gap-6">
                <img src={selectedAlumni.imageUrl} alt={selectedAlumni.name} className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"/>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedAlumni.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">Batch: {selectedAlumni.batch}</p>
                  <Badge color="blue">{selectedAlumni.degree}</Badge>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                {selectedAlumni.currentPosition && <div><span className="text-sm font-bold text-gray-700">Current Position:</span><p className="text-sm text-gray-600">{selectedAlumni.currentPosition}{selectedAlumni.company && ` at ${selectedAlumni.company}`}</p></div>}
                {selectedAlumni.location && <div><span className="text-sm font-bold text-gray-700">Location:</span><p className="text-sm text-gray-600">{selectedAlumni.location}</p></div>}
                {selectedAlumni.email && <div><span className="text-sm font-bold text-gray-700">Email:</span><p className="text-sm text-blue-600">{selectedAlumni.email}</p></div>}
                {selectedAlumni.phone && <div><span className="text-sm font-bold text-gray-700">Phone:</span><p className="text-sm text-gray-600">{selectedAlumni.phone}</p></div>}
                {selectedAlumni.linkedIn && <div><span className="text-sm font-bold text-gray-700">LinkedIn:</span><a href={selectedAlumni.linkedIn} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline block truncate">{selectedAlumni.linkedIn}</a></div>}
                {selectedAlumni.achievements && <div><span className="text-sm font-bold text-gray-700">Achievements:</span><p className="text-sm text-gray-600 leading-relaxed">{selectedAlumni.achievements}</p></div>}
              </div>
              <div className="flex justify-end pt-4 border-t"><Button variant="ghost" onClick={() => setSelectedAlumni(null)}>Close</Button></div>
            </div>
          )}
        </Modal>
    </section>
  );
};

const AlumniPublicView = ({ alumni, onSelectAlumni, onBack }: { alumni: Alumni[], onSelectAlumni: (id: string) => void, onBack: () => void }) => {
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const publishedAlumni = alumni.filter(a => a.status === 'Published');

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-6 transition-colors"><ArrowLeft className="w-4 h-4"/> Back to Home</button>
      <h1 className="text-3xl md:text-4xl font-normal text-center text-gray-800 mb-12">Our Alumni</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {publishedAlumni.map(alum => (
          <div key={alum.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setSelectedAlumni(alum)}>
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src={alum.imageUrl} alt={alum.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-1">{alum.name}</h3>
              <p className="text-sm text-gray-500">Batch {alum.batch}</p>
              {alum.currentPosition && <p className="text-xs text-gray-400 mt-1">{alum.currentPosition}</p>}
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={!!selectedAlumni} onClose={() => setSelectedAlumni(null)} title="Alumni Profile">
        {selectedAlumni && (
          <div className="space-y-4">
            <div className="flex items-start gap-6">
              <img src={selectedAlumni.imageUrl} alt={selectedAlumni.name} className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"/>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedAlumni.name}</h2>
                <p className="text-sm text-gray-500 mb-2">Batch: {selectedAlumni.batch}</p>
                <Badge color="blue">{selectedAlumni.degree}</Badge>
              </div>
            </div>
            <div className="border-t pt-4 space-y-3">
              {selectedAlumni.currentPosition && <div><span className="text-sm font-bold text-gray-700">Current Position:</span><p className="text-sm text-gray-600">{selectedAlumni.currentPosition}{selectedAlumni.company && ` at ${selectedAlumni.company}`}</p></div>}
              {selectedAlumni.location && <div><span className="text-sm font-bold text-gray-700">Location:</span><p className="text-sm text-gray-600">{selectedAlumni.location}</p></div>}
              {selectedAlumni.email && <div><span className="text-sm font-bold text-gray-700">Email:</span><p className="text-sm text-blue-600">{selectedAlumni.email}</p></div>}
              {selectedAlumni.phone && <div><span className="text-sm font-bold text-gray-700">Phone:</span><p className="text-sm text-gray-600">{selectedAlumni.phone}</p></div>}
              {selectedAlumni.linkedIn && <div><span className="text-sm font-bold text-gray-700">LinkedIn:</span><a href={selectedAlumni.linkedIn} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline block truncate">{selectedAlumni.linkedIn}</a></div>}
              {selectedAlumni.achievements && <div><span className="text-sm font-bold text-gray-700">Achievements:</span><p className="text-sm text-gray-600 leading-relaxed">{selectedAlumni.achievements}</p></div>}
            </div>
            <div className="flex justify-end pt-4 border-t"><Button variant="ghost" onClick={() => setSelectedAlumni(null)}>Close</Button></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const SocialSection = () => (
  <section className="py-12 bg-white">
     <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div><h2 className="text-2xl text-center text-gray-800 mb-6 font-normal">Facebook</h2><div className="border border-gray-200 bg-white shadow-sm p-4 h-96 flex flex-col"><div className="flex items-center gap-3 mb-4 border-b pb-4"><div className="w-12 h-12 bg-orange-100 border border-orange-300"><img src="https://picsum.photos/50/50?random=99" className="w-full h-full object-cover"/></div><div><div className="font-bold text-blue-800 text-sm hover:underline cursor-pointer">AquaAgri Pathfinder</div><div className="text-xs text-gray-500">3,546 followers</div></div></div><div className="flex-1 bg-gray-100 relative overflow-hidden group cursor-pointer"><img src="https://picsum.photos/400/300?random=88" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"/><div className="absolute inset-0 flex items-center justify-center"><PlayCircle className="w-16 h-16 text-white opacity-80"/></div></div><div className="flex justify-between items-center pt-2 text-xs text-gray-500"><div className="flex items-center gap-1"><Facebook className="w-3 h-3 text-blue-600"/> AquaAgri Pathfinder</div><div>about a year ago</div></div></div></div>
           <div><h2 className="text-2xl text-center text-gray-800 mb-6 font-normal">Instagram</h2><div className="flex justify-end mb-2"><Button size="sm" className="bg-blue-500 text-white text-xs px-4 py-1 h-auto rounded">Follow on Instagram</Button></div><div className="grid grid-cols-2 gap-2 h-96 overflow-y-auto custom-scrollbar">{[1,2,3,4].map(i => (<div key={i} className="bg-gray-100 aspect-square relative group"><img src={`https://picsum.photos/300/300?random=${i+50}`} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 text-white text-[10px]">Sample post caption...</div></div>))}</div></div>
        </div>
     </div>
  </section>
);

// --- Main Public Home ---

export const PublicHome: React.FC<PublicProps> = ({ 
  view, projects, blogs, news, blogCategories, selectedBlogId, selectedNewsId, selectedFormId, selectedPageId, pages, alumni, selectedAlumniId, onNavigate, onSelectBlog, onSelectNews, onSelectAlumni, siteContent,
  forms, onGenericSubmit
}) => {
  
  // --- Router Switch ---
  switch (view) {
    case 'PROJECTS': return <div className="p-20 text-center">Projects View Placeholder</div>; 
    case 'BLOG_LIST': 
        const publishedBlogs = blogs.filter(b => b.status === 'Published');
        return (
          <div className="container mx-auto px-4 py-12 animate-in fade-in">
            <h1 className="text-3xl md:text-4xl font-normal text-center text-gray-800 mb-12">Blog & Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedBlogs.map(blog => (
                <div key={blog.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelectBlog(blog.id)}>
                  <div className="h-48 bg-gray-200 overflow-hidden relative">
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    {blog.isFeatured && <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">Featured</span>}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      <Badge color="blue">{blog.category}</Badge>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><User className="w-3 h-3"/> {blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    case 'BLOG_DETAIL': 
        const activeBlog = blogs.find(b => b.id === selectedBlogId);
        return <BlogDetailView blog={activeBlog} onBack={() => onNavigate(ViewState.PUBLIC_HOME)}/>;
    case 'NEWS_DETAIL': 
        const activeNews = news.find(n => n.id === selectedNewsId);
        return <NewsDetailView newsItem={activeNews} onBack={() => onNavigate(ViewState.PUBLIC_HOME)}/>;
    case 'CONTACT': 
        return <ContactView contactInfo={siteContent.contactInfo} forms={forms} onSubmit={onGenericSubmit} />;
    case 'PUBLIC_FORM': return <div className="p-20 text-center">Form View Placeholder</div>;
    case 'DYNAMIC_PAGE': return <div className="p-20 text-center">Page View Placeholder</div>;
    case 'ALUMNI': 
        return <AlumniPublicView alumni={alumni} onSelectAlumni={onSelectAlumni} onBack={() => onNavigate(ViewState.PUBLIC_HOME)} />;
    default: return (
      <div className="animate-in fade-in duration-500">
        <PresidentSection content={siteContent.presidentMessage} />
        <GalleryBlogsSection blogs={blogs} onSelectBlog={onSelectBlog} />
        <StatsSection stats={siteContent.stats} />
        <PreRegisterStrip />
        <AboutGridSection />
        <NewsPublicationsSection news={news} onSelectNews={onSelectNews} />
        <AlumniSection alumni={alumni} onSelectAlumni={onSelectAlumni} />
        <SocialSection />
      </div>
    );
  }
};