import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

interface AuthState {
  user: any | null;
  loading: boolean;
  showLogin: boolean;
  showSignup: boolean;
}

const AppWithAuth: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    showLogin: false,
    showSignup: false
  });

  // Auth handlers
  const handleLoginSuccess = (user: any) => {
    setAuthState({
      user,
      loading: false,
      showLogin: false,
      showSignup: false
    });
  };

  const handleSignupSuccess = (user: any) => {
    setAuthState({
      user,
      loading: false,
      showLogin: false,
      showSignup: false
    });
  };

  const handleSwitchToSignup = () => {
    setAuthState(prev => ({
      ...prev,
      showLogin: false,
      showSignup: true
    }));
  };

  const handleSwitchToLogin = () => {
    setAuthState(prev => ({
      ...prev,
      showLogin: true,
      showSignup: false
    }));
  };

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        // Checking user session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          
          // Clear corrupted session data
          if (error.message.includes('Invalid Refresh Token') || error.message.includes('Refresh Token Not Found')) {
            // Clearing corrupted auth session
            await supabase.auth.signOut();
            localStorage.removeItem('agora-auth');
            localStorage.removeItem('supabase.auth.token');
          }
        }
        
        // Session check complete
        setAuthState({
          user: session?.user || null,
          loading: false,
          showLogin: !session?.user,
          showSignup: false
        });
      } catch (error) {
        
        // Clear any corrupted auth data
        // Clearing auth data due to error
        await supabase.auth.signOut();
        localStorage.removeItem('agora-auth');
        localStorage.removeItem('supabase.auth.token');
        setAuthState({
          user: null,
          loading: false,
          showLogin: true,
          showSignup: false
        });
      }
    };

    checkUser();

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        showLogin: true
      }));
    }, 5000); // 5 second timeout

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      // Auth state changed
      clearTimeout(loadingTimeout);
      setAuthState({
        user: session?.user || null,
        loading: false,
        showLogin: !session?.user,
        showSignup: false
      });
    });

    return () => {
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (authState.loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        backgroundColor: 'var(--primary-bg)' 
      }}>
        <div style={{ color: 'var(--primary-text)' }}>Loading...</div>
      </div>
    );
  }

  if (authState.showSignup) {
    return (
      <SignupPage
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  if (authState.showLogin) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />
    );
  }

  return (
    <div>
      <App 
        authUser={authState.user}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default AppWithAuth;
