import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Layout, Plus, LogOut, ArrowLeft, MoreHorizontal, 
  UserPlus, CheckCircle, X, Send, Briefcase, 
  Calendar, CheckSquare, Tag, Paperclip, Clock, Trash2, 
  Camera, Save, Lock, Search, Filter, ChevronDown,
  PieChart as PieIcon, BarChart as BarIcon, Bell, AlertCircle, History
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- ICONS COMPONENT ---
const Icons = {
  Briefcase: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Layout: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  UserPlus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  CheckSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Tag: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94 .94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>,
  Paperclip: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Filter: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  PieIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  BarIcon: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
  Bell: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
  History: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
};

const App = () => {
  const [view, setView] = useState('auth');
  const [workspaceTab, setWorkspaceTab] = useState('boards'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invitationActive, setInvitationActive] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  
  // Drag and Polling State
  const [isDragging, setIsDragging] = useState(false);
  const updatesPaused = useRef(false);

  // Data
  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [projectMembers, setProjectMembers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  
  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMemberId, setFilterMemberId] = useState('');

  // Forms
  const [authData, setAuthData] = useState({ username: '', email: '', password: '' });
  const [authErrors, setAuthErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(null); 
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' });
  const [newProject, setNewProject] = useState({ name: '', projectKey: '', description: '', workspaceId: null });
  const [newIssue, setNewIssue] = useState({ summary: '', description: '', priority: 'MEDIUM', assigneeEmail: '' });
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('MEMBER'); 
  const [commentText, setCommentText] = useState('');
  const [profileForm, setProfileForm] = useState({ username: '', jobTitle: '', organization: '', currentPassword: '', newPassword: '' });
  
  // Dynamic Column State
  const [newColumnName, setNewColumnName] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  // Feature States
  const [editingDesc, setEditingDesc] = useState(false);
  const [descText, setDescText] = useState('');
  const [newItemText, setNewItemText] = useState({}); 
  const [activePopover, setActivePopover] = useState(null); 
  const [dateData, setDateData] = useState({ startDate: '', dueDate: '', reminder: false });
  const [attachmentData, setAttachmentData] = useState({ type: 'LINK', url: '', name: '', file: null });

  // IMPORTANT: Replace with your IP for mobile testing

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8081/api";
  const safeFetchJson = async (url, options) => {
    try {
      const res = await fetch(url, options);
      const text = await res.text();
      try { return { ok: res.ok, data: text ? JSON.parse(text) : null }; }
      catch { return { ok: res.ok, data: text }; }
    } catch (e) { return { ok: false, data: "Network Error" }; }
  };

  const getProfileImg = (userId) => `${API_BASE}/users/${userId}/photo?t=${new Date().getTime()}`;
  const getHeaderImg = (userId) => `${API_BASE}/users/${userId}/header?t=${new Date().getTime()}`;

  const refreshDashboard = () => {
    if (!currentUser) return;
    safeFetchJson(`${API_BASE}/workspaces/user?email=${encodeURIComponent(currentUser.email)}`)
      .then(({data}) => setWorkspaces(Array.isArray(data) ? data : []));
    safeFetchJson(`${API_BASE}/projects/user?email=${encodeURIComponent(currentUser.email)}`)
      .then(({data}) => setProjects(Array.isArray(data) ? data : []));
  };

  const refreshAnalytics = () => {
    if (!activeWorkspaceId) return;
    safeFetchJson(`${API_BASE}/workspaces/${activeWorkspaceId}/analytics`).then(({ok, data}) => {
        if(ok) setAnalytics(data);
        else setAnalytics(null);
    });
  };

  const refreshNotifications = () => {
      if(!currentUser) return;
      safeFetchJson(`${API_BASE}/notifications?email=${encodeURIComponent(currentUser.email)}`).then(({ok, data}) => {
          if(ok) setNotifications(Array.isArray(data) ? data : []);
      });
  };

  const refreshActivityLogs = () => {
      if(!selectedIssue) return;
      safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/activity`).then(({ok, data}) => {
          if(ok) setActivityLogs(Array.isArray(data) ? data : []);
      });
  };

  const refreshBoard = async () => {
    if(!activeProject) return;
    
    // Fetch Columns
    safeFetchJson(`${API_BASE}/projects/${activeProject.id}/columns`).then(({data}) => {
        if (updatesPaused.current) return;
        const newCols = Array.isArray(data) ? data : [];
        setColumns(newCols);
        // Extract all issues for search autocomplete
        const flatIssues = newCols.flatMap(c => c.issues || []);
        setIssues(flatIssues);
    });

    // Fetch Members
    safeFetchJson(`${API_BASE}/projects/${activeProject.id}/members`).then(({data}) => {
        if (updatesPaused.current) return;
        setProjectMembers(Array.isArray(data) ? data : []);
    });
  }

  const refreshIssue = async () => {
    if(!activeProject) return;
    safeFetchJson(`${API_BASE}/projects/${activeProject.id}/columns`).then(({data}) => {
        const newCols = Array.isArray(data) ? data : [];
        if (!updatesPaused.current) setColumns(newCols);
        const allIssues = newCols.flatMap(c => c.issues);
        const updated = allIssues.find(i => i.id === selectedIssue.id);
        if (updated) setSelectedIssue(updated);
        refreshActivityLogs();
    });
  }

  const getUserRole = (ws) => {
    if (!currentUser || !ws.roles) return "MEMBER";
    return ws.roles[currentUser.id] || "MEMBER";
  };

  // --- EFFECTS ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      setInvitationActive(true);
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    if (view === 'dashboard' && currentUser) refreshDashboard();
  }, [view, currentUser]);

  useEffect(() => {
    if (view === 'board' && activeProject) refreshBoard();
  }, [view, activeProject]);

  useEffect(() => {
    if (view === 'dashboard' && activeWorkspaceId && workspaceTab === 'summary') {
        refreshAnalytics();
    }
  }, [workspaceTab, activeWorkspaceId, view]);

  // Polling with safety lock
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      refreshNotifications(); // Always check notifications

      if (isDragging || updatesPaused.current || searchQuery || filterMemberId) return;

      if (view === 'dashboard') {
        refreshDashboard();
        if (activeWorkspaceId && workspaceTab === 'summary') refreshAnalytics();
      }
      if (view === 'board' && activeProject) refreshBoard();
    }, 3000);
    return () => clearInterval(interval);
  }, [view, activeProject, isDragging, searchQuery, filterMemberId, activeWorkspaceId, workspaceTab, currentUser]);

  useEffect(() => {
    if (selectedIssue) {
        setDescText(selectedIssue.description || "");
        setDateData({
            startDate: selectedIssue.startDate ? selectedIssue.startDate.substring(0,10) : '',
            dueDate: selectedIssue.dueDate ? selectedIssue.dueDate.substring(0,10) : '',
            reminder: selectedIssue.dueDateReminder || false
        });
        safeFetchJson(`${API_BASE}/comments/issue/${selectedIssue.id}`).then(({data}) => setComments(Array.isArray(data) ? data : []));
        refreshActivityLogs();
    }
  }, [selectedIssue]);

  useEffect(() => {
    if (showProfileDrawer && currentUser) {
        setProfileForm({
            username: currentUser.username || '',
            jobTitle: currentUser.jobTitle || '',
            organization: currentUser.organization || '',
            currentPassword: '',
            newPassword: ''
        });
        safeFetchJson(`${API_BASE}/users/profile?email=${encodeURIComponent(currentUser.email)}`).then(({ok, data}) => {
            if(ok) {
                setCurrentUser(data);
                setProfileForm(prev => ({
                    ...prev, 
                    username: data.username || '',
                    jobTitle: data.jobTitle || '', 
                    organization: data.organization || ''
                }));
            }
        });
    }
  }, [showProfileDrawer]);

  const getFilteredColumns = () => {
      if (!columns) return [];
      return columns.map(col => ({
          ...col,
          issues: (col.issues || []).filter(issue => {
              const matchesSearch = issue.summary.toLowerCase().includes(searchQuery.toLowerCase());
              let matchesMember = true;
              if (filterMemberId) {
                  const targetId = parseInt(filterMemberId);
                  matchesMember = issue.assignees && issue.assignees.some(u => u.id === targetId);
              }
              return matchesSearch && matchesMember;
          })
      }));
  };

  const displayedColumns = getFilteredColumns();
  const isFilterActive = searchQuery !== '' || filterMemberId !== '';
  const unreadCount = notifications.filter(n => !n.read).length;

  // --- ACTIONS ---

  // VALIDATION LOGIC
  const validateAuth = () => {
      let errors = {};
      let isValid = true;
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!authData.email) {
          errors.email = "Email is required.";
          isValid = false;
      } else if (!emailRegex.test(authData.email)) {
          errors.email = "Invalid email format.";
          isValid = false;
      }
      
      if (!authData.password) {
          errors.password = "Password is required.";
          isValid = false;
      } else if (authData.password.length < 6) {
          errors.password = "Password must be at least 6 characters (Weak).";
          isValid = false;
      }
      
      setAuthErrors(errors);
      return isValid;
  };

  const handleAuthInputChange = (e) => {
      const { name, value } = e.target;
      setAuthData({ ...authData, [name]: value });
      if (authErrors[name]) setAuthErrors({ ...authErrors, [name]: '' });
  };

  const handleAuth = async (e) => { 
      e.preventDefault(); 
      if (!isLogin && !validateAuth()) return; 
      
      if (isLogin) {
          let loginErrors = {};
          if (!authData.email) loginErrors.email = "Email required";
          if (!authData.password) loginErrors.password = "Password required";
          if (Object.keys(loginErrors).length > 0) { setAuthErrors(loginErrors); return; }
      }

      setLoading(true); 
      const endpoint = isLogin ? "/auth/login" : "/auth/signup"; 
      const { ok, data } = await safeFetchJson(`${API_BASE}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(authData) }); 
      if (ok) { 
          setCurrentUser(data); 
          setView('dashboard'); 
          if(invitationActive) window.history.replaceState({},"", "/"); 
      } else { 
          alert("Auth Error: " + data); 
      } 
      setLoading(false); 
  };

  const handleAddColumn = async () => {
      if (!newColumnName.trim()) return;
      const tempCol = { id: Date.now(), name: newColumnName, issues: [] };
      setColumns([...columns, tempCol]);
      setNewColumnName('');
      setIsAddingColumn(false);
      await safeFetchJson(`${API_BASE}/projects/${activeProject.id}/columns`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ name: newColumnName, projectId: activeProject.id })
      });
      refreshBoard();
  };

  const handleNotificationClick = async (notif) => {
      await safeFetchJson(`${API_BASE}/notifications/${notif.id}/read`, { method: 'PUT' });
      refreshNotifications();
      if (notif.relatedIssueId) {
          const allIssues = columns.flatMap(c => c.issues);
          const targetIssue = allIssues.find(i => i.id === notif.relatedIssueId);
          if (targetIssue) setSelectedIssue(targetIssue);
      }
      setShowNotifications(false);
  };

  const handleUpdateProfile = async () => {
      const { ok, data } = await safeFetchJson(`${API_BASE}/users/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentUser.email, username: profileForm.username, jobTitle: profileForm.jobTitle, organization: profileForm.organization })
      });
      if (ok) { alert("Profile updated!"); setCurrentUser(data); } else alert("Failed: " + data);
  };

  const handleChangePassword = async () => {
      setPasswordErrors({});
      const errors = {};
      if (!profileForm.currentPassword) errors.current = "Current password required.";
      if (!profileForm.newPassword) errors.new = "New password required.";
      else if (profileForm.newPassword.length < 6) errors.new = "Password too weak (min 6 chars).";
      
      if(Object.keys(errors).length > 0) { 
         setPasswordErrors(errors);
         return; 
      }

      const { ok, data } = await safeFetchJson(`${API_BASE}/users/security/password`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentUser.email, currentPassword: profileForm.currentPassword, newPassword: profileForm.newPassword })
      });
      if (ok) { alert("Password changed."); setProfileForm({...profileForm, currentPassword: '', newPassword: ''}); } else alert(data);
  };

  const handleUploadPhoto = async (e, type) => {
      if (!e.target.files[0]) return;
      if (e.target.files[0].size > 5 * 1024 * 1024) { alert("File too large. Max 5MB."); return; }
      const formData = new FormData();
      formData.append("email", currentUser.email);
      formData.append("file", e.target.files[0]);
      const endpoint = type === 'header' ? '/users/profile/header' : '/users/profile/photo';
      try {
          const res = await fetch(API_BASE + endpoint, { method: 'POST', body: formData });
          if (res.ok) { const updatedUser = await res.json(); setCurrentUser(updatedUser); alert("Uploaded successfully!"); } 
          else { const text = await res.text(); alert("Upload failed: " + text); }
      } catch (err) { alert("Network Error during upload"); }
  };

  const handleRemoveMember = async (userId) => {
    if (!window.confirm("Are you sure?")) return;
    const { ok, data } = await safeFetchJson(`${API_BASE}/workspaces/${activeWorkspaceId}/members/${userId}?requesterEmail=${encodeURIComponent(currentUser.email)}`, { method: 'DELETE' });
    if (ok) { refreshDashboard(); if (userId === currentUser.id) { setView('dashboard'); setActiveWorkspaceId(null); } } 
    else { alert(data); }
  };

  // Issue Handlers
  const handleSaveDescription = async () => { await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/description`, { method: 'PUT', body: descText }); setEditingDesc(false); refreshIssue(); };
  const handleAddChecklist = async () => { const name = prompt("Checklist Name:"); if (!name) return; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/checklists?name=${encodeURIComponent(name)}`, { method: 'POST' }); refreshIssue(); };
  const handleAddItem = async (checklistId) => { if (!newItemText[checklistId]) return; await safeFetchJson(`${API_BASE}/issues/checklists/${checklistId}/items?text=${encodeURIComponent(newItemText[checklistId])}`, { method: 'POST' }); setNewItemText({...newItemText, [checklistId]: ''}); refreshIssue(); };
  const handleToggleItem = async (itemId, currentVal) => { await safeFetchJson(`${API_BASE}/issues/checklists/items/${itemId}?checked=${!currentVal}`, { method: 'PUT' }); refreshIssue(); };
  const handleAddLabel = async () => { const labelText = prompt("Label Name:"); if (!labelText) return; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/labels?label=${encodeURIComponent(labelText)}`, { method: 'POST' }); refreshIssue(); };
  const handleSetDate = async (e) => { const date = e.target.value; const isoDate = date ? new Date(date).toISOString() : null; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/duedate`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ date: isoDate }) }); refreshIssue(); };
  const saveDates = async () => { const payload = { startDate: dateData.startDate ? new Date(dateData.startDate).toISOString() : null, dueDate: dateData.dueDate ? new Date(dateData.dueDate).toISOString() : null, reminder: dateData.reminder.toString() }; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/duedate`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) }); setActivePopover(null); refreshIssue(); };
  // --- HELPER: Build Image URL ---
  const getAttachmentUrl = (att) => {
      // If it's a file uploaded to DB, construct the API link
      if (att.type === 'FILE') {
          return `${API_BASE}/issues/attachments/${att.id}`;
      }
      // If it's an external link (e.g. google.com), use it directly
      return att.url;
  };
  // --- HELPER: Format Date Badge ---
  const renderDueDateBadge = (dateString) => {
      if (!dateString) return null;
      
      const date = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare dates only
      
      // Calculate difference in days
      const diffTime = date - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let colorClass = "bg-slate-100 text-slate-500"; // Default (Gray)
      let iconColor = "text-slate-400";
      
      if (diffDays < 0) {
          // Overdue (Red)
          colorClass = "bg-red-100 text-red-600";
          iconColor = "text-red-600";
      } else if (diffDays === 0) {
          // Due Today (Orange)
          colorClass = "bg-orange-100 text-orange-600";
          iconColor = "text-orange-600";
      } else if (diffDays <= 2) {
          // Due Soon (Yellow)
          colorClass = "bg-yellow-100 text-yellow-700";
          iconColor = "text-yellow-700";
      }

      return (
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold w-fit ${colorClass}`}>
              <Clock size={10} className={iconColor} />
              <span>{new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
      );
  };
  const saveAttachment = async () => { if (attachmentData.type === 'LINK') { if(!attachmentData.url) return; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/attachments/link?url=${encodeURIComponent(attachmentData.url)}&name=${encodeURIComponent(attachmentData.name || 'Link')}`, {method:'POST'}); } else if (attachmentData.type === 'FILE' && attachmentData.file) { const formData = new FormData(); formData.append('file', attachmentData.file); await fetch(`${API_BASE}/issues/${selectedIssue.id}/attachments/upload`, { method: 'POST', body: formData }); } setAttachmentData({ type: 'LINK', url: '', name: '', file: null }); setActivePopover(null); refreshIssue(); };
  const handleAddAttachment = async () => { const url = prompt("Paste Link or Image URL:"); if(url) { await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/attachments?url=${encodeURIComponent(url)}`, {method:'POST'}); refreshIssue(); } };
  const toggleAssignee = async (email, isAssigned) => { const method = isAssigned ? 'DELETE' : 'POST'; await safeFetchJson(`${API_BASE}/issues/${selectedIssue.id}/assignees?email=${encodeURIComponent(email)}&requesterEmail=${encodeURIComponent(currentUser.email)}`, { method }); refreshIssue(); };
  const moveIssue = async (targetColumnName) => { await fetch(`${API_BASE}/issues/${selectedIssue.id}/status?status=${targetColumnName}`, { method: 'PUT' }); setActivePopover(null); refreshIssue(); };
  const handleCreateWorkspace = async (e) => { e.preventDefault(); const { ok, data } = await safeFetchJson(`${API_BASE}/workspaces/create`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...newWorkspace, email: currentUser.email}) }); if(ok) { setShowModal(null); refreshDashboard(); } else alert(data); };
  const handleCreateProject = async (e) => { e.preventDefault(); if (!newProject.workspaceId) { alert("Workspace ID missing"); return; } const { ok, data } = await safeFetchJson(`${API_BASE}/projects/create`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({...newProject, email: currentUser.email}) }); if(ok) { setShowModal(null); refreshDashboard(); } else alert(data); };
  const handleInvite = async (e) => { e.preventDefault(); setLoading(true); const { ok, data } = await safeFetchJson(`${API_BASE}/workspaces/${activeWorkspaceId}/invite?email=${encodeURIComponent(inviteEmail)}&inviterEmail=${encodeURIComponent(currentUser.email)}&role=${inviteRole}`, { method: 'POST' }); if (ok) { alert("Invitation sent!"); setShowModal(null); setInviteEmail(''); } else alert(data); setLoading(false); };
  const handleCreateIssue = async (e) => { e.preventDefault(); const payload = { ...newIssue, creatorEmail: currentUser.email }; const { ok, data } = await safeFetchJson(`${API_BASE}/issues/create/${activeProject.id}`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) }); if(ok) { setShowModal(null); setNewIssue({ summary: '', description: '', priority: 'MEDIUM', assigneeEmail: '' }); refreshBoard(); } else alert(data); };
  const handleAddComment = async (e) => { e.preventDefault(); await safeFetchJson(`${API_BASE}/comments/add`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({text: commentText, userEmail: currentUser.email, issueId: selectedIssue.id}) }); setCommentText(''); safeFetchJson(`${API_BASE}/comments/issue/${selectedIssue.id}`).then(({data})=>setComments(Array.isArray(data)?data:[])); };
const handleDeleteAttachment = async (attachmentId) => {
      if (!window.confirm("Are you sure you want to delete this attachment?")) return;
      
      const { ok } = await safeFetchJson(`${API_BASE}/issues/attachments/${attachmentId}`, { 
          method: 'DELETE' 
      });
      
      if (ok) {
          refreshIssue(); // Reload to see it gone
      } else {
          alert("Failed to delete attachment.");
      }
  };
  const onDragStart = () => { 
    setIsDragging(true); 
    updatesPaused.current = true;
  };

  const onDragEnd = async (result) => {
    setIsDragging(false); 
    setTimeout(() => { updatesPaused.current = false; }, 5000);

    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Deep clone to prevent state mutations on active references
    const newColumns = JSON.parse(JSON.stringify(columns));
    
    const startColIndex = newColumns.findIndex(c => c.name === source.droppableId);
    const endColIndex = newColumns.findIndex(c => c.name === destination.droppableId);

    if (startColIndex === -1 || endColIndex === -1) return;

    const sourceIssues = newColumns[startColIndex].issues || [];
    const destIssues = newColumns[endColIndex].issues || [];

    const [movedIssue] = sourceIssues.splice(source.index, 1);
    movedIssue.status = destination.droppableId; 

    if (startColIndex === endColIndex) {
        sourceIssues.splice(destination.index, 0, movedIssue);
        newColumns[startColIndex].issues = sourceIssues;
    } else {
        destIssues.splice(destination.index, 0, movedIssue);
        newColumns[startColIndex].issues = sourceIssues;
        newColumns[endColIndex].issues = destIssues;
    }

    setColumns(newColumns); // Immediate update
    await fetch(`${API_BASE}/issues/${draggableId}/status?status=${destination.droppableId}&moverEmail=${encodeURIComponent(currentUser.email)}`, { method: 'PUT' });
  };

  if (view === 'auth') return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border">
        {invitationActive && <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs font-bold rounded">Invitation Found!</div>}
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
                <input name="username" placeholder="Username" required className="w-full border p-3 rounded-xl outline-none" onChange={handleAuthInputChange} />
            </div>
          )}
          <div>
            <input name="email" type="email" placeholder="Email" required className={`w-full border p-3 rounded-xl outline-none ${authErrors.email ? 'border-red-500 bg-red-50' : ''}`} onChange={handleAuthInputChange} />
            {authErrors.email && <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1 font-bold"><AlertCircle size={10}/> {authErrors.email}</div>}
          </div>
          <div>
            <input name="password" type="password" placeholder="Password" required className={`w-full border p-3 rounded-xl outline-none ${authErrors.password ? 'border-red-500 bg-red-50' : ''}`} onChange={handleAuthInputChange} />
            {authErrors.password && <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1 font-bold"><AlertCircle size={10}/> {authErrors.password}</div>}
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-700 transition-all">{loading ? 'Processing...' : 'Continue'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-blue-600 mt-4 text-sm font-bold">{isLogin ? "Join now" : "Back to login"}</button>
      </div>
    </div>
  );

  const activeWS = workspaces.find(ws => ws.id === activeWorkspaceId);
  const myRole = activeWS ? getUserRole(activeWS) : "MEMBER";

  // FIX: Fixed Layout Container with h-screen overflow-hidden to allow horizontal scroll ONLY in board area
  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F5F7] font-sans text-slate-800">
      
      {/* SIDEBAR - Fixed Width */}
      <div className="w-64 bg-[#0747A6] text-white p-6 flex flex-col shrink-0 transition-all z-20">
        <div className="font-bold text-xl mb-8 flex items-center gap-2"><div className="w-8 h-8 bg-white text-blue-700 rounded flex items-center justify-center italic font-black">J</div> Jira Clone</div>
        <div className="mb-6 overflow-y-auto flex-1">
          <div className="text-xs font-bold text-blue-200 uppercase mb-2 px-2">Workspaces</div>
          <nav className="space-y-1">
            {workspaces.map(ws => (
              <button key={ws.id} onClick={() => {setActiveWorkspaceId(ws.id); setView('dashboard'); setWorkspaceTab('boards'); refreshDashboard();}} className={`flex items-center gap-3 w-full p-2 rounded-lg text-sm ${activeWorkspaceId === ws.id ? 'bg-white/20' : 'hover:bg-white/10'}`}><Icons.Briefcase /> {ws.name}</button>
            ))}
            <button onClick={() => setShowModal('workspace')} className="flex items-center gap-3 w-full p-2 hover:bg-white/10 rounded-lg text-sm text-blue-200 mt-2"><Icons.Plus /> Create Workspace</button>
          </nav>
        </div>
        <button onClick={() => {setView('auth'); setCurrentUser(null);}} className="flex items-center gap-3 text-white/60 hover:text-white mt-2 p-2"><Icons.LogOut /> Logout</button>
      </div>

      {/* MAIN CONTENT AREA - Flex 1 */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER - Fixed Height */}
        <header className="h-14 border-b bg-white flex items-center px-8 justify-between shrink-0 shadow-sm z-10">
           {/* ... Header Content ... */}
           <div className="font-bold text-slate-700 flex items-center gap-2">
             {view === 'board' && <button onClick={() => setView('dashboard')} className="hover:bg-slate-100 p-1 rounded"><Icons.ArrowLeft /></button>}
             {view === 'dashboard' ? (workspaces.find(ws => ws.id === activeWorkspaceId)?.name || 'All Workspaces') : activeProject?.name}
           </div>
           
           <div className="flex items-center gap-4">
              {view === 'board' && (
                 <div className="flex items-center gap-2 mr-4">
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search /></div>
                        <input placeholder="Search tasks..." className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 focus:bg-white w-64 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        {searchQuery && (
                            <div className="absolute top-full left-0 right-0 bg-white shadow-xl border rounded-lg mt-2 max-h-60 overflow-y-auto z-50">
                                {issues.filter(i => i.summary.toLowerCase().includes(searchQuery.toLowerCase())).map(issue => (
                                    <div key={issue.id} onClick={() => {setSelectedIssue(issue); setSearchQuery('');}} className="p-3 hover:bg-slate-50 cursor-pointer text-sm border-b last:border-b-0">
                                        <div className="font-bold text-slate-700">{issue.summary}</div>
                                        <div className="text-xs text-slate-500">{activeProject.projectKey}-{issue.id} • {issue.status}</div>
                                    </div>
                                ))}
                                {issues.filter(i => i.summary.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && <div className="p-3 text-sm text-slate-400 text-center">No matches found</div>}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <select className="appearance-none pl-3 pr-8 py-2 border rounded-lg text-xs font-bold bg-white outline-none cursor-pointer hover:bg-slate-50 text-slate-700" value={filterMemberId} onChange={e => setFilterMemberId(e.target.value)}>
                            <option value="">All Members</option>
                            <option value={currentUser.id}>Only My Issues</option>
                            {projectMembers.map(m => (<option key={m.id} value={m.id}>{m.username}</option>))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronDown size={14} /></div>
                    </div>
                 </div>
              )}

              <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
                 <Bell />
                 {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{unreadCount}</span>}
                 {showNotifications && (
                     <div className="absolute top-8 right-0 w-80 bg-white shadow-2xl border rounded-xl z-50 overflow-hidden">
                         <div className="p-3 border-b bg-slate-50 font-bold text-sm text-slate-700">Notifications</div>
                         <div className="max-h-80 overflow-y-auto">
                             {notifications.length === 0 ? <div className="p-4 text-center text-xs text-slate-400">No notifications</div> : 
                              notifications.map(n => (
                                 <div key={n.id} onClick={() => handleNotificationClick(n)} className={`p-3 border-b text-sm cursor-pointer hover:bg-blue-50 ${!n.read ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''}`}>
                                     <div className="font-bold text-slate-700 mb-1">{n.type}</div>
                                     <div className="text-slate-600 leading-snug">{n.message}</div>
                                     <div className="text-[10px] text-slate-400 mt-1">{new Date(n.createdAt).toLocaleTimeString()}</div>
                                 </div>
                              ))
                             }
                         </div>
                     </div>
                 )}
              </div>

              <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-slate-100 rounded-lg" onClick={() => setShowProfileDrawer(true)}>
                  <div className="text-right hidden sm:block"><p className="text-sm font-bold text-slate-700 leading-none">{currentUser?.username}</p></div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-600 overflow-hidden">
                      {currentUser?.hasProfileImage ? <img src={getProfileImg(currentUser.id)} className="w-full h-full object-cover"/> : currentUser?.username?.charAt(0).toUpperCase()}
                  </div>
              </div>
           </div>
        </header>

        {/* SCROLLABLE CONTENT AREA */}
        <main className={`flex-1 flex flex-col min-h-0 ${view === 'board' ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}`}>
          {view === 'profile' ? (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300 p-8 overflow-y-auto">
               {/* Profile is now a drawer, this view state might be unused but kept for safety */}
            </div>
          ) : view === 'dashboard' ? (
            activeWorkspaceId ? (
                <div className="h-full flex flex-col overflow-y-auto">
                   <div className="flex items-center gap-4 mb-6 border-b border-slate-200 px-8 pt-6 shrink-0">
                      <button onClick={() => setWorkspaceTab('boards')} className={`pb-2 px-2 text-sm font-bold ${workspaceTab === 'boards' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Boards</button>
                      <button onClick={() => setWorkspaceTab('summary')} className={`pb-2 px-2 text-sm font-bold ${workspaceTab === 'summary' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Summary</button>
                      <button onClick={() => setWorkspaceTab('members')} className={`pb-2 px-2 text-sm font-bold ${workspaceTab === 'members' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Members</button>
                      <button onClick={() => setWorkspaceTab('settings')} className={`pb-2 px-2 text-sm font-bold ${workspaceTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Settings</button>
                   </div>
                   
                   <div className="flex-1 px-8 pb-8">
                      {/* ... Dashboard Content (Summary, Boards Grid, etc) ... */}
                      {workspaceTab === 'boards' && (
                         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {projects.filter(p => p.workspaceId === activeWorkspaceId).map(p => (
                                <div key={p.id} onClick={() => { setActiveProject(p); setView('board'); }} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer h-32 flex flex-col justify-between group">
                                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600">{p.name}</h3>
                                    <div className="flex justify-between items-end"><span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{p.projectKey}</span></div>
                                </div>
                            ))}
                            <button onClick={() => { setNewProject({...newProject, workspaceId: activeWorkspaceId}); setShowModal('project'); }} className="h-32 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-all"><Icons.Plus /><span className="mt-1 text-xs font-bold">New Board</span></button>
                         </div>
                      )}
                     {workspaceTab === 'summary' && (
    !analytics ? (
        <div className="p-12 text-center text-slate-400">
            <p className="text-lg mb-2">Loading analytics...</p>
            <p className="text-sm">Ensure you have created issues and the backend is running.</p>
        </div>
    ) : (
        <div className="grid grid-cols-2 gap-6 animate-in fade-in pb-20">
            {/* 1. KEY METRICS CARDS (Top Row) */}
            <div className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-xl shadow-lg flex justify-between items-center">
                <div><div className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Total Issues</div><div className="text-4xl font-bold">{analytics.totalIssues}</div></div>
                <div><div className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Completed</div><div className="text-4xl font-bold">{analytics.completedIssues}</div></div>
                <div><div className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">High Priority</div><div className="text-4xl font-bold text-red-200">{analytics.highPriorityIssues}</div></div>
                <div className="h-16 w-px bg-white/20"></div>
                <div><div className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Health</div><div className="text-4xl font-bold">{analytics.totalIssues > 0 ? Math.round((analytics.completedIssues / analytics.totalIssues) * 100) : 0}%</div></div>
            </div>

            {/* 2. STATUS CHART (Pie) */}
            <div className="bg-white p-6 rounded-xl border shadow-sm h-80 flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Icons.PieIcon size={18}/> Status Breakdown</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={Object.entries(analytics.statusCounts).map(([k,v]) => ({name: k, value: v}))} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                                {Object.entries(analytics.statusCounts).map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                            </Pie>
                            <ChartTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* 3. WORKLOAD CHART (Bar) */}
            <div className="bg-white p-6 rounded-xl border shadow-sm h-80 flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Icons.BarIcon size={18}/> Team Workload</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={Object.entries(analytics.memberWorkload).map(([k,v]) => ({name: k, tasks: v}))}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <ChartTooltip />
                            <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. PRIORITY CHART (Bar - Full Width) */}
            <div className="col-span-2 bg-white p-6 rounded-xl border shadow-sm h-80 flex flex-col">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Icons.BarIcon size={18}/> Priority Breakdown</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={Object.entries(analytics.priorityCounts).map(([k,v]) => ({name: k, tasks: v}))}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <ChartTooltip />
                            <Bar dataKey="tasks" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
)}
                      
                      {workspaceTab === 'members' && (
                       <div className="bg-white rounded-xl border shadow-sm max-w-3xl"><div className="p-6 border-b flex justify-between items-center"><h3 className="font-bold text-lg">Workspace Members</h3>{myRole !== 'VIEWER' && <button onClick={() => setShowModal('member')} className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-bold">Invite Member</button>}</div><div className="p-0">{activeWS?.members?.map(m => (<div key={m.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-slate-50"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 overflow-hidden">{m.hasProfileImage ? <img src={getProfileImg(m.id)} className="w-full h-full object-cover"/> : m.username.charAt(0).toUpperCase()}</div><div><div className="font-bold text-sm text-slate-800">{m.username} {m.id === currentUser.id && '(You)'}</div><div className="text-xs text-slate-500">{m.email}</div></div></div><div className="flex items-center gap-4"><span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">{activeWS.roles?.[m.id] || "MEMBER"}</span>{(myRole === 'ADMIN' && m.id !== currentUser.id) && <button onClick={() => handleRemoveMember(m.id)} className="text-xs text-red-500 hover:underline">Remove</button>}{m.id === currentUser.id && <button onClick={() => handleRemoveMember(m.id)} className="text-xs text-slate-400 hover:underline">Leave</button>}</div></div>))}</div></div>
                      )}
                      
                      {workspaceTab === 'settings' && <div className="p-8 text-center text-slate-400">Settings available for Admins soon.</div>}
                   </div>
                </div>
            ) : (
                <div className="space-y-10 p-20 text-center"><h2 className="text-2xl font-bold text-slate-700">Select a Workspace</h2></div>
            )
          ) : (
            // --- BOARD VIEW (Horizontal Scrolling) ---
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <div className="flex gap-4 h-full px-8 pb-4 pt-4 items-start min-w-full">
                {displayedColumns.map(col => (
                  {/* Inside the map loop: {col.issues.map((issue, index) => ... */}
<Draggable key={issue.id} draggableId={issue.id.toString()} index={index} isDragDisabled={isFilterActive}>
  {(provided) => (
    <div 
      ref={provided.innerRef} 
      {...provided.draggableProps} 
      {...provided.dragHandleProps} 
      onClick={() => setSelectedIssue(issue)} 
      className="bg-white p-3 rounded shadow-sm border-b border-slate-300 hover:bg-slate-50 cursor-pointer group mb-2"
    >
      {/* Cover Image */}
      {issue.attachments && issue.attachments.find(a => a.type === 'FILE' && a.name.match(/\.(jpeg|jpg|png|gif)$/i)) && (
        <div className="mb-2 rounded overflow-hidden h-24">
          <img src={issue.attachments.find(a => a.type === 'FILE' && a.name.match(/\.(jpeg|jpg|png|gif)$/i)).url} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex gap-1 mb-2 flex-wrap">
          {issue.labels.map((l, i) => (
            <span key={i} className="bg-green-100 text-green-700 px-1.5 rounded text-[10px] font-bold">{l}</span>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="text-sm text-[#172B4D] mb-2 font-medium">{issue.summary}</div>

      {/* --- NEW: DUE DATE BADGE --- */}
      {issue.dueDate && (
          <div className="mb-2">
              {renderDueDateBadge(issue.dueDate)}
          </div>
      )}
      {/* --------------------------- */}

      {/* Footer (ID, Checklists, Assignees) */}
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold">
        <span>{activeProject.projectKey}-{issue.id}</span>
        
        <div className="flex items-center gap-2">
           {/* Checklist Icon */}
           {issue.checklists && issue.checklists.length > 0 && (
             <div className="flex items-center gap-1">
               <Icons.CheckSquare size={12}/> 
               {issue.checklists.reduce((acc, cl) => acc + cl.items.filter(i=>i.isChecked).length, 0)}/{issue.checklists.reduce((acc, cl) => acc + cl.items.length, 0)}
             </div>
           )}
           
           {/* Assignees */}
           {issue.assignees && issue.assignees.length > 0 && (
             <div className="flex -space-x-1">
                {issue.assignees.slice(0,3).map(u => (
                    <div key={u.id} className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border-2 border-white text-[9px] overflow-hidden" title={u.username}>
                        {u.hasProfileImage ? <img src={getProfileImg(u.id)} className="w-full h-full object-cover"/> : u.username.charAt(0).toUpperCase()}
                    </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  )}
</Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                        <button onClick={() => setShowModal('issue')} className="w-full text-left p-2 text-slate-500 hover:bg-slate-200 rounded-lg text-sm flex items-center gap-2 mt-1 transition-all"><Icons.Plus /> Create Issue</button>
                      </div>
                    )}
                  </Droppable>
                ))}
                {/* Dynamic List Adder */}
                <div className="w-72 shrink-0">
                    {isAddingColumn ? (
                        <div className="bg-[#EBECF0] rounded-xl p-2 animate-in fade-in">
                            <input autoFocus className="w-full p-2 text-sm border-2 border-blue-600 rounded mb-2 outline-none" placeholder="Enter list title..." value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} onKeyDown={(e) => {if(e.key === 'Enter') handleAddColumn()}} />
                            <div className="flex gap-2">
                                <button onClick={handleAddColumn} className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-bold hover:bg-blue-700">Add list</button>
                                <button onClick={() => setIsAddingColumn(false)} className="text-slate-500 hover:bg-slate-300 p-1.5 rounded"><Icons.X /></button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingColumn(true)} className="w-full bg-[#ffffff3d] hover:bg-[#ffffff52] text-slate-700 font-bold p-3 rounded-xl flex items-center gap-2 transition-all border border-transparent hover:border-slate-300"><Icons.Plus /> Add another list</button>
                    )}
                </div>
              </div>
            </DragDropContext>
          )}
        </main>

        {/* MODALS */}
        {showModal && <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            {/* ... (Keep existing modals for workspace, project, member, issue) ... */}
            {showModal==='workspace' && <form onSubmit={handleCreateWorkspace} className="bg-white p-6 rounded-xl w-96"><h2 className="font-bold text-xl mb-4">New Workspace</h2><input className="w-full border p-2 mb-2 rounded" placeholder="Name" onChange={e=>setNewWorkspace({...newWorkspace, name:e.target.value})}/><button className="bg-blue-600 text-white w-full py-2 rounded font-bold">Create</button><button type="button" onClick={()=>setShowModal(null)} className="w-full mt-2 text-slate-500">Cancel</button></form>}
            {showModal==='project' && <form onSubmit={handleCreateProject} className="bg-white p-6 rounded-xl w-96"><h2 className="font-bold text-xl mb-4">New Board</h2><input className="w-full border p-2 mb-2 rounded" placeholder="Title" onChange={e=>setNewProject({...newProject, name:e.target.value})}/><input className="w-full border p-2 mb-4 rounded" placeholder="Key" onChange={e=>setNewProject({...newProject, projectKey:e.target.value})}/><button className="bg-blue-600 text-white w-full py-2 rounded font-bold">Create</button><button type="button" onClick={()=>setShowModal(null)} className="w-full mt-2 text-slate-500">Cancel</button></form>}
            {showModal === 'member' && <form onSubmit={handleInvite} className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
              <h2 className="text-xl font-bold mb-4 text-slate-800">Invite to Workspace</h2>
              <input type="email" placeholder="teammate@example.com" className="w-full border p-3 rounded-xl mb-4 outline-none" required value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
              <div className="mb-6"><label className="text-xs font-bold text-slate-500 uppercase">Role</label><select className="w-full border p-3 rounded-xl mt-1 outline-none bg-white font-medium" value={inviteRole} onChange={e => setInviteRole(e.target.value)}><option value="MEMBER">Member</option><option value="ADMIN">Admin</option><option value="VIEWER">Viewer</option></select></div>
              <div className="flex gap-4"><button type="button" onClick={() => setShowModal(null)} className="flex-1 py-3 text-slate-500 font-bold">Cancel</button><button disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">{loading ? 'Sending...' : 'Send'}</button></div>
            </form>}
            {showModal==='issue' && <form onSubmit={handleCreateIssue} className="bg-white p-6 rounded-xl w-full max-w-md"><h2 className="font-bold text-xl mb-4">Create Issue</h2><input className="w-full border p-2 mb-2 rounded" placeholder="Summary" onChange={e=>setNewIssue({...newIssue, summary:e.target.value})}/><textarea className="w-full border p-2 mb-2 rounded h-24" onChange={e=>setNewIssue({...newIssue, description:e.target.value})}/><div className="flex gap-2"><select className="border p-2 rounded w-full" onChange={e=>setNewIssue({...newIssue, priority:e.target.value})}><option value="MEDIUM">Medium</option><option value="HIGH">High</option></select><select className="border p-2 rounded w-full" onChange={e=>setNewIssue({...newIssue, assigneeEmail:e.target.value})}><option value="">Unassigned</option>{projectMembers.map(u=><option key={u.id} value={u.email}>{u.username}</option>)}</select></div><button className="bg-blue-600 text-white w-full py-2 rounded font-bold mt-4">Create</button><button type="button" onClick={()=>setShowModal(null)} className="w-full mt-2 text-slate-500">Cancel</button></form>}
        </div>}

        {/* --- PROFILE DRAWER (Slide-in) --- */}
        {showProfileDrawer && (
            <div className="fixed inset-0 bg-black/60 z-[100] flex justify-end">
                <div className="bg-white w-[500px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Profile Settings</h2>
                        <button onClick={() => setShowProfileDrawer(false)} className="hover:bg-slate-100 p-2 rounded-full"><Icons.X /></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Header Image */}
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl relative">
                            {currentUser?.hasHeaderImage && <img src={getHeaderImg(currentUser.id)} className="w-full h-full object-cover rounded-xl opacity-80" />}
                            <label className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-lg cursor-pointer hover:bg-black/70">
                                <Icons.Camera />
                                <input type="file" className="hidden" onChange={(e) => handleUploadPhoto(e, 'header')} />
                            </label>
                        </div>

                        {/* Avatar & Details */}
                        <div className="flex items-end gap-6 -mt-12 px-4">
                            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md z-10">
                                <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden relative group">
                                    {currentUser?.hasProfileImage ? <img src={getProfileImg(currentUser.id)} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center font-bold text-3xl text-slate-400">{currentUser?.username?.charAt(0).toUpperCase()}</div>}
                                    <label className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer text-white">
                                        <Icons.Camera />
                                        <input type="file" className="hidden" onChange={(e) => handleUploadPhoto(e, 'photo')} />
                                    </label>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3 className="font-bold text-xl">{currentUser?.username}</h3>
                                <p className="text-sm text-slate-500">{currentUser?.email}</p>
                            </div>
                        </div>

                        {/* Edit Form */}
                        <div className="space-y-4 pt-4 border-t">
                            <h4 className="font-bold text-sm text-slate-500 uppercase">Personal Information</h4>
                            <div>
                                <label className="block text-sm font-bold mb-1">Username</label>
                                <input className="w-full border p-2 rounded bg-white" value={profileForm.username} onChange={e => setProfileForm({...profileForm, username: e.target.value})} placeholder="Username" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Job Title</label>
                                    <input className="w-full border p-2 rounded" value={profileForm.jobTitle} onChange={e => setProfileForm({...profileForm, jobTitle: e.target.value})} placeholder="e.g. Developer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Organization</label>
                                    <input className="w-full border p-2 rounded" value={profileForm.organization} onChange={e => setProfileForm({...profileForm, organization: e.target.value})} placeholder="e.g. Acme Corp" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleUpdateProfile} className="bg-blue-600 text-white px-6 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-blue-700"><Icons.Save size={14}/> Save Profile</button>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-4 pt-4 border-t">
                            <h4 className="font-bold text-sm text-slate-500 uppercase">Security</h4>
                            <div>
                                <label className="block text-sm font-bold mb-1">Current Password</label>
                                <input 
                                    type="password" 
                                    className={`w-full border p-2 rounded bg-slate-50 outline-none focus:bg-white transition-colors ${passwordErrors.current ? 'border-red-500 bg-red-50' : ''}`}
                                    value={profileForm.currentPassword} 
                                    onChange={e => {
                                        setProfileForm({...profileForm, currentPassword: e.target.value});
                                        setPasswordErrors({...passwordErrors, current: ''});
                                    }} 
                                />
                                {passwordErrors.current && <p className="text-red-500 text-xs mt-1 font-medium">{passwordErrors.current}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">New Password</label>
                                <input 
                                    type="password" 
                                    className={`w-full border p-2 rounded bg-slate-50 outline-none focus:bg-white transition-colors ${passwordErrors.new ? 'border-red-500 bg-red-50' : ''}`}
                                    value={profileForm.newPassword} 
                                    onChange={e => {
                                        setProfileForm({...profileForm, newPassword: e.target.value});
                                        setPasswordErrors({...passwordErrors, new: ''});
                                    }} 
                                />
                                {passwordErrors.new && <p className="text-red-500 text-xs mt-1 font-medium">{passwordErrors.new}</p>}
                            </div>
                            <button onClick={handleChangePassword} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded font-bold text-sm hover:bg-red-100 w-full flex justify-center items-center gap-2"><Icons.Lock size={14}/> Update Password</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* ISSUE DRAWER (Slide-in) */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
            <div className="bg-[#F4F5F7] w-[768px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
               <button onClick={() => { setSelectedIssue(null); setActivePopover(null); }} className="absolute top-4 right-4 text-slate-500 hover:bg-slate-200 p-2 rounded-full"><Icons.X /></button>
               {/* ... (Keep existing Drawer Content) ... */}
               <div className="p-8 pb-4">
                 <h2 className="text-2xl font-bold text-[#172B4D] mb-2 leading-tight">{selectedIssue.summary}</h2>
                 
                 <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>in list <span className="underline font-bold text-slate-700">{selectedIssue.status}</span></span>
                    
                    {/* --- REPORTER SECTION --- */}
                    {selectedIssue.reporter && (
                        <div className="flex items-center gap-2 border-l pl-4 border-slate-300">
                            <span>Reporter:</span>
                            <div className="flex items-center gap-1 bg-slate-100 pr-2 rounded-full">
                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[9px] font-bold text-blue-600 overflow-hidden">
                                    {selectedIssue.reporter.hasProfileImage 
                                        ? <img src={getProfileImg(selectedIssue.reporter.id)} className="w-full h-full object-cover"/> 
                                        : selectedIssue.reporter.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-slate-700">{selectedIssue.reporter.username}</span>
                            </div>
                        </div>
                    )}
                 </div>
               </div>

               <div className="flex px-8 gap-8">
                  <div className="flex-1 space-y-6">
                     {selectedIssue.labels && selectedIssue.labels.length > 0 && <div className="flex gap-2 flex-wrap">{selectedIssue.labels.map((l, i)=><span key={i} className="bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded">{l}</span>)}</div>}
                     {selectedIssue.assignees && selectedIssue.assignees.length > 0 && (<div><div className="text-xs font-bold text-slate-500 uppercase mb-2">Members</div><div className="flex gap-2">{selectedIssue.assignees.map(u => (<div key={u.id} className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden" title={u.username}>{u.hasProfileImage ? <img src={getProfileImg(u.id)} className="w-full h-full object-cover"/> : u.username.charAt(0).toUpperCase()}</div>))}<button onClick={() => setActivePopover('member')} className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300"><Icons.Plus /></button></div></div>)}
                     <div><div className="flex items-center gap-2 font-bold text-slate-700 mb-2"><Icons.Briefcase /> Description</div>{editingDesc ? (<div><textarea className="w-full p-3 border rounded-lg min-h-[120px]" value={descText} onChange={e => setDescText(e.target.value)} autoFocus /><div className="flex gap-2 mt-2"><button onClick={handleSaveDescription} className="bg-blue-600 text-white px-3 py-1.5 rounded font-bold text-sm">Save</button><button onClick={() => setEditingDesc(false)} className="text-slate-500 text-sm">Cancel</button></div></div>) : (<div onClick={() => {setEditingDesc(true); setDescText(selectedIssue.description)}} className="bg-slate-200/50 p-4 rounded-lg min-h-[60px] text-sm text-slate-700 cursor-pointer hover:bg-slate-200 transition-colors whitespace-pre-wrap leading-relaxed">{selectedIssue.description || "Add a more detailed description..."}</div>)}</div>
                     {selectedIssue.attachments.map(att => (
  <div key={att.id} className="flex gap-3 p-2 bg-white border rounded-lg hover:bg-slate-50 shadow-sm relative group transition-all">
    <a href={att.url} target="_blank" rel="noreferrer" className="w-24 h-16 bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-500 overflow-hidden rounded shrink-0">
      {att.type === 'FILE' && att.name.match(/\.(jpeg|jpg|png|gif)$/i) ? 
        <img src={att.url} className="w-full h-full object-cover" alt="attachment" /> : 
        'LINK'
      }
    </a>
    
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <div className="font-bold text-sm truncate pr-6" title={att.name}>{att.name}</div>
      <div className="text-xs text-slate-500 mb-1">Added {new Date(att.uploadedAt).toLocaleDateString()}</div>
      <a href={att.url} target="_blank" rel="noreferrer" className="text-xs font-bold underline text-blue-600 hover:text-blue-800">Open</a>
    </div>

    {/* DELETE BUTTON (Visible on Hover) */}
    <button 
      onClick={(e) => { 
        e.stopPropagation(); // Stop click from opening the link (if parent has click)
        handleDeleteAttachment(att.id); 
      }} 
      className="absolute top-2 right-2 text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
      title="Delete Attachment"
    >
      <Icons.Trash2 size={14} />
    </button>
  </div>
))}
                     {selectedIssue.checklists?.map(cl => (<div key={cl.id}><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2 font-bold text-slate-700 text-lg"><Icons.CheckSquare /> {cl.name}</div><button onClick={() => { safeFetchJson(`${API_BASE}/issues/checklists/${cl.id}`, {method:'DELETE'}); refreshIssue(); }} className="text-xs bg-slate-200 px-2 py-1 rounded hover:bg-red-100 hover:text-red-600">Delete</button></div><div className="flex items-center gap-2 mb-2"><span className="text-[10px] text-slate-500 font-bold">{Math.round((cl.items.filter(i=>i.isChecked).length / (cl.items.length || 1)) * 100)}%</span><div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-300" style={{width: `${(cl.items.filter(i=>i.isChecked).length / (cl.items.length || 1)) * 100}%`}}></div></div></div><div className="space-y-1 mb-2">{cl.items.map(item => (<div key={item.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-200 rounded group transition-colors"><input type="checkbox" checked={item.isChecked} onChange={() => handleToggleItem(item.id, item.isChecked)} className="accent-blue-600 w-4 h-4 cursor-pointer" /><span className={`text-sm ${item.isChecked ? "line-through text-slate-400" : "text-slate-700"}`}>{item.text}</span><button onClick={() => { safeFetchJson(`${API_BASE}/issues/checklists/items/${item.id}`, {method:'DELETE'}); refreshIssue(); }} className="ml-auto opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500"><Icons.Trash2 /></button></div>))}</div><div className="pl-0"><input className="bg-white border border-slate-300 rounded px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder="Add an item" value={newItemText[cl.id] || ''} onChange={e => setNewItemText({...newItemText, [cl.id]: e.target.value})} onKeyDown={e => { if(e.key === 'Enter') handleAddItem(cl.id); }}/></div></div>))}
                     
                     {/* History & Comments */}
                     <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 font-bold text-slate-700 text-lg"><Icons.Layout /> Activity</div>
                            <div className="flex gap-2">
                                <button onClick={() => refreshActivityLogs()} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">Refresh History</button>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">{currentUser?.username?.charAt(0)}</div>
                            <div className="flex-1 bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden transition-shadow focus-within:shadow-md">
                                <input className="w-full p-2 text-sm outline-none" placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} />
                                {commentText && <div className="p-2 border-t bg-slate-50 flex justify-end"><button onClick={handleAddComment} className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold shadow-sm hover:bg-blue-700">Save</button></div>}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* ACTIVITY LOGS (System messages) */}
                            {activityLogs && activityLogs.length > 0 && (
                                <div className="space-y-2 mb-4">
                                    {activityLogs.map(log => (
                                        <div key={`log-${log.id}`} className="flex gap-3 items-start opacity-75">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-500"><Icons.History size={14}/></div>
                                            <div>
                                                <div className="text-sm text-slate-600">
                                                    <span className="font-bold text-slate-800">{log.actor.username}</span> {log.description}
                                                </div>
                                                <div className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* USER COMMENTS */}
                            {comments.map(c => (<div key={c.id} className="flex gap-3"><div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden border border-white shadow-sm">{c.author.hasProfileImage ? <img src={getProfileImg(c.author.id)} className="w-full h-full object-cover"/> : c.author.username.charAt(0)}</div><div><div className="flex items-center gap-2 mb-1"><span className="text-sm font-bold text-slate-700">{c.author.username}</span><span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleTimeString()}</span></div><div className="text-sm text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">{c.text}</div></div></div>))}
                        </div>
                     </div>
                  </div>
                  <div className="w-40 space-y-2 shrink-0 relative">
                     <div className="text-xs font-bold text-slate-500 uppercase mb-2">Add to card</div>
                     <div className="relative">
                        <button onClick={() => setActivePopover(activePopover === 'member' ? null : 'member')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.UserPlus size={14}/> Members</button>
                        {activePopover === 'member' && <div className="absolute top-8 right-0 bg-white shadow-xl border rounded-xl p-3 w-64 z-50">
                            <h4 className="font-bold text-xs mb-2 text-center border-b pb-2">Members</h4>
                            <div className="space-y-1">{projectMembers.map(u => (<div key={u.id} className="flex items-center gap-2 p-1 hover:bg-slate-50 cursor-pointer" onClick={() => toggleAssignee(u.email, selectedIssue.assignees?.some(a=>a.id===u.id))}><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] overflow-hidden">{u.hasProfileImage ? <img src={getProfileImg(u.id)} className="w-full h-full object-cover"/> : u.username.charAt(0).toUpperCase()}</div><span className="text-sm flex-1">{u.username}</span>{selectedIssue.assignees?.some(a=>a.id===u.id) && <Icons.CheckCircle size={14} className="text-blue-600"/>}</div>))}</div>
                        </div>}
                     </div>
                     <button onClick={handleAddLabel} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.Tag size={14}/> Labels</button>
                     <button onClick={handleAddChecklist} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.CheckSquare size={14}/> Checklist</button>
                     <div className="relative">
                        <button onClick={() => setActivePopover(activePopover === 'date' ? null : 'date')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.Calendar size={14}/> Dates</button>
                        {activePopover === 'date' && <div className="absolute top-8 right-0 bg-white shadow-xl border rounded-xl p-3 w-64 z-50">
                             <div className="space-y-2">
                                 <div><label className="text-xs font-bold block mb-1">Start Date</label><input type="date" className="border w-full p-1 rounded text-sm" value={dateData.startDate} onChange={e=>setDateData({...dateData, startDate:e.target.value})} /></div>
                                 <div><label className="text-xs font-bold block mb-1">Due Date</label><input type="date" className="border w-full p-1 rounded text-sm" value={dateData.dueDate} onChange={e=>setDateData({...dateData, dueDate:e.target.value})} /></div>
                                 <div className="flex items-center gap-2"><input type="checkbox" checked={dateData.reminder} onChange={e=>setDateData({...dateData, reminder:e.target.checked})} /><span className="text-sm">Set Reminder</span></div>
                                 <button onClick={saveDates} className="w-full bg-blue-600 text-white text-xs py-1.5 rounded font-bold mt-2">Save</button>
                             </div>
                        </div>}
                     </div>
                     <div className="relative">
                        <button onClick={() => setActivePopover(activePopover === 'attach' ? null : 'attach')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.Paperclip size={14}/> Attachment</button>
                        {activePopover === 'attach' && <div className="absolute top-8 right-0 bg-white shadow-xl border rounded-xl p-3 w-64 z-50">
                             <div className="flex gap-2 border-b pb-2 mb-2"><button onClick={()=>setAttachmentData({...attachmentData, type:'LINK'})} className={`flex-1 text-xs font-bold pb-1 ${attachmentData.type==='LINK'?'border-b-2 border-blue-600':''}`}>Link</button><button onClick={()=>setAttachmentData({...attachmentData, type:'FILE'})} className={`flex-1 text-xs font-bold pb-1 ${attachmentData.type==='FILE'?'border-b-2 border-blue-600':''}`}>Computer</button></div>
                             {attachmentData.type === 'LINK' ? (
                                 <div><input className="border w-full p-1 rounded text-sm mb-2" placeholder="Paste link..." value={attachmentData.url} onChange={e=>setAttachmentData({...attachmentData, url:e.target.value})} /><input className="border w-full p-1 rounded text-sm mb-2" placeholder="Link Name (Optional)" value={attachmentData.name} onChange={e=>setAttachmentData({...attachmentData, name:e.target.value})} /></div>
                             ) : (
                                 <div><input type="file" className="text-xs mb-2" onChange={e=>setAttachmentData({...attachmentData, file:e.target.files[0]})} /></div>
                             )}
                             <button onClick={saveAttachment} className="w-full bg-blue-600 text-white text-xs py-1.5 rounded font-bold mt-2">Attach</button>
                        </div>}
                     </div>
                     <div className="text-xs font-bold text-slate-500 uppercase mb-2 mt-6">Actions</div>
                     <div className="relative">
                        <button onClick={() => setActivePopover(activePopover === 'move' ? null : 'move')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-1.5 px-3 rounded flex items-center gap-2 justify-start"><Icons.ArrowLeft size={14}/> Move</button>
                        {activePopover === 'move' && <div className="absolute top-8 right-0 bg-white shadow-xl border rounded-xl p-3 w-48 z-50"><h4 className="font-bold text-xs mb-2 border-b pb-2">Select Column</h4>{columns.map(c => (<button key={c.id} onClick={() => moveIssue(c.name)} className="w-full text-left text-sm p-2 hover:bg-blue-50 text-slate-700 rounded block transition-colors">{c.name}</button>))}</div>}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
