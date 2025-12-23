import { User, ResumeData } from '../types';
import { supabase, isSupabaseEnabled } from '../lib/supabase';

// Helper for LocalStorage fallback (simulating async)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const StorageService = {
  
  // LOGIN
  async login(username: string, password: string): Promise<User | null> {
    if (isSupabaseEnabled && supabase) {
      // Logic for Cloud DB
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password) // Note: In production, use Supabase Auth or Hash passwords!
        .single();
      
      if (error || !data) return null;
      
      // Fetch resumes for this user
      const { data: resumes } = await supabase
        .from('resumes')
        .select('data')
        .eq('user_id', data.id);
        
      return {
        id: data.id,
        username: data.username,
        password: data.password,
        resumes: resumes ? resumes.map((r: any) => r.data) : []
      };

    } else {
      // Fallback: LocalStorage
      await sleep(300); // Simulate network
      const storedUsers = localStorage.getItem('ty_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(u => u.username === username && u.password === password);
      return user || null;
    }
  },

  // REGISTER
  async register(username: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> {
    if (isSupabaseEnabled && supabase) {
      // Check existing
      const { data: existing } = await supabase.from('users').select('id').eq('username', username).single();
      if (existing) return { success: false, message: 'El usuario ya existe' };

      // Create
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password }])
        .select()
        .single();

      if (error) return { success: false, message: error.message };

      return { 
        success: true, 
        user: { id: data.id, username: data.username, password: data.password, resumes: [] } 
      };

    } else {
      // Fallback: LocalStorage
      await sleep(300);
      const storedUsers = localStorage.getItem('ty_users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.find(u => u.username === username)) {
        return { success: false, message: 'El usuario ya existe' };
      }

      const newUser: User = { id: Date.now().toString(), username, password, resumes: [] };
      users.push(newUser);
      localStorage.setItem('ty_users', JSON.stringify(users));
      return { success: true, user: newUser };
    }
  },

  // SAVE/UPDATE RESUME
  async saveResume(user: User, resume: ResumeData): Promise<boolean> {
    if (isSupabaseEnabled && supabase && user.id) {
       // Check if resume exists in DB (we use ID stored in resume data)
       // We query by parsing the JSONB data column if needed, or better, we can assume insert/upsert logic
       
       // Since we store the whole JSON in 'data' column, we need to know the ROW ID to update, 
       // or we delete and re-insert, or we use the resume.id to match.
       
       // Strategy: Upsert based on resume.id inside the JSONB is tricky in raw SQL without generated columns.
       // Simpler Strategy: Search for a record where data->>'id' = resume.id
       
       const { data: existing } = await supabase
         .from('resumes')
         .select('id')
         .eq('user_id', user.id)
         .filter('data->>id', 'eq', resume.id);
       
       if (existing && existing.length > 0) {
         // Update
         await supabase
           .from('resumes')
           .update({ data: resume, updated_at: new Date() })
           .eq('id', existing[0].id);
       } else {
         // Insert
         await supabase
           .from('resumes')
           .insert([{ user_id: user.id, data: resume }]);
       }
       return true;

    } else {
      // Fallback: LocalStorage
      await sleep(200);
      const storedUsersStr = localStorage.getItem('ty_users');
      if (storedUsersStr) {
        let users: User[] = JSON.parse(storedUsersStr);
        const userIndex = users.findIndex(u => u.username === user.username);
        
        if (userIndex !== -1) {
          const userResumes = users[userIndex].resumes;
          const resumeIndex = userResumes.findIndex(r => r.id === resume.id);
          
          if (resumeIndex !== -1) {
            userResumes[resumeIndex] = resume;
          } else {
            userResumes.push(resume);
          }
          
          users[userIndex].resumes = userResumes;
          localStorage.setItem('ty_users', JSON.stringify(users));
          return true;
        }
      }
      return false;
    }
  },

  // DELETE RESUME
  async deleteResume(user: User, resumeId: string): Promise<boolean> {
    if (isSupabaseEnabled && supabase && user.id) {
       await supabase
         .from('resumes')
         .delete()
         .eq('user_id', user.id)
         .filter('data->>id', 'eq', resumeId);
       return true;
    } else {
      // Fallback
      await sleep(200);
      const storedUsersStr = localStorage.getItem('ty_users');
      if (storedUsersStr) {
         let users: User[] = JSON.parse(storedUsersStr);
         const userIndex = users.findIndex(u => u.username === user.username);
         if (userIndex !== -1) {
            users[userIndex].resumes = users[userIndex].resumes.filter(r => r.id !== resumeId);
            localStorage.setItem('ty_users', JSON.stringify(users));
            return true;
         }
      }
      return false;
    }
  },

  // RELOAD USER DATA (Sync)
  async syncUserData(user: User): Promise<User | null> {
    // Just re-login to get fresh data
    if(!user.password) return user; // Should not happen if we maintain state correctly
    return this.login(user.username, user.password); 
  }
};