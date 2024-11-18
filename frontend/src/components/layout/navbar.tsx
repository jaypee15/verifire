import { Link } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="text-xl font-bold">
          Badge Platform
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/badges">
                <Button variant="ghost">My Badges</Button>
              </Link>
              {user.isIssuer && (
                <Link to="/badges/create">
                  <Button variant="ghost">Create Badge</Button>
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 