import React, { useEffect, useRef } from 'react';
import { Loader2, Bold, Italic, Underline, List, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, AlertCircle } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading,
  icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-900",
    secondary: "bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-300",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'gray' | 'red'; className?: string }> = ({ children, color = 'blue', className = '' }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-gray-800",
    red: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {props.required && <span className="text-red-500">*</span>}</label>}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      <input 
        className={`w-full rounded-md border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} ${icon ? 'pl-10' : 'px-3'} py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className} disabled:bg-gray-100 disabled:text-gray-500`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{error}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[] | { label: string; value: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className = '', children, ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {props.required && <span className="text-red-500">*</span>}</label>}
    <select 
      className={`w-full rounded-md border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
      {...props}
    >
      {children}
      {options?.map((opt, idx) => {
        if (typeof opt === 'string') {
          return <option key={idx} value={opt}>{opt}</option>;
        }
        return <option key={opt.value} value={opt.value}>{opt.label}</option>;
      })}
    </select>
    {error && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{error}</p>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label} {props.required && <span className="text-red-500">*</span>}</label>}
    <textarea 
      className={`w-full rounded-md border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all min-h-[100px] ${className} disabled:bg-gray-100 disabled:text-gray-500`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{error}</p>}
  </div>
);

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode; 
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SEO: React.FC<{
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}> = ({ title, description = '', image = '', url = typeof window !== 'undefined' ? window.location.href : '', type = 'website' }) => {
  useEffect(() => {
    // Set Document Title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (attrName: string, attrValue: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard Meta
    updateMetaTag('name', 'description', description);

    // Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', image);

  }, [title, description, image, url, type]);

  return null;
};

export const RichTextEditor: React.FC<{
  label?: string;
  value: string;
  onChange: (html: string) => void;
  className?: string;
  readOnly?: boolean;
}> = ({ label, value, onChange, className = '', readOnly = false }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
       // Only update if significantly different to avoid cursor jumps
       if (editorRef.current.innerHTML.length === 0 && value.length > 0) {
         editorRef.current.innerHTML = value;
       }
    }
  }, []); // Only run once on mount for simulation purposes in this environment

  const handleCommand = (command: string) => {
    if (readOnly) return;
    document.execCommand(command, false, undefined);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className={`border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all bg-white ${readOnly ? 'bg-gray-50' : ''}`}>
        {!readOnly && (
          <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 flex-wrap">
            <button type="button" onClick={() => handleCommand('bold')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Bold"><Bold className="w-4 h-4" /></button>
            <button type="button" onClick={() => handleCommand('italic')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Italic"><Italic className="w-4 h-4" /></button>
            <button type="button" onClick={() => handleCommand('underline')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Underline"><Underline className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" onClick={() => handleCommand('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Bullet List"><List className="w-4 h-4" /></button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" onClick={() => handleCommand('justifyLeft')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
            <button type="button" onClick={() => handleCommand('justifyCenter')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
            <button type="button" onClick={() => handleCommand('justifyRight')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Align Right"><AlignRight className="w-4 h-4" /></button>
          </div>
        )}
        <div
          ref={editorRef}
          className="p-3 min-h-[150px] outline-none text-sm text-gray-800 prose prose-sm max-w-none"
          contentEditable={!readOnly}
          onInput={(e) => !readOnly && onChange(e.currentTarget.innerHTML)}
          onBlur={(e) => !readOnly && onChange(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: value }} // Initial render
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>
      {!readOnly && <p className="text-[10px] text-gray-400 mt-1 text-right">Rich Text Editor Mode</p>}
    </div>
  );
};